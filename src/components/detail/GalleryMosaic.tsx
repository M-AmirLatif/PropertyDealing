import { Images } from 'lucide-react';
import type { PropertyImage } from '../../types';
import { SurveyImage } from '../property/SurveyImage';
import { SurveyFrame } from '../ui/SurveyFrame';

interface GalleryMosaicProps {
  images: PropertyImage[];
  onOpenLightbox: (index: number) => void;
}

export function GalleryMosaic({ images, onOpenLightbox }: GalleryMosaicProps) {
  if (!images || images.length === 0) return null;

  const leadImage = images[0];
  const secondaryImages = images.slice(1, 5); // Up to 4 secondary images for a 2x2 grid
  const totalCount = images.length;

  return (
    <div
      className="gallery-mosaic"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-6)',
      }}
    >
      {/* 1. Large Lead Tile (~7 cols or ~8 cols) */}
      <div
        style={{
          gridColumn: secondaryImages.length > 0 ? 'span 7' : 'span 12',
          height: '100%',
        }}
      >
        <button
          type="button"
          onClick={() => onOpenLightbox(0)}
          aria-label={`View photo 1 of ${totalCount}: ${leadImage.alt}`}
          style={{
            width: '100%',
            height: '100%',
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'block',
          }}
        >
          <SurveyFrame
            caption="SURVEY PHOTO 01 · PRIMARY FACADE"
            aspectRatio="16/11"
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
                src={leadImage.src}
                srcSmall={leadImage.srcSmall}
                alt={leadImage.alt}
                position={leadImage.position}
                priority
              />
            </div>
          </SurveyFrame>
        </button>
      </div>

      {/* 2. Secondary 2x2 Grid (remaining 5 cols) */}
      {secondaryImages.length > 0 && (
        <div
          style={{
            gridColumn: 'span 5',
            display: 'grid',
            gridTemplateColumns: secondaryImages.length > 1 ? 'repeat(2, 1fr)' : '1fr',
            gap: 'var(--space-3)',
          }}
        >
          {secondaryImages.map((img, idx) => {
            const actualIndex = idx + 1;
            const isLastVisibleTile = idx === secondaryImages.length - 1;
            const hasMoreImages = totalCount > 5;

            return (
              <div
                key={img.src}
                style={{
                  position: 'relative',
                  height: '100%',
                }}
              >
                <button
                  type="button"
                  onClick={() => onOpenLightbox(actualIndex)}
                  aria-label={`View photo ${actualIndex + 1} of ${totalCount}: ${img.alt}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'block',
                    position: 'relative',
                  }}
                >
                  <SurveyFrame
                    aspectRatio="4/3"
                    markColor="muted"
                    style={{ padding: '4px' }}
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
                      />
                    </div>
                  </SurveyFrame>

                  {/* "View all N photos" badge on the last visible tile if more images exist, or always on tile 4 */}
                  {isLastVisibleTile && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '4px',
                        backgroundColor: hasMoreImages ? 'rgba(24, 26, 23, 0.65)' : 'rgba(24, 26, 23, 0.35)',
                        backdropFilter: 'blur(2px)',
                        borderRadius: 'var(--radius-default)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--ivory-50)',
                        zIndex: 10,
                        transition: 'background-color var(--duration-fast)',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          padding: '6px 12px',
                          backgroundColor: 'rgba(24, 26, 23, 0.8)',
                          borderRadius: 'var(--radius-default)',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                        }}
                      >
                        <Images size={14} />
                        <span>View all {totalCount} photos</span>
                      </span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
