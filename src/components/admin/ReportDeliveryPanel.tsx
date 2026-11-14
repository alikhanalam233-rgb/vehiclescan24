import { useState, type ChangeEvent } from 'react';
import { Copy, FileUp, Mail, Send } from 'lucide-react';
import { buttonStyles } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/format';
import { REPORT_STATUS_META } from '@/lib/statusLabels';
import { useDemoStore } from '@/store/DemoStoreContext';
import type { Order } from '@/types';

const MAX_PDF_BYTES = 25 * 1024 * 1024;

export function ReportDeliveryPanel({ order }: { order: Order }) {
  const { updateOrder, publishReport, getOrder } = useDemoStore();
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const current = getOrder(order.reference) ?? order;
  const reportMeta = REPORT_STATUS_META[current.reportStatus];
  const publishedLink = current.access ? `${window.location.origin}/report/${current.access.token}` : null;

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setMessage('Only PDF files can be uploaded as reports.');
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setMessage('The PDF is larger than 25 MB. Please compress it and try again.');
      return;
    }
    updateOrder(current.reference, {
      reportFile: { name: file.name, sizeKb: Math.round(file.size / 1024), uploadedAt: new Date().toISOString() },
      reportStatus: current.reportStatus === 'published' ? 'published' : 'completed',
    });
    setMessage('Report recorded. In this preview only the file name is kept; finished PDFs will be stored privately.');
  }

  function startReport() {
    updateOrder(current.reference, { reportStatus: 'in_progress' });
    setMessage('Report marked as in progress.');
  }

  function handlePublish() {
    if (!window.confirm('Publish this report? The customer will receive access through a secure link.')) return;
    publishReport(current.reference);
    setMessage('Report published. Share the secure link below or send the customer email.');
  }

  async function copyLink() {
    if (!publishedLink) return;
    try {
      await navigator.clipboard.writeText(publishedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setMessage('Copy failed. Select the link and copy it manually.');
    }
  }

  return (
    <div className="space-y-6">
      <section className="surface-card space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Report status</h2>
            <p className="mt-1 text-sm text-steel-400">Work through the steps in order: start, upload, publish.</p>
          </div>
          <StatusBadge tone={reportMeta.tone}>{reportMeta.label}</StatusBadge>
        </div>

        <div className="flex flex-wrap gap-3">
          {current.reportStatus === 'pending' && (
            <button type="button" onClick={startReport} className={buttonStyles({ variant: 'secondary' })}>
              Mark as in progress
            </button>
          )}
          <label
            className={`${buttonStyles({ variant: 'secondary' })} cursor-pointer`}
          >
            <FileUp className="h-4 w-4" />
            {current.reportFile ? 'Replace PDF' : 'Upload finished PDF'}
            <input type="file" accept="application/pdf" onChange={handleUpload} className="sr-only" />
          </label>
        </div>

        {current.reportFile && (
          <p className="text-sm text-steel-300">
            Current file: <span className="text-white">{current.reportFile.name}</span> ({current.reportFile.sizeKb} KB,
            uploaded {formatDate(current.reportFile.uploadedAt)})
          </p>
        )}
      </section>

      <section className="surface-card space-y-5 p-6">
        <div>
          <h2 className="font-semibold">Publish to customer</h2>
          <p className="mt-1 text-sm text-steel-400">
            Publishing creates a secure link that expires after the period set for the package.
          </p>
        </div>

        {current.reportStatus === 'published' && publishedLink ? (
          <div className="space-y-3">
            <p className="break-all rounded-xl border border-white/10 bg-navy-950/70 p-4 font-mono text-xs text-steel-200">
              {publishedLink}
            </p>
            <p className="text-xs text-steel-500">Expires {current.access ? formatDate(current.access.expiresAt) : '-'}</p>
            <button type="button" onClick={copyLink} className={buttonStyles({ variant: 'secondary' })}>
              <Copy className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handlePublish}
            disabled={!current.reportFile}
            className={buttonStyles()}
          >
            <Send className="h-4 w-4" />
            Publish report
          </button>
        )}
        {!current.reportFile && current.reportStatus !== 'published' && (
          <p className="text-xs text-steel-500">Upload the finished PDF before publishing.</p>
        )}
      </section>

      <section className="surface-card space-y-4 p-6">
        <div>
          <h2 className="font-semibold">Customer email</h2>
          <p className="mt-1 text-sm text-steel-400">Send the report-ready notification to {current.customerEmail}.</p>
        </div>
        <button
          type="button"
          disabled={current.reportStatus !== 'published'}
          onClick={() => setMessage('Email delivery is not connected in this preview, so nothing was sent to the customer.')}
          className={buttonStyles({ variant: 'secondary' })}
        >
          <Mail className="h-4 w-4" />
          Send report-ready email
        </button>
      </section>

      {message && (
        <p role="status" className="rounded-xl border border-electric-400/30 bg-electric-500/10 px-4 py-3 text-sm text-electric-100">
          {message}
        </p>
      )}
    </div>
  );
}
