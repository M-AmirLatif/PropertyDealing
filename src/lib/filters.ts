import type { Property, PropertyType } from '../types';
import { LAHORE_AREAS } from '../data/areas';

export type SortOption = 'newest' | 'rent-asc' | 'rent-desc';

export interface Filters {
  q: string;
  area: string; // area slug or ''
  types: PropertyType[];
  minRent: number | null;
  maxRent: number | null;
  beds: number | null; // 1 | 2 | 3 | 4 | 5 (where 5 means 5+)
  furnished: boolean; // true if furnished=1
  available: boolean; // true if available=1 (means hide rented)
  sort: SortOption;
}

export const DEFAULT_FILTERS: Filters = {
  q: '',
  area: '',
  types: [],
  minRent: null,
  maxRent: null,
  beds: null,
  furnished: false,
  available: false,
  sort: 'newest',
};

const TYPE_ALIAS_MAP: Record<string, PropertyType> = {
  house: 'house',
  houses: 'house',
  apartment: 'apartment',
  apartments: 'apartment',
  portion: 'portion',
  portions: 'portion',
  commercial: 'commercial',
};

/**
 * Parses URL query parameters into a strongly typed Filters object.
 * Ignores unknown values, clamps negatives, swaps inverted min/max,
 * and ignores invalid area slugs.
 */
export function parseFilters(searchParams: URLSearchParams): Filters {
  // 1. Text Query
  const rawQ = searchParams.get('q') || '';
  const q = rawQ.trim();

  // 2. Area Slug
  const rawArea = searchParams.get('area') || '';
  const area = LAHORE_AREAS.some((a) => a.slug === rawArea) ? rawArea : '';

  // 3. Property Types (supports comma-separated string or multiple entries)
  const typeParams = searchParams.getAll('type').join(',');
  const types: PropertyType[] = [];
  if (typeParams) {
    typeParams
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .forEach((item) => {
        const mapped = TYPE_ALIAS_MAP[item];
        if (mapped && !types.includes(mapped)) {
          types.push(mapped);
        }
      });
  }

  // 4. Rent Range
  let minRent: number | null = null;
  let maxRent: number | null = null;

  const rawMin = searchParams.get('minRent');
  if (rawMin !== null && rawMin.trim() !== '') {
    const val = parseInt(rawMin.replace(/[^\d-]/g, ''), 10);
    if (!isNaN(val)) {
      minRent = val < 0 ? 0 : val;
    }
  }

  const rawMax = searchParams.get('maxRent');
  if (rawMax !== null && rawMax.trim() !== '') {
    const val = parseInt(rawMax.replace(/[^\d-]/g, ''), 10);
    if (!isNaN(val)) {
      maxRent = val < 0 ? 0 : val;
    }
  }

  // Swap if inverted
  if (minRent !== null && maxRent !== null && minRent > maxRent) {
    const temp = minRent;
    minRent = maxRent;
    maxRent = temp;
  }

  // 5. Bedrooms (1–5, where 5 means 5+)
  let beds: number | null = null;
  const rawBeds = searchParams.get('beds');
  if (rawBeds !== null && rawBeds.trim() !== '') {
    const parsed = parseInt(rawBeds, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
      beds = parsed;
    }
  }

  // 6. Furnished
  const furnished = searchParams.get('furnished') === '1';

  // 7. Hide Rented (available=1)
  const available = searchParams.get('available') === '1';

  // 8. Sorting
  const rawSort = searchParams.get('sort');
  let sort: SortOption = 'newest';
  if (rawSort === 'rent-asc' || rawSort === 'rent-desc' || rawSort === 'newest') {
    sort = rawSort;
  }

  return {
    q,
    area,
    types,
    minRent,
    maxRent,
    beds,
    furnished,
    available,
    sort,
  };
}

/**
 * Filter properties by the parsed Filters criteria.
 * Case-insensitive, trims whitespace, ignores punctuation.
 * "dha" matches every DHA phase.
 * Bedroom filter explicitly excludes commercial spaces.
 */
