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
                ? 'border-electric-400 bg-electric-500/10 shadow-glow'
                : 'border-white/10 bg-navy-950/60 hover:border-white/25'
            }`}
          >
            <span>
              <span className="block text-sm font-semibold text-white">{pkg.name}</span>
              <span className="block text-xs text-steel-400">Valid {pkg.reportValidityDays} days</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="font-display text-base font-semibold text-white">{formatPrice(pkg.price)}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  selected ? 'border-electric-400 bg-electric-500 text-white' : 'border-white/25 text-transparent'
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
