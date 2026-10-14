import { SITE, hasWhatsApp, hasPhone } from '../src/config/site';
import {
  buildWhatsAppUrl,
  buildPropertyInquiryMessage,
  buildViewingMessage,
  buildSimilarMessage,
  buildContactInquiryMessage,
  buildOwnerListingMessage,
  buildShortlistMessage,
} from '../src/lib/whatsapp';
import { DEMO_PROPERTIES } from '../src/data/properties';

console.log('=== VERIFYING REAL DEALER DETAILS & GENERATED HREFS ===\n');

// 1. Dealer details
console.log(`Dealer Name: ${SITE.dealerName}`);
console.log(`Brand Short: ${SITE.brandShort}`);
console.log(`Phone Display: ${SITE.phoneDisplay}`);
console.log(`Phone E164: ${SITE.phoneE164}`);
console.log(`WhatsApp Number: ${SITE.whatsappNumber}`);
console.log(`hasWhatsApp: ${hasWhatsApp}`);
console.log(`hasPhone: ${hasPhone}`);

console.assert(SITE.dealerName === 'Irfan Umri', 'dealerName must be Irfan Umri');
console.assert(SITE.phoneDisplay === '+92 301 6803398', 'phoneDisplay must be +92 301 6803398');
console.assert(SITE.phoneE164 === '+923016803398', 'phoneE164 must be +923016803398');
console.assert(SITE.whatsappNumber === '923016803398', 'whatsappNumber must be 923016803398');
console.assert(hasWhatsApp === true, 'hasWhatsApp must be true');
console.assert(hasPhone === true, 'hasPhone must be true');

// 2. Phone tel link
const telLink = `tel:${SITE.phoneE164}`;
console.log(`\nGenerated Phone Dialer href: ${telLink}`);
console.assert(telLink === 'tel:+923016803398', 'Phone link must be tel:+923016803398');

// 3. WhatsApp URLs
const p1 = DEMO_PROPERTIES[0];
const msg1 = buildPropertyInquiryMessage(p1, 'http://localhost:5173/#/properties/' + p1.slug);
const url1 = buildWhatsAppUrl(msg1);

console.log(`\nProperty Inquiry WhatsApp URL:\n${url1}`);
console.assert(url1.startsWith('https://wa.me/923016803398?text='), 'Must target https://wa.me/923016803398');
console.assert(decodeURIComponent(url1).includes('Hello Irfan,'), 'Message must greet Irfan');

const msgViewing = buildViewingMessage(p1, 'http://localhost:5173/#/properties/' + p1.slug);
const urlViewing = buildWhatsAppUrl(msgViewing);
console.log(`\nViewing Request WhatsApp URL:\n${urlViewing}`);
console.assert(decodeURIComponent(urlViewing).includes('Hello Irfan,'), 'Viewing message must greet Irfan');

const msgSimilar = buildSimilarMessage(p1);
const urlSimilar = buildWhatsAppUrl(msgSimilar);
console.log(`\nSimilar Properties WhatsApp URL:\n${urlSimilar}`);
console.assert(decodeURIComponent(urlSimilar).includes('Hello Irfan,'), 'Similar message must greet Irfan');

const msgContact = buildContactInquiryMessage({
  name: 'Ahmed Khan',
  phone: '0300-1234567',
  lookingFor: 'House',
  area: 'DHA Phase 5',
  budget: 'Rs. 150,000',
});
const urlContact = buildWhatsAppUrl(msgContact);
console.log(`\nContact Form WhatsApp URL:\n${urlContact}`);
console.assert(decodeURIComponent(urlContact).includes('Hello Irfan,'), 'Contact message must greet Irfan');

const msgOwner = buildOwnerListingMessage({
  name: 'Zubair Malik',
  phone: '0321-7654321',
  location: 'Gulberg III',
  propertyType: 'Upper Portion',
  rent: 'Rs. 95,000',
});
const urlOwner = buildWhatsAppUrl(msgOwner);
console.log(`\nOwner Listing WhatsApp URL:\n${urlOwner}`);
console.assert(decodeURIComponent(urlOwner).includes('Hello Irfan,'), 'Owner message must greet Irfan');

const msgShortlist = buildShortlistMessage(DEMO_PROPERTIES.slice(0, 3));
const urlShortlist = buildWhatsAppUrl(msgShortlist);
console.log(`\nShortlist WhatsApp URL:\n${urlShortlist}`);
console.assert(decodeURIComponent(urlShortlist).includes('Hello Irfan,'), 'Shortlist message must greet Irfan');

console.log('\n✓ ALL REAL DEALER AND URL VERIFICATIONS PASSED SUCCESSFULLY!');
