import { Link } from 'react-router-dom';
import { MapPin, Info } from 'lucide-react';
import { LAHORE_AREAS, getAreaPropertyCount } from '../../data/areas';
import { usePropertiesStore } from '../../context/PropertiesContext';

interface NodePosition {
  slug: string;
  x: number;
  y: number;
}

const SCHEMATIC_COORDS: NodePosition[] = [
  { slug: 'gulberg', x: 400, y: 130 },
  { slug: 'model-town', x: 380, y: 220 },
  { slug: 'johar-town', x: 270, y: 200 },
  { slug: 'wapda-town', x: 230, y: 290 },
  { slug: 'valencia-town', x: 200, y: 370 },
  { slug: 'bahria-town', x: 130, y: 230 },
  { slug: 'dha-phase-5', x: 550, y: 190 },
  { slug: 'dha-phase-6', x: 670, y: 250 },
  { slug: 'askari-11', x: 660, y: 130 },
];

const CONNECTIONS = [
  ['gulberg', 'model-town'],
  ['gulberg', 'dha-phase-5'],
  ['gulberg', 'askari-11'],
  ['model-town', 'johar-town'],
  ['johar-town', 'wapda-town'],
  ['johar-town', 'bahria-town'],
  ['wapda-town', 'valencia-town'],
  ['dha-phase-5', 'dha-phase-6'],
  ['dha-phase-5', 'askari-11'],
];

export function ServiceAreaMap() {
  const { properties } = usePropertiesStore();

  const getCoords = (slug: string) => {
    return SCHEMATIC_COORDS.find((c) => c.slug === slug) || { x: 400, y: 200 };
  };

  return (
    <div
      id="service-area"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-default)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ marginBottom: 'var(--space-4)', maxWidth: '640px' }}>
        <span
          className="label"
          style={{
            color: 'var(--copper-600)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          TERRITORIAL COVERAGE SCHEMATIC
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.65rem',
            color: 'var(--text-heading)',
            margin: '0 0 var(--space-2) 0',
          }}
        >
          Lahore Service Network
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text-muted)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Click any territory node to explore current rental registers in that locality.
        </p>
      </div>

      {/* Stylized Vector Schematic (Desktop & Tablet) */}
      <div
        className="service-schematic-svg-wrap"
        style={{
          width: '100%',
          aspectRatio: '16/9',
          maxHeight: '440px',
          backgroundColor: 'var(--ivory-100)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-default)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 800 440"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          aria-hidden="true"
        >
          {/* Subtle Grid Background Lines */}
          <defs>
            <pattern id="schematicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeOpacity="0.6" />
            </pattern>
          </defs>
          <rect width="800" height="440" fill="url(#schematicGrid)" />

          {/* Connection Lines */}
          {CONNECTIONS.map(([a, b]) => {
            const start = getCoords(a);
            const end = getCoords(b);
            return (
              <line
                key={`${a}-${b}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="var(--line-strong)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            );
          })}

          {/* Nodes */}
          {SCHEMATIC_COORDS.map((node) => {
            const area = LAHORE_AREAS.find((a) => a.slug === node.slug);
            if (!area) return null;
            const count = getAreaPropertyCount(area.slug, properties);

            return (
              <g key={node.slug} className="schematic-node-group">
                {/* Node Outer Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="14"
                  fill="var(--surface)"
                  stroke="var(--brass-500)"
                  strokeWidth="1.5"
                />
                {/* Node Inner Core */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  fill="var(--forest-900)"
                />

                {/* Node Text Label */}
                <text
                  x={node.x}
                  y={node.y - 18}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-heading)"
                  letterSpacing="0.04em"
                >
                  {area.name.toUpperCase()}
                </text>

                <text
                  x={node.x}
                  y={node.y + 24}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="9"
                  fill="var(--text-muted)"
                >
                  ({count} {count === 1 ? 'entry' : 'entries'})
                </text>
              </g>
            );
          })}
        </svg>

        {/* HTML Link Overlays positioned exactly on each node */}
        {SCHEMATIC_COORDS.map((node) => {
          const area = LAHORE_AREAS.find((a) => a.slug === node.slug);
          if (!area) return null;
          const leftPct = (node.x / 800) * 100;
          const topPct = (node.y / 440) * 100;

          return (
            <Link
              key={node.slug}
              to={`/properties?area=${node.slug}`}
              aria-label={`Explore rental properties in ${area.name}`}
              style={{
                position: 'absolute',
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                zIndex: 10,
              }}
            />
          );
        })}
      </div>

      {/* Accessible Mobile Fallback List */}
      <div
        className="service-schematic-mobile-list"
        style={{
          display: 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '8px',
          marginTop: 'var(--space-3)',
        }}
      >
        {LAHORE_AREAS.map((area) => {
          const count = getAreaPropertyCount(area.slug, properties);
          return (
            <Link
              key={area.slug}
              to={`/properties?area=${area.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                backgroundColor: 'var(--ivory-100)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} style={{ color: 'var(--copper-600)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                  {area.name}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Caption & Footnote */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-2)',
          marginTop: 'var(--space-3)',
          paddingTop: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Info size={11} style={{ color: 'var(--brass-500)' }} />
          <span>Schematic only — not a map and not to scale.</span>
        </span>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
          }}
        >
          Sample sectors for the Lahore demonstration — expandable to additional housing schemes and other cities.
        </span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .service-schematic-svg-wrap {
            display: none !important;
          }
          .service-schematic-mobile-list {
            display: grid !important;
          }
        }
      `}</style>
    </div>
  );
}
