/*
# Remove Bronze package from sale and update Silver features

1. Summary
- Bronze (EUR 9.99) is no longer offered on the website.
- Silver's feature list is updated to the new four-plus-three list.

2. Modified rows
- packages: `bronze` set to active = false. The row is kept (not deleted) so
  any existing orders that reference it still resolve.
- packages: `silver` features replaced with the new list (no "Everything in Bronze" line).

3. Security
- No table, grant, or policy changes.

4. Notes
- Re-running this migration produces the same result (idempotent UPDATEs).
*/

UPDATE packages SET active = false WHERE id = 'bronze';

UPDATE packages
SET features = ARRAY[
  'Mileage consistency check',
  'Written-off and total-loss status',
  'Basic VIN and specification check',
  'Online report view',
  'Stolen vehicle register check',
  'Registration and ownership history',
  'Online report and PDF download'
]
WHERE id = 'silver';
