import type { BookingStatus } from '@/features/bookings/types';

export interface BookingStatusActionsProps {
  status: BookingStatus;
  /** Status currently being saved: shows a spinner on its button and disables the others. */
  pendingStatus?: BookingStatus | null;
  onTransition: (status: BookingStatus) => void;
  /** Shown under the buttons (e.g. the request failed). */
  error?: string | null;
}
