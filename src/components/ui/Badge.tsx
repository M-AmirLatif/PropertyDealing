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
          backgroundColor: 'rgba(47, 107, 63, 0.1)',
          color: '#1D5A30',
          borderColor: 'rgba(47, 107, 63, 0.28)',
        };
      case 'rented':
      case 'reserved':
        return {
          backgroundColor: 'rgba(138, 106, 31, 0.1)',
          color: '#705310',
          borderColor: 'rgba(138, 106, 31, 0.28)',
        };
      case 'featured':
        return {
          backgroundColor: 'rgba(176, 138, 78, 0.14)',
          color: '#7A5B22',
          borderColor: 'rgba(176, 138, 78, 0.4)',
        };
      case 'furnished':
        return {
          backgroundColor: 'rgba(43, 46, 41, 0.08)',
          color: 'var(--charcoal-700)',
          borderColor: 'var(--border-strong)',
        };
      case 'neutral':
      default:
        return {
          backgroundColor: 'rgba(217, 208, 190, 0.35)',
          color: 'var(--charcoal-700)',
          borderColor: 'var(--border)',
        };
    }
  };

  return (
    <span
      className={`badge badge--${variant} ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 9px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6875rem',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
        ...getVariantStyles(),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
