import type { Area, Property } from '../types';

/**
 * DEMONSTRATION DATA — fictional areas in Lahore.
 * Property counts are computed dynamically from properties to guarantee consistency.
 */
export const LAHORE_AREAS: Area[] = [
  {
    slug: 'dha-phase-5',
    name: 'DHA Phase 5',
    city: 'Lahore',
    blurb: 'Established upscale residential sector known for wide avenues and landscaped sector parks.',
    coverPropertyId: 'P-001',
  },
  {
    slug: 'dha-phase-6',
    name: 'DHA Phase 6',
    city: 'Lahore',
    blurb: 'Modern master-planned sector featuring contemporary architecture and expansive boulevards.',
    coverPropertyId: 'P-002',
  },
  {
    slug: 'bahria-town',
    name: 'Bahria Town',
    city: 'Lahore',
    blurb: 'Gated master-planned community offering continuous utility provisioning and family amenities.',
    coverPropertyId: 'P-004',
  },
  {
    slug: 'johar-town',
    name: 'Johar Town',
    city: 'Lahore',
    blurb: 'Centrally situated residential locality with immediate access to prominent markets and transit.',
    coverPropertyId: 'P-005',
  },
  {
    slug: 'gulberg',
    name: 'Gulberg',
    city: 'Lahore',
    blurb: 'Historic urban center hosting corporate headquarters, luxury apartments, and commercial dining.',
    coverPropertyId: 'P-007',
  },
  {
    slug: 'model-town',
    name: 'Model Town',
    city: 'Lahore',
    blurb: 'Historic garden suburb characterized by mature tree canopy and quiet residential lanes.',
    coverPropertyId: 'P-011',
  },
  {
    slug: 'wapda-town',
    name: 'Wapda Town',
    city: 'Lahore',
    blurb: 'Established suburban housing scheme offering accessible family rentals and local bazaars.',
    coverPropertyId: 'P-012',
  },
  {
    slug: 'valencia-town',
    name: 'Valencia Town',
    city: 'Lahore',
    blurb: 'Peaceful planned neighborhood with underground utilities and community commercial centers.',
    coverPropertyId: 'P-013',
  },
  {
    slug: 'askari-11',
    name: 'Askari 11',
    city: 'Lahore',
    blurb: 'Secure gated residential development providing gated security checkpoints and family parks.',
    coverPropertyId: 'P-014',
  },
];

/**
 * Computes property count for a given area slug from the dynamic properties dataset
 */
export function getAreaPropertyCount(areaSlug: string, properties: Property[]): number {
  return properties.filter((p) => p.areaSlug === areaSlug).length;
}
