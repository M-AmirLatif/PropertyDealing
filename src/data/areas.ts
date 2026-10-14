import type { Area, Property } from '../types';

/**
 * DEMONSTRATION DATA — fictional properties in real Kasur localities.
 * Property counts are computed dynamically from properties to guarantee consistency.
 */
export const KASUR_AREAS: Area[] = [
  {
    slug: 'ideal-garden',
    name: 'Ideal Garden Housing Scheme',
    city: 'Kasur',
    blurb: 'Planned residential development situated along main approach routes in Kasur.',
    coverPropertyId: 'P-001',
  },
  {
    slug: 'model-garden',
    name: 'Model Garden Housing Scheme',
    city: 'Kasur',
    blurb: 'Established residential locality with paved interior streets and local neighborhood shops.',
    coverPropertyId: 'P-002',
  },
  {
    slug: 'garden-view',
    name: 'Garden View Housing Scheme',
    city: 'Kasur',
    blurb: 'Residential scheme with family housing, green spaces, and neighborhood amenities.',
    coverPropertyId: 'P-003',
  },
  {
    slug: 'london-city',
    name: 'London City',
    city: 'Kasur',
    blurb: 'Modern residential housing scheme featuring detached houses and family portions.',
    coverPropertyId: 'P-004',
  },
  {
    slug: 'elite-city',
    name: 'Elite City Housing Scheme',
    city: 'Kasur',
    blurb: 'Planned housing development offering modern residential plots and family homes.',
    coverPropertyId: 'P-005',
  },
  {
    slug: 'shah-inayat-colony',
    name: 'Shah Inayat Colony',
    city: 'Kasur',
    blurb: 'Centrally positioned residential neighborhood within reach of district services and markets.',
    coverPropertyId: 'P-013',
  },
  {
    slug: 'wapda-colony',
    name: 'Wapda Colony',
    city: 'Kasur',
    blurb: 'Established residential quarter with quiet residential streets and utility infrastructure.',
    coverPropertyId: 'P-012',
  },
  {
    slug: 'railway-road',
    name: 'Railway Road',
    city: 'Kasur',
    blurb: 'Central commercial and mixed-use thoroughfare connecting local markets and transport.',
    coverPropertyId: 'P-009',
  },
  {
    slug: 'circle-road',
    name: 'Circle Road',
    city: 'Kasur',
    blurb: 'Prominent circular transit and commercial corridor circling central Kasur.',
    coverPropertyId: 'P-010',
  },
];

/**
 * Computes property count for a given area slug from the dynamic properties dataset
 */
export function getAreaPropertyCount(areaSlug: string, properties: Property[]): number {
  return properties.filter((p) => p.areaSlug === areaSlug).length;
}
