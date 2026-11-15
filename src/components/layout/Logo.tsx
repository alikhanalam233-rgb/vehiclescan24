import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="VehicleScan24 home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-ink-900 shadow-glow transition-transform duration-300 group-hover:-rotate-6">
        <Car className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
        VehicleScan<span className="text-brand-600">24</span>
      </span>
    </Link>
  );
}
