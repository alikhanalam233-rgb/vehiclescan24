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
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-steel-400">Sample summary</p>
          <p className="mt-1 font-display text-base font-semibold text-white">Volkswagen Golf GTI</p>
        </div>
        <span className="rounded-full border border-electric-400/40 bg-electric-500/10 px-2.5 py-1 font-mono text-[11px] text-electric-200">
          PREMIUM
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {CHECKS.map((check) => (
          <li key={check.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-steel-200">{check.label}</span>
            <span className={`flex items-center gap-1.5 font-medium ${check.ok ? 'text-emerald-300' : 'text-amber-300'}`}>
              {check.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {check.result}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
