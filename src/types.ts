export type PackageId = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface ReportPackage {
  id: PackageId;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  reportValidityDays: number;
  highlight?: boolean;
}

export type PaymentStatus = 'awaiting_payment' | 'paid' | 'failed';

export type ReportStatus = 'pending' | 'in_progress' | 'completed' | 'published';

export type FindingSeverity = 'info' | 'warning' | 'critical';

export interface Finding {
  id: string;
  title: string;
  severity: FindingSeverity;
  details: string;
}

export interface VehicleDetails {
  make: string;
  model: string;
  buildYear: number | null;
  firstRegistration: string;
  fuelType: string;
  colour: string;
  mileageKm: number | null;
}

export interface ReportFile {
  name: string;
  sizeKb: number;
  uploadedAt: string;
}

export interface ReportAccess {
  token: string;
  publishedAt: string;
  expiresAt: string;
}

export type EmailType = 'order_confirmation' | 'report_ready';

export interface EmailLogEntry {
  type: EmailType;
  sentAt: string;
}

export interface Order {
  reference: string;
  createdAt: string;
  customerEmail: string;
  vin: string;
  packageId: PackageId;
  amount: number;
  paymentStatus: PaymentStatus;
  reportStatus: ReportStatus;
  vehicle: VehicleDetails;
  findings: Finding[];
  reportFile: ReportFile | null;
  access: ReportAccess | null;
  emails: EmailLogEntry[];
}
