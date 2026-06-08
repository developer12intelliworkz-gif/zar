'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import styles from './RetailerSlider.module.css';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const PlayIcon = () => (
  <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="36"
      cy="36"
      r="35"
      fill="rgba(255,255,255,0.15)"
      stroke="rgba(255,255,255,0.65)"
      strokeWidth="1.2"
    />
    <polygon points="29,20 55,36 29,52" fill="white" />
  </svg>
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Testimonial {
  poster: string;
  video: string;
  quote: string;
  name: string;
  designation: string;
}

interface ApiRetailerTestimonial {
  video_link?: string;
  fallback_image?: string;
  title?: string;
  description?: string;
}

interface RetailerApiResponse {
  success?: boolean;
  data?: ApiRetailerTestimonial[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function resolveRetailerTestimonial(item: ApiRetailerTestimonial): Testimonial {
  return {
    poster: getImageUrl(item.fallback_image || ''),
    video: item.video_link?.trim() || '',
    quote: item.description?.trim() || '',
    name: item.title?.trim() || 'Retailer',
    designation: '',
  };
}

/**
 * FIX #6 — broadened check: match mp4/webm/ogg anywhere in the URL
 * (handles query-params, redirect URLs, etc.)
 */
function isPlayableVideo(url: string): boolean {
  return /mp4|webm|ogg/i.test(url);
}

// ---------------------------------------------------------------------------
// Static fallback data
// ---------------------------------------------------------------------------
const baseTestimonials: Testimonial[] = [
  {
    poster: '/images/homepage/video_1.webp',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quote:
      "The bangles I found at the expo were exactly what I'd been searching for. The craftsmanship is truly world-class.",
    name: 'Priya Sharma',
    designation: 'Bridal Client, Mumbai',
  },
  {
    poster: '/images/homepage/video_2.webp',
    video: 'https://www.w3schools.com/html/movie.mp4',
    quote:
      'Every piece feels curated with intention. Our customers keep coming back for the exclusivity this platform provides.',
    name: 'Ananya Mehta',
    designation: 'Boutique Director, Delhi',
  },
  {
    poster: '/images/homepage/video_3.webp',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quote:
      'Partnering with them transformed our store. The quality of their jewellery collection is simply unmatched in the market.',
    name: 'Rekha Nair',
    designation: 'Jewellery Store Owner, Kochi',
  },
  {
    poster: '/images/homepage/video_1.webp',
    video: 'https://www.w3schools.com/html/movie.mp4',
    quote:
      'The designs speak to our heritage beautifully. I have never seen my clients so excited about a new collection.',
    name: 'Sunita Joshi',
    designation: 'Heritage Curator, Jaipur',
  },
  {
    poster: '/images/homepage/video_2.webp',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quote:
      "The bangles I found at the expo were exactly what I'd been searching for. The craftsmanship is truly world-class.",
    name: 'Priya Sharma',
    designation: 'Bridal Client, Mumbai',
  },
  {
    poster: '/images/homepage/video_3.webp',
    video: 'https://www.w3schools.com/html/movie.mp4',
    quote:
      'Every piece feels curated with intention. Our customers keep coming back for the exclusivity this platform provides.',
    name: 'Ananya Mehta',
    designation: 'Boutique Director, Delhi',
  },
  {
    poster: '/images/homepage/video_1.webp',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quote:
      'Partnering with them transformed our store. The quality of their jewellery collection is simply unmatched in the market.',
    name: 'Rekha Nair',
    designation: 'Jewellery Store Owner, Kochi',
  },
  {
    poster: '/images/homepage/video_2.webp',
    video: 'https://www.w3schools.com/html/movie.mp4',
    quote:
      'The designs speak to our heritage beautifully. I have never seen my clients so excited about a new collection.',
    name: 'Sunita Joshi',
    designation: 'Heritage Curator, Jaipur',
  },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://testintelliworkz.tech/Zar_backend';

const skeletonCards = Array.from({ length: 3 });

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function RetailerSlider() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const wrapRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  // FIX #7 — track active slide index from Swiper state, not DOM class
  const activeIndexRef = useRef<number>(0);

  // FIX #5 — initialise skeleton state as false (not loaded) and sync with data
  const [sliderTestimonials, setSliderTestimonials] = useState<Testimonial[]>(baseTestimonials);
  const [loadedVideos, setLoadedVideos] = useState<boolean[]>(() =>
    baseTestimonials.map(() => false),
  );
  const [skeletonTarget, setSkeletonTarget] = useState(3);

  const showSkeleton = loadedVideos.slice(0, skeletonTarget).some((loaded) => !loaded);

  // FIX #5 — sync loadedVideos length whenever sliderTestimonials changes
  useEffect(() => {
    setLoadedVideos(sliderTestimonials.map(() => false));
    // FIX #8 — reset refs so stale indices don't persist
    videoRefs.current = sliderTestimonials.map(() => null);
    wrapRefs.current  = sliderTestimonials.map(() => null);
  }, [sliderTestimonials]);

  useEffect(() => {
    function updateSkeletonTarget() {
      if (window.innerWidth <= 767) {
        setSkeletonTarget(1);
        return;
      }
      if (window.innerWidth <= 1199) {
        setSkeletonTarget(2);
        return;
      }
      setSkeletonTarget(3);
    }

    async function fetchRetailerTestimonials() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/retailer-testimonials`);
        const json = (await response.json()) as RetailerApiResponse;

        if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
          const remoteTestimonials = json.data
            .map(resolveRetailerTestimonial)
            .filter((item) => item.name && item.quote);

          if (remoteTestimonials.length > 0) {
            setSliderTestimonials(remoteTestimonials);
          }
        }
      } catch (error) {
        console.error('RetailerSlider fetch failed:', error);
      }
    }

    updateSkeletonTarget();
    void fetchRetailerTestimonials();
    window.addEventListener('resize', updateSkeletonTarget);
    return () => window.removeEventListener('resize', updateSkeletonTarget);
  }, []);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------
  function markVideoLoaded(idx: number) {
    setLoadedVideos((current) => {
      if (current[idx]) return current;
      const next = [...current];
      next[idx] = true;
      return next;
    });
  }

  /**
   * FIX #3 — stopAll now resumes autoplay after pausing videos.
   * Called on every slide change so autoplay is always restored.
   */
  const stopAll = useCallback(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.pause();
      v.currentTime = 0;
      v.removeAttribute('controls');
      wrapRefs.current[i]?.classList.remove(styles.playing);
    });
    // Resume autoplay that may have been stopped during video playback
    swiperRef.current?.autoplay?.start();
  }, []);

  /**
   * FIX #2 — stop autoplay when a video starts; resume when it's paused/ended.
   */
  function handlePlay(idx: number) {
    const v = videoRefs.current[idx];
    const w = wrapRefs.current[idx];
    const testimonial = sliderTestimonials[idx];
    if (!testimonial) return;

    // Fallback: open in new tab if no playable src
    if (!v || !v.src) {
      if (testimonial.video) window.open(testimonial.video, '_blank');
      return;
    }

    if (v.paused) {
      // Stop all other playing videos first
      videoRefs.current.forEach((other, i) => {
        if (i === idx || !other) return;
        other.pause();
        other.currentTime = 0;
        other.removeAttribute('controls');
        wrapRefs.current[i]?.classList.remove(styles.playing);
      });

      v.play();
      v.setAttribute('controls', '');
      w?.classList.add(styles.playing);

      // Stop slider autoplay while video is playing
      swiperRef.current?.autoplay?.stop();
    } else {
      v.pause();
      v.removeAttribute('controls');
      w?.classList.remove(styles.playing);

      // Resume autoplay once user pauses the video
      swiperRef.current?.autoplay?.start();
    }
  }

  /**
   * FIX #4 — removed redundant slideToClickedSlide logic.
   * Swiper's own slideToClickedSlide prop handles this natively.
   * This handler is only needed to stopAll when a non-active slide is clicked.
   */
  function handleSlideClick(idx: number) {
    if (idx !== activeIndexRef.current) {
      stopAll();
    }
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <section className="mt-100 mb-100">
      <div className={styles.hd}>
        <h2 className="fs_54">What Our Retailers / End Customers Say</h2>
        <p>Hear from our partners about their journey through our exclusive showcases.</p>
      </div>

      <div
        className={styles.outer}
        // FIX #1 — single source of truth for hover pause/resume.
        // Removed pauseOnMouseEnter from Swiper config; handled only here.
        onMouseEnter={() => swiperRef.current?.autoplay?.pause()}
        onMouseLeave={() => swiperRef.current?.autoplay?.resume()}
      >
        {/* Skeleton overlay */}
        {showSkeleton && (
          <div className={styles.skeletonOverlay} aria-hidden="true">
            <div className={styles.skeletonGrid}>
              {skeletonCards.map((_, idx) => (
                <article key={idx} className={styles.skeletonCard}>
                  <div className={styles.skeletonCardMedia}>
                    <div className={styles.skeletonPlay} />
                    <div className={styles.skeletonShimmer} />
                  </div>
                  <div className={styles.skeletonCardContent}>
                    <div className={styles.skeletonCardQuote} />
                    <div className={styles.skeletonCardLine} />
                    <div className={`${styles.skeletonCardLine} ${styles.skeletonCardLineWide}`} />
                    <div className={`${styles.skeletonCardLine} ${styles.skeletonCardLineShort}`} />
                    <div className={styles.skeletonCardMeta} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            // FIX #1 — removed pauseOnMouseEnter here; outer div handles it
            pauseOnMouseEnter: false,
            reverseDirection: false,
          }}
          centeredSlides={true}
          centeredSlidesBounds={true}
          // FIX #4 — keep slideToClickedSlide; Swiper handles navigation natively
          slideToClickedSlide={true}
          slidesPerView={3}
          spaceBetween={50}
          speed={600}
          grabCursor
          breakpoints={{
            0:    { slidesPerView: 1, spaceBetween: 20 },
            768:  { slidesPerView: 2, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 30 },
            1441: { slidesPerView: 3, spaceBetween: 30 },
          }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          // FIX #7 — track real active index from Swiper
          onActiveIndexChange={(s) => {
            activeIndexRef.current = s.realIndex;
          }}
          // FIX #3 — stopAll (which also resumes autoplay) on every slide change
          onSlideChange={stopAll}
          className={`${styles.swiper} ${showSkeleton ? styles.swiperLoading : ''}`}
        >
          {sliderTestimonials.map((t, idx) => (
            <SwiperSlide
              key={idx}
              className={styles.slide}
              // FIX #4 — simplified: just call stopAll for non-active slides
              onClick={() => handleSlideClick(idx)}
            >
              {/* Video wrapper */}
              <div
                className={styles.vwrap}
                ref={(el) => { wrapRefs.current[idx] = el; }}
              >
                <img
                  src={t.poster}
                  alt={`${t.name} testimonial poster`}
                  className={styles.poster}
                  draggable="false"
                />
                <video
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  // FIX #6 — broadened isPlayableVideo catches more URL formats
                  src={isPlayableVideo(t.video) ? t.video : undefined}
                  poster={t.poster}
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={() => markVideoLoaded(idx)}
                  onCanPlay={() => markVideoLoaded(idx)}
                  onPause={(e) => {
                    // Don't remove playing class if the video simply ended
                    if (!e.currentTarget.ended) {
                      wrapRefs.current[idx]?.classList.remove(styles.playing);
                    }
                  }}
                  onPlay={() => wrapRefs.current[idx]?.classList.add(styles.playing)}
                  onEnded={() => {
                    videoRefs.current[idx]?.removeAttribute('controls');
                    wrapRefs.current[idx]?.classList.remove(styles.playing);
                    // FIX #2 — resume autoplay when video finishes
                    swiperRef.current?.autoplay?.start();
                  }}
                />

                {/* Play button */}
                <div
                  className={styles.pbtn}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent slide-click from firing
                    handlePlay(idx);
                  }}
                >
                  <PlayIcon />
                </div>
              </div>

              {/* Content panel */}
              <div className={styles.slideBody}>
                <div className={styles.slideBodyInner}>
                  <Image
                    src="/images/quote_2.svg"
                    alt="quote"
                    width={54}
                    height={40}
                    className={styles.quoteImg}
                  />
                  <p className={styles.message}>{t.quote}</p>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.designation}>{t.designation}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}