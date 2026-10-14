/**
 * ============================================================================
 * SITE CONFIGURATION & EDITABLE PLACEHOLDERS
 * ============================================================================
 * This file contains central business information and contact placeholders.
 * When real client information becomes available, update the values below:
 *
 * 1. dealerName / brandShort: Replace with the actual agency or dealer name.
 * 2. phoneDisplay / phoneE164: Provide display format and standard E.164.
 * 3. whatsappNumber: Digits only in international format without '+' (e.g. "923001234567").
 *    When left empty (""), hasWhatsApp will evaluate to false and WhatsApp CTAs
 *    will gracefully hide or fall back.
 * 4. email / address / officeHours: Replace placeholders with confirmed details.
 * 5. social: Replace null with valid profile URLs once provided.
 * ============================================================================
 */

export interface SiteSocial {
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  linkedin: string | null;
}

export interface SiteConfig {
  dealerName: string;
  brandShort: string;
  descriptor: string;
  tagline: string;
  city: string;
  country: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  email: string;
  address: string;
  officeHours: string;
  social: SiteSocial;
}

export const SITE: SiteConfig = {
  dealerName: "[Dealer Name]",
  brandShort: "[Dealer]",
  descriptor: "Property & Rentals",
  tagline: "[Trusted Real Estate Advisory & Rental Management]",
  city: "Lahore",
  country: "Pakistan",
  phoneDisplay: "+92 3XX XXXXXXX",
  phoneE164: "", // empty until supplied
  whatsappNumber: "", // digits only, international format without +, e.g. 923001234567
  email: "[email placeholder]",
  address: "[Office address — to be provided]",
  officeHours: "[Opening hours — to be provided]",
  social: {
    facebook: null,
    instagram: null,
    youtube: null,
    linkedin: null,
  },
};

export const hasWhatsApp: boolean =
  /^\d+$/.test(SITE.whatsappNumber) && SITE.whatsappNumber.length > 0;

export const hasPhone: boolean =
  SITE.phoneE164.trim().length > 0;

export const DEMO_DISCLAIMER =
  "Demonstration website. Properties, prices and images are fictional/illustrative and are not real or verified listings.";
