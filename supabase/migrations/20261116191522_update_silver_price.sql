/*
# Update Silver package price to EUR 29.00

1. Summary
- The Silver package price changes from EUR 19.99 to EUR 29.00.
- Gold stays at EUR 39.99; no other package is touched.

2. Modified rows
- packages: `silver` price_cents set to 2900.

3. Security
- No table, grant, or policy changes.

4. Notes
- Re-running produces the same result (idempotent UPDATE).
- New checkout orders take their price from this row. Existing orders keep
  the price they were created with (stored on the order itself).
*/

UPDATE packages
SET price_cents = 2900
WHERE id = 'silver';
