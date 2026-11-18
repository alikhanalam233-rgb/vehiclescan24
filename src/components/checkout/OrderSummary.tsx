import { ShieldCheck, Mail, CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import type { ReportPackage } from '@/types';

interface OrderSummaryProps {
  pkg: ReportPackage;
  vin: string;
  email: string;
}

const NEXT_STEPS = [
  { icon: CreditCard, text: 'Your order is created, then you pay securely by card.' },
  { icon: ShieldCheck, text: 'Our team verifies the payment and prepares your report.' },
  { icon: Mail, text: 'You receive your full report as a PDF by email, yours to keep and download anytime.' },
];

export function OrderSummary({ pkg, vin, email }: OrderSummaryProps) {
  return (
    <aside className="surface-card space-y-6 p-6 lg:sticky lg:top-28">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-ink-600">Order summary</p>
        <h2 className="mt-2 text-xl font-semibold">{pkg.name} report</h2>
      </div>

      <dl className="space-y-3 border-y border-black/10 py-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-600">VIN</dt>
          <dd className="max-w-[60%] break-all text-right font-mono text-ink-900">{vin || '-'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-600">Delivery email</dt>
          <dd className="max-w-[60%] break-all text-right text-ink-900">{email || '-'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-600">Package price</dt>
          <dd className="text-ink-900">{formatPrice(pkg.price)}</dd>
        </div>
        <div className="flex justify-between gap-4 pt-2 text-base">
          <dt className="font-semibold text-ink-900">Total incl. VAT</dt>
          <dd className="font-display text-xl font-semibold text-ink-900">{formatPrice(pkg.price)}</dd>
        </div>
      </dl>

      <ul className="space-y-4">
        {NEXT_STEPS.map((step) => (
          <li key={step.text} className="flex gap-3 text-sm text-ink-700">
            <step.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-800" />
            {step.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
