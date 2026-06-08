import React from 'react';
import styles from './Testimonials.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://testintelliworkz.tech/Zar_backend';

interface Testimonial {
  message: string;
  name: string;
  designation: string;
}

interface ApiTestimonial {
  name?: string;
  comment?: string;
  position?: string;
}

interface TestimonialsApiResponse {
  success?: boolean;
  items?: ApiTestimonial[];
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

function mapApiTestimonial(item: ApiTestimonial): Testimonial {
  return {
    name: item.name?.trim() || 'Customer',
    message: item.comment?.trim() || '',
    designation: item.position?.trim() || '',
  };
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/testimonials`);
        const json = (await response.json()) as TestimonialsApiResponse;

        if (json?.success && Array.isArray(json.items) && json.items.length > 0) {
          const apiTestimonials = json.items
            .map((item) => mapApiTestimonial(item))
            .filter((item) => item.name && item.message);

          if (apiTestimonials.length > 0) {
            setTestimonials(apiTestimonials);
          }
        }
      } catch (error) {
        console.error('Testimonials fetch failed:', error);
      }
    }

    void fetchTestimonials();
  }, []);

  return (
    <section className="mt-100 mb-100">
      <div className="container">
        <h4 className="fs_54 txt_center">What Our Customers Say</h4>
        {isMobile ? (
          <Swiper slidesPerView={1} spaceBetween={24} className={styles.text_testi_slider}>
            {testimonials.map((testi, idx) => (
              <SwiperSlide key={`${testi.name}-${idx}`}>
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialText}>{testi.message}</div>
                  <div className={styles.testimonialName}>{testi.name}</div>
                  <div className={styles.testimonialDesignation}>{testi.designation}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.testimonialGrid}>
            {testimonials.map((testi, idx) => (
              <div className={styles.testimonialCard} key={`${testi.name}-${idx}`}>
                <div className={styles.testimonialText}>{testi.message}</div>
                <div className={styles.testimonialName}>{testi.name}</div>
                <div className={styles.testimonialDesignation}>{testi.designation}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
