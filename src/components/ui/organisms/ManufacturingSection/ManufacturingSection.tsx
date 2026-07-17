'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { imagePath } from '@/lib/imagePath';
import Button from '@/components/ui/atoms/Button/Button';
import styles from './ManufacturingSection.module.css';

export default function ManufacturingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.load();
    void video.play().catch(() => {
      // Autoplay can be blocked; poster remains visible.
    });
  }, [shouldLoadVideo]);

  return (
    <section ref={sectionRef} className={`${styles.section} mt-100`}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        muted
        loop
        playsInline
        preload="none"
        poster={imagePath('/images/homepage/video.webp')}
      >
        {shouldLoadVideo ? (
          <source src={imagePath('/images/homepage/manufacturing-video.mp4')} type="video/mp4" />
        ) : null}
      </video>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className={styles.heading}>Craftsmanship at Scale</h2>
          <div className={styles.textBlock}>
            <p>
              Rooted in tradition and refined through modern manufacturing, ZAR delivers gold bangles with precision, consistency, and quality at scale.<br />
              As a leading <strong>gold bangle manufacturer</strong>, we combine design expertise with advanced processes to ensure uniformity, finish, and reliability, making us a trusted partner for retailers.
            </p>
            <Button href="/partner" variant="outline" showArrow className={styles.btn1}>
              Become a Partner
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
