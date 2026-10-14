import { Link } from 'react-router-dom';
import { LAHORE_AREAS } from '../../data/areas';
import { Container } from '../ui/Container';

export function AreaStrip() {
  return (
    <nav
      aria-label="Area quick index"
      className="hairline-top hairline-bottom"
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'var(--space-3) 0',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}
        >
          {/* Static leading label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
              paddingRight: 'var(--space-3)',
              borderRight: '1px solid var(--border)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--copper-600)',
                borderRadius: '50%',
              }}
              aria-hidden="true"
            />
            <span
              className="label"
              style={{
                color: 'var(--text-heading)',
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
              }}
            >
              LOCATIONS
            </span>
          </div>

          {/* Horizontally scrollable list */}
          <div
            className="area-strip-scroll"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '2px 0',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {LAHORE_AREAS.map((area, index) => (
              <span
                key={area.slug}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                }}
              >
                <Link
                  to={`/properties?area=${area.slug}`}
                  className="area-strip-link"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color var(--duration-fast) var(--ease-out)',
                    padding: '4px 2px',
                  }}
                >
                  {area.name}
                </Link>
                {index < LAHORE_AREAS.length - 1 && (
                  <span
                    aria-hidden="true"
                    style={{
                      color: 'var(--line-strong)',
                      fontSize: '0.625rem',
                      userSelect: 'none',
                    }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .area-strip-scroll::-webkit-scrollbar {
          display: none;
        }
        .area-strip-link:hover,
        .area-strip-link:focus-visible {
          color: 'var(--copper-600)';
          color: var(--copper-600) !important;
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}
