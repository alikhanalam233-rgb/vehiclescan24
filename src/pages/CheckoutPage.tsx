import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { PackageSelector } from '@/components/checkout/PackageSelector';
import { Field } from '@/components/ui/Field';
import { buttonStyles } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { normalizeVin, validateVin } from '@/lib/vin';
import { createCustomerOrder, OrderRequestError } from '@/lib/customerOrders';
import { useDemoStore } from '@/store/DemoStoreContext';
import type { PackageId } from '@/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  vin?: string;
  terms?: string;
  submit?: string;
}

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { packages } = useDemoStore();

  const requestedPackage = searchParams.get('package');
  const initialPackage = packages.find((pkg) => pkg.id === requestedPackage) ?? packages.find((pkg) => pkg.highlight) ?? packages[0];

  const [email, setEmail] = useState('');
  const [vin, setVin] = useState(normalizeVin(searchParams.get('vin') ?? ''));
  const [packageId, setPackageId] = useState<PackageId>(initialPackage.id);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedPackage = packages.find((pkg) => pkg.id === packageId) ?? initialPackage;

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email address for your report.';
    const vinProblem = validateVin(vin);
    if (vinProblem) next.vin = vinProblem;
    if (!acceptedTerms) next.terms = 'Please accept the Terms & Conditions and Privacy Policy to continue.';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const order = await createCustomerOrder({
        customerEmail: email.trim(),
        vin: normalizeVin(vin),
        packageId,
      });
      navigate(`/order/${order.reference}?t=${order.accessToken}`);
    } catch (error) {
      const message = error instanceof OrderRequestError ? error.message : 'Something went wrong. Please try again.';
      setErrors({ submit: message });
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">Guest checkout</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Order your vehicle report</h1>
        <p className="mt-3 text-ink-700">No account required. We only need your email address and the VIN.</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <form onSubmit={handleSubmit} noValidate className="space-y-10">
          <section className="surface-card space-y-6 p-6 sm:p-8">
            <h2 className="text-lg font-semibold">1. Vehicle</h2>
            <Field label="VIN" htmlFor="checkout-vin" error={errors.vin} hint="The 17-character Vehicle Identification Number.">
              <input
                id="checkout-vin"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                maxLength={20}
                value={vin}
                onChange={(event) => {
                  setVin(normalizeVin(event.target.value));
                  setErrors((current) => ({ ...current, vin: undefined }));
                }}
                placeholder="e.g. WVWZZZ1KZAW123456"
                aria-invalid={errors.vin ? true : undefined}
                className="input-base font-mono tracking-[0.12em]"
              />
            </Field>
          </section>

          <section className="surface-card space-y-6 p-6 sm:p-8">
            <h2 className="text-lg font-semibold">2. Package</h2>
            <PackageSelector packages={packages} value={packageId} onChange={setPackageId} />
          </section>

          <section className="surface-card space-y-6 p-6 sm:p-8">
            <h2 className="text-lg font-semibold">3. Delivery email</h2>
            <Field
              label="Email address"
              htmlFor="checkout-email"
              error={errors.email}
              hint="Your order confirmation and secure report link are sent here."
            >
              <input
                id="checkout-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((current) => ({ ...current, email: undefined }));
                }}
                aria-invalid={errors.email ? true : undefined}
                className="input-base"
              />
            </Field>

            <div className="space-y-2">
              <label className="flex items-start gap-3 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => {
                    setAcceptedTerms(event.target.checked);
                    setErrors((current) => ({ ...current, terms: undefined }));
                  }}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 rounded accent-brand-500 border-black/20 bg-white"
                />
                <span>
                  I accept the{' '}
                  <Link to="/terms" className="text-brand-700 underline-offset-4 hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and have read the{' '}
                  <Link to="/privacy" className="text-brand-700 underline-offset-4 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && (
                <p role="alert" className="text-sm text-rose-700">
                  {errors.terms}
                </p>
              )}
            </div>
          </section>

          {errors.submit && (
            <p role="alert" className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {errors.submit}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={buttonStyles({ size: 'lg', fullWidth: true })}
          >
            {submitting ? 'Creating your order...' : `Continue to payment: ${formatPrice(selectedPackage.price)}`}
          </button>
        </form>

        <OrderSummary pkg={selectedPackage} vin={vin} email={email} />
      </div>
    </div>
  );
}
