import { SITE } from '../config/site';

/**
 * ABOUT PAGE CONTENT STORE
 * Editable editorial copy.
 * NOTE: Do NOT add fabricated awards, client count statistics, or fake years in business.
 */

export const ABOUT_CONTENT = {
  header: {
    label: 'ABOUT THE ADVISORY',
    title: `Independent real estate rental guidance across Lahore`,
    intro: `Representing residential and commercial properties with documented details, transparent pricing, and direct communication.`,
  },

  dealerIntro: {
    heading: 'Advisory practice',
    // Client placeholder:
    paragraph1: `${SITE.dealerName} operates as a focused rental property consultancy based in Lahore, Pakistan. The practice assists families, executives, overseas Pakistanis, and corporate tenants in identifying suitable rental accommodation while supporting property owners with rigorous tenancy coordination.`,
    paragraph2: `Unlike aggregate portals filled with outdated or phantom listings, our register prioritizes accurate architectural measurements, current availability status, and direct WhatsApp consultations with the broker managing the inventory.`,
  },

  whatWeHelpWith: {
    heading: 'What the dealer helps with',
    forTenants: {
      title: 'For Prospective Tenants',
      items: [
        {
          num: '01',
          title: 'Requirement profiling',
          desc: 'Assessing family space requirements, locality commute preferences, and monthly rental allocations.',
        },
        {
          num: '02',
          title: 'Accompanied inspections',
          desc: 'Coordinating physical property visits at mutually convenient hours with accurate advance briefings.',
        },
        {
          num: '03',
          title: 'Tenancy documentation',
          desc: 'Drafting standard rental agreements, reviewing inventory condition reports, and coordinating deposit checks.',
        },
        {
          num: '04',
          title: 'Handover & utility setup',
          desc: 'Verifying meter readings, utility clearance, and key transfer on possession day.',
        },
      ],
    },
    forOwners: {
      title: 'For Property Owners & Landlords',
      items: [
        {
          num: '01',
          title: 'Rental market valuation',
          desc: 'Providing realistic guidance on prevailing rental rates across specific blocks and sectors.',
        },
        {
          num: '02',
          title: 'High-clarity listing presentation',
          desc: 'Documenting covered areas, structural highlights, and fittings through clean architectural registers.',
        },
        {
          num: '03',
          title: 'Tenant verification',
          desc: 'Screening prospective occupants for professional credentials and lease term commitment.',
        },
        {
          num: '04',
          title: 'Lease renewals & coordination',
          desc: 'Assisting with tenancy extension agreements, annual rent adjustments, and formal notice periods.',
        },
      ],
    },
  },

  serviceArea: {
    heading: 'Territorial coverage',
    subtitle: 'Focused on established master-planned developments and central commercial corridors in Lahore.',
    caption: 'Schematic only — not a map and not to scale.',
    footnote: 'Sample sectors for the Lahore demonstration — expandable to additional housing schemes and other cities.',
  },

  cta: {
    title: 'Ready to discuss your rental search or list a property?',
    desc: 'Speak directly with the consultant on WhatsApp without automated delays.',
    buttonText: 'Message on WhatsApp',
  },
};
