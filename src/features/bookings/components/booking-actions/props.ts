import type { BookingStatus } from '@/features/bookings/types';

export interface BookingActionsProps {
  bookingId: number;
  status: BookingStatus;
  disabled?: boolean;
  onTransition: (change: { id: number; status: BookingStatus }) => void;
}
