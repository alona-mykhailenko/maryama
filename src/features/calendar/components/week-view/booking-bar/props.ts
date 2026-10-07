import type { Booking } from '@/features/bookings/types';

export interface BookingBarProps {
  booking: Booking;
  /** First day column (0–6) the bar covers this week. */
  startOffset: number;
  /** Number of day columns the bar spans. */
  span: number;
}
