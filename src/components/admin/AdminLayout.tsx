import { ClipboardList, LayoutDashboard, LogOut, Tag } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { useDemoStore } from '@/store/DemoStoreContext';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Orders', to: '/admin/orders', icon: ClipboardList, end: false },
  { label: 'Package prices', to: '/admin/pricing', icon: Tag, end: false },
];

function navClass({ isActive }: { isActive: boolean }) {
  return `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
    isActive ? 'bg-brand-500/15 text-ink-900' : 'text-ink-700 hover:bg-black/5 hover:text-ink-900'
  }`;
}

export function AdminLayout() {
  const { signOutAdmin } = useDemoStore();
  const navigate = useNavigate();

  function handleSignOut() {
    signOutAdmin();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-navy-950 text-ink-900 lg:flex">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-black/10 bg-white p-5 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Logo />
        <p className="mt-2 pl-1 text-xs uppercase tracking-[0.18em] text-ink-500">Admin</p>
        <nav aria-label="Admin" className="mt-10 flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-black/5 hover:text-ink-900"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-4 lg:hidden">
          <Logo />
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-black/5 hover:text-ink-900"
          >
            Sign out
          </button>
        </header>
        <nav aria-label="Admin mobile" className="flex gap-2 overflow-x-auto border-b border-black/10 px-5 py-3 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  isActive ? 'border-brand-500 bg-brand-500/15 text-ink-900' : 'border-black/10 text-ink-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-b border-brand-500/30 bg-brand-500/10 px-5 py-2 text-xs text-brand-800 lg:px-10">
          Demo admin area: all data is sample data and resets when the page is reloaded.
        </div>

        <main className="mx-auto max-w-6xl p-5 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
