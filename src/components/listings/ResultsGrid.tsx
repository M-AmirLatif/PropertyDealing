import { motion, AnimatePresence } from 'motion/react';
import type { Property } from '../../types';
import type { SortOption } from '../../lib/filters';
import { PropertyCard } from '../property/PropertyCard';

interface ResultsGridProps {
  properties: Property[];
  sort: SortOption;
}

export function ResultsGrid({ properties }: ResultsGridProps) {
  return (
    <div>
      <ul
        role="list"
        className="results-grid"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-4)',
          alignItems: 'start',
        }}
      >
        <AnimatePresence mode="popLayout">
          {properties.map((property, index) => (
            <motion.li
              key={property.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.22,
                delay: Math.min(index * 0.03, 0.12),
                ease: 'easeOut',
              }}
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <PropertyCard
                property={property}
                variant="compact"
                priority={index < 4}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <style>{`
        @media (max-width: 639px) {
          .results-grid {
            grid-template-columns: 1fr !important;
          }
          .results-grid-lead-item {
            grid-column: span 1 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .results-grid li {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
