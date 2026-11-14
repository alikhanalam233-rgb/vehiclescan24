import { ButtonLink } from '@/components/ui/Button';

const MECHANIC_IMAGE = 'https://images.pexels.com/photos/8985452/pexels-photo-8985452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function FinalCta() {
  return (
    <section className="px-5 py-20 lg:px-8 lg:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10">
        <img src={MECHANIC_IMAGE} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" aria-hidden="true" />
        <div className="relative flex flex-col items-start gap-8 px-6 py-14 sm:px-12 md:flex-row md:items-center md:justify-between lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">Buying a used car? Check it first.</h2>
            <p className="mt-4 text-steel-300">
              A few minutes and a small one-time fee can save you from costly surprises after the sale.
            </p>
          </div>
          <ButtonLink to="/#vin-search" size="lg">
            Check a VIN now
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
