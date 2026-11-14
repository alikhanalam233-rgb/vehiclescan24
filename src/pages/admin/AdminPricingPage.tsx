import { useState } from 'react';
import { buttonStyles } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { useDemoStore } from '@/store/DemoStoreContext';
import type { PackageId } from '@/types';

export function AdminPricingPage() {
  const { packages, setPackagePrice } = useDemoStore();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedId, setSavedId] = useState<string | null>(null);

  function handleSave(id: PackageId, currentPrice: number) {
    const raw = drafts[id] ?? currentPrice.toFixed(2);
    const price = Number(raw);
    if (!raw.trim() || Number.isNaN(price) || price <= 0 || price > 999.99) {
      setErrors((current) => ({ ...current, [id]: 'Enter a price between €0.01 and €999.99.' }));
      return;
    }
    setPackagePrice(id, Math.round(price * 100) / 100);
    setDrafts((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setErrors((current) => ({ ...current, [id]: '' }));
    setSavedId(id);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Package prices</h1>
        <p className="mt-2 text-sm text-steel-400">
          Changes apply to new orders. Existing orders keep the price they were placed at.
        </p>
      </div>

      <div className="surface-card divide-y divide-white/10">
        {packages.map((pkg) => {
          const draft = drafts[pkg.id] ?? pkg.price.toFixed(2);
          const dirty = draft !== pkg.price.toFixed(2);
          return (
            <div key={pkg.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{pkg.name}</p>
                <p className="text-sm text-steel-400">Currently {formatPrice(pkg.price)} · valid {pkg.reportValidityDays} days</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <div className="flex items-center gap-3">
                  <label htmlFor={`price-${pkg.id}`} className="sr-only">
                    Price for {pkg.name} in euros
                  </label>
                  <span className="text-steel-400">€</span>
                  <input
                    id={`price-${pkg.id}`}
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0.01"
                    value={draft}
                    onChange={(event) => {
                      setDrafts((current) => ({ ...current, [pkg.id]: event.target.value }));
                      setSavedId(null);
                    }}
                    aria-invalid={errors[pkg.id] ? true : undefined}
                    className="input-base w-32 py-2.5 font-mono text-sm"
                  />
                  <button
                    type="button"
                    disabled={!dirty}
                    onClick={() => handleSave(pkg.id, pkg.price)}
                    className={buttonStyles({ size: 'md' })}
                  >
                    Save
                  </button>
                </div>
                {errors[pkg.id] ? (
                  <p role="alert" className="text-sm text-rose-300">{errors[pkg.id]}</p>
                ) : savedId === pkg.id && !dirty ? (
                  <p role="status" className="text-sm text-emerald-300">Price updated.</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
