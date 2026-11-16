import { useParams } from 'react-router-dom';
import { Clock, ShieldAlert } from 'lucide-react';
import { ReportView } from '@/components/report/ReportView';
import { NotFoundPanel } from '@/components/ui/NotFoundPanel';
import { formatDate } from '@/lib/format';
import { isLinkExpired } from '@/lib/orders';
import { useDemoStore } from '@/store/DemoStoreContext';

export function ReportPage() {
  const { token } = useParams();
  const { getOrderByAccessToken, packages } = useDemoStore();
  const order = token ? getOrderByAccessToken(token) : undefined;

  if (!order || !order.access || order.reportStatus !== 'published') {
    return (
      <NotFoundPanel
        title="This report link is not valid"
        description="Check that you opened the full link from your email. If you need help, contact us and we will send a new link."
      />
    );
  }

  if (isLinkExpired(order.access.expiresAt)) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-600/40 bg-amber-50 text-amber-700">
          <Clock className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold">This report link is no longer active</h1>
        <p className="mt-4 text-ink-700">
          The link for order {order.reference} is no longer active. Contact us to request a new link.
        </p>
      </div>
    );
  }

  const pkg = packages.find((item) => item.id === order.packageId);

  return (
    <>
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 pt-8 text-sm text-ink-600 lg:px-8">
        <ShieldAlert className="h-4 w-4 text-brand-700" />
        Secure report link.
      </div>
      <ReportView order={order} pkg={pkg} />
    </>
  );
}
