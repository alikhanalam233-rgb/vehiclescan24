const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/;

export function normalizeVin(input: string): string {
  return input.replace(/[\s-]/g, '').toUpperCase();
}

export function validateVin(input: string): string | null {
  const vin = normalizeVin(input);
  if (vin.length === 0) return 'Please enter your 17-character VIN.';
  if (vin.length !== 17) return `A VIN has exactly 17 characters. You entered ${vin.length}.`;
  if (!VIN_PATTERN.test(vin)) return 'VINs use letters A-Z (except I, O and Q) and digits only.';
  return null;
}
