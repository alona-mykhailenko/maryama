import type { BookingStatus } from '@/services/types/booking';

export interface BookingActionsProps {
  bookingId: number;
  status: BookingStatus;
  disabled?: boolean;
  onTransition: (change: { id: number; status: BookingStatus }) => void;
}
