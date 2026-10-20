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
  pricePerNight: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

/** One page of bookings, as returned by `GET /api/bookings?page=…`. */
export interface BookingsPage {
  items: Booking[];
  /** Bookings matching the filter, across every page. */
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}
