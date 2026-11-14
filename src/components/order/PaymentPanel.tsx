import { Lock, ShieldCheck } from 'lucide-react';

export function PaymentPanel() {
  return (
    <section className="surface-card space-y-6 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-300">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Complete your payment</h2>
          <p className="mt-2 text-sm leading-relaxed text-steel-300">
            Payment is handled by PayPal. Your order is marked as paid only after our server has verified the
            transaction directly with PayPal, never based on your browser.
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled
        className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 text-sm font-medium text-steel-300"
      >
        <Lock className="h-4 w-4" />
        PayPal checkout is not connected yet
      </button>

      <p className="text-xs leading-relaxed text-steel-500">
        This preview does not take real payments. Once PayPal Business is connected, this button will open the
        secure PayPal checkout for this order.
      </p>
    </section>
  );
}
