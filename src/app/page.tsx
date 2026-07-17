import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/ui/organisms/HeroSection/HeroSection';
import LegacySection from '@/components/ui/organisms/LegacySection/LegacySection';

const ModelShowcaseSection = dynamic(
  () => import('@/components/ui/organisms/ModelShowcaseSection/ModelShowcaseSection'),
);
const ManufacturingSection = dynamic(
  () => import('@/components/ui/organisms/ManufacturingSection/ManufacturingSection'),
);
const CraftsmanshipSection = dynamic(
  () => import('@/components/ui/organisms/CraftsmanshipSection/CraftsmanshipSection'),
);
const ModernWomanSection = dynamic(
  () => import('@/components/ui/organisms/ModernWomanSection/ModernWomanSection'),
);
const ExhibitionsSection = dynamic(
  () => import('@/components/ui/organisms/ExhibitionsSection/ExhibitionsSection'),
);
const RetailerSlider = dynamic(
  () => import('@/components/ui/organisms/RetailerSlider/RetailerSlider'),
);
const InstagramSection = dynamic(
  () => import('@/components/ui/organisms/InstagramSection/InstagramSection'),
);
const TrustedBrandsSection = dynamic(
  () => import('@/components/ui/organisms/TrustedBrandsSection/TrustedBrandsSection'),
);

export const metadata: Metadata = {
  title: 'ZAR Jewels | Premium Gold Bangles & Jewellery Manufacturer',
  description: "Discover ZAR Jewels, India's trusted gold bangle manufacturer with 60+ years of craftsmanship. Explore premium gold jewellery, innovative designs & timeless elegance.",
  openGraph: {
    images: ['https://zar-one.vercel.app/images/zar-logo.svg'],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <LegacySection />
      <ModelShowcaseSection />
      <ManufacturingSection />
      <CraftsmanshipSection />
      <ModernWomanSection />
      <ExhibitionsSection />
      <RetailerSlider />
      <InstagramSection />
      <TrustedBrandsSection />
    </>
  );
}
