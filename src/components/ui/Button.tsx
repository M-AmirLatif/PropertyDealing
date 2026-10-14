import { useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

type ButtonAsButton = BaseButtonProps & {
  to?: never;
  href?: never;
  type?: 'button' | 'submit' | 'reset';
};

type ButtonAsLink = BaseButtonProps & {
  to: string;
  href?: never;
  type?: never;
};

type ButtonAsAnchor = BaseButtonProps & {
  href: string;
  to?: never;
  target?: string;
  rel?: string;
  type?: never;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  disabled = false,
  className = '',
  style,
  onClick,
  ...rest
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Size styling
  const sizeStyles: Record<ButtonSize, CSSProperties> = {
    sm: {
      padding: '0 var(--space-4)',
      fontSize: 'var(--fs-label)',
      minHeight: '44px',
      gap: 'var(--space-2)',
    },
    md: {
      padding: '0 var(--space-5)',
      fontSize: '0.875rem',
      minHeight: '48px',
      gap: 'var(--space-3)',
    },
    lg: {
      padding: '0 var(--space-6)',
      fontSize: '1rem',
      minHeight: '54px',
      gap: 'var(--space-3)',
    },
  };

  // Base variant styles
  const getVariantStyles = (): CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isPressed ? 'var(--forest-700)' : isHovered ? '#151D17' : 'var(--forest-900)',
          color: 'var(--ivory-50)',
          border: '1px solid var(--forest-900)',
        };
      case 'secondary':
        return {
          backgroundColor: isHovered ? 'var(--ivory-200)' : 'transparent',
          color: 'var(--text-heading)',
          border: '1px solid var(--border-strong)',
        };
      case 'ghost':
        return {
          backgroundColor: isHovered ? 'rgba(0,0,0,0.04)' : 'transparent',
          color: isHovered ? 'var(--text-heading)' : 'var(--text-body)',
          border: '1px solid transparent',
        };
      case 'whatsapp':
        return {
          backgroundColor: isPressed ? 'var(--whatsapp-hover)' : isHovered ? 'var(--whatsapp-hover)' : 'var(--whatsapp)',
          color: '#FFFFFF',
          border: '1px solid var(--whatsapp)',
        };
    }
  };

  const combinedStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-default)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'all var(--duration-fast) var(--ease-out)',
    position: 'relative',
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...getVariantStyles(),
    ...style,
  };

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          size={size === 'sm' ? 14 : 16}
          style={{
            transform: isHovered && !disabled ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform var(--duration-fast) var(--ease-out)',
            flexShrink: 0,
          }}
        />
      )}
    </>
  );

  const interactionProps = {
    onMouseEnter: () => !disabled && setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false);
      setIsPressed(false);
    },
    onMouseDown: () => !disabled && setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
  };

  if ('to' in rest && rest.to) {
    return (
      <Link
        to={rest.to}
        className={`btn btn--${variant} btn-pressable ${className}`.trim()}
        style={combinedStyles}
        onClick={onClick}
        {...interactionProps}
      >
        {content}
      </Link>
    );
  }

  if ('href' in rest && rest.href) {
    return (
      <a
        href={rest.href}
        target={rest.target}
        rel={rest.rel || (rest.target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={`btn btn--${variant} btn-pressable ${className}`.trim()}
        style={combinedStyles}
        onClick={onClick}
        {...interactionProps}
      >
        {content}
      </a>
    );
  }

  const { type = 'button' } = rest as ButtonAsButton;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn--${variant} btn-pressable ${className}`.trim()}
      style={combinedStyles}
      onClick={onClick}
      {...interactionProps}
    >
      {content}
    </button>
  );
}
