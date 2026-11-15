import { ShieldCheck, FileText, Lock } from 'lucide-react';
import { VinSearchForm } from '@/components/home/VinSearchForm';
import { ReportPreviewCard } from '@/components/home/ReportPreviewCard';

const HERO_IMAGE = 'https://images.pexels.com/photos/27968215/pexels-photo-27968215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: 'Analyst-reviewed' },
  { icon: FileText, label: 'Instant PDF download' },
  { icon: Lock, label: 'Secure report link' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-brand-600/20 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div className="space-y-8 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/50 bg-brand-500/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-brand-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_#FFC800]" />
            VEHICLE HISTORY
          </span>

          <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
            Know the full story of a car <span className="text-gradient-electric">before you buy.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
            VehicleScan24 compiles a detailed history report for any vehicle, covering mileage, ownership,
            registration, damage and more. Enter the VIN and receive a clear, reviewed report.
          </p>

          <div id="vin-search" className="scroll-mt-28 max-w-xl">
            <VinSearchForm />
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm text-ink-700">
                <item.icon className="h-4 w-4 text-brand-800" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-black/10 shadow-card">
            <img
              src={HERO_IMAGE}
              alt="Black performance car in a dimly lit garage"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 animate-scan-line bg-gradient-to-b from-transparent via-brand-400/40 to-transparent" />
          </div>
          <div className="absolute -bottom-8 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto">
            <ReportPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
