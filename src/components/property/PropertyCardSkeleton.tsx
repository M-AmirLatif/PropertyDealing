import type { CSSProperties } from 'react';

interface PropertyCardSkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function PropertyCardSkeleton({ className = '', style }: PropertyCardSkeletonProps) {
  return (
    <div
      className={`property-card-skeleton ${className}`.trim()}
      aria-hidden="true"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-default)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Top Image Skeleton */}
      <div
        className="survey-image-skeleton"
        style={{
          width: '100%',
          aspectRatio: '16/10',
          backgroundColor: 'var(--ivory-200)',
        }}
      />

      {/* Content Skeleton Lines */}
      <div
        style={{
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
          <div
            className="survey-image-skeleton"
            style={{ width: '40%', height: '12px', borderRadius: '2px', backgroundColor: 'var(--ivory-200)' }}
          />
          <div
            className="survey-image-skeleton"
            style={{ width: '25%', height: '12px', borderRadius: '2px', backgroundColor: 'var(--ivory-200)' }}
          />
        </div>

        <div
          className="survey-image-skeleton"
          style={{ width: '85%', height: '22px', borderRadius: '2px', backgroundColor: 'var(--ivory-200)' }}
        />

        <div
          className="survey-image-skeleton"
          style={{ width: '60%', height: '14px', borderRadius: '2px', backgroundColor: 'var(--ivory-200)' }}
        />

        <div
          className="hairline-top"
          style={{
            paddingTop: 'var(--space-3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            className="survey-image-skeleton"
            style={{ width: '45%', height: '24px', borderRadius: '2px', backgroundColor: 'var(--ivory-200)' }}
          />
          <div
            className="survey-image-skeleton"
            style={{ width: '20%', height: '12px', borderRadius: '2px', backgroundColor: 'var(--ivory-200)' }}
          />
        </div>
      </div>
    </div>
  );
}
