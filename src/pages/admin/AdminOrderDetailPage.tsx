import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FindingsEditor } from '@/components/admin/FindingsEditor';
import { ReportDeliveryPanel } from '@/components/admin/ReportDeliveryPanel';
import { VehicleForm } from '@/components/admin/VehicleForm';
import { NotFoundPanel } from '@/components/ui/NotFoundPanel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDateTime, formatPrice } from '@/lib/format';
import { normalizeVin } from '@/lib/vin';
import { EMAIL_LABELS, PAYMENT_STATUS_META, REPORT_STATUS_META } from '@/lib/statusLabels';
import { useDemoStore } from '@/store/DemoStoreContext';
import type { Order } from '@/types';

type TabId = 'overview' | 'vehicle' | 'report';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'vehicle', label: 'Vehicle & findings' },
  { id: 'report', label: 'Report & delivery' },
];

function OverviewTab({ order }: { order: Order }) {
  const { packages } = useDemoStore();
  const pkg = packages.find((item) => item.id === order.packageId);
  const payment = PAYMENT_STATUS_META[order.paymentStatus];
  const report = REPORT_STATUS_META[order.reportStatus];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="surface-card space-y-5 p-6">
        <h2 className="font-semibold">Customer and order</h2>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-steel-500">Email</dt>
            <dd className="mt-1 break-all text-white">{order.customerEmail}</dd>
          </div>
          <div>
            <dt className="text-steel-500">VIN</dt>
            <dd className="mt-1 font-mono text-white">{normalizeVin(order.vin)}</dd>
          </div>
          <div>
            <dt className="text-steel-500">Package</dt>
            <dd className="mt-1 text-white">{pkg?.name ?? 'Unknown'}</dd>
          </div>
          <div>
            <dt className="text-steel-500">Amount incl. VAT</dt>
            <dd className="mt-1 text-white">{formatPrice(order.amount)}</dd>
          </div>
          <div>
            <dt className="text-steel-500">Ordered</dt>
            <dd className="mt-1 text-white">{formatDateTime(order.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-steel-500">Payment status</dt>
            <dd className="mt-1">
              <StatusBadge tone={payment.tone}>{payment.label}</StatusBadge>
            </dd>
          </div>
        </dl>
        <p className="rounded-xl border border-white/10 bg-navy-950/60 p-4 text-xs leading-relaxed text-steel-400">
          Payment status is set only when PayPal confirms the payment on the server. It cannot be changed here.
        </p>
      </section>

      <section className="surface-card space-y-5 p-6">
        <h2 className="font-semibold">Report</h2>
        <StatusBadge tone={report.tone}>{report.label}</StatusBadge>
        <h3 className="pt-2 text-sm font-medium text-steel-300">Email history</h3>
        {order.emails.length === 0 ? (
          <p className="text-sm text-steel-500">No emails sent yet.</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {order.emails.map((entry) => (
              <li key={`${entry.type}-${entry.sentAt}`} className="flex justify-between gap-4">
                <span className="text-steel-200">{EMAIL_LABELS[entry.type]}</span>
                <span className="text-steel-500">{formatDateTime(entry.sentAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export function AdminOrderDetailPage() {
  const { reference } = useParams();
  const { getOrder } = useDemoStore();
  const [tab, setTab] = useState<TabId>('overview');
  const order = reference ? getOrder(reference) : undefined;

  if (!order) {
    return <NotFoundPanel title="Order not found" description="This order does not exist in the current demo data." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/admin/orders" className="inline-flex items-center gap-2 text-sm text-steel-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          All orders
        </Link>
        <h1 className="mt-4 font-mono text-2xl font-semibold sm:text-3xl">{order.reference}</h1>
        <p className="mt-2 text-sm text-steel-400">{order.customerEmail}</p>
      </div>

      <div role="tablist" aria-label="Order sections" className="flex gap-1 overflow-x-auto border-b border-white/10">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === item.id ? 'border-electric-400 text-white' : 'border-transparent text-steel-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && <OverviewTab order={order} />}
      {tab === 'vehicle' && (
        <div className="grid gap-8 xl:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <h2 className="font-semibold">Vehicle information</h2>
            <VehicleForm key={`vehicle-${order.reference}`} order={order} />
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold">Findings</h2>
            <FindingsEditor key={`findings-${order.reference}`} order={order} />
          </div>
        </div>
      )}
      {tab === 'report' && <ReportDeliveryPanel order={order} />}
    </div>
  );
}
