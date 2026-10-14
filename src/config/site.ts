/**
 * ============================================================================
 * SITE CONFIGURATION & DEMO CONTACT DATA
 * ============================================================================
 * This file contains central business information.
 *
 * Real dealer details:
 * - dealerName / brandShort: "Irfan Umri"
 * - phoneDisplay: "+92 301 6803398"
 * - phoneE164: "+923016803398"
 * - whatsappNumber: "923016803398"
 *
 * Sample contact details for the demo:
 * - address: "Shop No. 12, Main Road, Kasur, Punjab, Pakistan"
 * - email: "contact@example.com"
 * - officeHours: "Mon–Sat 10:00 AM – 7:00 PM · Sunday closed"
 * - sampleContactDetails: true
 *
 * When confirmed client information becomes available, update address, email,
 * and officeHours below, then set sampleContactDetails to false.
 * ============================================================================
 */

export interface SiteSocial {
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  linkedin: string | null;
}

export interface SiteAddress {
  line1: string;
  locality: string;
  province: string;
  country: string;
  display: string;
}

export interface SiteConfig {
  dealerName: string;
  brandShort: string;
  descriptor: string;
  tagline: string;
  city: string;
  province: string;
  country: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  email: string;
  address: SiteAddress;
  officeHours: string;
  social: SiteSocial;
  sampleContactDetails: boolean;
}

export const SITE: SiteConfig = {
  dealerName: "Irfan Umri",
  brandShort: "Irfan Umri",
  descriptor: "Property & Rentals",
  tagline: "Rental Properties in Kasur",
  city: "Kasur",
  province: "Punjab",
  country: "Pakistan",
  phoneDisplay: "+92 301 6803398",
  phoneE164: "+923016803398",
  whatsappNumber: "923016803398", // digits only, international format without +
  email: "contact@example.com",
  address: {
    line1: "Shop No. 12, Main Road",
    locality: "Kasur",
    province: "Punjab",
    country: "Pakistan",
    display: "Shop No. 12, Main Road, Kasur, Punjab, Pakistan",
  },
  officeHours: "Mon–Sat 10:00 AM – 7:00 PM · Sunday closed",
  sampleContactDetails: true,
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
