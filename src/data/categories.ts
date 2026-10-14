import type { Category, Property } from '../types';

/**
 * Property Categories for navigation and filtering.
 * Property counts are computed dynamically from properties to guarantee consistency.
 */
export const PROPERTY_CATEGORIES: Category[] = [
  {
    slug: 'houses',
    label: 'Houses',
    type: 'house',
    blurb: 'Independent residential homes and detached family residences across prime sectors.',
  },
  {
    slug: 'apartments',
    label: 'Apartments',
    type: 'apartment',
    blurb: 'Modern urban apartments, luxury high-rises, and executive studio residences.',
  },
  {
    slug: 'portions',
    label: 'Portions',
    type: 'portion',
    blurb: 'Independent upper and lower floor residential portions with separate entrances.',
  },
  {
    slug: 'commercial',
    label: 'Commercial Spaces',
    type: 'commercial',
    blurb: 'High-visibility retail shopfronts, executive corporate floors, and office spaces.',
  },
  {
    slug: 'furnished',
    label: 'Furnished Residences',
    blurb: 'Move-in ready turnkey residences fitted with quality furniture, appliances, and AC.',
  },
];

/**
 * Computes listing count for a category slug from the live properties dataset
 */
export function getCategoryPropertyCount(categorySlug: string, properties: Property[]): number {
  if (categorySlug === 'furnished') {
    return properties.filter((p) => p.furnished).length;
  }
  if (categorySlug === 'houses') {
    return properties.filter((p) => p.type === 'house').length;
  }
  if (categorySlug === 'apartments') {
    return properties.filter((p) => p.type === 'apartment').length;
  }
  if (categorySlug === 'portions') {
    return properties.filter((p) => p.type === 'portion').length;
  }
  if (categorySlug === 'commercial') {
    return properties.filter((p) => p.type === 'commercial').length;
  }
  return 0;
}
