import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import {
  FilterSidebar,
  FilterDrawer,
  ActiveFilters,
  SortSelect,
  ResultsGrid,
  EmptyState,
} from '../components/listings';
import { usePropertiesStore } from '../context/PropertiesContext';
import {
  parseFilters,
  applyFilters,
  sortProperties,
  countActiveFilters,
  filtersToSearchParams,
  type Filters,
  type SortOption,
} from '../lib/filters';
import { SITE } from '../config/site';

export default function Properties() {
  const { properties } = usePropertiesStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Parse filters directly from URL search params
  const currentFilters = useMemo(
    () => parseFilters(searchParams),
    [searchParams]
  );

  // Set document title
  useEffect(() => {
    document.title = `Properties for rent in Lahore — ${SITE.dealerName}`;
  }, []);

  // Save current search string to sessionStorage for "Back to results" in detail page
  useEffect(() => {
    const qStr = searchParams.toString();
    sessionStorage.setItem('last_properties_search', qStr ? `?${qStr}` : '');
  }, [searchParams]);

  // Restore scroll position on back navigation
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('properties_scroll_y');
    if (savedScroll) {
      window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' as ScrollBehavior });
    }
    const handleScroll = () => {
      sessionStorage.setItem('properties_scroll_y', String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    const filtered = applyFilters(properties, currentFilters);
    return sortProperties(filtered, currentFilters.sort);
  }, [properties, currentFilters]);

  // Update filters in URL
  const handleFilterChange = useCallback(
    (updates: Partial<Filters>) => {
      const nextFilters: Filters = { ...currentFilters, ...updates };
      const nextParams = filtersToSearchParams(nextFilters);
      setSearchParams(nextParams, { replace: true });
    },
    [currentFilters, setSearchParams]
  );

  // Clear all filters
  const handleClearAll = useCallback(() => {
    const nextParams = new URLSearchParams();
    if (currentFilters.sort !== 'newest') {
      nextParams.set('sort', currentFilters.sort);
    }
    setSearchParams(nextParams, { replace: true });
  }, [currentFilters.sort, setSearchParams]);

  // Handle Sort Change
  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      handleFilterChange({ sort: newSort });
    },
    [handleFilterChange]
  );

  const activeCount = countActiveFilters(currentFilters);
  const resultCount = filteredAndSortedProperties.length;

  return (
    <div className="properties-page">
      {/* 1. Page Header Section */}
      <Section variant="default" style={{ paddingBottom: 'var(--space-4)' }}>
        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              borderBottom: '1px solid var(--border)',
              paddingBottom: 'var(--space-5)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
              }}
            >
              <span
                className="label"
                style={{
                  color: 'var(--copper-600)',
                }}
              >
                PROPERTY INDEX · LAHORE
              </span>

              {/* Accessible Live Result Counter */}
              <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                }}
              >
                {resultCount === 0 ? (
                  <span style={{ color: 'var(--danger)' }}>No properties match</span>
                ) : (
                  <span>
                    <strong style={{ color: 'var(--text-heading)' }}>{resultCount}</strong>{' '}
                    {resultCount === 1 ? 'property' : 'properties'} listed
                  </span>
                )}
              </div>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h1)',
                lineHeight: 'var(--lh-h1)',
                color: 'var(--text-heading)',
                margin: 0,
              }}
            >
              Properties for rent
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--text-muted)',
                margin: 0,
                maxWidth: '65ch',
              }}
            >
              Architectural survey registers of houses, apartments, portions, and commercial spaces across Lahore.
            </p>
          </div>

          {/* 2. Mobile Compact Top Controls Bar (<1024px) */}
          <div
            className="properties-mobile-controls"
            style={{
              display: 'none',
              paddingTop: 'var(--space-3)',
              paddingBottom: 'var(--space-3)',
              gap: 'var(--space-2)',
              alignItems: 'center',
            }}
          >
            {/* Quick Keyword Search */}
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={15}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={currentFilters.q}
                onChange={(e) => handleFilterChange({ q: e.target.value })}
                placeholder="Search..."
                aria-label="Quick search area or keyword"
                style={{
                  width: '100%',
                  height: '42px',
                  paddingLeft: '32px',
                  paddingRight: currentFilters.q ? '32px' : '8px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-default)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-heading)',
                }}
              />
              {currentFilters.q && (
                <button
                  type="button"
                  onClick={() => handleFilterChange({ q: '' })}
                  aria-label="Clear keyword search"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile Filters Trigger Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label={`Open filter drawer. ${activeCount} active filters.`}
              style={{
                height: '42px',
                padding: '0 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: activeCount > 0 ? 'var(--ivory-200)' : 'var(--surface)',
                border: activeCount > 0 ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--text-heading)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span>Filters</span>
              {activeCount > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--copper-600)',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '1px 6px',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                  }}
                >
                  {activeCount}
                </span>
              )}
            </button>

            {/* Mobile Sort Dropdown */}
            <div style={{ flexShrink: 0 }}>
              <SortSelect
                id="mobile-sort-select"
                value={currentFilters.sort}
                onChange={handleSortChange}
              />
            </div>
          </div>

          {/* 3. Main Discovery Two-Column Layout */}
          <div
            className="properties-main-layout"
            style={{
              display: 'flex',
              gap: 'var(--space-6)',
              marginTop: 'var(--space-4)',
              alignItems: 'flex-start',
            }}
          >
            {/* Desktop Sticky Sidebar (Hidden on <1024px) */}
            <div className="properties-sidebar-col">
              <FilterSidebar
                filters={currentFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
                properties={properties}
              />
            </div>

            {/* Results Column */}
            <main
              className="properties-results-col"
              style={{
                flex: 1,
                minWidth: 0,
                width: '100%',
              }}
            >
              {/* Desktop Header Controls (Sort & Active Chips) */}
              <div
                className="properties-results-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <ActiveFilters
                    filters={currentFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={handleClearAll}
                  />
                </div>

                <div className="properties-desktop-sort">
                  <SortSelect
                    id="desktop-sort-select"
                    value={currentFilters.sort}
                    onChange={handleSortChange}
                  />
                </div>
              </div>

              {/* Results Grid or Empty State */}
              {resultCount === 0 ? (
                <EmptyState
                  onClearAll={handleClearAll}
                  properties={properties}
                />
              ) : (
                <ResultsGrid
                  properties={filteredAndSortedProperties}
                  sort={currentFilters.sort}
                />
              )}
            </main>
          </div>
        </Container>
      </Section>

      {/* 4. Mobile Bottom Sheet Drawer */}
      <FilterDrawer
        open={isMobileDrawerOpen}
        onOpenChange={setIsMobileDrawerOpen}
        activeFilters={currentFilters}
        onApply={(draft) => {
          const nextParams = filtersToSearchParams(draft);
          setSearchParams(nextParams, { replace: true });
        }}
        properties={properties}
      />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1023px) {
          .properties-sidebar-col {
            display: none !important;
          }
          .properties-mobile-controls {
            display: flex !important;
          }
          .properties-desktop-sort {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
