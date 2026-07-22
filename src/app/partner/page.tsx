import PageHeader from '@/components/ui/PageHeader/PageHeader';
import Image from 'next/image';
import { imagePath } from '@/lib/imagePath';
import PartnerForm from './PartnerForm';
import DistributorTestimonials from './DistributorTestimonials';
import styles from './page.module.css';
export const metadata = {
  title: 'Become a Partner | Partner with Zar Jewels Today',
  description: 'Partner with Zar Jewels and grow your jewellery business with premium gold collections, reliable manufacturing, nationwide distribution, and trusted expertise.',
  openGraph: {
    images: ['https://zar-one.vercel.app/images/zar-logo.svg'],
  },
};

export default function PartnerPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Partner', isActive: true },
        ]}
        heading="Become a Partner"
        description="Collaborate with Zar to grow your retail business with precision-crafted gold jewellery, supported by consistent quality, scalable manufacturing, and trusted supply."
      />

      <div className='bannerImage'>
        <Image
          src={imagePath("/images/partner_bg.webp")}
          alt="Crafting gold bangle"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className={styles.content}>
        <div className="container">
          <DistributorTestimonials />

          <div className={styles.grid}>
            <PartnerForm />
          </div>
        </div>
      </div>
    </div>
  );
}
