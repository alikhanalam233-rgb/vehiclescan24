import { Download, Info } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FINDING_SEVERITY_META } from '@/lib/statusLabels';
import { formatDate, formatKm } from '@/lib/format';
import { normalizeVin } from '@/lib/vin';
import type { Order, ReportPackage } from '@/types';

interface ReportViewProps {
  order: Order;
  pkg: ReportPackage | undefined;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-ink-50 p-4">
      <dt className="text-xs uppercase tracking-wider text-ink-500">{label}</dt>
      <dd className="mt-1.5 text-base font-medium text-ink-900">{value || 'Not recorded'}</dd>
    </div>
  );
}

export function ReportView({ order, pkg }: ReportViewProps) {
  const { vehicle, findings, access } = order;
  const title = vehicle.make && vehicle.model ? `${vehicle.make} ${vehicle.model}` : 'Vehicle history report';

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-5 py-12 lg:px-8 lg:py-16">
      <header className="surface-card space-y-6 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-800">{pkg?.name ?? ''} report</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
            <p className="font-mono text-sm tracking-[0.12em] text-ink-700">{normalizeVin(order.vin)}</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <button
              type="button"
              disabled
              className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-xl border border-black/15 bg-black/5 px-5 text-sm font-medium text-ink-700"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <p className="max-w-xs text-xs text-ink-500 sm:text-right">
              PDF download is not connected in this preview. Final files will be served from private storage through
              a short-lived link.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-5 text-sm text-ink-700">
          <span>
            Published <span className="text-ink-900">{access ? formatDate(access.publishedAt) : '-'}</span>
          </span>
          <span>
            Reference <span className="font-mono text-ink-900">{order.reference}</span>
          </span>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vehicle details</h2>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem label="Make" value={vehicle.make} />
          <DetailItem label="Model" value={vehicle.model} />
          <DetailItem label="Build year" value={vehicle.buildYear ? String(vehicle.buildYear) : ''} />
          <DetailItem label="First registration" value={vehicle.firstRegistration ? formatDate(vehicle.firstRegistration) : ''} />
          <DetailItem label="Fuel type" value={vehicle.fuelType} />
          <DetailItem label="Colour" value={vehicle.colour} />
          <DetailItem label="Recorded mileage" value={formatKm(vehicle.mileageKm)} />
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Findings</h2>
        {findings.length === 0 ? (
          <p className="surface-card p-6 text-sm text-ink-700">No findings were recorded for this vehicle.</p>
        ) : (
          <ul className="space-y-3">
            {findings.map((finding) => {
              const meta = FINDING_SEVERITY_META[finding.severity];
              return (
                <li key={finding.id} className="surface-card flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-ink-900">{finding.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-700">{finding.details}</p>
                  </div>
                  <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <p className="flex items-start gap-3 rounded-xl border border-black/10 bg-ink-50 p-4 text-xs leading-relaxed text-ink-600">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-600" />
        This report is based on information available at the time of compilation. VehicleScan24 is an independent
        service and does not guarantee the completeness of third-party records.
      </p>
    </div>
  );
}
