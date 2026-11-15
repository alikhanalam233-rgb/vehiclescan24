import { CreditCard, FileSearch, Mail, Search } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Enter your VIN',
    description: 'Type the 17-character number from your windscreen or registration document.',
  },
  {
    icon: CreditCard,
    title: 'Choose and pay',
    description: 'Pick a package and pay securely. No account needed, just your email address.',
  },
  {
    icon: FileSearch,
    title: 'We research and review',
    description: 'Our team compiles the history, checks the findings and prepares your report.',
  },
  {
    icon: Mail,
    title: 'Receive your report',
    description: 'Get a secure link by email to view online or download the PDF.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-black/10 bg-ink-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-800">How it works</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">From VIN to verified report in four steps</h2>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group relative rounded-2xl border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-brand-500/60"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-800 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-ink-900">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-sm text-ink-500">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
