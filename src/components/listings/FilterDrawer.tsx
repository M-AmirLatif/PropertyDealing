import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, RotateCcw } from 'lucide-react';
import type { Property } from '../../types';
import type { Filters } from '../../lib/filters';
import { DEFAULT_FILTERS, applyFilters, countActiveFilters } from '../../lib/filters';
import { Button } from '../ui/Button';
import { FilterFields } from './FilterFields';

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeFilters: Filters;
  onApply: (draftFilters: Filters) => void;
  properties: Property[];
}

export function FilterDrawer({
  open,
  onOpenChange,
  activeFilters,
  onApply,
  properties,
}: FilterDrawerProps) {
  // Draft state maintained independently from URL while open
  const [draft, setDraft] = useState<Filters>(activeFilters);

  // Sync draft when opened
  useEffect(() => {
    if (open) {
      setDraft(activeFilters);
    }
  }, [open, activeFilters]);

  const handleFilterUpdate = (updates: Partial<Filters>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const handleClearAllDraft = () => {
    setDraft({
      ...DEFAULT_FILTERS,
      sort: draft.sort, // preserve chosen sort
    });
  };

  const matchingCount = applyFilters(properties, draft).length;
  const draftActiveCount = countActiveFilters(draft);

  const handleApplyClick = () => {
    onApply(draft);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(24, 26, 23, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            animation: 'fadeIn 150ms ease-out',
          }}
        />

        <Dialog.Content
          aria-describedby="filter-drawer-desc"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: '90svh',
            backgroundColor: 'var(--surface)',
            borderTop: '1px solid var(--border-strong)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            boxShadow: '0 -10px 40px rgba(24, 26, 23, 0.2)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Top Pull Indicator */}
          <div
            style={{
              width: '36px',
              height: '4px',
              backgroundColor: 'var(--line-strong)',
              borderRadius: '2px',
              margin: '8px auto 0 auto',
            }}
            aria-hidden="true"
          />

          {/* Sticky Drawer Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-3) var(--space-4)',
              borderBottom: '1px solid var(--border)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dialog.Title
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                Filter Register
              </Dialog.Title>
              {draftActiveCount > 0 && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    backgroundColor: 'var(--copper-600)',
                    color: '#fff',
                    padding: '2px 7px',
                    borderRadius: '10px',
                    fontWeight: 600,
                  }}
                >
                  {draftActiveCount}
                </span>
              )}
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close filter drawer without applying"
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-body)',
                  borderRadius: 'var(--radius-default)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <p id="filter-drawer-desc" style={{ display: 'none' }}>
            Adjust criteria to filter rental properties in Lahore
          </p>

          {/* Scrollable Body */}
          <div
            style={{
              padding: 'var(--space-4)',
              overflowY: 'auto',
              flex: 1,
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <FilterFields
              filters={draft}
              onFilterChange={handleFilterUpdate}
              properties={properties}
              idPrefix="drawer"
            />
          </div>

          {/* Sticky Drawer Footer */}
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--bg)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={handleClearAllDraft}
              disabled={draftActiveCount === 0}
              style={{
                height: '46px',
                padding: '0 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                backgroundColor: 'var(--surface)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: draftActiveCount === 0 ? 'var(--text-muted)' : 'var(--text-body)',
                cursor: draftActiveCount === 0 ? 'not-allowed' : 'pointer',
                opacity: draftActiveCount === 0 ? 0.6 : 1,
              }}
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>Reset</span>
            </button>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleApplyClick}
              style={{
                flex: 1,
                height: '46px',
                justifyContent: 'center',
              }}
            >
              Show {matchingCount} {matchingCount === 1 ? 'property' : 'properties'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
