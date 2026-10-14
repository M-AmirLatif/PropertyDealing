import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Info } from 'lucide-react';
import type { InquiryRecord } from '../../types';
import { SAMPLE_INQUIRIES } from '../../data/inquiries';
import { formatDate } from '../../lib/format';

export function InquiriesTable() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(SAMPLE_INQUIRIES);
  const [expandedId, setExpandedId] = useState<string | null>(SAMPLE_INQUIRIES[0]?.id || null);

  const handleStatusChange = (id: string, newStatus: 'new' | 'contacted' | 'archived') => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-default)',
        padding: 'clamp(1rem, 2.5vw, 1.75rem)',
      }}
    >
      {/* Header Strip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-3)',
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
            INCOMING CLIENT CORRESPONDENCE
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-heading)',
              margin: 0,
            }}
          >
            Sample Inquiries (fictional)
          </h2>
        </div>
      </div>

      {/* Honesty Callout Note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: 'var(--ivory-100)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-default)',
          marginBottom: 'var(--space-4)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--text-muted)',
        }}
      >
        <Info size={14} style={{ color: 'var(--brass-500)', flexShrink: 0 }} />
        <span>
          In the live version, inquiries sent from the website would appear here. Submissions made via the public demo forms are not connected to this mock log.
        </span>
      </div>

      {/* Inquiries Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.8125rem',
          }}
        >
          <caption className="sr-only">Simulated inquiries and leads received for rental listings</caption>
          <thead>
            <tr
              style={{
                borderBottom: '1.5px solid var(--border-strong)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              <th scope="col" style={{ padding: '8px 10px', width: '80px' }}>ID</th>
              <th scope="col" style={{ padding: '8px 10px', width: '120px' }}>Client</th>
              <th scope="col" style={{ padding: '8px 10px', width: '130px' }}>Phone</th>
              <th scope="col" style={{ padding: '8px 10px' }}>Inquiring About</th>
              <th scope="col" style={{ padding: '8px 10px', width: '110px' }}>Date</th>
              <th scope="col" style={{ padding: '8px 10px', width: '120px' }}>Lead Status</th>
              <th scope="col" style={{ padding: '8px 10px', width: '80px', textAlign: 'right' }}>Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => {
              const isExpanded = expandedId === inq.id;
              return (
                <tr key={inq.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td colSpan={7} style={{ padding: 0 }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 120px 130px 1fr 110px 120px 80px',
                        alignItems: 'center',
                        padding: '10px 0',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s ease',
                      }}
                      onClick={() => toggleExpand(inq.id)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ivory-100)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* ID */}
                      <div style={{ padding: '0 10px', fontFamily: 'var(--font-mono)', color: 'var(--text-brass)', fontWeight: 600 }}>
                        {inq.id}
                      </div>

                      {/* Client Name */}
                      <div style={{ padding: '0 10px', fontWeight: 600, color: 'var(--text-heading)' }}>
                        {inq.name}
                      </div>

                      {/* Phone */}
                      <div style={{ padding: '0 10px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {inq.phone}
                      </div>

                      {/* Property Title */}
                      <div style={{ padding: '0 10px', color: 'var(--text-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {inq.propertyTitle || 'General Tenancy Inquiry'}
                      </div>

                      {/* Date */}
                      <div style={{ padding: '0 10px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {formatDate(inq.date)}
                      </div>

                      {/* Status select (click propagation stopped so dropdown works without expanding) */}
                      <div style={{ padding: '0 10px' }} onClick={(e) => e.stopPropagation()}>
                        <label htmlFor={`inq-status-${inq.id}`} className="sr-only">
                          Status for inquiry {inq.id}
                        </label>
                        <select
                          id={`inq-status-${inq.id}`}
                          value={inq.status}
                          onChange={(e) =>
                            handleStatusChange(inq.id, e.target.value as 'new' | 'contacted' | 'archived')
                          }
                          style={{
                            width: '100%',
                            padding: '3px 6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6875rem',
                            borderRadius: 'var(--radius-default)',
                            border: '1px solid var(--border-strong)',
                            backgroundColor:
                              inq.status === 'new'
                                ? 'rgba(180, 100, 30, 0.12)'
                                : inq.status === 'contacted'
                                ? 'rgba(40, 70, 45, 0.1)'
                                : 'rgba(120, 120, 120, 0.1)',
                            color: 'var(--text-heading)',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Closed</option>
                        </select>
                      </div>

                      {/* Expand Toggle */}
                      <div style={{ padding: '0 10px', textAlign: 'right' }}>
                        <button
                          type="button"
                          aria-label={isExpanded ? 'Collapse inquiry details' : 'Expand inquiry details'}
                          aria-expanded={isExpanded}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px',
                          }}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Message Box */}
                    {isExpanded && (
                      <div
                        style={{
                          backgroundColor: 'var(--ivory-150, #f2ece0)',
                          borderTop: '1px dashed var(--border)',
                          padding: 'var(--space-3) var(--space-4)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                        }}
                      >
                        <MessageSquare size={16} style={{ color: 'var(--copper-600)', flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.6875rem',
                              color: 'var(--text-muted)',
                              display: 'block',
                              marginBottom: '4px',
                            }}
                          >
                            INQUIRY MESSAGE CONTENT:
                          </span>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              color: 'var(--text-heading)',
                            }}
                          >
                            "{inq.message}"
                          </p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
