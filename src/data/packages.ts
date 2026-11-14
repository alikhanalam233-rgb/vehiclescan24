import type { ReportPackage } from '@/types';

export const DEFAULT_PACKAGES: ReportPackage[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: 19.99,
    tagline: 'Essential checks for a quick first look.',
    reportValidityDays: 30,
    features: [
      'Mileage consistency check',
      'Written-off and total-loss status',
      'Stolen vehicle register check',
      'Online report and PDF download',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 29.99,
    tagline: 'Registration and inspection history included.',
    reportValidityDays: 30,
    features: [
      'Everything in Silver',
      'Registration and ownership history',
      'Import and export history',
      'Technical inspection (APK) history',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    tagline: 'Full history with financial and claim checks.',
    reportValidityDays: 30,
    features: [
      'Everything in Platinum',
      'Finance and lease encumbrance check',
      'Insurance claim history',
      'Odometer history timeline',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49.99,
    tagline: 'Damage and recall analysis for confident buying.',
    reportValidityDays: 60,
    highlight: true,
    features: [
      'Everything in Gold',
      'Damage and repair record review',
      'Open safety recall check',
      'Owner count analysis',
    ],
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 59.99,
    tagline: 'Expert condition summary from our analysts.',
    reportValidityDays: 90,
    features: [
      'Everything in Premium',
      'Analyst condition summary',
      'Priority delivery within 12 hours',
      'Email support on your report',
    ],
  },
  {
    id: 'black-diamond',
    name: 'Black Diamond',
    price: 69.99,
    tagline: 'The most complete dossier we produce.',
    reportValidityDays: 365,
    features: [
      'Everything in Diamond',
      'Personal analyst consultation by phone',
      'Priority delivery within 4 hours',
      'Report link valid for 12 months',
    ],
  },
];
