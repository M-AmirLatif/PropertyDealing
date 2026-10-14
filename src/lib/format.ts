import type { CoveredArea, PropertyType } from '../types';

/**
 * Deterministic reference date for demo consistency
 */
export const REFERENCE_DATE = '2026-10-13T00:00:00Z';

/**
 * Formats a number to Pakistani Rupee currency display.
 * e.g. formatPKR(45000) => "Rs. 45,000"
 */
export function formatPKR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rs. 0';
  const formatted = new Intl.NumberFormat('en-PK').format(amount);
  return `Rs. ${formatted}`;
}

/**
 * Formats monthly rental amount.
 * e.g. formatRent(45000) => "Rs. 45,000/month"
 */
export function formatRent(amount: number): string {
  return `${formatPKR(amount)}/month`;
}

/**
 * Formats covered area or plot size with unit.
 * e.g. formatArea({ value: 5, unit: "marla" }) => "5 Marla"
 * e.g. formatArea({ value: 1050, unit: "sq ft" }) => "1,050 sq ft"
 */
export function formatArea(area: CoveredArea | null | undefined): string {
  if (!area) return '—';
  if (area.unit === 'sq ft') {
    return `${new Intl.NumberFormat('en-PK').format(area.value)} sq ft`;
  }
  const unitLabel = area.unit === 'kanal' ? 'Kanal' : 'Marla';
  return `${area.value} ${unitLabel}`;
}

/**
 * Deterministic relative listing time based on reference date (2026-10-13).
 * e.g. "Listed 12 days ago", "Listed today", "Listed 2 months ago"
 */
export function formatRelativeListed(isoDateString: string): string {
  try {
    const ref = new Date(REFERENCE_DATE).getTime();
    const listed = new Date(isoDateString).getTime();
    const diffDays = Math.max(0, Math.round((ref - listed) / (1000 * 60 * 60 * 24)));

    if (diffDays === 0) return 'Listed today';
    if (diffDays === 1) return 'Listed yesterday';
    if (diffDays < 30) return `Listed ${diffDays} days ago`;

    const months = Math.floor(diffDays / 30);
    return `Listed ${months} ${months === 1 ? 'month' : 'months'} ago`;
  } catch {
    return 'Recently listed';
  }
}

/**
 * Formats standard calendar date
 * e.g. "1st Nov 2026" or "15 Oct 2026"
 */
export function formatDate(isoDateString: string): string {
  try {
    const d = new Date(isoDateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return isoDateString;
  }
}

/**
 * Formats short calendar date (day and month only, e.g. "15 Nov") for compact cards
 */
export function formatShortDate(isoDateString: string): string {
  try {
    const d = new Date(isoDateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    }).format(d);
  } catch {
    return isoDateString;
  }
}

/**
 * Pads numeric reference identifier to 3 digits.
 * e.g. padRef(7) => "007"
 */
export function padRef(refNo: number): string {
  return String(refNo).padStart(3, '0');
}

/**
 * Human-readable labels for property categories
 */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  house: 'House',
  apartment: 'Apartment',
  portion: 'Portion',
  commercial: 'Commercial',
};
