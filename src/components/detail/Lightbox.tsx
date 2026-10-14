import { useEffect, useRef, useState, useCallback, type TouchEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PropertyImage } from '../../types';

interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: PropertyImage[];
  initialIndex?: number;
}

export function Lightbox({
  open,
  onOpenChange,
  images,
  initialIndex = 0,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  // Sync index when initialIndex changes or modal opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  // Lock background scroll when open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // Preload adjacent images
  useEffect(() => {
    if (!open || images.length <= 1) return;
    const nextIdx = (currentIndex + 1) % images.length;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;

    const imgNext = new Image();
    imgNext.src = images[nextIdx].src;
    const imgPrev = new Image();
    imgPrev.src = images[prevIdx].src;
  }, [open, currentIndex, images]);

  // Keep active thumbnail in view
  useEffect(() => {
    if (!open || !thumbnailStripRef.current) return;
    const activeThumb = thumbnailStripRef.current.children[currentIndex] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [open, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handlePrev, handleNext]);

  // Touch Swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 12, 10, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000,
            animation: 'fadeIn 150ms ease-out',
          }}
        />

        <Dialog.Content
          aria-describedby="lightbox-caption"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2001,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'env(safe-area-inset-top, 16px) 16px env(safe-area-inset-bottom, 16px) 16px',
            outline: 'none',
          }}
        >
          {/* Top Bar: Counter & Close */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              zIndex: 10,
            }}
          >
            <Dialog.Title
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--ivory-100)',
                letterSpacing: '0.06em',
                margin: 0,
              }}
            >
              Photo {currentIndex + 1} of {images.length}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close photo lightbox"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'var(--ivory-50)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'background-color 150ms',
                }}
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Main Viewing Area */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
              padding: '8px 0',
            }}
          >
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(24, 26, 23, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'var(--ivory-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'all 150ms',
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Current Image */}
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <img
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-default)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  animation: 'lightboxFade 180ms ease-out',
                }}
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo"
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(24, 26, 23, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'var(--ivory-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'all 150ms',
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Bar: Caption & Thumbnails */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
            }}
          >
            {/* Caption */}
            <p
              id="lightbox-caption"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'rgba(251, 248, 242, 0.8)',
                textAlign: 'center',
                margin: 0,
                maxWidth: '65ch',
              }}
            >
              {currentImage.alt}
            </p>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div
                ref={thumbnailStripRef}
                tabIndex={0}
                role="region"
                aria-label="Photo thumbnails"
                style={{
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  maxWidth: '100%',
                  padding: '6px 4px',
                  scrollbarWidth: 'none',
                }}
              >
                {images.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Jump to photo ${idx + 1}`}
                      style={{
                        width: '56px',
                        height: '42px',
                        flexShrink: 0,
                        padding: 0,
                        border: isActive ? '2px solid var(--brass-500)' : '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 'var(--radius-default)',
                        overflow: 'hidden',
                        backgroundColor: '#000',
                        cursor: 'pointer',
                        opacity: isActive ? 1 : 0.6,
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 150ms',
                      }}
                    >
                      <img
                        src={img.srcSmall || img.src}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      <style>{`
        @keyframes lightboxFade {
          from { opacity: 0.6; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes lightboxFade {
            from { opacity: 1; }
            to { opacity: 1; }
          }
        }
      `}</style>
    </Dialog.Root>
  );
}

// Default export for React.lazy
export default Lightbox;
