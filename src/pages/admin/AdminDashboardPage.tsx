import { CheckCircle2, CreditCard, FileCheck, FileClock, ShoppingCart, ArrowRight, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PAYMENT_STATUS_META, REPORT_STATUS_META } from '@/lib/statusLabels';
import { formatDate, formatPrice } from '@/lib/format';
import { useDemoStore } from '@/store/DemoStoreContext';

function StatCard({ label, value, icon: Icon, hint }: { label: string; value: number; icon: LucideIcon; hint: string }) {
  return (
    <div className="surface-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-400/35">
      <div className="flex items-center justify-between">
        <p className="text-sm text-steel-400">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-electric-500/10 text-electric-300">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-steel-500">{hint}</p>
    </div>
  );
}

export function AdminDashboardPage() {
  const { orders, packages } = useDemoStore();

  const totalOrders = orders.length;
  const paidOrders = orders.filter((order) => order.paymentStatus === 'paid').length;
  const pendingReports = orders.filter((order) => order.reportStatus === 'pending' || order.reportStatus === 'in_progress').length;
  const completedReports = orders.filter((order) => order.reportStatus === 'completed' || order.reportStatus === 'published').length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Dashboard</h1>
        <p className="mt-2 text-sm text-steel-400">An overview of orders and report progress.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value={totalOrders} icon={ShoppingCart} hint="All orders placed" />
        <StatCard label="Paid orders" value={paidOrders} icon={CreditCard} hint="Payment verified" />
        <StatCard label="Pending reports" value={pendingReports} icon={FileClock} hint="Not yet completed" />
        <StatCard label="Completed reports" value={completedReports} icon={FileCheck} hint="Ready or published" />
      </div>

      <section className="surface-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold">Recent orders</h2>
          <Link to="/admin/orders" className="inline-flex items-center gap-1.5 text-sm text-electric-300 hover:text-electric-200">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="divide-y divide-white/10">
          {recentOrders.map((order) => {
            const pkg = packages.find((item) => item.id === order.packageId);
            const payment = PAYMENT_STATUS_META[order.paymentStatus];
            const report = REPORT_STATUS_META[order.reportStatus];
            return (
              <li key={order.reference}>
                <Link
                  to={`/admin/orders/${order.reference}`}
                  className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-sm text-white">{order.reference}</p>
                    <p className="truncate text-sm text-steel-400">
                      {order.customerEmail} · {pkg?.name} · {formatPrice(order.amount)} · {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge tone={payment.tone}>{payment.label}</StatusBadge>
                    <StatusBadge tone={report.tone}>{report.label}</StatusBadge>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="flex items-center gap-2 text-xs text-steel-500">
        <CheckCircle2 className="h-4 w-4 text-electric-400" />
        Payment status changes only after PayPal payments are verified on the server.
      </p>
    </div>
  );
}
