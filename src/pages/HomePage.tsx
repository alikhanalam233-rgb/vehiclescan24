import { Hero } from '@/components/home/Hero';
import { PricingSection } from '@/components/home/PricingSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FinalCta } from '@/components/home/FinalCta';

export function HomePage() {
  return (
    <>
      <Hero />
      <PricingSection />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
