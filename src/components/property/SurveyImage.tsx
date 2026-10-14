import { useState, type CSSProperties } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const srcSet = srcSmall
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
      {!isLoaded && !hasError && (
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
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: position,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity var(--duration-normal) var(--ease-out), transform 350ms var(--ease-out)',
            display: 'block',
          }}
        />
      )}
    </div>
  );
}
