import type { ReactNode, CSSProperties } from 'react';

interface PropertyGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
  style?: CSSProperties;
}

export function PropertyGrid({
  children,
  columns = 3,
  className = '',
  style,
}: PropertyGridProps) {
  const minWidth = columns === 2 ? '360px' : columns === 4 ? '280px' : '320px';

  return (
    <div
      className={`property-grid ${className}`.trim()}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minWidth}), 1fr))`,
        gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
