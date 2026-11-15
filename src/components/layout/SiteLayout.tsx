import { Outlet } from 'react-router-dom';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="border-b border-brand-500/30 bg-brand-100 px-5 py-2 text-center text-xs text-ink-800">
        Preview build: demo data only. Live payments and report delivery are not connected yet.
      </div>
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
