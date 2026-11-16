import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'What is a VIN and where do I find it?',
    answer:
      'The Vehicle Identification Number is a unique 17-character code for every car. You will find it on the windscreen near the dashboard, on the driver side door frame, and in your vehicle registration document.',
  },
  {
    question: 'What does a vehicle history report include?',
    answer:
      'Depending on the package, a report can cover mileage consistency, written-off and total-loss status, stolen vehicle register checks, registration and ownership history, inspection history, finance encumbrances, insurance claims, damage records and open safety recalls.',
  },
  {
    question: 'How long does it take to receive my report?',
    answer:
      'Reports are compiled manually by our team. Delivery times depend on the package you choose; Diamond includes priority delivery. Once your report is ready, we email you a secure link.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. You check out as a guest with your email address and VIN. Your report is accessed through the secure link we send to your inbox.',
  },
  {
    question: 'Can I download my report as a PDF?',
    answer:
      'Yes. Every report can be viewed online and downloaded as a PDF from the secure report page.',
  },
  {
    question: 'How do I pay?',
    answer:
      'Payments are processed through PayPal. Your order is marked as paid only after the payment has been verified, so you will always see the correct status on your confirmation page.',
  },
  {
    question: 'Is a report a guarantee that a car is in good condition?',
    answer:
      'No. A report summarises the information available in the records we check. It does not replace a physical inspection, and we recommend a professional inspection before buying any vehicle.',
  },
];

export function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-800">Help centre</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Frequently asked questions</h1>
      <p className="mt-4 text-ink-700">Quick answers about VIN checks, reports, delivery and payment.</p>

      <div className="mt-12 space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group surface-card overflow-hidden border-brand-500/60 transition-colors duration-300"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-base font-medium text-ink-900 marker:hidden [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown className="h-5 w-5 flex-shrink-0 text-brand-800 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
