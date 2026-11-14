import { Award, CheckCircle2, Crown, Gem, Medal, ShieldCheck, Star, type LucideIcon } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import type { PackageId, ReportPackage } from '@/types';

interface TierStyle {
  icon: LucideIcon;
  iconClass: string;
  bar: string;
}

const TIER_STYLES: Record<PackageId, TierStyle> = {
  silver: { icon: ShieldCheck, iconClass: 'text-steel-200', bar: 'from-steel-300 to-steel-500' },
  platinum: { icon: Award, iconClass: 'text-white', bar: 'from-white to-steel-400' },
  gold: { icon: Medal, iconClass: 'text-amber-300', bar: 'from-amber-200 to-amber-600' },
  premium: { icon: Star, iconClass: 'text-electric-300', bar: 'from-electric-200 to-electric-600' },
  diamond: { icon: Gem, iconClass: 'text-sky-200', bar: 'from-sky-200 to-sky-500' },
  'black-diamond': { icon: Crown, iconClass: 'text-white', bar: 'from-steel-600 via-steel-300 to-steel-700' },
};

export function PackageCard({ pkg }: { pkg: ReportPackage }) {
  const tier = TIER_STYLES[pkg.id];
  const Icon = tier.icon;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-navy-900/60 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 ${
        pkg.highlight
          ? 'border-electric-400/50 shadow-glow'
          : 'border-white/10 hover:border-electric-400/35 hover:shadow-glow'
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tier.bar}`} aria-hidden="true" />

      {pkg.highlight && (
        <span className="absolute right-5 top-5 rounded-full bg-electric-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          Most popular
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-navy-950">
          <Icon className={`h-5 w-5 ${tier.iconClass}`} />
        </span>
        <div>
          <h3 className="text-xl font-semibold">{pkg.name}</h3>
          <p className="text-sm text-steel-400">{pkg.tagline}</p>
        </div>
      </div>

      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold text-white">{formatPrice(pkg.price)}</span>
        <span className="text-sm text-steel-400">per report</span>
      </p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-steel-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-400" />
            {feature}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-steel-500">Report link valid for {pkg.reportValidityDays} days after delivery.</p>

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
