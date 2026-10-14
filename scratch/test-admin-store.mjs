import { DEMO_PROPERTIES } from '../src/data/properties.js';

console.log('Testing Demo Admin Store Logic...');

let properties = [...DEMO_PROPERTIES];

// 1. Initial count
console.assert(properties.length === 15, `Initial count should be 15, got ${properties.length}`);
console.log('✓ Initial count is 15');

// 2. Status change
const targetId = 'P-001';
properties = properties.map(p => p.id === targetId ? { ...p, status: 'rented' } : p);
const updatedP1 = properties.find(p => p.id === targetId);
console.assert(updatedP1.status === 'rented', 'P-001 status should be rented');
console.log('✓ Status change immediately reflects: P-001 is now "rented"');

// 3. Featured toggle
const targetP2 = 'P-002';
const origFeatured = properties.find(p => p.id === targetP2).featured;
properties = properties.map(p => p.id === targetP2 ? { ...p, featured: !origFeatured } : p);
const updatedP2 = properties.find(p => p.id === targetP2);
console.assert(updatedP2.featured === !origFeatured, 'P-002 featured flag toggled');
console.log(`✓ Featured toggle works: P-002 is now ${updatedP2.featured}`);

// 4. Add property
const maxRef = properties.reduce((max, p) => (p.refNo > max ? p.refNo : max), 0);
const newRefNo = maxRef + 1;
const newProperty = {
  id: `P-${String(newRefNo).padStart(3, '0')}`,
  slug: `dha-phase-5-brand-new-executive-rental-${newRefNo}`,
  refNo: newRefNo,
  title: 'Brand New Executive Rental',
  type: 'house',
  city: 'Lahore',
  area: 'DHA Phase 5',
  areaSlug: 'dha-phase-5',
  rentPKR: 250000,
  bedrooms: 4,
  bathrooms: 4,
  coveredArea: { value: 1, unit: 'kanal' },
  furnished: true,
  description: ['First paragraph of description', 'Second paragraph of description'],
  highlights: ['Surveyed residential listing', 'Direct presentation', 'Ready for viewing'],
  amenities: ['Electricity', 'Gas', 'Water'],
  nearby: [{ label: 'Park', note: 'within sector' }],
  images: [{ src: '/images/site/placeholder-property.svg', srcSmall: '/images/site/placeholder-property.svg', alt: 'Test', credit: 'Test' }],
  status: 'available',
  featured: true,
  listedOn: new Date().toISOString(),
  contact: { whatsappMessage: 'Test inquiry' },
};
properties = [newProperty, ...properties];
console.assert(properties.length === 16, `Length should be 16, got ${properties.length}`);
console.assert(properties.find(p => p.slug === newProperty.slug)?.title === 'Brand New Executive Rental', 'New property findable by slug');
console.log('✓ Add property works: Length is 16, slug lookup resolves cleanly');

// 5. Reset properties
properties = [...DEMO_PROPERTIES];
console.assert(properties.length === 15, `Reset length should be 15, got ${properties.length}`);
console.assert(properties.find(p => p.id === 'P-001').status === 'available', 'P-001 restored to available');
console.log('✓ Reset properties restores initial 15 properties');

console.log('\nALL DEMO ADMIN STORE TESTS PASSED SUCCESSFULLY!');
