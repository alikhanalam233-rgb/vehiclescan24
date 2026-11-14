import { CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { OrderProgress } from '@/components/order/OrderProgress';
import { PaymentPanel } from '@/components/order/PaymentPanel';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate, formatPrice } from '@/lib/format';
import { normalizeVin } from '@/lib/vin';
import { PAYMENT_STATUS_META, REPORT_STATUS_META } from '@/lib/statusLabels';
import { useDemoStore } from '@/store/DemoStoreContext';
import { NotFoundPanel } from '@/components/ui/NotFoundPanel';

export function OrderConfirmationPage() {
  const { reference } = useParams();
  const { getOrder, packages } = useDemoStore();
  const order = reference ? getOrder(reference) : undefined;

  if (!order) {
    return (
      <NotFoundPanel
        title="We could not find that order"
        description="Check the reference in your confirmation email or contact us and we will help you."
      />
    );
  }

  const pkg = packages.find((item) => item.id === order.packageId);
  const isPaid = order.paymentStatus === 'paid';
  const paymentMeta = PAYMENT_STATUS_META[order.paymentStatus];
  const reportMeta = REPORT_STATUS_META[order.reportStatus];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="text-center animate-fade-up">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-electric-400/40 bg-electric-500/10 text-electric-300">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <p className="mt-6 font-mono text-sm tracking-wider text-steel-400">Order {order.reference}</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Thank you, your order is in</h1>
        <p className="mx-auto mt-4 max-w-xl text-steel-300">
          We have sent the order details to <span className="text-white">{order.customerEmail}</span>. Keep this
          page or your confirmation email to check progress.
        </p>
      </div>

      <div className="mt-12 surface-card p-6 sm:p-8">
        <OrderProgress order={order} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {isPaid ? (
            <section className="surface-card space-y-3 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Payment confirmed</h2>
              <p className="text-sm leading-relaxed text-steel-300">
                Thank you for your payment. Our team is now compiling your report. When it is ready, we will email you
                a secure link that is valid for {pkg?.reportValidityDays ?? 30} days.
              </p>
            </section>
          ) : (
            <PaymentPanel />
          )}
        </div>

        <section className="surface-card space-y-5 p-6">
          <h2 className="text-lg font-semibold">Order details</h2>
          <dl className="space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-steel-400">VIN</dt>
              <dd className="font-mono text-steel-100">{normalizeVin(order.vin)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-steel-400">Package</dt>
              <dd className="text-steel-100">{pkg?.name ?? 'Unknown'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-steel-400">Total incl. VAT</dt>
              <dd className="text-steel-100">{formatPrice(order.amount)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-steel-400">Ordered</dt>
              <dd className="text-steel-100">{formatDate(order.createdAt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
              <dt className="text-steel-400">Payment</dt>
              <dd>
                <StatusBadge tone={paymentMeta.tone}>{paymentMeta.label}</StatusBadge>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-steel-400">Report</dt>
              <dd>
                <StatusBadge tone={reportMeta.tone}>{reportMeta.label}</StatusBadge>
              </dd>
            </div>
          </dl>
          <div className="flex flex-col gap-3 pt-2">
            <ButtonLink to="/#packages" variant="secondary" fullWidth>
              Back to packages
            </ButtonLink>
            <Link to="/contact" className="py-2 text-center text-sm text-steel-300 hover:text-white">
              Need help with your order?
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
