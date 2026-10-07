import type { Booking } from '@/features/bookings/types';
import type { Room } from '@/services/types/room';

export interface MonthViewProps {
  month: Date;
  rooms: Room[];
  bookings: Booking[];
}
