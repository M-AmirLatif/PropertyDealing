import { Badge, type BadgeVariant } from '../ui/Badge';
import { formatDate, formatShortDate } from '../../lib/format';
import type { AvailabilityStatus } from '../../types';

interface StatusBadgeProps {
  status: AvailabilityStatus;
  availableFrom?: string;
  compact?: boolean;
  className?: string;
}

export function StatusBadge({ status, availableFrom, compact = false, className = '' }: StatusBadgeProps) {
  let variant: BadgeVariant = 'neutral';
  let label = 'Status Pending';

  switch (status) {
    case 'available':
      variant = 'available';
      label = 'Available';
      break;
    case 'available-soon':
      variant = 'reserved';
      label = availableFrom
        ? compact
          ? `From ${formatShortDate(availableFrom)}`
          : `Available from ${formatDate(availableFrom)}`
        : 'Available Soon';
      break;
    case 'rented':
      variant = 'rented';
      label = 'Rented';
      break;
  }

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
