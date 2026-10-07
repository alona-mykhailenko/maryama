import type { BookingStatus } from "@/generated/prisma/enums";

export type { BookingStatus };

/** A booking as returned by `GET /api/bookings` (dates are ISO strings). */
export interface Booking {
  id: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  guests: number;
  message: string | null;
  status: BookingStatus;
  createdAt: string;
}
