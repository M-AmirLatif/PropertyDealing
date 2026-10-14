import type { ReactNode } from 'react';

interface ChipProps {
  children?: ReactNode;
  label?: string;
  selected?: boolean;
  onClick?: () => void;
  count?: number;
  className?: string;
  disabled?: boolean;
  'aria-pressed'?: boolean;
}

export function Chip({
  children,
  label,
  selected = false,
  onClick,
  count,
  className = '',
  disabled = false,
  'aria-pressed': ariaPressed,
}: ChipProps) {
  const displayText = children || label;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={ariaPressed !== undefined ? ariaPressed : selected}
      className={`chip ${selected ? 'chip--selected' : ''} ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-label)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        backgroundColor: selected ? 'var(--forest-900)' : 'transparent',
        color: selected ? 'var(--ivory-50)' : 'var(--charcoal-700)',
        border: selected ? '1px solid var(--forest-900)' : '1px solid var(--border-strong)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--duration-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        minHeight: '34px',
        userSelect: 'none',
      }}
    >
      <span>{displayText}</span>
      {count !== undefined && (
        <span
          style={{
            fontSize: '0.68rem',
            opacity: selected ? 0.85 : 0.6,
            paddingLeft: '2px',
          }}
        >
          ({count})
        </span>
      )}
    </button>
  );
}
