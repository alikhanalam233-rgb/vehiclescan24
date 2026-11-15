import { CheckCircle2, AlertTriangle } from 'lucide-react';

const CHECKS = [
  { label: 'Mileage consistency', result: 'Consistent', ok: true },
  { label: 'Written-off status', result: 'None found', ok: true },
  { label: 'Stolen vehicle register', result: 'Clear', ok: true },
  { label: 'Open safety recalls', result: '1 open campaign', ok: false },
];

export function ReportPreviewCard() {
  return (
    <div className="surface-card w-full max-w-sm p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-600">Sample summary</p>
          <p className="mt-1 font-display text-base font-semibold text-ink-900">Volkswagen Golf GTI</p>
        </div>
        <span className="rounded-full border border-brand-500/50 bg-brand-100 px-2.5 py-1 font-mono text-[11px] text-ink-800">
          PREMIUM
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {CHECKS.map((check) => (
          <li key={check.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-ink-800">{check.label}</span>
            <span className={`flex items-center gap-1.5 font-medium ${check.ok ? 'text-emerald-700' : 'text-amber-700'}`}>
              {check.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {check.result}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
