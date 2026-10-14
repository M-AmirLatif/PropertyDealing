/**
 * Type Definitions for The Plot Index — Lahore Rental Real Estate Demo
 */

export type PropertyType = 'house' | 'apartment' | 'portion' | 'commercial';

export type AvailabilityStatus = 'available' | 'available-soon' | 'rented';

export interface PropertyImage {
  src: string;
  srcSmall: string;
  alt: string;
  position?: string; // CSS object-position, e.g. "50% 40%"
  credit: string;
}

export interface NearbyPlace {
  label: string; // Generic category only: "Park", "Daily market", "School", "Main boulevard"
  note: string;  // Indicative note: "short drive (indicative)", "within sector"
}

export interface CoveredArea {
  value: number;
  unit: 'marla' | 'kanal' | 'sq ft';
}

export interface PropertyContact {
  whatsappMessage: string;
}

export interface Property {
  id: string;          // e.g. "P-001"
  slug: string;        // e.g. "dha-phase-5-modern-1-kanal-house"
  refNo: number;       // e.g. 7
  title: string;
  type: PropertyType;
  city: 'Lahore';
  area: string;        // display, e.g. "DHA Phase 5"
  areaSlug: string;    // e.g. "dha-phase-5"
  rentPKR: number;     // e.g. 325000
  bedrooms: number | null;
  bathrooms: number | null;
  coveredArea: CoveredArea;
  plotSize?: string;   // e.g. "1 Kanal"
  furnished: boolean;
  description: [string, string] | string[]; // 2 short paragraphs
  highlights: [string, string, string] | string[]; // 3 short strings
  amenities: string[];
  nearby: NearbyPlace[];
  images: PropertyImage[];
  status: AvailabilityStatus;
  availableFrom?: string; // ISO date for available-soon
  featured: boolean;
  listedOn: string;    // ISO date, spread over last ~90 days from 2026-10-13
  contact: PropertyContact;
}

export interface Area {
  slug: string;
  name: string;
  city: string;
  blurb: string; // 1 neutral sentence, no statistics
  coverPropertyId: string;
}

export interface Category {
  slug: string;
  label: string;
  type?: PropertyType;
  blurb: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  phone: string; // Format: 03XX-XXXXXXX
  propertyId?: string;
  propertyTitle?: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'archived';
}

export interface PropertyFilterParams {
  type?: PropertyType | 'all';
  area?: string;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number | 'any';
  furnished?: boolean;
  status?: AvailabilityStatus | 'all';
  keyword?: string;
  sortBy?: 'rent-asc' | 'rent-desc' | 'newest' | 'ref';
}
