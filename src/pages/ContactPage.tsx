import { useState, type FormEvent } from 'react';
import { Mail, Clock, Info } from 'lucide-react';
import { Field } from '@/components/ui/Field';
import { buttonStyles } from '@/components/ui/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', reference: '', message: '' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [previewNotice, setPreviewNotice] = useState(false);

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: ContactErrors = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid email address so we can reply.';
    if (values.message.trim().length < 10) next.message = 'Please describe your question in at least 10 characters.';
    setErrors(next);
    setPreviewNotice(Object.keys(next).length === 0);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">Contact</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">We are happy to help</h1>
        <p className="mt-4 text-ink-700">
          Questions about a VIN, an order or a report link? Send us a message and include your order reference if you
          have one.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          <div className="surface-card flex gap-4 p-6">
            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-700" />
            <div>
              <h2 className="font-semibold">Email</h2>
              <p className="mt-1 text-sm text-ink-700">support@vehiclescan24.nl</p>
            </div>
          </div>
          <div className="surface-card flex gap-4 p-6">
            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-700" />
            <div>
              <h2 className="font-semibold">Response time</h2>
              <p className="mt-1 text-sm text-ink-700">Monday to Friday, 09:00 to 17:00 CET. We reply within one business day.</p>
            </div>
          </div>
          <p className="flex gap-3 rounded-xl border border-black/10 bg-ink-50 p-4 text-xs leading-relaxed text-ink-600">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            Preview build: this form does not send messages yet. Email delivery is not connected.
          </p>
        </aside>

        <form onSubmit={handleSubmit} noValidate className="surface-card space-y-6 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Your name" htmlFor="contact-name" error={errors.name}>
              <input
                id="contact-name"
                autoComplete="name"
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                className="input-base"
              />
            </Field>
            <Field label="Email address" htmlFor="contact-email" error={errors.email}>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => update('email', event.target.value)}
                className="input-base"
              />
            </Field>
          </div>
          <Field label="Order reference (optional)" htmlFor="contact-reference" hint="For example VS24-10418.">
            <input
              id="contact-reference"
              value={values.reference}
              onChange={(event) => update('reference', event.target.value)}
              className="input-base font-mono"
            />
          </Field>
          <Field label="Message" htmlFor="contact-message" error={errors.message}>
            <textarea
              id="contact-message"
              rows={6}
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
              className="input-base resize-y"
            />
          </Field>
          {previewNotice && (
            <p role="status" className="rounded-xl border border-brand-500/50 bg-brand-100 px-4 py-3 text-sm text-ink-900">
              Your message is valid, but this preview cannot deliver it yet. Please email us at support@vehiclescan24.nl in the meantime.
            </p>
          )}
          <button type="submit" className={buttonStyles({ size: 'lg', fullWidth: true })}>
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
