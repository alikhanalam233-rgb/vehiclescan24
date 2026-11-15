import { Check } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import type { PackageId, ReportPackage } from '@/types';

interface PackageSelectorProps {
  packages: ReportPackage[];
  value: PackageId;
  onChange: (id: PackageId) => void;
}

export function PackageSelector({ packages, value, onChange }: PackageSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Report package" className="grid gap-3 sm:grid-cols-2">
      {packages.map((pkg) => {
        const selected = pkg.id === value;
        return (
          <button
            key={pkg.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(pkg.id)}
            className={`group relative flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
              selected
                ? 'border-brand-500 bg-brand-500/10 shadow-glow'
                : 'border-black/10 bg-white hover:border-black/25'
            }`}
          >
            <span>
              <span className="block text-sm font-semibold text-ink-900">{pkg.name}</span>
              <span className="block text-xs text-ink-600">Valid {pkg.reportValidityDays} days</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="font-display text-base font-semibold text-ink-900">{formatPrice(pkg.price)}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  selected ? 'border-brand-500 bg-brand-500 text-ink-900' : 'border-black/25 text-transparent'
                }`}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
