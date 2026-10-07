import type { Booking } from '@/services/types/booking';
import type { Room } from '@/services/types/room';

export interface MonthViewProps {
  month: Date;
  rooms: Room[];
  bookings: Booking[];
}
