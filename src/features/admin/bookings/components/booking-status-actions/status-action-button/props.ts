import type { BookingStatus } from '@/features/bookings/types';

export interface StatusActionButtonProps {
  /** Status the booking moves to. */
  to: BookingStatus;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: (status: BookingStatus) => void;
}
