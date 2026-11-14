import { SearchX } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';

interface NotFoundPanelProps {
  title: string;
  description: string;
}

export function NotFoundPanel({ title, description }: NotFoundPanelProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-navy-900 text-electric-300">
        <SearchX className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-steel-300">{description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Back to home</ButtonLink>
        <ButtonLink to="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}
