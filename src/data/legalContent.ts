export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocumentContent {
  title: string;
  eyebrow: string;
  updated: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocumentContent = {
  title: 'Privacy Policy',
  eyebrow: 'Legal',
  updated: 'Last updated: 14 November 2026',
  sections: [
    {
      heading: '1. Who we are',
      paragraphs: [
        'VehicleScan24 provides vehicle history reports for buyers and sellers in the Netherlands. The data controller is [Company legal name], registered at [address] with the Dutch Chamber of Commerce under number [KvK number]. Contact: support@vehiclescan24.nl.',
      ],
    },
    {
      heading: '2. What we collect',
      paragraphs: [
        'When you order a report as a guest we collect your email address and the VIN of the vehicle you want to check. Payment details are processed by PayPal and are not stored by VehicleScan24. Admin staff use secure accounts that are separate from customer data.',
      ],
    },
    {
      heading: '3. Why we use your data',
      paragraphs: [
        'We use your data to create and deliver your order, send order confirmations and secure report links, respond to your questions and meet our legal obligations, including accounting requirements.',
      ],
    },
    {
      heading: '4. Report access',
      paragraphs: [
        'Reports are delivered through a personal link sent to your email address. Links expire after a set period. Anyone with the link can view the report, so keep it private.',
      ],
    },
    {
      heading: '5. How long we keep data',
      paragraphs: [
        'Order and report records are kept for as long as needed to provide the service and to meet legal retention periods. You can ask us to delete data that we are not required to keep.',
      ],
    },
    {
      heading: '6. Your rights',
      paragraphs: [
        'Under the GDPR you have the right to access, correct, delete and restrict your personal data, and to object to processing or request data portability. To exercise these rights, email support@vehiclescan24.nl. You may also lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).',
      ],
    },
    {
      heading: '7. Security',
      paragraphs: [
        'We protect personal data with access controls, private file storage for reports and encrypted connections. Payment confirmations are verified server-side with PayPal before an order is marked as paid.',
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDocumentContent = {
  title: 'Terms & Conditions',
  eyebrow: 'Legal',
  updated: 'Last updated: 14 November 2026',
  sections: [
    {
      heading: '1. The service',
      paragraphs: [
        'VehicleScan24 compiles vehicle history reports based on records and information that we gather and review manually. Reports are provided for information only.',
      ],
    },
    {
      heading: '2. Orders and prices',
      paragraphs: [
        'Prices are shown in euros and include VAT. An order is confirmed once payment has been verified. Each package is a one-time purchase and does not renew automatically.',
      ],
    },
    {
      heading: '3. Delivery',
      paragraphs: [
        'Your report is delivered by email as a secure link. Delivery times depend on the chosen package and are estimates. The PDF download is yours to keep forever.',
      ],
    },
    {
      heading: '4. Accuracy and limits',
      paragraphs: [
        'We do our best to ensure that reports are accurate, but third-party records can be incomplete or out of date. A report does not replace a physical inspection and is not a guarantee of a vehicle\'s condition or value.',
      ],
    },
    {
      heading: '5. Refunds',
      paragraphs: [
        'Because reports are personalised digital products, the right of withdrawal does not apply once a report has been delivered. If we are unable to deliver your report, you are entitled to a full refund. [Refund policy to be confirmed by the business owner.]',
      ],
    },
    {
      heading: '6. Use of reports',
      paragraphs: [
        'Reports are for the personal use of the purchaser. You may not resell, publish or share a report publicly without our written consent.',
      ],
    },
    {
      heading: '7. Liability',
      paragraphs: [
        'To the extent permitted by law, VehicleScan24 is not liable for indirect damages or losses arising from decisions based on a report. Nothing in these terms limits liability that cannot be excluded under Dutch law.',
      ],
    },
    {
      heading: '8. Governing law',
      paragraphs: [
        'These terms are governed by Dutch law. Disputes will be submitted to the competent court in the Netherlands.',
      ],
    },
  ],
};
