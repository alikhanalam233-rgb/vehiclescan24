import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-ink-900 shadow-glow hover:bg-brand-400 active:bg-brand-600',
  secondary:
    'border border-black/15 bg-white text-ink-900 hover:border-brand-500 hover:bg-brand-50',
  ghost: 'text-ink-800 hover:bg-black/5 hover:text-ink-900',
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
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
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
