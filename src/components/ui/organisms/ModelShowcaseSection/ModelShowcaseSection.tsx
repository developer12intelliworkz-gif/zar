'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { showcaseModels } from '@/lib/model-showcase';
import { imagePath } from '@/lib/imagePath';
import 'swiper/css';
import styles from './ModelShowcaseSection.module.css';

// Triple the list so we have enough real slides to scroll both directions
// without loop mode (which clones DOM nodes and breaks model-viewer web components).
const displayModels = [...showcaseModels, ...showcaseModels, ...showcaseModels];
const INITIAL_SLIDE = showcaseModels.length;
/** Only mount interactive viewers for the active slide ± this many neighbors. */
const VIEWER_NEIGHBOR_RADIUS = 1;

const ArrowIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.75" y="0.75" width="70.5" height="70.5" rx="35.25" fill="white" />
    <rect x="0.75" y="0.75" width="70.5" height="70.5" rx="35.25" stroke="#A38274" strokeWidth="1.5" />
    <path d="M29.7419 48.1166L42.2579 35.6006L29.7419 23.8828" stroke="#A38274" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function shouldMountViewer(index: number, activeIndex: number): boolean {
  return Math.abs(index - activeIndex) <= VIEWER_NEIGHBOR_RADIUS;
}

function buildViewerHtml(model: (typeof showcaseModels)[number]): string {
  return `<model-viewer
    src="${imagePath(model.src)}"
    alt="${model.alt}"
    poster="${imagePath(model.poster)}"
    camera-controls
    disable-zoom
    max-camera-orbit="auto auto 100%"
    auto-rotate
    touch-action="pan-y"
    interaction-prompt="auto"
    shadow-intensity="0"
    exposure="1"
    loading="lazy"
    reveal="auto"
    class="${styles.viewer}"
  >
    <div slot="poster" class="${styles.customPoster}">
      <img src="${imagePath(model.poster)}" alt="${model.alt}" class="${styles.posterImage}" loading="lazy" decoding="async" />
    </div>
    <div slot="progress-bar" class="${styles.hiddenProgressBar}"></div>
  </model-viewer>`;
}

export default function ModelShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [modelViewerReady, setModelViewerReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(INITIAL_SLIDE);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearViewport) return;

    let cancelled = false;
    void import('@google/model-viewer').then(() => {
      if (!cancelled) setModelViewerReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [isNearViewport]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  return (
    <section ref={sectionRef} className="mt-100" aria-labelledby="model-showcase-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="model-showcase-title" className="fs_54">Signature Gold Bangles</h2>
          <p className="">
            Discover a curated range of lightweight gold bangles that balance tradition and modern design, crafted with precision and consistency at scale.
          </p>
        </header>

        <div className={styles.sliderWrapper}>
          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowIcon />
          </button>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            loop={false}
            initialSlide={INITIAL_SLIDE}
            allowTouchMove={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.activeIndex);
            }}
            onSlideChange={handleSlideChange}
            onSlideChangeTransitionEnd={(swiper) => {
              const index = swiper.activeIndex;
              const len = showcaseModels.length;
              if (index < len) {
                swiper.slideTo(index + len, 0, false);
              } else if (index >= len * 2) {
                swiper.slideTo(index - len, 0, false);
              }
            }}
            breakpoints={{
              992: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className={styles.slider}
          >
            {displayModels.map((model, index) => {
              const mountViewer = modelViewerReady && shouldMountViewer(index, activeIndex);

              return (
                <SwiperSlide key={`${model.src}-${index}`}>
                  <article className={styles.card}>
                    <div className={styles.modelWrapper}>
                      <div className={styles.circleBg} aria-hidden="true">
                        <svg className={styles.circleSvg} viewBox="0 0 580 580" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="290" cy="280" r="265" stroke="#D0B480" strokeWidth="1.5" />
                          <circle cx="290" cy="300" r="272" stroke="#D0B480" strokeWidth="1.5" />
                        </svg>
                      </div>
                      {mountViewer ? (
                        <div
                          className={styles.viewerWrapper}
                          suppressHydrationWarning
                          dangerouslySetInnerHTML={{
                            __html: buildViewerHtml(model),
                          }}
                        />
                      ) : (
                        <div className={styles.viewerWrapper}>
                          <img
                            src={imagePath(model.poster)}
                            alt={model.alt}
                            className={styles.posterImage}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>
                    <span className={styles.cardLabel}>{model.name}</span>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
