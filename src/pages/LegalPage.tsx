import type { LegalDocumentContent } from '@/data/legalContent';

export function LegalPage({ document }: { document: LegalDocumentContent }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric-400">{document.eyebrow}</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{document.title}</h1>
      <p className="mt-3 text-sm text-steel-500">{document.updated}</p>

      <div className="mt-12 space-y-10">
        {document.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-lg font-semibold text-white">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-steel-300">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
