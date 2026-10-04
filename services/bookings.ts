import type { Booking, BookingStatus } from "@/services/types/booking";

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
