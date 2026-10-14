import { type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface FavoriteButtonProps {
  propertyId: string;
  propertyTitle: string;
  className?: string;
}

export function FavoriteButton({
  propertyId,
  propertyTitle,
  className = '',
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(propertyId);
  };

  const label = active
    ? `Remove ${propertyTitle} from saved`
    : `Save ${propertyTitle}`;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={handleClick}
      className={`favorite-btn ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: active ? 'var(--forest-900)' : 'rgba(251, 248, 242, 0.92)',
        backdropFilter: 'blur(4px)',
        border: active ? '1px solid var(--forest-900)' : '1px solid var(--border)',
        color: active ? '#E05D52' : 'var(--charcoal-900)',
        boxShadow: '0 2px 8px rgba(24, 26, 23, 0.1)',
        cursor: 'pointer',
        transition: 'background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
        zIndex: 5,
      }}
    >
      <motion.div
        animate={{ scale: active ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Heart
          size={18}
          fill={active ? '#E05D52' : 'none'}
          stroke={active ? '#E05D52' : 'currentColor'}
          strokeWidth={1.8}
        />
      </motion.div>
    </button>
  );
}