export function applyFilters(properties: Property[], filters: Filters): Property[] {
  return properties.filter((p) => {
    // 1. Text Search (q)
    if (filters.q) {
      const cleanQ = filters.q.toLowerCase().replace(/[^\w\s]/g, '').trim();
      if (cleanQ) {
        const isDhaQuery = cleanQ === 'dha';

        const titleMatch = p.title.toLowerCase().replace(/[^\w\s]/g, '').includes(cleanQ);
        const areaMatch = isDhaQuery
          ? (p.areaSlug.includes('dha') || p.area.toLowerCase().includes('dha'))
          : p.area.toLowerCase().replace(/[^\w\s]/g, '').includes(cleanQ) ||
            p.areaSlug.replace(/[^\w\s]/g, '').includes(cleanQ);

        const descText = Array.isArray(p.description) ? p.description.join(' ') : String(p.description);
        const descMatch = descText.toLowerCase().replace(/[^\w\s]/g, '').includes(cleanQ);

        const highlightsText = Array.isArray(p.highlights) ? p.highlights.join(' ') : '';
        const highlightMatch = highlightsText.toLowerCase().replace(/[^\w\s]/g, '').includes(cleanQ);

        const refMatch =
          String(p.refNo) === cleanQ ||
          `ref ${p.refNo}`.toLowerCase() === cleanQ ||
          `p-${p.refNo}`.toLowerCase() === cleanQ ||
          p.id.toLowerCase() === cleanQ;

        const amenitiesMatch = p.amenities.some((a) =>
          a.toLowerCase().replace(/[^\w\s]/g, '').includes(cleanQ)
        );

        if (!titleMatch && !areaMatch && !descMatch && !highlightMatch && !refMatch && !amenitiesMatch) {
          return false;
        }
      }
    }

    // 2. Area
    if (filters.area && p.areaSlug !== filters.area) {
      return false;
    }

    // 3. Property Types
    if (filters.types.length > 0 && !filters.types.includes(p.type)) {
      return false;
    }

    // 4. Rent Minimum
    if (filters.minRent !== null && p.rentPKR < filters.minRent) {
      return false;
    }

    // 5. Rent Maximum
    if (filters.maxRent !== null && p.rentPKR > filters.maxRent) {
      return false;
    }

    // 6. Bedrooms (Bedroom filter excludes commercial listings)
    if (filters.beds !== null) {
      if (p.type === 'commercial' || p.bedrooms === null) {
        return false;
      }
      if (filters.beds === 5) {
        if (p.bedrooms < 5) return false;
      } else {
        if (p.bedrooms !== filters.beds) return false;
      }
    }

    // 7. Furnished
    if (filters.furnished && !p.furnished) {
      return false;
    }

    // 8. Available Only (Hide rented)
    if (filters.available && p.status === 'rented') {
      return false;
    }

    return true;
  });
}

/**
 * Sorts properties stably by the chosen sort option.
 */
export function sortProperties(properties: Property[], sort: SortOption): Property[] {
  const list = [...properties];
  if (sort === 'rent-asc') {
    return list.sort((a, b) => {
      const diff = a.rentPKR - b.rentPKR;
      return diff !== 0 ? diff : a.refNo - b.refNo;
    });
  }
  if (sort === 'rent-desc') {
    return list.sort((a, b) => {
      const diff = b.rentPKR - a.rentPKR;
      return diff !== 0 ? diff : a.refNo - b.refNo;
    });
  }
  // 'newest' (default)
  return list.sort((a, b) => {
    const timeA = new Date(a.listedOn).getTime();
    const timeB = new Date(b.listedOn).getTime();
    const diff = timeB - timeA;
    return diff !== 0 ? diff : b.refNo - a.refNo;
  });
}

/**
 * Counts the active filter criteria (sorting is excluded).
 */
export function countActiveFilters(filters: Filters): number {
  let count = 0;
  if (filters.q.trim().length > 0) count++;
  if (filters.area.length > 0) count++;
  count += filters.types.length;
  if (filters.minRent !== null || filters.maxRent !== null) count++;
  if (filters.beds !== null) count++;
  if (filters.furnished) count++;
  if (filters.available) count++;
  return count;
}

/**
 * Serializes a Filters object back to URLSearchParams, omitting default/empty values.
 */
export function filtersToSearchParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q.trim().length > 0) {
    params.set('q', filters.q.trim());
  }
  if (filters.area) {
    params.set('area', filters.area);
  }
  if (filters.types.length > 0) {
    params.set('type', filters.types.join(','));
  }
  if (filters.minRent !== null) {
    params.set('minRent', String(filters.minRent));
  }
  if (filters.maxRent !== null) {
    params.set('maxRent', String(filters.maxRent));
  }
  if (filters.beds !== null) {
    params.set('beds', String(filters.beds));
  }
  if (filters.furnished) {
    params.set('furnished', '1');
  }
  if (filters.available) {
    params.set('available', '1');
  }
  if (filters.sort && filters.sort !== 'newest') {
    params.set('sort', filters.sort);
  }
  return params;
}
