import type { ReactNode } from 'react';

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'error';

const TONE_CLASSES: Record<Tone, string> = {
  neutral: 'border-white/15 bg-white/5 text-steel-200',
  info: 'border-electric-400/40 bg-electric-500/10 text-electric-200',
  success: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  warning: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
  error: 'border-rose-400/40 bg-rose-500/10 text-rose-200',
};

export function StatusBadge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
