import { SITE } from '../config/site';

/**
 * ABOUT PAGE CONTENT STORE
 * Editable editorial copy.
 * NOTE: Do NOT add fabricated awards, client count statistics, or fake years in business.
 */

export const ABOUT_CONTENT = {
  header: {
    label: 'ABOUT US',
    title: `Rental property guidance and listings across Kasur`,
    intro: `Residential and commercial rental properties with clear details, honest pricing, and direct communication.`,
  },

  dealerIntro: {
    heading: 'Our services',
    paragraph1: `${SITE.dealerName} is a property dealer based in Kasur, Punjab, helping tenants and property owners with rental properties. Contact him on WhatsApp or by phone.`,
    paragraph2: `Unlike aggregate portals filled with outdated or duplicate listings, our listings prioritize accurate measurements, current availability status, and direct WhatsApp communication with the dealer.`,
  },

  whatWeHelpWith: {
    heading: 'How we can help',
    forTenants: {
      title: 'For Tenants',
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
          desc: 'Documenting covered areas, structural highlights, and fittings with clear specifications.',
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
    heading: 'Areas we cover',
    subtitle: 'Focused on established residential and commercial areas across Kasur.',
    caption: 'Schematic only — not a map and not to scale.',
    footnote: 'Sample areas for the Kasur demonstration — expandable to additional housing schemes and other cities.',
  },

  cta: {
    title: 'Ready to discuss your rental search or list a property?',
    desc: 'Speak directly on WhatsApp without automated delays.',
    buttonText: 'Message on WhatsApp',
  },
};
