import { useState, useRef, type UIEvent } from 'react';
import { Images } from 'lucide-react';
import type { PropertyImage } from '../../types';
import { SurveyImage } from '../property/SurveyImage';
import { SurveyFrame } from '../ui/SurveyFrame';

interface GalleryCarouselProps {
  images: PropertyImage[];
  onOpenLightbox: (index: number) => void;
}

export function GalleryCarousel({ images, onOpenLightbox }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollPos = el.scrollLeft;
    const itemWidth = el.clientWidth;
    if (itemWidth > 0) {
      const newIndex = Math.round(scrollPos / itemWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const itemWidth = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth',
    });
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="gallery-carousel-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: 'var(--space-5)',
      }}
    >
      {/* Scroll-Snap Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="region"
        aria-label="Property photos carousel"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          width: '100%',
          borderRadius: 'var(--radius-default)',
        }}
      >
        {images.map((img, idx) => (
          <div
            key={img.src}
            style={{
              flex: '0 0 100%',
              width: '100%',
              scrollSnapAlign: 'start',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => onOpenLightbox(idx)}
              aria-label={`Open photo ${idx + 1} of ${images.length}: ${img.alt}`}
              style={{
                width: '100%',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'block',
              }}
            >
              <SurveyFrame
                caption={`PHOTO ${String(idx + 1).padStart(2, '0')} OF ${String(images.length).padStart(2, '0')}`}
                aspectRatio="4/3"
                markColor="brass"
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <SurveyImage
                    src={img.src}
                    srcSmall={img.srcSmall}
                    alt={img.alt}
                    position={img.position}
                    priority={idx === 0}
                  />
                </div>
              </SurveyFrame>
            </button>
          </div>
        ))}
      </div>

      {/* Floating Counter Badge in Top-Right Corner */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          backgroundColor: 'rgba(24, 26, 23, 0.8)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '3px 8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--ivory-50)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          pointerEvents: 'none',
        }}
      >
        <Images size={11} aria-hidden="true" />
        <span>
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: 'var(--space-2)',
          }}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === activeIndex ? '16px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: idx === activeIndex ? 'var(--copper-600)' : 'var(--line)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all var(--duration-fast)',
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        .gallery-carousel-wrapper div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
