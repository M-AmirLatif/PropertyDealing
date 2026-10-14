import { useState, useRef, useEffect, type FormEvent, type FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
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
import { useWhatsApp } from '../context/WhatsAppContext';
import { useDealerPhone } from '../hooks/useDealerPhone';
import {
  validateRequired,
  validatePakistaniPhone,
} from '../lib/validation';
import { buildContactInquiryMessage } from '../lib/whatsapp';

interface ContactFormData {
  name: string;
  phone: string;
  lookingFor: string;
  area: string;
  budget: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = {
  name: '',
  phone: '',
  lookingFor: 'house',
  area: '',
  budget: 'any',
  message: '',
};

export default function Contact() {
  const { openWhatsApp } = useWhatsApp();
  const { phoneDisplay, callDealer } = useDealerPhone();

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorList, setErrorList] = useState<FormErrorItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = `Contact Advisory — ${SITE.dealerName}`;
  }, []);

  const validateField = (field: keyof ContactFormData, value: string): string | null => {
    if (field === 'name') {
      return validateRequired(value, 'Full name', 2);
    }
    if (field === 'phone') {
      const res = validatePakistaniPhone(value);
      return res.error;
    }
    return null;
  };

  const handleBlur = (field: keyof ContactFormData) => (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, e.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    const nameErr = validateField('name', formData.name);
    const phoneErr = validateField('phone', formData.phone);

    const newErrors: Record<string, string> = {};
    const newErrorList: FormErrorItem[] = [];

    if (nameErr) {
      newErrors.name = nameErr;
      newErrorList.push({ fieldId: 'contact-name', message: nameErr });
    }
    if (phoneErr) {
      newErrors.phone = phoneErr;
      newErrorList.push({ fieldId: 'contact-phone', message: phoneErr });
    }

    setErrors(newErrors);
    setErrorList(newErrorList);
    setTouched({ name: true, phone: true });

    if (newErrorList.length > 0) {
      if (nameErr) nameInputRef.current?.focus();
      else if (phoneErr) phoneInputRef.current?.focus();
      return;
    }

    // Normalized phone
    const normalizedPhone = validatePakistaniPhone(formData.phone).normalized || formData.phone;
    setFormData((prev) => ({ ...prev, phone: normalizedPhone }));
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setErrorList([]);
    setTouched({});
    setIsSubmitted(false);
  };

  const areaOptions = [
    { value: '', label: 'Any sector / Not sure yet' },
    ...LAHORE_AREAS.map((a) => ({ value: a.name, label: a.name })),
    { value: 'Other Lahore Locality', label: 'Other locality in Lahore' },
  ];

  const lookingForOptions = [
    { value: 'Independent House / Villa', label: 'Rent a House / Villa' },
    { value: 'Upper or Lower Portion', label: 'Rent a Portion' },
    { value: 'Apartment / Studio', label: 'Rent an Apartment' },
    { value: 'Commercial / Office Space', label: 'Rent Commercial Space' },
    { value: 'Not sure yet / General inquiry', label: 'Not sure yet' },
  ];

  const budgetOptions = [
    { value: 'Any monthly budget', label: 'Any budget range' },
    { value: 'Up to Rs. 50,000/month', label: 'Up to Rs. 50,000' },
    { value: 'Rs. 50,000 – 100,000/month', label: 'Rs. 50,000 – 100,000' },
    { value: 'Rs. 100,000 – 200,000/month', label: 'Rs. 100,000 – 200,000' },
    { value: 'Rs. 200,000+/month', label: 'Rs. 200,000 and above' },
  ];

  const whatsappMessage = buildContactInquiryMessage({
    name: formData.name,
    phone: formData.phone,
    lookingFor: formData.lookingFor,
    area: formData.area || 'Any sector in Lahore',
    budget: formData.budget,
    message: formData.message,
  });

  return (
    <Section variant="default">
      <Container>
        {/* Page Header */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '720px' }}>
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            OFFICE CONTACT &amp; INQUIRY
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
            Get in touch with the dealer
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
            Have a question about an indexed property or need assistance finding a rental in Lahore? Connect directly on WhatsApp or submit your requirements below.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Contact Methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <span
                className="label"
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.6875rem',
                  display: 'block',
                  marginBottom: 'var(--space-3)',
                }}
              >
                DIRECT CONTACT CHANNELS
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {/* WhatsApp Action Row */}
                <button
                  type="button"
                  onClick={() => openWhatsApp('Hello Irfan, I would like to consult regarding rental properties in Lahore.')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 18px',
                    backgroundColor: 'rgba(15, 122, 63, 0.08)',
                    border: '1.5px solid var(--whatsapp)',
                    borderRadius: 'var(--radius-default)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background-color var(--duration-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--whatsapp)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--whatsapp)' }}>
                        Chat on WhatsApp
                      </strong>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-body)' }}>
                        Fastest response for viewing inquiries
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--whatsapp)' }} />
                </button>

                {/* Phone Call Row */}
                <button
                  type="button"
                  onClick={() => callDealer()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 18px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-default)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color var(--duration-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--ivory-200)',
                        color: 'var(--charcoal-900)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9375rem', color: 'var(--text-heading)' }}>
                        Telephone Advisory
                      </strong>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        {phoneDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--line-strong)' }} />
                </button>

                {/* Email Address */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-default)',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ivory-200)',
                      color: 'var(--charcoal-900)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="label" style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'block' }}>
                      EMAIL INQUIRIES
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-heading)' }}>
                      {SITE.email}
                    </span>
                  </div>
                </div>

                {/* Office Location */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '14px 18px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-default)',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ivory-200)',
                      color: 'var(--charcoal-900)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="label" style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'block' }}>
                      OFFICE LOCATION
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-heading)', display: 'block' }}>
                      {SITE.address}
                    </span>
                  </div>
                </div>

                {/* Consultation Hours */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-default)',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ivory-200)',
                      color: 'var(--charcoal-900)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="label" style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'block' }}>
                      CONSULTATION HOURS
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                      {SITE.officeHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Area Link Card */}
            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--ivory-100)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-default)',
              }}
            >
              <span className="label" style={{ fontSize: '0.625rem', color: 'var(--copper-600)', display: 'block', marginBottom: '4px' }}>
                LOCALITY COVERAGE
              </span>
              <p style={{ fontSize: '0.875rem', margin: '0 0 var(--space-2) 0', color: 'var(--text-heading)' }}>
                Active in DHA Phases 5 &amp; 6, Bahria Town, Johar Town, Gulberg, Model Town, Wapda Town, Valencia, and Askari 11.
              </p>
              <Link
                to="/about#service-area"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--copper-600)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                }}
              >
                <span>Inspect schematic service area</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Right Column: Demo Form or Confirmation */}
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
                title="Inquiry submitted (simulation)"
                whatsappMessage={whatsappMessage}
                onReset={handleReset}
                enteredSummary={[
                  { label: 'Name', value: formData.name },
                  { label: 'Mobile', value: formData.phone },
                  { label: 'Category', value: formData.lookingFor },
                  { label: 'Locality', value: formData.area || 'Any area' },
                  { label: 'Budget', value: formData.budget },
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
                    ONLINE INQUIRY REGISTER
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--text-heading)',
                      margin: 0,
                    }}
                  >
                    Tell us what you are looking for
                  </h2>
                </div>

                <FormErrorSummary errors={errorList} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {/* Full Name */}
                  <TextField
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    label="Full name"
                    placeholder="e.g. Tariq Mehmood"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={handleBlur('name')}
                    error={touched.name ? errors.name : undefined}
                  />

                  {/* Mobile Number */}
                  <TextField
                    ref={phoneInputRef}
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    label="Mobile phone number"
                    placeholder="0300-1234567"
                    hint="Accepts 03XX-XXXXXXX or +92 format"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={handleBlur('phone')}
                    error={touched.phone ? errors.phone : undefined}
                  />

                  {/* Looking For */}
                  <SelectField
                    id="contact-looking-for"
                    name="lookingFor"
                    label="Property category"
                    options={lookingForOptions}
                    value={formData.lookingFor}
                    onChange={(e) => handleChange('lookingFor', e.target.value)}
                  />

                  {/* Preferred Area */}
                  <SelectField
                    id="contact-area"
                    name="area"
                    label="Preferred Lahore locality"
                    options={areaOptions}
                    value={formData.area}
                    onChange={(e) => handleChange('area', e.target.value)}
                  />

                  {/* Budget Presets */}
                  <SelectField
                    id="contact-budget"
                    name="budget"
                    label="Monthly budget"
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                  />

                  {/* Optional Message */}
                  <TextareaField
                    id="contact-message"
                    name="message"
                    label="Additional requirements (optional)"
                    placeholder="Mention preferred possession date, floor level, parking needs, etc."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />

                  {/* Submit Action */}
                  <div style={{ paddingTop: 'var(--space-2)' }}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Send inquiry (demo)
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
                      Demonstration only · No data is transmitted to an external server
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Section>
  );
}
