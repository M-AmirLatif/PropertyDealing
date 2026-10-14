import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import type { Property } from '../../types';
import { padRef } from '../../lib/format';

interface DetailBreadcrumbProps {
  property: Property;
}

export function DetailBreadcrumb({ property }: DetailBreadcrumbProps) {
  const savedSearch = typeof window !== 'undefined'
    ? sessionStorage.getItem('last_properties_search') || ''
    : '';

  const backUrl = `/properties${savedSearch}`;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) 0',
        marginBottom: 'var(--space-3)',
      }}
    >
      {/* "Back to results" link preserving previous filters */}
      <Link
        to={backUrl}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--copper-600)',
          textDecoration: 'none',
          padding: '4px 8px',
          borderRadius: 'var(--radius-default)',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          transition: 'border-color var(--duration-fast)',
        }}
      >
        <ArrowLeft size={13} aria-hidden="true" />
        <span>Back to results</span>
      </Link>

      {/* Structured Breadcrumbs */}
      <nav aria-label="Breadcrumb">
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '6px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          <li>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={10} style={{ color: 'var(--line-strong)' }} />
          </li>
          <li>
            <Link to="/properties" style={{ color: 'inherit', textDecoration: 'none' }}>
              Properties
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={10} style={{ color: 'var(--line-strong)' }} />
          </li>
          <li>
            <Link
              to={`/properties?area=${property.areaSlug}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {property.area}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={10} style={{ color: 'var(--line-strong)' }} />
          </li>
          <li aria-current="page" style={{ color: 'var(--charcoal-900)', fontWeight: 600 }}>
            REF #{padRef(property.refNo)}
          </li>
        </ol>
      </nav>
    </div>
  );
}
