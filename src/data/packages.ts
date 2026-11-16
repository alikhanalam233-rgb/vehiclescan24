import type { ReportPackage } from '@/types';

export const DEFAULT_PACKAGES: ReportPackage[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: 29,
    tagline: 'Essential checks with stolen vehicle screening.',
    reportValidityDays: 30,
    features: [
      'Mileage consistency check',
      'Written-off and total-loss status',
      'Basic VIN and specification check',
      'Online report view',
      'Stolen vehicle register check',
      'Registration and ownership history',
      'Online report and PDF download',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    tagline: 'Full history with financial and claim checks.',
    reportValidityDays: 30,
    features: [
      'Everything in Silver',
      'Finance and lease encumbrance check',
      'Insurance claim history',
      'Odometer history timeline',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 49.99,
    tagline: 'Inspection, import and damage history included.',
    reportValidityDays: 60,
    highlight: true,
    features: [
      'Everything in Gold',
      'Technical inspection (APK) history',
      'Import and export history',
      'Damage and repair record review',
    ],
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 59.99,
    tagline: 'Analyst-reviewed report with priority delivery.',
    reportValidityDays: 90,
    features: [
      'Everything in Platinum',
      'Analyst condition summary',
      'Open safety recall check',
      'Priority delivery within 12 hours',
    ],
  },
];
