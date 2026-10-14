import { useState, useEffect, type CSSProperties } from 'react';
import { ImageOff } from 'lucide-react';

interface SurveyImageProps {
  src: string;
  srcSmall?: string;
  alt: string;
  aspectRatio?: string;
  position?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

// Global session cache of already-loaded image URLs to render instantly without shimmer
const loadedImageUrls = new Set<string>();

export function SurveyImage({
  src,
  srcSmall,
  alt,
  aspectRatio,
  position = '50% 50%',
  priority = false,
  className = '',
  style,
}: SurveyImageProps) {
  const [triedFallback, setTriedFallback] = useState(false);
  const currentSrc = triedFallback ? src : (srcSmall || src);

  const [isLoaded, setIsLoaded] = useState(() => priority || loadedImageUrls.has(currentSrc));
  const [hasError, setHasError] = useState(false);

  // Sync state whenever image path changes
  useEffect(() => {
    if (priority || loadedImageUrls.has(currentSrc)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    setHasError(false);
    setTriedFallback(false);
  }, [currentSrc, priority]);

  // Synchronously check if the image is already cached/complete in the browser
  const imgRef = (node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth > 0) {
      loadedImageUrls.add(currentSrc);
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }
  };

  const handleLoad = () => {
    loadedImageUrls.add(currentSrc);
    setIsLoaded(true);
  };

  // If first attempt fails (e.g. srcset candidate error), retry once with direct main src
  const handleError = () => {
    if (!triedFallback && srcSmall) {
      setTriedFallback(true);
      setIsLoaded(false);
    } else {
      setHasError(true);
    }
  };

  const srcSet = !triedFallback && srcSmall
    ? `${srcSmall} 800w, ${src} 1600w`
    : undefined;

  const sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px';

  return (
    <div
      className={`survey-image-wrap ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio,
        backgroundColor: '#EAE3D5', // Dominant warm ivory tone
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Warm Shimmer Skeleton before loaded */}
      {!isLoaded && !hasError && !priority && (
        <div
          className="survey-image-skeleton"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--ivory-200)',
            zIndex: 1,
          }}
        />
      )}

      {/* Error Fallback Tile */}
      {hasError ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'var(--ivory-200)',
            color: 'var(--text-muted)',
            padding: 'var(--space-4)',
            textAlign: 'center',
          }}
          role="img"
          aria-label={alt}
        >
          <ImageOff size={24} style={{ color: 'var(--copper-600)', opacity: 0.8 }} />
          <span
            className="label"
            style={{ fontSize: '0.6875rem', letterSpacing: '0.08em', color: 'var(--charcoal-500)' }}
          >
            Image Unavailable
          </span>
        </div>
      ) : (
        <img
          ref={imgRef}
          key={currentSrc + (triedFallback ? '-fallback' : '-primary')}
          src={currentSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: position,
            opacity: isLoaded ? 1 : 0,
            transition: isLoaded && loadedImageUrls.has(currentSrc)
              ? 'transform 350ms var(--ease-out)'
              : 'opacity 120ms ease-out, transform 350ms var(--ease-out)',
            display: 'block',
          }}
        />
      )}
    </div>
  );
}
