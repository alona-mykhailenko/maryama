import type { Booking } from '@/services/types/booking';
import type { Room } from '@/services/types/room';

export interface WeekViewProps {
  weekStart: Date;
  rooms: Room[];
  bookings: Booking[];
}
