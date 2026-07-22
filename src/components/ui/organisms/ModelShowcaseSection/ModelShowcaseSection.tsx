'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import {
  STATIC_SHOWCASE_PRODUCTS,
  getShowcaseProducts,
  type ShowcaseProduct,
} from '@/lib/showcase';
import ShowcaseProductCard from './ShowcaseProductCard';
import ModelViewerModal from './ModelViewerModal';
import 'swiper/css';
import styles from './ModelShowcaseSection.module.css';

const ArrowIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.75" y="0.75" width="70.5" height="70.5" rx="35.25" fill="white" />
    <rect x="0.75" y="0.75" width="70.5" height="70.5" rx="35.25" stroke="#A38274" strokeWidth="1.5" />
    <path
      d="M29.7419 48.1166L42.2579 35.6006L29.7419 23.8828"
      stroke="#A38274"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function buildDisplayProducts(products: ShowcaseProduct[]): ShowcaseProduct[] {
  if (products.length === 0) {
    return [];
  }

  return [...products, ...products, ...products];
}

export default function ModelShowcaseSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [products, setProducts] = useState<ShowcaseProduct[]>(STATIC_SHOWCASE_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<ShowcaseProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getShowcaseProducts().then((items) => {
      if (!cancelled && items.length > 0) {
        setProducts(items);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const displayProducts = useMemo(() => buildDisplayProducts(products), [products]);
  const baseCount = products.length;

  const handleView3d = useCallback((product: ShowcaseProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    swiperRef.current?.autoplay?.stop();
    swiperRef.current?.disable();
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    swiperRef.current?.enable();
    swiperRef.current?.autoplay?.start();
  }, []);

  if (baseCount === 0) {
    return null;
  }

  return (
    <>
      <section className="mt-100" aria-labelledby="model-showcase-title">
        <div className="container">
          <header className={styles.header}>
            <h2 id="model-showcase-title" className="fs_54">
              Signature Gold Bangles
            </h2>
            <p>
              Discover a curated range of lightweight gold bangles that balance tradition and modern
              design, crafted with precision and consistency at scale.
            </p>
          </header>

          <div
            className={styles.sliderWrapper}
            aria-hidden={isModalOpen}
            data-modal-open={isModalOpen ? 'true' : undefined}
          >
            <button
              className={`${styles.navBtn} ${styles.navPrev}`}
              aria-label="Previous slide"
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowIcon />
            </button>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides
              loop={false}
              initialSlide={baseCount}
              allowTouchMove={false}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChangeTransitionEnd={(swiper) => {
                const index = swiper.activeIndex;
                if (index < baseCount) {
                  swiper.slideTo(index + baseCount, 0, false);
                } else if (index >= baseCount * 2) {
                  swiper.slideTo(index - baseCount, 0, false);
                }
              }}
              breakpoints={{
                992: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 8,
                },
              }}
              className={styles.slider}
            >
              {displayProducts.map((product, index) => (
                <SwiperSlide key={`${product.id}-${index}`}>
                  <ShowcaseProductCard product={product} onView3d={handleView3d} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={`${styles.navBtn} ${styles.navNext}`}
              aria-label="Next slide"
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <ModelViewerModal open={isModalOpen} product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
}
