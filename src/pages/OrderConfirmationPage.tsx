import { useEffect, useState } from 'react';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { OrderProgress } from '@/components/order/OrderProgress';
import { PaymentPanel } from '@/components/order/PaymentPanel';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { NotFoundPanel } from '@/components/ui/NotFoundPanel';
import { fetchCustomerOrder, OrderRequestError, type CustomerOrder } from '@/lib/customerOrders';
import { formatDate, formatPrice } from '@/lib/format';
import { PAYMENT_STATUS_META, REPORT_STATUS_META } from '@/lib/statusLabels';
import { normalizeVin } from '@/lib/vin';

type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; order: CustomerOrder }
  | { status: 'not-found' }
  | { status: 'error'; message: string };

export function OrderConfirmationPage() {
  const { reference } = useParams();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('t') ?? '';
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    if (!reference || !accessToken) {
      setState({ status: 'not-found' });
      return;
    }
    let cancelled = false;
    setState({ status: 'loading' });
    fetchCustomerOrder(reference, accessToken)
      .then((order) => {
        if (!cancelled) setState({ status: 'ready', order });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof OrderRequestError && error.status === 404) {
          setState({ status: 'not-found' });
          return;
        }
        setState({ status: 'error', message: error instanceof Error ? error.message : 'Something went wrong.' });
      });
    return () => {
      cancelled = true;
    };
  }, [reference, accessToken]);

  if (state.status === 'loading') {
    return (
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-5 py-32 text-ink-700">
        <LoaderCircle className="h-5 w-5 animate-spin text-brand-700" />
        Loading your order...
      </div>
    );
  }

  if (state.status === 'not-found') {
    return (
      <NotFoundPanel
        title="We could not find that order"
        description="Check the link in your confirmation email or contact us and we will help you."
      />
    );
  }

  if (state.status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="text-2xl font-semibold">We could not load your order</h1>
        <p className="mt-4 text-ink-700">{state.message}</p>
        <p className="mt-2 text-ink-600">Refresh this page in a moment, or contact us if it keeps happening.</p>
      </div>
    );
  }

  const { order } = state;
  const isPaid = order.paymentStatus === 'paid';
  const paymentMeta = PAYMENT_STATUS_META[order.paymentStatus];
  const reportMeta = REPORT_STATUS_META[order.reportStatus];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="text-center animate-fade-up">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-500/60 bg-brand-100 text-brand-700">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <p className="mt-6 font-mono text-sm tracking-wider text-ink-600">Order {order.reference}</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Thank you, your order is in</h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-700">
          We have saved your order for <span className="text-ink-900">{order.customerEmail}</span>. Keep this page
          or your confirmation email to check progress.
        </p>
      </div>

      <div className="mt-12 surface-card p-6 sm:p-8">
        <OrderProgress paymentStatus={order.paymentStatus} reportStatus={order.reportStatus} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {isPaid ? (
            <section className="surface-card space-y-3 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Payment confirmed</h2>
              <p className="text-sm leading-relaxed text-ink-700">
                Thank you for your payment. Our team is now compiling your report. When it is ready, we will email you
                a secure link that is valid for {order.reportValidityDays} days.
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
              <dt className="text-ink-600">VIN</dt>
              <dd className="font-mono text-ink-900">{normalizeVin(order.vin)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-600">Package</dt>
              <dd className="text-ink-900">{order.packageName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-600">Total incl. VAT</dt>
              <dd className="text-ink-900">{formatPrice(order.amountCents / 100)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-600">Ordered</dt>
              <dd className="text-ink-900">{formatDate(order.createdAt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
              <dt className="text-ink-600">Payment</dt>
              <dd>
                <StatusBadge tone={paymentMeta.tone}>{paymentMeta.label}</StatusBadge>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-ink-600">Report</dt>
              <dd>
                <StatusBadge tone={reportMeta.tone}>{reportMeta.label}</StatusBadge>
              </dd>
            </div>
          </dl>
          <div className="flex flex-col gap-3 pt-2">
            <ButtonLink to="/#packages" variant="secondary" fullWidth>
              Back to packages
            </ButtonLink>
            <Link to="/contact" className="py-2 text-center text-sm text-ink-700 hover:text-ink-900">
              Need help with your order?
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
