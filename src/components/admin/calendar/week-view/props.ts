import type { Booking } from '@/features/bookings/types';
import type { Room } from '@/services/types/room';

export interface WeekViewProps {
  weekStart: Date;
  rooms: Room[];
  bookings: Booking[];
}
