import { Outlet } from 'react-router-dom';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      <div className="border-b border-electric-500/20 bg-electric-500/10 px-5 py-2 text-center text-xs text-electric-200">
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
