'use client';

import React, { useEffect, useRef, useState } from 'react';
import { apiGet, API_BASE_URL } from '@/lib/api/axios';
import { getImageUrl } from '@/lib/utils';
import styles from './DistributorTestimonials.module.css';

const PlayIcon = () => (
  <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" style={{ width: 60, height: 60 }}>
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

interface Testimonial {
  id: number;
  poster: string;
  video: string;
  quote: string;
  name: string;
  designation: string;
}

interface ApiRetailerTestimonial {
  id: number;
  video_link?: string;
  fallback_image?: string;
  name?: string;
  title?: string;
  designation?: string;
  description?: string;
}

interface RetailerApiResponse {
  success?: boolean;
  data?: ApiRetailerTestimonial[];
}

function resolveRetailerTestimonial(item: ApiRetailerTestimonial): Testimonial {
  const rawVideo = item.video_link?.trim() || '';
  const normalizedVideo = rawVideo && !/^https?:\/\//i.test(rawVideo)
    ? `${API_BASE_URL.replace(/\/+$/, '')}/${rawVideo.replace(/^\/+/, '')}`
    : rawVideo;

  return {
    id: item.id,
    poster: getImageUrl(item.fallback_image || ''),
    video: normalizedVideo,
    quote: item.description?.trim() || '',
    name: item.name?.trim() || item.title?.trim() || 'Distributor',
    designation: item.designation?.trim() || '',
  };
}

function isPlayableVideo(url: string): boolean {
  return /mp4|webm|ogg/i.test(url);
}

export default function DistributorTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [playingIndices, setPlayingIndices] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const json = await apiGet<RetailerApiResponse>('/api/retailer-testimonials');
        if (json?.success && Array.isArray(json.data)) {
          const mapped = json.data
            .map(resolveRetailerTestimonial)
            .filter((t) => t.name && (t.quote || t.video));
          setTestimonials(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch distributor testimonials:', err);
      }
    }

    void fetchTestimonials();
  }, []);

  const handlePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      // Pause any other playing video
      videoRefs.current.forEach((otherVideo, idx) => {
        if (otherVideo && idx !== index) {
          otherVideo.pause();
          otherVideo.removeAttribute('controls');
          setPlayingIndices((prev) => ({ ...prev, [idx]: false }));
        }
      });

      video.play().catch((err) => console.warn('Video play failed:', err));
      video.setAttribute('controls', '');
      setPlayingIndices((prev) => ({ ...prev, [index]: true }));
    } else {
      video.pause();
      video.removeAttribute('controls');
      setPlayingIndices((prev) => ({ ...prev, [index]: false }));
    }
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className={styles.section}>
      <h2 className={`fs_54 txt_center ${styles.heading}`}>Distributor Testimonials</h2>
      <p className={styles.subheading}>Hear from our partners about their journey through our exclusive showcases.</p>

      <div className={styles.grid}>
        {testimonials.map((t, idx) => (
          <div key={t.id || idx} className={styles.card}>
            <div className={`${styles.vwrap} ${playingIndices[idx] ? styles.playing : ''}`}>
              <img
                src={t.poster}
                alt={`${t.name} testimonial poster`}
                className={styles.poster}
              />
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={isPlayableVideo(t.video) ? t.video : undefined}
                poster={t.poster}
                loop
                playsInline
                preload="metadata"
                onPause={() => setPlayingIndices((prev) => ({ ...prev, [idx]: false }))}
                onPlay={() => setPlayingIndices((prev) => ({ ...prev, [idx]: true }))}
                onEnded={() => {
                  videoRefs.current[idx]?.removeAttribute('controls');
                  setPlayingIndices((prev) => ({ ...prev, [idx]: false }));
                }}
              />
              <div
                className={styles.pbtn}
                onClick={() => handlePlay(idx)}
              >
                <PlayIcon />
              </div>
            </div>

            <div className={styles.meta}>
              <span className={styles.name}>{t.name}</span>
              {t.designation && <span className={styles.designation}>{t.designation}</span>}
              {t.quote && <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
