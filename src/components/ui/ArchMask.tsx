import type { ReactNode, CSSProperties } from 'react';

interface ArchMaskProps {
  children: ReactNode;
  aspectRatio?: string;
  type?: 'rounded' | 'pointed';
  className?: string;
  style?: CSSProperties;
}

export function ArchMask({
  children,
  aspectRatio = '3/4',
  type = 'rounded',
  className = '',
  style,
}: ArchMaskProps) {
  // Rounded arch uses pure CSS border-radius (999px 999px 0 0)
  // Pointed arch uses an SVG path or pointed curve
  const maskStyle: CSSProperties =
    type === 'rounded'
      ? {
          borderRadius: '999px 999px 2px 2px',
          overflow: 'hidden',
        }
      : {
          borderRadius: '50% 50% 2px 2px / 75% 75% 2px 2px',
          overflow: 'hidden',
        };

  return (
    <div
      className={`arch-mask ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        backgroundColor: 'var(--ivory-200)',
        border: '1px solid var(--border)',
        ...maskStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
