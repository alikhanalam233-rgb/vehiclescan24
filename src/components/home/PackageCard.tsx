import { Award, CheckCircle2, Gem, Medal, ShieldCheck, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import type { PackageId, ReportPackage } from '@/types';

interface TierStyle {
  icon: LucideIcon;
  iconClass: string;
  bar: string;
}

const TIER_STYLES: Record<PackageId, TierStyle> = {
  silver: { icon: ShieldCheck, iconClass: 'text-ink-600', bar: 'from-ink-300 to-ink-500' },
  gold: { icon: Medal, iconClass: 'text-brand-700', bar: 'from-brand-300 to-brand-500' },
  platinum: { icon: Award, iconClass: 'text-brand-800', bar: 'from-brand-400 to-brand-600' },
  diamond: { icon: Gem, iconClass: 'text-ink-900', bar: 'from-ink-700 to-ink-900' },
};

export function PackageCard({ pkg }: { pkg: ReportPackage }) {
  const tier = TIER_STYLES[pkg.id];
  const Icon = tier.icon;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 ${
        pkg.highlight
          ? 'border-brand-500 shadow-glow'
          : 'border-black/10 hover:border-brand-500/60 hover:shadow-glow'
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tier.bar}`} aria-hidden="true" />

      {pkg.highlight && (
        <span className="absolute right-5 top-5 rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-900">
          Most popular
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-ink-50">
          <Icon className={`h-5 w-5 ${tier.iconClass}`} />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-ink-900">{pkg.name}</h3>
          <p className="text-sm text-ink-600">{pkg.tagline}</p>
        </div>
      </div>

      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold text-ink-900">{formatPrice(pkg.price)}</span>
        <span className="text-sm text-ink-600">per report</span>
      </p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-black/10 pt-6">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
            {feature}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-ink-500">Report link valid for {pkg.reportValidityDays} days after delivery.</p>

      <ButtonLink
        to={`/checkout?package=${pkg.id}`}
        variant={pkg.highlight ? 'primary' : 'secondary'}
        fullWidth
        className="mt-5"
      >
        Choose {pkg.name}
      </ButtonLink>
    </article>
  );
}
