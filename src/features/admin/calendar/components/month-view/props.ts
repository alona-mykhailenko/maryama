import type { Booking } from '@/features/bookings/types';
import type { Room } from '@/features/rooms/types';

export interface MonthViewProps {
  month: Date;
  rooms: Room[];
  bookings: Booking[];
}
