import { useState, useRef, useEffect, type FormEvent, type FocusEvent } from 'react';
import { Camera } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import {
  TextField,
  TextareaField,
  SelectField,
  FormErrorSummary,
  DemoConfirmation,
  type FormErrorItem,
} from '../components/forms';
import { LAHORE_AREAS } from '../data/areas';
import { SITE } from '../config/site';
import {
  validateRequired,
  validatePakistaniPhone,
  validateRent,
} from '../lib/validation';
import { buildOwnerListingMessage } from '../lib/whatsapp';

interface OwnerFormData {
  ownerName: string;
  phone: string;
  area: string;
  streetAddress: string;
  propertyType: string;
  bedrooms: string;
  expectedRent: string;
  notes: string;
}

const INITIAL_FORM: OwnerFormData = {
  ownerName: '',
  phone: '',
  area: 'dha-phase-5',
  streetAddress: '',
  propertyType: 'house',
  bedrooms: '3',
  expectedRent: '',
  notes: '',
};

export default function ListYourProperty() {
  const [formData, setFormData] = useState<OwnerFormData>(INITIAL_FORM);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorList, setErrorList] = useState<FormErrorItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const rentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = `List Your Property — ${SITE.dealerName}`;
  }, []);

  const validateField = (field: keyof OwnerFormData, value: string): string | null => {
    if (field === 'ownerName') {
      return validateRequired(value, 'Owner name', 2);
    }
    if (field === 'phone') {
      const res = validatePakistaniPhone(value);
      return res.error;
    }
    if (field === 'streetAddress') {
      return validateRequired(value, 'Street or block address', 3);
    }
    if (field === 'expectedRent') {
      const res = validateRent(value, true);
      return res.error;
    }
    return null;
  };

  const handleBlur = (field: keyof OwnerFormData) => (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, e.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const handleChange = (field: keyof OwnerFormData, value: string) => {
    // If typing rent, format with commas dynamically
    if (field === 'expectedRent') {
      const digits = value.replace(/[^\d]/g, '');
      const formatted = digits ? parseInt(digits, 10).toLocaleString() : '';
      setFormData((prev) => ({ ...prev, expectedRent: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) next[field] = err;
        else delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nameErr = validateField('ownerName', formData.ownerName);
    const phoneErr = validateField('phone', formData.phone);
    const addrErr = validateField('streetAddress', formData.streetAddress);
    const rentErr = validateField('expectedRent', formData.expectedRent);

    const newErrors: Record<string, string> = {};
    const newErrorList: FormErrorItem[] = [];

    if (nameErr) {
      newErrors.ownerName = nameErr;
      newErrorList.push({ fieldId: 'owner-name', message: nameErr });
    }
    if (phoneErr) {
      newErrors.phone = phoneErr;
      newErrorList.push({ fieldId: 'owner-phone', message: phoneErr });
    }
    if (addrErr) {
      newErrors.streetAddress = addrErr;
      newErrorList.push({ fieldId: 'owner-address', message: addrErr });
    }
    if (rentErr) {
      newErrors.expectedRent = rentErr;
      newErrorList.push({ fieldId: 'owner-rent', message: rentErr });
    }

    setErrors(newErrors);
    setErrorList(newErrorList);
    setTouched({ ownerName: true, phone: true, streetAddress: true, expectedRent: true });

    if (newErrorList.length > 0) {
      if (nameErr) nameInputRef.current?.focus();
      else if (phoneErr) phoneInputRef.current?.focus();
      else if (addrErr) nameInputRef.current?.focus();
      else if (rentErr) rentInputRef.current?.focus();
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setErrorList([]);
    setTouched({});
    setIsSubmitted(false);
  };

  const areaOptions = LAHORE_AREAS.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const propertyTypeOptions = [
    { value: 'Independent House', label: 'Independent House / Bungalow' },
    { value: 'Upper Portion', label: 'Upper Floor Portion' },
    { value: 'Lower Portion', label: 'Lower Ground Portion' },
    { value: 'Apartment / Flat', label: 'Residential Apartment' },
    { value: 'Commercial Shop / Floor', label: 'Commercial Space / Office' },
  ];

  const bedroomsOptions = [
    { value: '', label: 'None / Commercial' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4 Bedrooms' },
    { value: '5+', label: '5 or more Bedrooms' },
  ];

  const locationSummary = `${formData.streetAddress}, ${formData.area}, Lahore`;

  const whatsappMessage = buildOwnerListingMessage({
    name: formData.ownerName,
    phone: formData.phone,
    location: locationSummary,
    propertyType: formData.propertyType,
    bedrooms: formData.bedrooms ? `${formData.bedrooms} Beds` : undefined,
    rent: `Rs. ${formData.expectedRent}/month`,
    notes: formData.notes,
  });

  return (
    <Section variant="default">
      <Container>
        {/* Editorial Page Head */}
        <div style={{ maxWidth: '780px', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            LANDLORD &amp; OWNER REGISTER
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h1)',
              lineHeight: 'var(--lh-h1)',
              color: 'var(--text-heading)',
              margin: '0 0 var(--space-3) 0',
            }}
          >
            List your property
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            In the live service, the dealer would review your property specifications, coordinate an initial walkthrough, document high-resolution architectural photography, and present your listing to qualified prospective tenants.
          </p>
        </div>

        {/* Form + Sidebar Grid */}
        <div
          className="owner-listing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'start',
          }}
        >
          {/* Main Form Column */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-default)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              boxShadow: 'var(--shadow-overlay)',
            }}
          >
            {isSubmitted ? (
              <DemoConfirmation
                title="Listing details submitted (simulation)"
                whatsappMessage={whatsappMessage}
                onReset={handleReset}
                enteredSummary={[
                  { label: 'Owner', value: formData.ownerName },
                  { label: 'Phone', value: formData.phone },
                  { label: 'Location', value: locationSummary },
                  { label: 'Type', value: formData.propertyType },
                  { label: 'Demand', value: `Rs. ${formData.expectedRent}/month` },
                ]}
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-3)' }}>
                  <span
                    className="label"
                    style={{
                      color: 'var(--copper-600)',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    PROPERTY INTAKE
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--text-heading)',
                      margin: 0,
                    }}
                  >
                    Property &amp; Landlord Particulars
                  </h2>
                </div>

                <FormErrorSummary errors={errorList} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {/* Owner Name */}
                  <TextField
                    ref={nameInputRef}
                    id="owner-name"
                    name="ownerName"
                    label="Owner / Representative name"
                    placeholder="e.g. Asif Raza"
                    autoComplete="name"
                    required
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    onBlur={handleBlur('ownerName')}
                    error={touched.ownerName ? errors.ownerName : undefined}
                  />

                  {/* Contact Number */}
                  <TextField
                    ref={phoneInputRef}
                    id="owner-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    label="Contact mobile number"
                    placeholder="0300-1234567"
                    hint="Pakistani mobile format (03XX-XXXXXXX)"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={handleBlur('phone')}
                    error={touched.phone ? errors.phone : undefined}
                  />

                  {/* Location (Area Select + Street Address) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <SelectField
                      id="owner-area"
                      name="area"
                      label="Locality / Sector"
                      options={areaOptions}
                      value={formData.area}
                      onChange={(e) => handleChange('area', e.target.value)}
                    />

                    <TextField
                      id="owner-address"
                      name="streetAddress"
                      label="Street / Block address"
                      placeholder="e.g. Block C, Lane 4"
                      required
                      value={formData.streetAddress}
                      onChange={(e) => handleChange('streetAddress', e.target.value)}
                      onBlur={handleBlur('streetAddress')}
                      error={touched.streetAddress ? errors.streetAddress : undefined}
                    />
                  </div>

                  {/* Typology & Bedrooms */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                    <SelectField
                      id="owner-type"
                      name="propertyType"
                      label="Property type"
                      options={propertyTypeOptions}
                      value={formData.propertyType}
                      onChange={(e) => handleChange('propertyType', e.target.value)}
                    />

                    <SelectField
                      id="owner-bedrooms"
                      name="bedrooms"
                      label="Bedrooms (if residential)"
                      options={bedroomsOptions}
                      value={formData.bedrooms}
                      onChange={(e) => handleChange('bedrooms', e.target.value)}
                    />
                  </div>

                  {/* Expected Monthly Rent */}
                  <TextField
                    ref={rentInputRef}
                    id="owner-rent"
                    name="expectedRent"
                    label="Expected monthly rent (PKR)"
                    placeholder="e.g. 120,000"
                    prefixText="Rs."
                    inputMode="numeric"
                    hint="Enter amount without currency symbol — commas added automatically"
                    required
                    value={formData.expectedRent}
                    onChange={(e) => handleChange('expectedRent', e.target.value)}
                    onBlur={handleBlur('expectedRent')}
                    error={touched.expectedRent ? errors.expectedRent : undefined}
                  />

                  {/* Notes / Special Terms */}
                  <TextareaField
                    id="owner-notes"
                    name="notes"
                    label="Additional details or terms (optional)"
                    placeholder="Mention covered area, parking spaces, tenant preferences, or special lease requirements."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                  />

                  {/* Submit Button */}
                  <div style={{ paddingTop: 'var(--space-2)' }}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Submit details (demo)
                    </Button>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        color: 'var(--text-muted)',
                        textAlign: 'center',
                        marginTop: 'var(--space-2)',
                      }}
                    >
                      Demonstration only · No data is stored or transmitted
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Sidebar: Service Context & WhatsApp Photo Notice */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* WhatsApp Photos Notice Card */}
            <div
              style={{
                backgroundColor: 'rgba(15, 122, 63, 0.08)',
                border: '1.5px solid var(--whatsapp)',
                borderRadius: 'var(--radius-default)',
                padding: 'var(--space-5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-2)' }}>
                <Camera size={20} style={{ color: 'var(--whatsapp)' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    color: 'var(--whatsapp)',
                    margin: 0,
                  }}
                >
                  Property Photography
                </h3>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: 'var(--text-heading)',
                  margin: '0 0 var(--space-3) 0',
                }}
              >
                In the live service, property photos, floor plans, and video walkthroughs can be shared directly with the dealer over WhatsApp. There is no need to upload large files through a web browser.
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--whatsapp)',
                  fontWeight: 600,
                  display: 'block',
                }}
              >
                NO BROWSER UPLOAD REQUIRED
              </span>
            </div>

            {/* How It Would Work for Landlords */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
                padding: 'var(--space-5)',
              }}
            >
              <span className="label" style={{ color: 'var(--copper-600)', display: 'block', marginBottom: 'var(--space-2)' }}>
                THE ONBOARDING PROCESS
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  color: 'var(--text-heading)',
                  margin: '0 0 var(--space-4) 0',
                }}
              >
                What happens in live service
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-brass)', fontWeight: 600 }}>
                    1.
                  </span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
                    <strong>Consultation:</strong> The dealer contacts you to review prevailing sector rents and confirm lease terms.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-brass)', fontWeight: 600 }}>
                    2.
                  </span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
                    <strong>Inventory register:</strong> Key fixtures, covered areas, and utility supplies are catalogued.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-brass)', fontWeight: 600 }}>
                    3.
                  </span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
                    <strong>Accompanied viewings:</strong> Property visits are arranged only for qualified, serious prospective tenants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .owner-listing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Section>
  );
}
