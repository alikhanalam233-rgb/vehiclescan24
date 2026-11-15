import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { buttonStyles } from '@/components/ui/Button';
import { useDemoStore } from '@/store/DemoStoreContext';
import type { Finding, FindingSeverity, Order } from '@/types';

const SEVERITY_OPTIONS: { value: FindingSeverity; label: string }[] = [
  { value: 'info', label: 'Information' },
  { value: 'warning', label: 'Attention' },
  { value: 'critical', label: 'Critical' },
];

function newFinding(): Finding {
  return { id: `f-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, title: '', severity: 'info', details: '' };
}

export function FindingsEditor({ order }: { order: Order }) {
  const { updateOrder } = useDemoStore();
  const [findings, setFindings] = useState<Finding[]>(order.findings);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function patch(id: string, changes: Partial<Finding>) {
    setFindings((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
    setError(null);
    setSaved(false);
  }

  function remove(id: string) {
    setFindings((current) => current.filter((item) => item.id !== id));
    setSaved(false);
  }

  function save() {
    if (findings.some((finding) => finding.title.trim() === '')) {
      setError('Every finding needs a title.');
      return;
    }
    updateOrder(order.reference, {
      findings: findings.map((finding) => ({ ...finding, title: finding.title.trim(), details: finding.details.trim() })),
    });
    setSaved(true);
  }

  return (
    <div className="space-y-5">
      {findings.length === 0 && (
        <p className="surface-card p-6 text-sm text-ink-600">No findings yet. Add the findings from your research below.</p>
      )}

      {findings.map((finding, index) => (
        <div key={finding.id} className="surface-card space-y-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider text-ink-500">Finding {index + 1}</span>
            <button
              type="button"
              onClick={() => remove(finding.id)}
              aria-label={`Remove finding ${index + 1}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-rose-500/10 hover:text-rose-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <input
              aria-label="Finding title"
              placeholder="Title, e.g. Minor paint repair"
              value={finding.title}
              onChange={(event) => patch(finding.id, { title: event.target.value })}
              className="input-base"
            />
            <select
              aria-label="Severity"
              value={finding.severity}
              onChange={(event) => patch(finding.id, { severity: event.target.value as FindingSeverity })}
              className="input-base"
            >
              {SEVERITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            aria-label="Finding details"
            placeholder="Describe what you found and where the information came from."
            rows={3}
            value={finding.details}
            onChange={(event) => patch(finding.id, { details: event.target.value })}
            className="input-base resize-y"
          />
        </div>
      ))}

      {error && (
        <p role="alert" className="text-sm text-rose-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setFindings((current) => [...current, newFinding()])}
          className={buttonStyles({ variant: 'secondary' })}
        >
          <Plus className="h-4 w-4" />
          Add finding
        </button>
        <button type="button" onClick={save} className={buttonStyles()}>
          Save findings
        </button>
        {saved && <span className="text-sm text-emerald-300">Findings saved.</span>}
      </div>
    </div>
  );
}
