/*
# Create VehicleScan24 core schema

## Plain-English summary
This migration creates the database tables that store everything the website needs to remember: package catalogue, customers, orders, vehicle details, findings, finished reports, PayPal payment records, PayPal webhook events and email notification records.

## 1. New tables
- packages: the six report packages with prices stored in cents (EUR).
- customers: one row per unique email address used at checkout (guest customers, no login).
- orders: one row per purchase, with a human-readable reference (VS24-10423, ...), VIN, package, price snapshot, payment status and report status.
- vehicles: vehicle details entered manually by staff, one row per order.
- findings: report findings entered by staff, ordered by position.
- reports: metadata for the finished PDF (file path in private storage, upload time, publish time, expiry, hashed secure link token, revocation).
- payment_transactions: PayPal order and capture records, written only after server-side verification.
- payment_webhook_events: received PayPal webhook events, used to ignore duplicates.
- email_notifications: log of customer emails (order confirmation, report ready) with delivery status.

## 2. Security
- Row level security is enabled on every table.
- Browsers (the anon and authenticated roles) are denied all access to every table except packages.
- Packages: public read access, only for active packages.
- All other tables: no policies and no grants for browser roles. Only server-side code using the service role can read or write them. Customers reach their own orders through a server function that checks a secret token, never through direct table access.
- Supabase grants browser roles full access to new public tables by default. These default grants are explicitly removed here.
- Payment status can only be set by server-side code. Orders marked paid must have a paid time, enforced by a database check.

## 3. Important notes
1. Prices are stored in cents to avoid rounding errors.
2. The order secret token is never stored; only its SHA-256 hash is kept.
3. Report files are not stored in this migration. Private file storage is set up in a later step.
4. Admin roles and admin sign-in are added in the admin authentication step.
5. This migration only creates structures and access rules. It does not insert any customer data.
*/

CREATE SEQUENCE IF NOT EXISTS order_reference_seq START WITH 10423;

CREATE TABLE IF NOT EXISTS packages (
  id text PRIMARY KEY,
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  price_cents integer NOT NULL CHECK (price_cents > 0),
  currency text NOT NULL DEFAULT 'EUR' CHECK (currency = 'EUR'),
  report_validity_days integer NOT NULL CHECK (report_validity_days > 0),
  highlight boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL CHECK (position('@' IN email) > 1),
  email_normalized text GENERATED ALWAYS AS (lower(btrim(email))) STORED UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('VS24-' || nextval('order_reference_seq')),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  vin text NOT NULL CHECK (vin ~ '^[A-HJ-NPR-Z0-9]{17}$'),
  package_id text NOT NULL REFERENCES packages(id) ON DELETE RESTRICT,
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  currency text NOT NULL DEFAULT 'EUR' CHECK (currency = 'EUR'),
  payment_status text NOT NULL DEFAULT 'awaiting_payment'
    CHECK (payment_status IN ('awaiting_payment', 'paid', 'failed', 'refunded')),
  report_status text NOT NULL DEFAULT 'pending'
    CHECK (report_status IN ('pending', 'in_progress', 'completed', 'published')),
  access_token_hash text NOT NULL,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT orders_paid_requires_paid_at CHECK (payment_status <> 'paid' OR paid_at IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS orders_customer_id_idx ON orders (customer_id);
CREATE INDEX IF NOT EXISTS orders_vin_idx ON orders (vin);
CREATE INDEX IF NOT EXISTS orders_payment_status_idx ON orders (payment_status);
CREATE INDEX IF NOT EXISTS orders_report_status_idx ON orders (report_status);

CREATE TABLE IF NOT EXISTS vehicles (
  order_id uuid PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
  make text NOT NULL DEFAULT '',
  model text NOT NULL DEFAULT '',
  build_year integer CHECK (build_year IS NULL OR (build_year BETWEEN 1900 AND 2100)),
  first_registration date,
  fuel_type text NOT NULL DEFAULT '',
  colour text NOT NULL DEFAULT '',
  mileage_km integer CHECK (mileage_km IS NULL OR mileage_km >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS findings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  position integer NOT NULL DEFAULT 0,
  title text NOT NULL CHECK (btrim(title) <> ''),
  severity text NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  details text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS findings_order_id_idx ON findings (order_id, position);

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  storage_path text,
  file_name text,
  file_size_bytes bigint CHECK (file_size_bytes IS NULL OR file_size_bytes >= 0),
  uploaded_at timestamptz,
  published_at timestamptz,
  expires_at timestamptz,
  access_token_hash text UNIQUE,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reports_published_fields CHECK (published_at IS NULL OR (expires_at IS NOT NULL AND access_token_hash IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  provider text NOT NULL DEFAULT 'paypal' CHECK (provider = 'paypal'),
  provider_order_id text NOT NULL UNIQUE,
  provider_capture_id text UNIQUE,
  status text NOT NULL DEFAULT 'created'
    CHECK (status IN ('created', 'approved', 'completed', 'denied', 'refunded')),
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  currency text NOT NULL DEFAULT 'EUR' CHECK (currency = 'EUR'),
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS payment_transactions_order_id_idx ON payment_transactions (order_id);

CREATE TABLE IF NOT EXISTS payment_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_event_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);

CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('order_confirmation', 'report_ready')),
  recipient text NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'failed')),
  provider_message_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS email_notifications_order_id_idx ON email_notifications (order_id);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON packages, customers, orders, vehicles, findings, reports,
  payment_transactions, payment_webhook_events, email_notifications
  FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON packages, customers, orders, vehicles, findings, reports,
  payment_transactions, payment_webhook_events, email_notifications TO service_role;

GRANT USAGE, SELECT ON SEQUENCE order_reference_seq TO service_role;

GRANT SELECT ON packages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_active_packages" ON packages;
CREATE POLICY "anon_select_active_packages" ON packages FOR SELECT
  TO anon, authenticated
  USING (active = true);
