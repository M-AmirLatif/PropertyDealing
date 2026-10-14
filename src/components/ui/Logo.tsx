import { Link } from 'react-router-dom';
import { SITE } from '../../config/site';

interface LogoProps {
  isDark?: boolean;
  className?: string;
}

export function Logo({ isDark = false, className = '' }: LogoProps) {
  const textColor = isDark ? 'var(--text-on-dark)' : 'var(--text-heading)';
  const markColor = isDark ? 'var(--brass-500)' : 'var(--forest-900)';
  const subtitleColor = isDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)';

  return (
    <Link
      to="/"
      className={`logo ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        textDecoration: 'none',
        userSelect: 'none',
      }}
      aria-label={`${SITE.dealerName} — Home`}
    >
      {/* Abstract Pointed Arch Architectural Mark */}
      <svg
        width="22"
        height="28"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <path
          d="M12 2C6.477 7 2 13.5 2 21V30H22V21C22 13.5 17.523 7 12 2Z"
          stroke={markColor}
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M12 9C8.686 12.5 6 16.5 6 21V30H18V21C18 16.5 15.314 12.5 12 9Z"
          fill={markColor}
          fillOpacity={isDark ? '0.25' : '0.15'}
          stroke={markColor}
          strokeWidth="1.25"
        />
        <circle cx="12" cy="18" r="1.5" fill={markColor} />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1875rem',
            fontWeight: 550,
            letterSpacing: '-0.01em',
            color: textColor,
          }}
        >
          {SITE.dealerName}
        </span>
        <span
          className="label"
          style={{
            fontSize: '0.625rem',
            color: subtitleColor,
            letterSpacing: '0.14em',
            marginTop: '2px',
          }}
        >
          {SITE.descriptor} · DEMO
        </span>
      </div>
    </Link>
  );
}
