import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-electric-500 text-white shadow-glow hover:bg-electric-400 active:bg-electric-600',
  secondary:
    'border border-white/15 bg-white/5 text-white hover:border-electric-400/60 hover:bg-white/10',
  ghost: 'text-steel-200 hover:bg-white/5 hover:text-white',
};

const SIZE_CLASSES: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

interface ButtonStyleOptions {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export function buttonStyles({ variant = 'primary', size = 'md', fullWidth = false }: ButtonStyleOptions = {}): string {
  return [
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight',
    'transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0',
    'disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
  ].join(' ');
}

interface ButtonLinkProps {
  to: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({ to, variant, size, fullWidth, children, className = '' }: ButtonLinkProps) {
  return (
    <Link to={to} className={`${buttonStyles({ variant, size, fullWidth })} ${className}`}>
      {children}
    </Link>
  );
}
