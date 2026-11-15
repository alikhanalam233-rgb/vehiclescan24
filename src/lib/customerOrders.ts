import { getSupabase } from '@/lib/supabase';
import type { PaymentStatus, PackageId, ReportStatus } from '@/types';

export interface CreateOrderInput {
  customerEmail: string;
  vin: string;
  packageId: PackageId;
}

export interface CreatedOrder {
  reference: string;
  accessToken: string;
}

export interface CustomerOrder {
  reference: string;
  createdAt: string;
  customerEmail: string;
  vin: string;
  amountCents: number;
  currency: string;
  paymentStatus: PaymentStatus;
  reportStatus: ReportStatus;
  paidAt: string | null;
  packageName: string;
  reportValidityDays: number;
}

export class OrderRequestError extends Error {
  constructor(message: string, readonly status: number | null) {
    super(message);
  }
}

const GENERIC_ERROR = 'Something went wrong. Please try again.';

async function readErrorMessage(error: unknown): Promise<{ message: string; status: number | null }> {
  const response = (error as { context?: Response }).context;
  if (response instanceof Response) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    return { message: body?.error ?? GENERIC_ERROR, status: response.status };
  }
  return { message: GENERIC_ERROR, status: null };
}

function isCreatedOrder(value: unknown): value is CreatedOrder {
  const candidate = value as Partial<CreatedOrder> | null;
  return typeof candidate?.reference === 'string' && typeof candidate?.accessToken === 'string';
}

function isCustomerOrder(value: unknown): value is CustomerOrder {
  const candidate = value as Partial<CustomerOrder> | null;
  return (
    typeof candidate?.reference === 'string' &&
    typeof candidate?.createdAt === 'string' &&
    typeof candidate?.customerEmail === 'string' &&
    typeof candidate?.vin === 'string' &&
    typeof candidate?.amountCents === 'number' &&
    typeof candidate?.paymentStatus === 'string' &&
    typeof candidate?.reportStatus === 'string' &&
    typeof candidate?.packageName === 'string' &&
    typeof candidate?.reportValidityDays === 'number'
  );
}

export async function createCustomerOrder(input: CreateOrderInput): Promise<CreatedOrder> {
  const { data, error } = await getSupabase().functions.invoke('create-order', {
    body: { email: input.customerEmail, vin: input.vin, packageId: input.packageId, acceptedTerms: true },
  });
  if (error) {
    const { message, status } = await readErrorMessage(error);
    throw new OrderRequestError(message, status);
  }
  if (!isCreatedOrder(data)) throw new OrderRequestError(GENERIC_ERROR, null);
  return data;
}

export async function fetchCustomerOrder(reference: string, accessToken: string): Promise<CustomerOrder> {
  const { data, error } = await getSupabase().functions.invoke('get-order', {
    body: { reference, accessToken },
  });
  if (error) {
    const { message, status } = await readErrorMessage(error);
    throw new OrderRequestError(message, status);
  }
  if (!isCustomerOrder(data)) throw new OrderRequestError(GENERIC_ERROR, null);
  return data;
}
