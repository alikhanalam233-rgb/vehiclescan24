import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="VehicleScan24 home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric-500 text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6">
        <Car className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className={`font-display text-lg font-semibold tracking-tight ${tone === 'light' ? 'text-white' : 'text-navy-900'}`}>
        VehicleScan<span className="text-electric-400">24</span>
      </span>
    </Link>
  );
}
