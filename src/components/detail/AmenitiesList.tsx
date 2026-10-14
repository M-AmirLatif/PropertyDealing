import {
  Car,
  Trees,
  Home,
  Zap,
  ShieldCheck,
  Droplets,
  Utensils,
  Sun,
  Wifi,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';

interface AmenitiesListProps {
  amenities: string[];
}

function getAmenityIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('car') || lower.includes('parking') || lower.includes('garage')) {
    return <Car size={16} style={{ color: 'var(--copper-600)' }} />;
  }
  if (lower.includes('lawn') || lower.includes('garden') || lower.includes('green')) {
    return <Trees size={16} style={{ color: 'var(--forest-900)' }} />;
  }
  if (lower.includes('servant') || lower.includes('quarter') || lower.includes('room')) {
    return <Home size={16} style={{ color: 'var(--charcoal-700)' }} />;
  }
  if (lower.includes('generator') || lower.includes('ups') || lower.includes('backup') || lower.includes('solar')) {
    return <Zap size={16} style={{ color: 'var(--brass-500)' }} />;
  }
  if (lower.includes('security') || lower.includes('guard') || lower.includes('gated')) {
    return <ShieldCheck size={16} style={{ color: 'var(--forest-900)' }} />;
  }
  if (lower.includes('water') || lower.includes('filter') || lower.includes('bore')) {
    return <Droplets size={16} style={{ color: 'var(--copper-600)' }} />;
  }
  if (lower.includes('kitchen') || lower.includes('appliance') || lower.includes('stove')) {
    return <Utensils size={16} style={{ color: 'var(--charcoal-700)' }} />;
  }
  if (lower.includes('balcony') || lower.includes('terrace') || lower.includes('rooftop')) {
    return <Sun size={16} style={{ color: 'var(--brass-500)' }} />;
  }
  if (lower.includes('internet') || lower.includes('fiber') || lower.includes('wifi')) {
    return <Wifi size={16} style={{ color: 'var(--copper-600)' }} />;
  }
  if (lower.includes('lift') || lower.includes('elevator')) {
    return <ArrowUpDown size={16} style={{ color: 'var(--forest-900)' }} />;
  }
  return <CheckCircle2 size={16} style={{ color: 'var(--copper-600)' }} />;
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div style={{ margin: 'var(--space-6) 0' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          color: 'var(--text-heading)',
          margin: '0 0 var(--space-4) 0',
          fontWeight: 600,
        }}
      >
        Amenities &amp; Facilities
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {amenities.map((item) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
            }}
          >
            <span style={{ flexShrink: 0, display: 'flex' }}>
              {getAmenityIcon(item)}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-heading)',
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
