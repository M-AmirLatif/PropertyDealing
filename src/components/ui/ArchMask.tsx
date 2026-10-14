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
  aspectRatio = '4/5',
  className = '',
  style,
}: ArchMaskProps) {
  // Clean architectural arch: rectangle whose top is an exact semicircle with radius = half width.
  // Using 9999px for top corners creates an exact semicircle top while leaving bottom corners square (0 0).
  const maskStyle: CSSProperties = {
    borderRadius: '9999px 9999px 0 0',
    overflow: 'hidden',
  };

  return (
    <div
      className={`arch-mask ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio,
        backgroundColor: 'transparent',
        ...maskStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
