/*
# Update the package lineup to five packages

## Plain-English summary
The website now offers five packages, from low to high: Bronze, Silver, Gold, Platinum and Diamond. Premium and Black Diamond are withdrawn from sale. Platinum takes over the EUR 49.99 price point and moves up to sit above Gold.

## 1. New rows
- packages: Bronze (EUR 9.99, 30 days), inserted only if it does not already exist.

## 2. Modified rows
- packages: Silver, Gold, Platinum and Diamond get updated names, taglines, feature lists, validity periods and sort order.
- Platinum price changes from EUR 29.99 to EUR 49.99. Silver, Gold and Diamond prices are unchanged.
- Platinum becomes the highlighted package.

## 3. Withdrawn rows
- Premium and Black Diamond are set to inactive, not deleted. Inactive packages are hidden from customers and cannot be ordered, and their history stays intact.

## 4. Security
- No access rules change. Browser access still reads only active packages.

## 5. Notes
- Every statement is safe to run again.
- No customer or order data is touched.
*/

INSERT INTO packages (id, name, tagline, features, price_cents, report_validity_days, highlight, sort_order, active)
VALUES (
  'bronze', 'Bronze', 'Basic checks for a quick first look.',
  ARRAY['Mileage consistency check', 'Written-off and total-loss status', 'Basic VIN and specification check', 'Online report view'],
  999, 30, false, 1, true
)
ON CONFLICT (id) DO NOTHING;

UPDATE packages SET
  name = 'Silver',
  tagline = 'Essential checks with stolen vehicle screening.',
  features = ARRAY['Everything in Bronze', 'Stolen vehicle register check', 'Registration and ownership history', 'Online report and PDF download'],
  report_validity_days = 30,
  highlight = false,
  sort_order = 2,
  active = true,
  updated_at = now()
WHERE id = 'silver';

UPDATE packages SET
  name = 'Gold',
  tagline = 'Full history with financial and claim checks.',
  features = ARRAY['Everything in Silver', 'Finance and lease encumbrance check', 'Insurance claim history', 'Odometer history timeline'],
  report_validity_days = 30,
  highlight = false,
  sort_order = 3,
  active = true,
  updated_at = now()
WHERE id = 'gold';

UPDATE packages SET
  name = 'Platinum',
  tagline = 'Inspection, import and damage history included.',
  features = ARRAY['Everything in Gold', 'Technical inspection (APK) history', 'Import and export history', 'Damage and repair record review'],
  price_cents = 4999,
  report_validity_days = 60,
  highlight = true,
  sort_order = 4,
  active = true,
  updated_at = now()
WHERE id = 'platinum';

UPDATE packages SET
  name = 'Diamond',
  tagline = 'Analyst-reviewed report with priority delivery.',
  features = ARRAY['Everything in Platinum', 'Analyst condition summary', 'Open safety recall check', 'Priority delivery within 12 hours'],
  report_validity_days = 90,
  highlight = false,
  sort_order = 5,
  active = true,
  updated_at = now()
WHERE id = 'diamond';

UPDATE packages SET active = false, highlight = false, sort_order = 6, updated_at = now()
WHERE id = 'premium';

UPDATE packages SET active = false, highlight = false, sort_order = 7, updated_at = now()
WHERE id = 'black-diamond';
