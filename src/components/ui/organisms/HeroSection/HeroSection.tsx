'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Button from '@/components/ui/atoms/Button/Button';
import EnquiryModal from '@/components/ui/organisms/EnquiryModal/EnquiryModal';
import styles from './HeroSection.module.css';

const slides = [
  {
    image: '/images/homepage/banner.webp',
    alt: 'Luxury gold bangle editorial',
    heading: "INDIA'S TRUSTED\nGOLD BANGLE MANUFACTURER",
    subtitle:
      'Crafting lightweight, elegant gold bangles through innovation, precision, and timeless craftsmanship.',
  },
  {
    image: '/images/homepage/banner-2.webp',
    alt: 'Exquisite gold jewellery craftsmanship',
    heading: 'CRAFTED WITH\nPRECISION & PASSION',
    subtitle:
      'From design to finish, every piece reflects decades of artistry and unmatched quality.',
  },
  {
    image: '/images/homepage/banner-3.webp',
    alt: 'Timeless gold bangle collection',
    heading: 'TIMELESS ELEGANCE\nREDEFINED',
    subtitle:
      'Discover our signature collections that blend tradition with contemporary design.',
  },
];

export default function HeroSection() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    // Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className={styles.hero}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              <motion.div 
                className={styles.backgroundImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  style={{ width: "100%"}}
                  priority={index === 0}
                />
              </motion.div>
              <div className={styles.content}>
                <motion.div 
                  className={styles.textBlock}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                  <h1 className={styles.heading}>
                    {slide.heading.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < slide.heading.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </h1>
                  <p className={styles.subtitle}>{slide.subtitle}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Button
                    variant="outline"
                    showArrow
                    onClick={() => setEnquiryOpen(true)}
                  >
                    Enquire Now
                  </Button>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.heroNav}>
        <button className={styles.heroNavBtn} onClick={scrollPrev} aria-label="Previous slide">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="-0.75" y="0.75" width="70.5" height="70.5" rx="35.25" transform="matrix(-1 0 0 1 70.5 0)" stroke="#A38274" strokeWidth="1.5"/>
            <path d="M42.258 48.1166L29.742 35.6006L42.258 23.8828" stroke="#A38274" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={styles.heroNavBtn} onClick={scrollNext} aria-label="Next slide">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.75" y="0.75" width="70.5" height="70.5" rx="35.25" fill="none" stroke="#A38274" strokeWidth="1.5"/>
            <path d="M29.7419 48.1166L42.2579 35.6006L29.7419 23.8828" stroke="#A38274" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}
