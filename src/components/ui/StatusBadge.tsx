import type { ReactNode } from 'react';

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'error';

const TONE_CLASSES: Record<Tone, string> = {
  neutral: 'border-black/15 bg-black/5 text-ink-800',
  info: 'border-brand-500/50 bg-brand-100 text-brand-800',
  success: 'border-emerald-600/40 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-600/40 bg-amber-50 text-amber-800',
  error: 'border-rose-600/40 bg-rose-50 text-rose-800',
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
