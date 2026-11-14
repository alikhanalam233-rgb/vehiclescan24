import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PAYMENT_STATUS_META, REPORT_STATUS_META } from '@/lib/statusLabels';
import { formatDate, formatPrice } from '@/lib/format';
import { useDemoStore } from '@/store/DemoStoreContext';
import type { PaymentStatus, ReportStatus } from '@/types';

export function AdminOrdersPage() {
  const { orders, packages } = useDemoStore();
  const [query, setQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | 'all'>('all');
  const [reportFilter, setReportFilter] = useState<ReportStatus | 'all'>('all');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesTerm =
        term === '' ||
        order.reference.toLowerCase().includes(term) ||
        order.customerEmail.toLowerCase().includes(term) ||
        order.vin.toLowerCase().includes(term);
      const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
      const matchesReport = reportFilter === 'all' || order.reportStatus === reportFilter;
      return matchesTerm && matchesPayment && matchesReport;
    });
  }, [orders, query, paymentFilter, reportFilter]);

  const selectClass = 'input-base w-auto py-2.5 text-sm';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Orders</h1>
        <p className="mt-2 text-sm text-steel-400">Search by reference, email or VIN, and filter by status.</p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
          <input
            type="search"
            aria-label="Search orders"
            placeholder="Search reference, email or VIN"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="input-base py-2.5 pl-11 text-sm"
          />
        </div>
        <select
          aria-label="Filter by payment status"
          value={paymentFilter}
          onChange={(event) => setPaymentFilter(event.target.value as PaymentStatus | 'all')}
          className={selectClass}
        >
          <option value="all">All payments</option>
          <option value="awaiting_payment">Awaiting payment</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
        <select
          aria-label="Filter by report status"
          value={reportFilter}
          onChange={(event) => setReportFilter(event.target.value as ReportStatus | 'all')}
          className={selectClass}
        >
          <option value="all">All reports</option>
          <option value="pending">Not started</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Ready to publish</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-steel-500">
            <tr>
              <th className="px-5 py-4 font-medium">Reference</th>
              <th className="px-5 py-4 font-medium">Customer</th>
              <th className="px-5 py-4 font-medium">VIN</th>
              <th className="px-5 py-4 font-medium">Package</th>
              <th className="px-5 py-4 font-medium">Payment</th>
              <th className="px-5 py-4 font-medium">Report</th>
              <th className="px-5 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((order) => {
              const pkg = packages.find((item) => item.id === order.packageId);
              const payment = PAYMENT_STATUS_META[order.paymentStatus];
              const report = REPORT_STATUS_META[order.reportStatus];
              return (
                <tr key={order.reference} className="transition-colors hover:bg-white/5">
                  <td className="px-5 py-4">
                    <Link to={`/admin/orders/${order.reference}`} className="font-mono text-electric-300 hover:text-electric-200">
                      {order.reference}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-steel-200">{order.customerEmail}</td>
                  <td className="px-5 py-4 font-mono text-xs text-steel-300">{order.vin}</td>
                  <td className="px-5 py-4 text-steel-200">
                    {pkg?.name} <span className="text-steel-500">· {formatPrice(order.amount)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={payment.tone}>{payment.label}</StatusBadge>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={report.tone}>{report.label}</StatusBadge>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-steel-400">{formatDate(order.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="px-5 py-10 text-center text-sm text-steel-400">No orders match these filters.</p>}
      </div>
    </div>
  );
}
