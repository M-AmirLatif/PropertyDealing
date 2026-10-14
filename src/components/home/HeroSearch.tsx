import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { LAHORE_AREAS } from '../../data/areas';
import { Button } from '../ui/Button';

export function HeroSearch() {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [type, setType] = useState('all');
  const [budget, setBudget] = useState('any');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (area && area.trim().length > 0) {
      params.set('area', area);
    }
    if (type && type !== 'all') {
      params.set('type', type);
    }

    if (budget === 'under-50k') {
      params.set('maxRent', '50000');
    } else if (budget === '50k-100k') {
      params.set('minRent', '50000');
      params.set('maxRent', '100000');
    } else if (budget === '100k-200k') {
      params.set('minRent', '100000');
      params.set('maxRent', '200000');
    } else if (budget === '200k-plus') {
      params.set('minRent', '200000');
    }

    const queryString = params.toString();
    navigate({
      pathname: '/properties',
      search: queryString ? `?${queryString}` : '',
    });
  };

  const selectStyle = {
    width: '100%',
    height: '46px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-default)',
    padding: '0 12px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--text-heading)',
    cursor: 'pointer',
    appearance: 'auto' as const,
  };

  return (
    <div
      className="hero-search-card"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-default)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        boxShadow: 'var(--shadow-overlay)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <form role="search" onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-3)',
            paddingBottom: 'var(--space-2)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span
            className="label"
            style={{
              color: 'var(--copper-600)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Search size={12} />
            <span>Search Register Index</span>
          </span>
          <span
            className="label"
            style={{ color: 'var(--text-muted)', fontSize: '0.625rem' }}
          >
            Lahore Rental Inventory
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-3)',
            alignItems: 'flex-end',
          }}
        >
          {/* Area Field */}
          <div>
            <label
              htmlFor="hero-search-area"
              className="label"
              style={{
                display: 'block',
                marginBottom: '4px',
                color: 'var(--text-body)',
              }}
            >
              Locality / Area
            </label>
            <select
              id="hero-search-area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              style={selectStyle}
            >
              <option value="">Any area in Lahore</option>
              {LAHORE_AREAS.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Field */}
          <div>
            <label
              htmlFor="hero-search-type"
              className="label"
              style={{
                display: 'block',
                marginBottom: '4px',
                color: 'var(--text-body)',
              }}
            >
              Property Typology
            </label>
            <select
              id="hero-search-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={selectStyle}
            >
              <option value="all">Any property type</option>
              <option value="house">Houses &amp; Villas</option>
              <option value="portion">Upper / Lower Portions</option>
              <option value="apartment">Apartments &amp; Studios</option>
              <option value="commercial">Commercial Spaces</option>
            </select>
          </div>

          {/* Budget Preset Field */}
          <div>
            <label
              htmlFor="hero-search-budget"
              className="label"
              style={{
                display: 'block',
                marginBottom: '4px',
                color: 'var(--text-body)',
              }}
            >
              Monthly Budget (PKR)
            </label>
            <select
              id="hero-search-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={selectStyle}
            >
              <option value="any">Any budget range</option>
              <option value="under-50k">Up to Rs. 50,000</option>
              <option value="50k-100k">Rs. 50,000 – 100,000</option>
              <option value="100k-200k">Rs. 100,000 – 200,000</option>
              <option value="200k-plus">Rs. 200,000 and above</option>
            </select>
          </div>

          {/* Submit Action */}
          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              withArrow
              style={{ width: '100%', height: '46px' }}
            >
              Search properties
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
