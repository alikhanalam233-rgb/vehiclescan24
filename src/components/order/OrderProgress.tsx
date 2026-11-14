import { Check, CircleDot } from 'lucide-react';
import type { Order } from '@/types';

interface Step {
  label: string;
  done: boolean;
}

export function OrderProgress({ order }: { order: Order }) {
  const steps: Step[] = [
    { label: 'Order placed', done: true },
    { label: 'Payment verified', done: order.paymentStatus === 'paid' },
    { label: 'Report prepared', done: order.reportStatus === 'completed' || order.reportStatus === 'published' },
    { label: 'Report delivered', done: order.reportStatus === 'published' },
  ];
  const currentIndex = steps.findIndex((step) => !step.done);

  return (
    <ol className="grid gap-4 sm:grid-cols-4">
      {steps.map((step, index) => {
        const isCurrent = index === currentIndex;
        return (
          <li key={step.label} className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                step.done
                  ? 'border-electric-400 bg-electric-500 text-white'
                  : isCurrent
                    ? 'border-electric-400 text-electric-300'
                    : 'border-white/15 text-steel-500'
              }`}
            >
              {step.done ? <Check className="h-4 w-4" strokeWidth={3} /> : isCurrent ? <CircleDot className="h-4 w-4" /> : index + 1}
            </span>
            <span className={`text-sm ${step.done || isCurrent ? 'text-white' : 'text-steel-500'}`}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
