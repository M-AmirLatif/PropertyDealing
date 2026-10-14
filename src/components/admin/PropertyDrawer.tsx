import { useState, useEffect, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Camera } from 'lucide-react';
import type { Property, PropertyType, AvailabilityStatus, CoveredArea } from '../../types';
import { LAHORE_AREAS } from '../../data/areas';
import { validateRequired, validateRent } from '../../lib/validation';
import { TextField, TextareaField, SelectField, FormErrorSummary, type FormErrorItem } from '../forms';
import { Button } from '../ui/Button';

interface PropertyDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyToEdit: Property | null; // null means "Add Property" mode
  allProperties: Property[];
  onSave: (savedProperty: Property, isEdit: boolean) => void;
}

export function PropertyDrawer({
  open,
  onOpenChange,
  propertyToEdit,
  allProperties,
  onSave,
}: PropertyDrawerProps) {
  const isEdit = Boolean(propertyToEdit);

  // Form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PropertyType>('house');
  const [areaSlug, setAreaSlug] = useState('dha-phase-5');
  const [rentInput, setRentInput] = useState('');
  const [bedrooms, setBedrooms] = useState<string>('3');
  const [bathrooms, setBathrooms] = useState<string>('3');
  const [coveredAreaValue, setCoveredAreaValue] = useState<string>('10');
  const [coveredAreaUnit, setCoveredAreaUnit] = useState<'marla' | 'kanal' | 'sq ft'>('marla');
  const [furnished, setFurnished] = useState(false);
  const [status, setStatus] = useState<AvailabilityStatus>('available');
  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState('');

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorList, setErrorList] = useState<FormErrorItem[]>([]);

  // Reset or populate fields when drawer opens
  useEffect(() => {
    if (!open) return;

    if (propertyToEdit) {
      setTitle(propertyToEdit.title);
      setType(propertyToEdit.type);
      setAreaSlug(propertyToEdit.areaSlug);
      setRentInput(propertyToEdit.rentPKR.toLocaleString('en-PK'));
      setBedrooms(propertyToEdit.bedrooms !== null ? String(propertyToEdit.bedrooms) : '');
      setBathrooms(propertyToEdit.bathrooms !== null ? String(propertyToEdit.bathrooms) : '');
      setCoveredAreaValue(String(propertyToEdit.coveredArea?.value || 10));
      setCoveredAreaUnit(propertyToEdit.coveredArea?.unit || 'marla');
      setFurnished(propertyToEdit.furnished);
      setStatus(propertyToEdit.status);
      setFeatured(propertyToEdit.featured);
      setDescription(
        Array.isArray(propertyToEdit.description)
          ? propertyToEdit.description.join('\n\n')
          : String(propertyToEdit.description || '')
      );
    } else {
      // Default clean state for Add
      setTitle('');
      setType('house');
      setAreaSlug(LAHORE_AREAS[0]?.slug || 'dha-phase-5');
      setRentInput('');
      setBedrooms('3');
      setBathrooms('3');
      setCoveredAreaValue('10');
      setCoveredAreaUnit('marla');
      setFurnished(false);
      setStatus('available');
      setFeatured(false);
      setDescription(
        'Well-situated residential property in prime sector featuring contemporary layout, continuous utility provisioning, and direct road connectivity.\n\nIdeal for families seeking secure surroundings, proximity to sector recreational parks, and quality building finishes.'
      );
    }
    setErrors({});
    setErrorList([]);
  }, [open, propertyToEdit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const newErrorList: FormErrorItem[] = [];

    // 1. Title validation
    const titleErr = validateRequired(title, 'Property title');
    if (titleErr) {
      newErrors.title = titleErr;
      newErrorList.push({ fieldId: 'drawer-title', message: titleErr });
    }

    // 2. Rent validation
    const rentVal = validateRent(rentInput);
    if (!rentVal.isValid || rentVal.value === null) {
      const msg = rentVal.error || 'Please enter a valid monthly rent in PKR.';
      newErrors.rent = msg;
      newErrorList.push({ fieldId: 'drawer-rent', message: msg });
    }

    // 3. Description validation
    const descErr = validateRequired(description, 'Listing description');
    if (descErr) {
      newErrors.description = descErr;
      newErrorList.push({ fieldId: 'drawer-description', message: descErr });
    }

    // 4. Area value validation
    const areaNum = parseFloat(coveredAreaValue);
    if (isNaN(areaNum) || areaNum <= 0) {
      newErrors.coveredArea = 'Please enter a valid covered area number.';
      newErrorList.push({ fieldId: 'drawer-area-val', message: 'Please enter a valid covered area number.' });
    }

    if (newErrorList.length > 0) {
      setErrors(newErrors);
      setErrorList(newErrorList);
      return;
    }

    // Resolve Area Name
    const matchedArea = LAHORE_AREAS.find((a) => a.slug === areaSlug);
    const areaName = matchedArea ? matchedArea.name : 'DHA Phase 5';

    const cleanRent = rentVal.value!;
    const beds = bedrooms.trim() ? parseInt(bedrooms, 10) : null;
    const baths = bathrooms.trim() ? parseInt(bathrooms, 10) : null;

    const coveredArea: CoveredArea = {
      value: areaNum,
      unit: coveredAreaUnit,
    };

    // Paragraphs for description
    const descParagraphs = description
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    if (isEdit && propertyToEdit) {
      // Update existing property
      const updated: Property = {
        ...propertyToEdit,
        title: title.trim(),
        type,
        area: areaName,
        areaSlug,
        rentPKR: cleanRent,
        bedrooms: isNaN(beds as number) ? null : beds,
        bathrooms: isNaN(baths as number) ? null : baths,
        coveredArea,
        furnished,
        status,
        featured,
        description: descParagraphs.length > 0 ? (descParagraphs as [string, string]) : propertyToEdit.description,
        contact: {
          whatsappMessage: `Assalam-o-Alaikum, I am inquiring about Ref ${propertyToEdit.refNo} (${title.trim()}). Please share visiting arrangements.`,
        },
      };

      onSave(updated, true);
    } else {
      // Add brand new property
      const maxRef = allProperties.reduce((max, p) => (p.refNo > max ? p.refNo : max), 0);
      const newRefNo = maxRef + 1;
      const cleanSlugTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      const newSlug = `${areaSlug}-${cleanSlugTitle.slice(0, 36) || 'rental-listing'}-${newRefNo}`;

      const newProperty: Property = {
        id: `P-${String(newRefNo).padStart(3, '0')}`,
        slug: newSlug,
        refNo: newRefNo,
        title: title.trim(),
        type,
        city: 'Lahore',
        area: areaName,
        areaSlug,
        rentPKR: cleanRent,
        bedrooms: isNaN(beds as number) ? null : beds,
        bathrooms: isNaN(baths as number) ? null : baths,
        coveredArea,
        plotSize: `${areaNum} ${coveredAreaUnit === 'sq ft' ? 'sq ft' : coveredAreaUnit === 'kanal' ? 'Kanal' : 'Marla'}`,
        furnished,
        description: descParagraphs.length >= 2 ? (descParagraphs.slice(0, 2) as [string, string]) : [descParagraphs[0] || 'Quality rental listing in Lahore prime sector.', 'Contact the dealer for tenancy terms and inspection.'],
        highlights: [
          'Surveyed residential rental listing',
          'Direct landlord presentation via dealer',
          'Ready for viewing arrangement',
        ],
        amenities: ['Electricity (LESCO)', 'Sui Gas', 'Water Supply', 'Dedicated Parking'],
        nearby: [
          { label: 'Main boulevard', note: 'direct sector connectivity' },
          { label: 'Daily market', note: 'sector commercial zone within reach' },
          { label: 'Park', note: 'community grounds in vicinity' },
        ],
        images: [
          {
            src: '/images/site/placeholder-property.svg',
            srcSmall: '/images/site/placeholder-property.svg',
            alt: title.trim(),
            position: '50% 50%',
            credit: 'Architectural Register Mock',
          },
        ],
        status,
        featured,
        listedOn: new Date().toISOString(),
        contact: {
          whatsappMessage: `Assalam-o-Alaikum, I am inquiring about Ref ${newRefNo} (${title.trim()}). Please share visiting arrangements.`,
        },
      };

      onSave(newProperty, false);
    }

    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop Overlay */}
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 24, 18, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 1100,
          }}
        />

        {/* Slide-in Drawer Content */}
        <Dialog.Content
          aria-describedby="drawer-desc"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '540px',
            backgroundColor: 'var(--surface)',
            borderLeft: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-overlay)',
            zIndex: 1101,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {/* Drawer Header */}
          <div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderBottom: '1px solid var(--border)',
              backgroundColor: 'var(--ivory-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <div>
              <span
                className="label"
                style={{
                  color: 'var(--copper-600)',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                {isEdit ? 'RECORD MODIFICATION' : 'NEW REGISTRATION'}
              </span>
              <Dialog.Title
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  margin: 0,
                }}
              >
                {isEdit ? `Edit Property (${propertyToEdit?.id})` : 'Add New Property Listing'}
              </Dialog.Title>
              <Dialog.Description id="drawer-desc" className="sr-only">
                {isEdit
                  ? 'Update property details in the simulated in-memory store.'
                  : 'Register a new property listing with default placeholder photo.'}
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close drawer"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: 'var(--radius-default)',
                  display: 'inline-flex',
                }}
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Drawer Form Body */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              flex: 1,
            }}
          >
            {/* Photography Notice Banner */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                padding: '10px 12px',
                backgroundColor: 'var(--ivory-200)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
              }}
            >
              <Camera size={14} style={{ color: 'var(--copper-600)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--text-heading)', display: 'block', marginBottom: '2px' }}>
                  Photo upload simulated:
                </strong>
                Photo upload is part of the full production version. Newly added listings use a neutral architectural registration vector illustration.
              </div>
            </div>

            {/* Error Summary */}
            <FormErrorSummary errors={errorList} />

            {/* Field: Title */}
            <TextField
              id="drawer-title"
              name="title"
              label="Listing Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern 1 Kanal Architect-Designed Residence"
              required
              error={errors.title}
            />

            {/* Field: Type & Sector in 2 Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <SelectField
                id="drawer-type"
                name="type"
                label="Property Type"
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
                options={[
                  { value: 'house', label: 'House' },
                  { value: 'portion', label: 'Portion' },
                  { value: 'apartment', label: 'Apartment' },
                  { value: 'commercial', label: 'Commercial' },
                ]}
              />

              <SelectField
                id="drawer-area"
                name="areaSlug"
                label="Lahore Sector"
                value={areaSlug}
                onChange={(e) => setAreaSlug(e.target.value)}
                options={LAHORE_AREAS.map((a) => ({
                  value: a.slug,
                  label: a.name,
                }))}
              />
            </div>

            {/* Field: Rent (PKR) */}
            <TextField
              id="drawer-rent"
              name="rent"
              label="Expected Monthly Rent (PKR)"
              value={rentInput}
              onChange={(e) => setRentInput(e.target.value)}
              placeholder="e.g. 175,000"
              hint="Enter amount in PKR (commas accepted)"
              required
              error={errors.rent}
            />

            {/* Field: Bedrooms & Bathrooms */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <TextField
                id="drawer-bedrooms"
                name="bedrooms"
                label="Bedrooms"
                type="number"
                min="0"
                max="12"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="3 (or leave blank for comm.)"
              />

              <TextField
                id="drawer-bathrooms"
                name="bathrooms"
                label="Bathrooms"
                type="number"
                min="0"
                max="12"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder="3"
              />
            </div>

            {/* Field: Covered Area Value & Unit */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-3)' }}>
              <TextField
                id="drawer-area-val"
                name="coveredAreaValue"
                label="Covered Area Size"
                type="number"
                step="0.5"
                min="1"
                value={coveredAreaValue}
                onChange={(e) => setCoveredAreaValue(e.target.value)}
                required
                error={errors.coveredArea}
              />

              <SelectField
                id="drawer-area-unit"
                name="coveredAreaUnit"
                label="Unit"
                value={coveredAreaUnit}
                onChange={(e) => setCoveredAreaUnit(e.target.value as 'marla' | 'kanal' | 'sq ft')}
                options={[
                  { value: 'marla', label: 'Marla' },
                  { value: 'kanal', label: 'Kanal' },
                  { value: 'sq ft', label: 'Sq Ft' },
                ]}
              />
            </div>

            {/* Field: Status & Furnished */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-3)' }}>
              <SelectField
                id="drawer-status"
                name="status"
                label="Availability Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as AvailabilityStatus)}
                options={[
                  { value: 'available', label: 'Available' },
                  { value: 'available-soon', label: 'Available Soon' },
                  { value: 'rented', label: 'Rented' },
                ]}
              />

              <SelectField
                id="drawer-furnished"
                name="furnished"
                label="Furnished"
                value={furnished ? 'yes' : 'no'}
                onChange={(e) => setFurnished(e.target.value === 'yes')}
                options={[
                  { value: 'no', label: 'Unfurnished' },
                  { value: 'yes', label: 'Furnished' },
                ]}
              />
            </div>

            {/* Field: Featured checkbox */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-heading)',
              }}
            >
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--forest-900)' }}
              />
              Showcase this listing on the homepage featured section
            </label>

            {/* Field: Description */}
            <TextareaField
              id="drawer-description"
              name="description"
              label="Property Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe layout, condition, and sector location highlights..."
              required
              hint="Two short paragraphs recommended."
              error={errors.description}
            />

            {/* Sticky Actions Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--border)',
                marginTop: 'auto',
              }}
            >
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                {isEdit ? 'Update listing' : 'Save new listing'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
