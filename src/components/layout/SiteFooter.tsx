import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';

const FOOTER_LINKS = [
  { label: 'Packages', to: '/#packages' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-md text-sm leading-relaxed text-steel-400">
              Independent vehicle history reports for buyers and sellers in the Netherlands. Every report is
              compiled and reviewed by our team before it is delivered to you.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3 md:justify-self-end">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.label} to={item.to} className="text-steel-300 transition-colors hover:text-electric-300">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-steel-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 VehicleScan24. All rights reserved.</p>
          <p>VehicleScan24 is an independent service and is not affiliated with the RDW or any vehicle manufacturer.</p>
        </div>
      </div>
    </footer>
  );
}
