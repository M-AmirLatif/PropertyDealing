import { useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react';

interface IconButtonProps {
  'aria-label': string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

export function IconButton({
  'aria-label': ariaLabel,
  children,
  onClick,
  variant = 'default',
  size = 'md',
  className = '',
  style,
  disabled = false,
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const dimension = {
    sm: '44px',
    md: '48px',
    lg: '52px',
  }[size];

  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: isHovered ? 'var(--ivory-200)' : 'transparent',
          border: '1px solid var(--border-strong)',
          color: 'var(--text-heading)',
        };
      case 'dark':
        return {
          backgroundColor: isHovered ? 'rgba(251, 248, 242, 0.12)' : 'transparent',
          border: '1px solid var(--border-on-dark)',
          color: 'var(--text-on-dark)',
        };
      case 'default':
      default:
        return {
          backgroundColor: isHovered ? 'var(--ivory-200)' : 'transparent',
          border: '1px solid transparent',
          color: 'var(--text-heading)',
        };
    }
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`icon-btn icon-btn--${variant} ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dimension,
        height: dimension,
        borderRadius: 'var(--radius-default)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all var(--duration-fast) var(--ease-out)',
        flexShrink: 0,
        lineHeight: 0,
        ...getVariantStyles(),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
