'use client';

import { useEffect } from 'react';
import styles from './ModelShowcaseSection.module.css';

const models = [
  { name:'Dazzling' , src: '/images/models/ZAR-1.glb', alt: 'Interactive 3D jewellery model 1', poster: '/images/homepage/product_1.webp' },
  { name:'Dazzling' , src: '/images/models/ZAR-2.glb', alt: 'Interactive 3D jewellery model 2', poster: '/images/homepage/product_2.webp' },
  { name:'Dazzling' , src: '/images/models/ZAR-3.glb', alt: 'Interactive 3D jewellery model 3', poster: '/images/homepage/product_3.webp' },
  { name:'Dazzling' , src: '/images/models/ZAR-4.glb', alt: 'Interactive 3D jewellery model 4', poster: '/images/homepage/product_1.webp' },
];

export default function ModelShowcaseSection() {
  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  return (
    <section className="mt-100" aria-labelledby="model-showcase-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="model-showcase-title" className="fs_54">Signature Gold Bangles</h2>
          <p className="">
            Discover a range of thoughtfully curated designs that balance tradition and modernity.
          </p>
        </header>

        <div className={styles.grid}>
          {models.map((model, index) => (
            <article key={model.src} className={styles.card}>
              <model-viewer
                src={model.src}
                alt={model.alt}
                poster={model.poster}
                camera-controls
                max-camera-orbit="auto auto 100%"
                auto-rotate
                touch-action="pan-y"
                interaction-prompt="auto"
                shadow-intensity="1"
                exposure="1"
                loading="lazy"
                reveal="auto"
                className={styles.viewer}
              />
              <span className={styles.cardLabel}>{model.name}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
