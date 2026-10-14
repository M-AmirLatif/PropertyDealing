import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

type SectionVariant = 'default' | 'inset' | 'dark' | 'ivory-200';

type SectionProps<T extends ElementType = 'section'> = {
  as?: T;
  variant?: SectionVariant;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Section<T extends ElementType = 'section'>({
  as,
  variant = 'default',
  className = '',
  children,
  style,
  ...props
}: SectionProps<T>) {
  const Component = as || 'section';

  const variantClass = {
    default: 'section',
    inset: 'section section--inset',
    dark: 'section section--dark',
    'ivory-200': 'section section--ivory-200',
  }[variant];

  return (
    <Component
      className={`${variantClass} ${className}`.trim()}
      data-surface={variant === 'dark' ? 'dark' : undefined}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
