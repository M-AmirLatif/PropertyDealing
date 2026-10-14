import { SITE, hasWhatsApp } from '../config/site';
import type { Property } from '../types';
import { formatRent, padRef } from './format';

/**
 * Constructs direct WhatsApp click-to-chat URL.
 * Returns empty string if no valid WhatsApp number is configured.
 */
export function buildWhatsAppUrl(message?: string): string {
  if (!hasWhatsApp || !SITE.whatsappNumber) {
    return '';
  }

  const cleanNumber = SITE.whatsappNumber.replace(/\D/g, '');
  if (!cleanNumber) return '';

  const baseUrl = `https://wa.me/${cleanNumber}`;
  if (message && message.trim().length > 0) {
    return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
  }

  return baseUrl;
}

/**
 * Opens WhatsApp or triggers the interactive demo fallback dialog.
 */
export function openWhatsApp(
  message?: string,
  onDemoFallback?: (msg: string) => void
): void {
  const defaultMsg = `Hello Irfan, I am inquiring about property services with ${SITE.dealerName}.`;
  const resolvedMsg = message && message.trim().length > 0 ? message.trim() : defaultMsg;

  if (hasWhatsApp) {
    const url = buildWhatsAppUrl(resolvedMsg);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
  }

  if (onDemoFallback) {
    onDemoFallback(resolvedMsg);
  }
}

/**
 * Builds pre-filled property inquiry message with title, ref, area, rent and URL
 */
export function buildPropertyInquiryMessage(property: Property, pageUrl: string): string {
  return `Hello Irfan, I am inquiring about "${property.title}" (REF #${padRef(property.refNo)}) in ${property.area}, monthly rent ${formatRent(property.rentPKR)}: ${pageUrl}`;
}

/**
 * Builds pre-filled request for viewing message
 */
export function buildViewingMessage(property: Property, pageUrl: string): string {
  return `Hello Irfan, I would like to request an accompanied viewing for "${property.title}" (REF #${padRef(property.refNo)}) in ${property.area}: ${pageUrl}. Please let me know suitable visiting hours.`;
}

/**
 * Builds pre-filled inquiry for similar properties (used when property is rented)
 */
export function buildSimilarMessage(property: Property): string {
  return `Hello Irfan, I noticed "${property.title}" (REF #${padRef(property.refNo)}) in ${property.area} has been rented. Could you share any similar available rentals in or around ${property.area}?`;
}

/**
 * Builds WhatsApp message from contact page demo form
 */
export function buildContactInquiryMessage(data: {
  name: string;
  phone: string;
  lookingFor: string;
  area: string;
  budget: string;
  message?: string;
}): string {
  const lines = [
    `Hello Irfan, I am submitting an inquiry for rental property assistance in Kasur:`,
    `- Name: ${data.name}`,
    `- Mobile: ${data.phone}`,
    `- Looking For: ${data.lookingFor}`,
    `- Preferred Locality: ${data.area}`,
    `- Monthly Budget: ${data.budget}`,
  ];
  if (data.message && data.message.trim().length > 0) {
    lines.push(`- Additional Notes: ${data.message.trim()}`);
  }
  return lines.join('\n');
}

/**
 * Builds WhatsApp message from owner list-your-property demo form
 */
export function buildOwnerListingMessage(data: {
  name: string;
  phone: string;
  location: string;
  propertyType: string;
  bedrooms?: string;
  rent: string;
  notes?: string;
}): string {
  const lines = [
    `Hello Irfan, I am a property owner interested in listing a property for rent in Kasur:`,
    `- Owner: ${data.name}`,
    `- Contact: ${data.phone}`,
    `- Location / Address: ${data.location}`,
    `- Property Type: ${data.propertyType}`,
  ];
  if (data.bedrooms) {
    lines.push(`- Bedrooms: ${data.bedrooms}`);
  }
  lines.push(`- Expected Monthly Rent: ${data.rent}`);
  if (data.notes && data.notes.trim().length > 0) {
    lines.push(`- Notes: ${data.notes.trim()}`);
  }
  lines.push('(Photos can be shared here directly on WhatsApp)');
  return lines.join('\n');
}

/**
 * Builds WhatsApp message listing all shortlisted saved properties with detail links
 */
export function buildShortlistMessage(properties: Property[]): string {
  const origin = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const lines = [
    `Hello Irfan, I have shortlisted the following ${properties.length} rental properties in Kasur:`,
  ];
  properties.forEach((p, idx) => {
    const url = `${origin}#/properties/${p.slug}`;
    lines.push(
      `\n${idx + 1}. ${p.title} (REF #${padRef(p.refNo)})\n   - Location: ${p.area}\n   - Rent: ${formatRent(p.rentPKR)}\n   - Link: ${url}`
    );
  });
  lines.push('\nPlease let me know when viewings can be arranged for these.');
  return lines.join('\n');
}

/**
 * Backward-compatible helper
 */
export function createPropertyInquiryMessage(propertyTitle: string, propertySlug: string): string {
  return `Hello Irfan, I am interested in "${propertyTitle}" (${propertySlug}) listed with ${SITE.dealerName}. Please share details.`;
}
