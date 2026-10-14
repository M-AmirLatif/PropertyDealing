import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  to?: string;
  linkText?: string;
  isDark?: boolean;
  className?: string;
  actionSlot?: ReactNode;
}

export function SectionHeader({
  label,
  title,
  description,
  to,
  linkText,
  isDark = false,
  className = '',
  actionSlot,
}: SectionHeaderProps) {
  return (
    <div
      className={`section-header ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
        }}
      >
        <span
          className="label"
          style={{
            color: isDark ? 'var(--brass-500)' : 'var(--copper-600)',
          }}
        >
          {label}
        </span>

        {to && linkText && (
          <Link
            to={to}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-label)',
              letterSpacing: 'var(--tracking-mono)',
              textTransform: 'uppercase',
              color: isDark ? 'var(--text-on-dark)' : 'var(--copper-600)',
              fontWeight: 500,
            }}
          >
            <span>{linkText}</span>
            <ArrowRight size={13} />
          </Link>
        )}

        {actionSlot}
      </div>

      <h2
        style={{
          fontSize: 'var(--fs-h2)',
          lineHeight: 'var(--lh-h2)',
          color: isDark ? 'var(--text-on-dark)' : 'var(--text-heading)',
          fontFamily: 'var(--font-display)',
          fontWeight: 450,
          margin: 0,
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            fontSize: 'var(--fs-body)',
            color: isDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)',
            lineHeight: 'var(--lh-body)',
            maxWidth: '65ch',
            marginTop: 'var(--space-2)',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
