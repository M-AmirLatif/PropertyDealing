import type { ReactNode, CSSProperties } from 'react';

export type BadgeVariant =
  | 'available'
  | 'rented'
  | 'reserved'
  | 'furnished'
  | 'featured'
  | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: CSSProperties;
}

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  style,
}: BadgeProps) {
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'available':
        return {
          backgroundColor: 'var(--ivory-50, #FBF8F2)',
          color: '#134E2A',
          borderColor: 'rgba(19, 78, 42, 0.35)',
        };
      case 'rented':
        return {
          backgroundColor: 'var(--forest-900, #1F2A22)',
          color: 'var(--ivory-50, #FBF8F2)',
          borderColor: 'var(--forest-900, #1F2A22)',
        };
      case 'reserved':
        return {
          backgroundColor: 'var(--ivory-50, #FBF8F2)',
          color: '#8A3B14',
          borderColor: 'rgba(138, 59, 20, 0.35)',
        };
      case 'featured':
        return {
          backgroundColor: 'var(--ivory-50, #FBF8F2)',
          color: '#785108',
          borderColor: 'rgba(120, 81, 8, 0.35)',
        };
      case 'furnished':
        return {
          backgroundColor: 'var(--ivory-50, #FBF8F2)',
          color: 'var(--charcoal-900, #181A17)',
          borderColor: 'var(--border-strong)',
        };
      case 'neutral':
      default:
        return {
          backgroundColor: 'var(--ivory-50, #FBF8F2)',
          color: 'var(--charcoal-900, #181A17)',
          borderColor: 'var(--border-strong)',
        };
    }
  };

  return (
    <span
      className={`badge badge--${variant} ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        lineHeight: 1.25,
        whiteSpace: 'nowrap',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
        ...getVariantStyles(),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
