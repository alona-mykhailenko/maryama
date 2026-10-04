import type { BookingStatus } from '@/services/types/booking';

export interface TransitionButtonProps {
  bookingId: number;
  /** Status the booking moves to. */
  to: BookingStatus;
  label: string;
  disabled?: boolean;
  onTransition: (change: { id: number; status: BookingStatus }) => void;
}
