'use client';

import Image from 'next/image';
import { imagePath } from '@/lib/imagePath';
import type { ShowcaseProduct } from '@/lib/showcase';
import styles from './ModelShowcaseSection.module.css';

interface ShowcaseProductCardProps {
  product: ShowcaseProduct;
  onView3d: (product: ShowcaseProduct) => void;
}

export default function ShowcaseProductCard({ product, onView3d }: ShowcaseProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.modelWrapper}>
        <div className={styles.circleBg} aria-hidden="true">
          <svg className={styles.circleSvg} viewBox="0 0 580 580" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="290" cy="280" r="265" stroke="#D0B480" strokeWidth="1.5" />
            <circle cx="290" cy="300" r="272" stroke="#D0B480" strokeWidth="1.5" />
          </svg>
        </div>

        <button
          type="button"
          className={styles.productButton}
          onClick={() => onView3d(product)}
          aria-label={`Click to see ${product.name} in 3D`}
        >
          <span className={styles.productImageWrapper}>
            <Image
              src={imagePath(product.image)}
              alt={product.alt}
              fill
              sizes="(max-width: 767px) 140px, (max-width: 1023px) 190px, 250px"
              className={styles.productImage}
            />
          </span>
          <span className={styles.hoverOverlay} aria-hidden="true">
            <span className={styles.hoverOverlayContent}>
              <svg
                className={styles.hoverOverlayIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12L20 7.5M12 12V21M12 12L4 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.hoverOverlayText}>Click to see 3D</span>
            </span>
          </span>
        </button>
      </div>

      <span className={styles.cardLabel}>{product.name}</span>
    </article>
  );
}
