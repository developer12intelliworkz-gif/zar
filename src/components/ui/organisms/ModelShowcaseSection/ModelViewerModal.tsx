'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { imagePath } from '@/lib/imagePath';
import type { ShowcaseProduct } from '@/lib/showcase';
import { cn } from '@/lib/utils';
import styles from './ModelViewerModal.module.css';

interface ModelViewerModalProps {
  open: boolean;
  product: ShowcaseProduct | null;
  onClose: () => void;
}

export default function ModelViewerModal({ open, product, onClose }: ModelViewerModalProps) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    if (!open || !product) {
      setIsViewerReady(false);
      setIsModelLoaded(false);
      return;
    }

    let cancelled = false;

    void import('@google/model-viewer').then(() => {
      if (!cancelled) {
        setIsViewerReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [open, product?.id]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!open || !product || !isViewerReady || !viewer) {
      return;
    }

    const handleLoad = () => setIsModelLoaded(true);
    viewer.addEventListener('load', handleLoad);

    return () => {
      viewer.removeEventListener('load', handleLoad);
    };
  }, [open, product?.id, isViewerReady]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const { body, documentElement } = document;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!open || !product || typeof document === 'undefined') {
    return null;
  }

  const resolvedModelSrc = imagePath(product.modelSrc);
  const resolvedPoster = imagePath(product.image);
  const isLoading = !isViewerReady || !isModelLoaded;

  return createPortal(
    <div
      className={cn(styles.backdrop, styles.backdropOpen)}
      onClick={handleBackdropClick}
      aria-hidden={!open}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-viewer-modal-title"
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Close" type="button">
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.modalInner}>
          <div className={styles.modalBody}>
            <header className={styles.productInfo}>
              <p className={styles.eyebrow}>Interactive 3D View</p>
              <h3 id="model-viewer-modal-title" className={styles.title}>
                {product.name}
              </h3>
              {product.href ? (
                <Link href={product.href} className={styles.exploreLink}>
                  Explore the product
                </Link>
              ) : null}
            </header>

            <div className={styles.viewerStage}>
              <div className={styles.viewerFrame}>
                <div className={styles.viewerGlow} aria-hidden="true" />
                <div className={styles.viewerContainer}>
              {isViewerReady ? (
                <model-viewer
                  ref={viewerRef}
                  key={product.id}
                  src={resolvedModelSrc}
                  alt={product.alt}
                  poster={resolvedPoster}
                  camera-controls
                  auto-rotate
                  touch-action="pan-y"
                  interaction-prompt="auto"
                  shadow-intensity="0"
                  exposure="1"
                  loading="eager"
                  reveal="auto"
                  className={styles.viewer}
                />
              ) : null}

              {isLoading ? (
                <div className={styles.loadingState} aria-live="polite">
                  <div className={styles.spinner} aria-hidden="true" />
                  <span className={styles.loadingLabel}>Preparing your 3D experience</span>
                </div>
              ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
