'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './TradeHighlightsSlider.module.css';

export type TradeHighlight = {
  icon: string;
  title: string;
  description: string;
};

interface TradeHighlightsSliderProps {
  highlights: TradeHighlight[];
}

export default function TradeHighlightsSlider({ highlights }: TradeHighlightsSliderProps) {
  return (
    <section className={styles.tradeHighlightsMobile} aria-label="Trade highlights slider">
      <div className="container">
        <div className={styles.tradeHighlightsSliderWrap}>
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className={styles.tradeHighlightsSlider}
          >
            {highlights.map((item) => (
              <SwiperSlide key={item.title}>
                <article className={styles.highlightCard}>
                  <div className={styles.highlightIcon} aria-hidden="true">
                    <img src={item.icon} alt="" />
                  </div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightDescription}>{item.description}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
