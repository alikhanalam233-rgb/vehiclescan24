/*
# Seed the six report packages

## Plain-English summary
Adds the six packages (Silver to Black Diamond) with the prices currently shown on the website. Prices are stored in cents: Silver 1999, Platinum 2999, Gold 3999, Premium 4999, Diamond 5999, Black Diamond 6999.

## 1. Modified data
- packages: six rows inserted with fixed, readable ids (silver, platinum, gold, premium, diamond, black-diamond).

## 2. Safety
- Existing rows are never overwritten. If a package already exists (for example, after a future price change), this migration leaves it untouched.
- No customer data is inserted.

## 3. Notes
- Price changes will be made through the admin area in a later step.
*/

INSERT INTO packages (id, name, tagline, features, price_cents, report_validity_days, highlight, sort_order)
VALUES
  ('silver', 'Silver', 'Essential checks for a quick first look.',
   ARRAY['Mileage consistency check', 'Written-off and total-loss status', 'Stolen vehicle register check', 'Online report and PDF download'],
   1999, 30, false, 1),
  ('platinum', 'Platinum', 'Registration and inspection history included.',
   ARRAY['Everything in Silver', 'Registration and ownership history', 'Import and export history', 'Technical inspection (APK) history'],
   2999, 30, false, 2),
  ('gold', 'Gold', 'Full history with financial and claim checks.',
   ARRAY['Everything in Platinum', 'Finance and lease encumbrance check', 'Insurance claim history', 'Odometer history timeline'],
   3999, 30, false, 3),
  ('premium', 'Premium', 'Damage and recall analysis for confident buying.',
   ARRAY['Everything in Gold', 'Damage and repair record review', 'Open safety recall check', 'Owner count analysis'],
   4999, 60, true, 4),
  ('diamond', 'Diamond', 'Expert condition summary from our analysts.',
   ARRAY['Everything in Premium', 'Analyst condition summary', 'Priority delivery within 12 hours', 'Email support on your report'],
   5999, 90, false, 5),
  ('black-diamond', 'Black Diamond', 'The most complete dossier we produce.',
   ARRAY['Everything in Diamond', 'Personal analyst consultation by phone', 'Priority delivery within 4 hours', 'Report link valid for 12 months'],
   6999, 365, false, 6)
ON CONFLICT (id) DO NOTHING;
