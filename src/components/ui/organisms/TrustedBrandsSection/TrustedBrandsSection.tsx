"use client";

import { apiGet } from '@/lib/api/axios';
import { useEffect, useState } from 'react';
import ClientLogo from '@/components/ui/molecules/ClientLogo/ClientLogo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { getImageUrl } from '@/lib/utils';
import styles from './TrustedBrandsSection.module.css';

interface TrustedBrand {
  name: string;
  logo: string;
}

interface ClientApiItem {
  name?: string;
  clientele_title?: string;
  logo?: string | null;
  image_url?: string | null;
}

interface ClienteleApiResponse {
  success?: boolean;
  items?: ClientApiItem[];
}

const defaultBrands: TrustedBrand[] = [
  { name: 'anjali', logo: '/images/clients/anjali.webp' },
  { name: 'b.c.sen', logo: '/images/clients/b.c.sen.webp' },
  { name: 'bhima', logo: '/images/clients/bhima.webp' },
  { name: 'goldplus', logo: '/images/clients/goldplus.webp' },
  { name: 'josco', logo: '/images/clients/josco.webp' },
  { name: 'joyalukkas', logo: '/images/clients/joyalukkas.webp' },
  { name: 'Kalyan Jewellers', logo: '/images/clients/kalyan.webp' },
  { name: 'khazana', logo: '/images/clients/khazana.webp' },
  { name: 'malabar', logo: '/images/clients/malabar.webp' },
  { name: 'nac', logo: '/images/clients/nac.webp' },
  { name: 'p.c.chandra', logo: '/images/clients/p.c.chandra.webp' },
  { name: 'prince', logo: '/images/clients/prince.webp' },
  { name: 'sawansukha', logo: '/images/clients/sawansukha.webp' },
  { name: 'senco', logo: '/images/clients/senco.webp' },
  { name: 'tanishq', logo: '/images/clients/tanishq.webp' },
];

function resolveLogo(item: ClientApiItem): TrustedBrand {
  const name = item.name || item.clientele_title || 'Client';
  const rawLogo = item.image_url || item.logo || '/images/clients/placeholder.webp';
  return {
    name,
    logo: getImageUrl(rawLogo ?? ''),
  };
}

export default function TrustedBrandsSection() {
  const [brands, setBrands] = useState<TrustedBrand[]>(defaultBrands);

  useEffect(() => {
    async function fetchTrustedBrands() {
      try {
        const data = await apiGet<ClienteleApiResponse>('/api/clientele');

        if (data?.success && Array.isArray(data.items) && data.items.length > 0) {
          const remoteBrands = data.items
            .map((item: ClientApiItem) => resolveLogo(item))
            .filter((item: TrustedBrand) => Boolean(item.logo));

          if (remoteBrands.length > 0) {
            setBrands(remoteBrands);
          }
        }
      } catch (error) {
        console.error('TrustedBrandsSection fetch failed:', error);
      }
    }

    void fetchTrustedBrands();
  }, []);

  return (
    <section className="mt-100 mb-100">
      <div className={styles.inner}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="fs_54">Trusted Across Generations</h2>
          <p className="">
            Built on decades of craftsmanship and consistency, Zar continues to earn the trust of retail partners across generations through precision, reliability, and lasting relationships.
          </p>
        </motion.div>
      </div>
      <div className={styles.marquee}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={5}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0:    { slidesPerView: 2, spaceBetween: 20 },
            480:  { slidesPerView: 3, spaceBetween: 24 },
            768:  { slidesPerView: 4, spaceBetween: 30 },
            992:  { slidesPerView: 5, spaceBetween: 40 },
            1280: { slidesPerView: 6, spaceBetween: 40 },
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={`${brand.name}-${index}`} className={styles.swiperSlide}>
              <ClientLogo name={brand.name} logo={brand.logo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
