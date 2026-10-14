import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = 'div'>({
  as,
  className = '',
  children,
  style,
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={`container ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
