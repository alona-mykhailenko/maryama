import type { Booking } from '@/features/bookings/types';
import type { Room } from '@/features/rooms/types';

export interface WeekViewProps {
  weekStart: Date;
  rooms: Room[];
  bookings: Booking[];
}
