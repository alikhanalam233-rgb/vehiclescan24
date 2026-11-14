import type { EmailType, FindingSeverity, PaymentStatus, ReportStatus } from '@/types';

export const EMAIL_LABELS: Record<EmailType, string> = {
  order_confirmation: 'Order confirmation',
  report_ready: 'Report ready',
};
import type { Tone } from '@/components/ui/StatusBadge';

interface StatusMeta {
  label: string;
  tone: Tone;
}

export const PAYMENT_STATUS_META: Record<PaymentStatus, StatusMeta> = {
  awaiting_payment: { label: 'Awaiting payment', tone: 'warning' },
  paid: { label: 'Paid', tone: 'success' },
  failed: { label: 'Failed', tone: 'error' },
};

export const REPORT_STATUS_META: Record<ReportStatus, StatusMeta> = {
  pending: { label: 'Not started', tone: 'neutral' },
  in_progress: { label: 'In progress', tone: 'info' },
  completed: { label: 'Ready to publish', tone: 'info' },
  published: { label: 'Published', tone: 'success' },
};

export const FINDING_SEVERITY_META: Record<FindingSeverity, StatusMeta> = {
  info: { label: 'Information', tone: 'info' },
  warning: { label: 'Attention', tone: 'warning' },
  critical: { label: 'Critical', tone: 'error' },
};
