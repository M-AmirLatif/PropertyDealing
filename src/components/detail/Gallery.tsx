import { useState, lazy, Suspense } from 'react';
import type { PropertyImage } from '../../types';
import { GalleryMosaic } from './GalleryMosaic';
import { GalleryCarousel } from './GalleryCarousel';

// Lazy-load Lightbox to keep initial bundle small
const Lightbox = lazy(() => import('./Lightbox'));

interface GalleryProps {
  images: PropertyImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <div className="property-detail-gallery">
      {/* Desktop Mosaic Layout (≥1024px) */}
      <div className="gallery-desktop-view">
        <GalleryMosaic
          images={images}
          onOpenLightbox={handleOpenLightbox}
        />
      </div>

      {/* Mobile Carousel Layout (<1024px) */}
      <div className="gallery-mobile-view">
        <GalleryCarousel
          images={images}
          onOpenLightbox={handleOpenLightbox}
        />
      </div>

      {/* Lazy Lightbox */}
      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            open={lightboxIndex !== null}
            onOpenChange={(open) => !open && handleCloseLightbox()}
            images={images}
            initialIndex={lightboxIndex}
          />
        </Suspense>
      )}

      <style>{`
        .gallery-desktop-view {
          display: block;
        }
        .gallery-mobile-view {
          display: none;
        }

        @media (max-width: 1023px) {
          .gallery-desktop-view {
            display: none !important;
          }
          .gallery-mobile-view {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
