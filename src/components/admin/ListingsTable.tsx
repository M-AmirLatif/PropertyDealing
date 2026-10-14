import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, ExternalLink, Star } from 'lucide-react';
import type { Property, AvailabilityStatus } from '../../types';
import { padRef, formatRent, PROPERTY_TYPE_LABELS } from '../../lib/format';
import { Button } from '../ui/Button';
import { ListingRowCard } from './ListingRowCard';

interface ListingsTableProps {
  properties: Property[];
  onAddProperty: () => void;
  onEditProperty: (property: Property) => void;
  onStatusChange: (id: string, status: AvailabilityStatus) => void;
  onToggleFeatured: (id: string, current: boolean) => void;
}

export function ListingsTable({
  properties,
  onAddProperty,
  onEditProperty,
  onStatusChange,
  onToggleFeatured,
}: ListingsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AvailabilityStatus>('all');

  // Filter properties based on search and optional status filter
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchArea = item.area.toLowerCase().includes(q);
      const matchRef = padRef(item.refNo).includes(q) || String(item.refNo).includes(q);
      const matchType = (PROPERTY_TYPE_LABELS[item.type] || item.type).toLowerCase().includes(q);
      return matchTitle || matchArea || matchRef || matchType;
    });
  }, [properties, searchQuery, statusFilter]);

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-default)',
        padding: 'clamp(1rem, 2.5vw, 1.75rem)',
        marginBottom: 'var(--space-6)',
      }}
    >
      {/* Table Header Strip & Actions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
          paddingBottom: 'var(--space-3)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div>
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              display: 'block',
              marginBottom: '2px',
            }}
          >
            ACTIVE INVENTORY
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-heading)',
              margin: 0,
            }}
          >
            Listings Manager ({properties.length})
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Quick Search */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="search"
              placeholder="Search ref, title, area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter listings by title, reference or area"
              style={{
                width: '100%',
                padding: '6px 10px 6px 30px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                backgroundColor: 'var(--ivory-50)',
                color: 'var(--text-heading)',
              }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | AvailabilityStatus)}
            aria-label="Filter inventory by status"
            style={{
              padding: '6px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-default)',
              backgroundColor: 'var(--ivory-50)',
              color: 'var(--text-heading)',
            }}
          >
            <option value="all">All statuses</option>
            <option value="available">Available only</option>
            <option value="available-soon">Available soon</option>
            <option value="rented">Rented only</option>
          </select>

          {/* Add Property Button */}
          <Button type="button" variant="primary" size="sm" onClick={onAddProperty}>
            <Plus size={14} style={{ marginRight: '6px' }} />
            Add property
          </Button>
        </div>
      </div>

      {/* Desktop Table (hidden below 860px via CSS in-line style query) */}
      <div className="admin-listings-desktop-wrapper" style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.8125rem',
          }}
        >
          <caption className="sr-only">Inventory listings table with inline editing and status toggling</caption>
          <thead>
            <tr
              style={{
                borderBottom: '1.5px solid var(--border-strong)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              <th scope="col" style={{ padding: '8px 10px', width: '56px' }}>Photo</th>
              <th scope="col" style={{ padding: '8px 10px', width: '70px' }}>REF</th>
              <th scope="col" style={{ padding: '8px 10px' }}>Title &amp; Sector</th>
              <th scope="col" style={{ padding: '8px 10px', width: '100px' }}>Type</th>
              <th scope="col" style={{ padding: '8px 10px', width: '130px' }}>Rent</th>
              <th scope="col" style={{ padding: '8px 10px', width: '150px' }}>Status</th>
              <th scope="col" style={{ padding: '8px 10px', width: '90px' }}>Featured</th>
              <th scope="col" style={{ padding: '8px 10px', width: '160px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                  }}
                >
                  No listings match the current search criteria.
                </td>
              </tr>
            ) : (
              filteredProperties.map((prop) => {
                const thumb = prop.images[0]?.srcSmall || prop.images[0]?.src || '/images/site/placeholder-property.svg';
                return (
                  <tr
                    key={prop.id}
                    style={{
                      borderBottom: '1px solid var(--border)',
                      transition: 'background-color 0.1s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ivory-100)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Thumbnail */}
                    <td style={{ padding: '8px 10px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-default)',
                          overflow: 'hidden',
                          backgroundColor: 'var(--ivory-200)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <img
                          src={thumb}
                          alt=""
                          aria-hidden="true"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                      </div>
                    </td>

                    {/* REF */}
                    <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', color: 'var(--text-brass)', fontWeight: 600 }}>
                      #{padRef(prop.refNo)}
                    </td>

                    {/* Title & Area */}
                    <td style={{ padding: '8px 10px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          color: 'var(--text-heading)',
                          fontSize: '0.875rem',
                          marginBottom: '2px',
                        }}
                      >
                        {prop.title}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {prop.area}
                      </div>
                    </td>

                    {/* Type */}
                    <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', textTransform: 'capitalize' }}>
                      {PROPERTY_TYPE_LABELS[prop.type] || prop.type}
                    </td>

                    {/* Rent */}
                    <td style={{ padding: '8px 10px', fontWeight: 600, color: 'var(--forest-900)' }}>
                      {formatRent(prop.rentPKR)}
                    </td>

                    {/* Inline Status Select */}
                    <td style={{ padding: '8px 10px' }}>
                      <label htmlFor={`status-table-${prop.id}`} className="sr-only">
                        Status for {prop.title}
                      </label>
                      <select
                        id={`status-table-${prop.id}`}
                        value={prop.status}
                        onChange={(e) => onStatusChange(prop.id, e.target.value as AvailabilityStatus)}
                        style={{
                          width: '100%',
                          padding: '4px 6px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          borderRadius: 'var(--radius-default)',
                          border: '1px solid var(--border-strong)',
                          backgroundColor:
                            prop.status === 'available'
                              ? 'rgba(40, 70, 45, 0.08)'
                              : prop.status === 'available-soon'
                              ? 'rgba(180, 100, 30, 0.08)'
                              : 'rgba(120, 120, 120, 0.1)',
                          color: 'var(--text-heading)',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="available">Available</option>
                        <option value="available-soon">Available Soon</option>
                        <option value="rented">Rented</option>
                      </select>
                    </td>

                    {/* Featured Toggle */}
                    <td style={{ padding: '8px 10px' }}>
                      <button
                        type="button"
                        onClick={() => onToggleFeatured(prop.id, prop.featured)}
                        title={prop.featured ? 'Featured on homepage. Click to toggle.' : 'Not featured. Click to toggle.'}
                        aria-label={`Toggle featured for ${prop.title}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6875rem',
                          borderRadius: 'var(--radius-default)',
                          border: `1px solid ${prop.featured ? 'var(--brass-500)' : 'var(--border)'}`,
                          backgroundColor: prop.featured ? 'rgba(212, 160, 23, 0.15)' : 'transparent',
                          color: prop.featured ? 'var(--brass-600, #966f12)' : 'var(--text-muted)',
                          cursor: 'pointer',
                        }}
                      >
                        <Star
                          size={12}
                          fill={prop.featured ? 'currentColor' : 'none'}
                          stroke="currentColor"
                        />
                        {prop.featured ? 'Yes' : 'No'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => onEditProperty(prop)}
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        >
                          <Edit2 size={12} style={{ marginRight: '4px' }} />
                          Edit
                        </Button>

                        <Link
                          to={`/properties/${prop.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open public listing in new tab"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px 6px',
                            borderRadius: 'var(--radius-default)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-muted)',
                            backgroundColor: 'var(--ivory-100)',
                            textDecoration: 'none',
                          }}
                        >
                          <ExternalLink size={13} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (hidden on desktop via CSS class) */}
      <div
        className="admin-listings-mobile-cards"
        style={{
          display: 'none', // toggled by CSS media query in index.css
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        {filteredProperties.length === 0 ? (
          <p
            style={{
              padding: '2rem',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            No listings match the current search criteria.
          </p>
        ) : (
          filteredProperties.map((prop) => (
            <ListingRowCard
              key={prop.id}
              property={prop}
              onEdit={onEditProperty}
              onStatusChange={onStatusChange}
              onToggleFeatured={onToggleFeatured}
            />
          ))
        )}
      </div>
    </div>
  );
}
