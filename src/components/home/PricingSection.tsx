import { useDemoStore } from '@/store/DemoStoreContext';
import { PackageCard } from '@/components/home/PackageCard';

export function PricingSection() {
  const { packages } = useDemoStore();

  return (
    <section id="packages" className="scroll-mt-24 border-t border-white/10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric-400">Report packages</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Choose the depth of check you need</h2>
          <p className="mt-4 text-steel-300">
            Every package is a one-time payment with no subscription. Prices include VAT and are shown in euros.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
