import type { BookingRequest } from "@/features/bookings/schema";
import type { Booking, BookingStatus } from "@/features/bookings/types";

export const bookingsQueryKey = ["bookings"] as const;

/** Every booking (admin only). */
export async function getBookings(): Promise<Booking[]> {
  const response = await fetch("/api/bookings");
  if (!response.ok) throw new Error("bookings_unavailable");
  return response.json();
}

/** Moves a booking to a new status (admin only). */
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
  if (!response.ok) throw new Error("booking_update_failed");
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
