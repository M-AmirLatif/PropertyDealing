import type { CSSProperties } from 'react';

interface SectionNumberProps {
  number: string | number;
  isDark?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function SectionNumber({
  number,
  isDark = false,
  className = '',
  style,
}: SectionNumberProps) {
  const formattedNumber = typeof number === 'number' ? String(number).padStart(2, '0') : number;

  return (
    <span
      className={`section-number ${className}`.trim()}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: isDark ? 'var(--brass-500)' : 'var(--line-strong)',
        userSelect: 'none',
        ...style,
      }}
    >
      {formattedNumber}
    </span>
  );
}
