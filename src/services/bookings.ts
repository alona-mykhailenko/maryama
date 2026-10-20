import type { BookingRequest, BookingsPageQuery } from "@/features/bookings/schema";
import type { Booking, BookingsPage, BookingStatus } from "@/features/bookings/types";

export const bookingsQueryKey = ["bookings"] as const;

/** Every booking (admin only). */
export async function getBookings(): Promise<Booking[]> {
  const response = await fetch("/api/bookings");
  if (!response.ok) throw new Error("bookings_unavailable");
  return response.json();
}

/** Under `bookingsQueryKey`, so invalidating the list refreshes every page too. */
export const bookingsPageQueryKey = (query: BookingsPageQuery) =>
  ["bookings", "page", query] as const;

/** One page of bookings, optionally filtered by status (admin only). */
export async function getBookingsPage({
  page,
  pageSize,
  status,
}: BookingsPageQuery): Promise<BookingsPage> {
  const params = new URLSearchParams({ page: String(page) });
  if (pageSize !== undefined) params.set("pageSize", String(pageSize));
  if (status) params.set("status", status);
  const response = await fetch(`/api/bookings?${params}`);
  if (!response.ok) throw new Error("bookings_unavailable");
  return response.json();
}

/** Under `bookingsQueryKey`, so invalidating the list refreshes it too. */
export const bookingQueryKey = (id: number) => ["bookings", id] as const;

/** One booking (admin only). */
export async function getBooking(id: number): Promise<Booking> {
  const response = await fetch(`/api/bookings/${id}`);
  if (!response.ok) throw new Error("booking_unavailable");
  return response.json();
}

/**
 * Moves a booking to a new status (admin only).
 * @throws Error with the API's error code ("invalid_transition", "not_found", …)
 */
export async function updateBookingStatus({
  id,
  status,
}: {
  id: number;
  status: BookingStatus;
}): Promise<Booking> {
  const response = await fetch(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "booking_update_failed");
  }
  return response.json();
}

/**
 * Sends a guest's booking request (public). The booking is created as pending.
 * @throws Error with the API's error code ("dates_unavailable", "too_many_guests", …)
 */
export async function createBooking(
  request: BookingRequest,
): Promise<Pick<Booking, "id" | "status">> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "booking_failed");
  }
  return response.json();
}
