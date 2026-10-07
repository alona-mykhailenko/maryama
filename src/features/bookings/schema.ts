import { z } from "zod";

const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose your dates");

/**
 * A guest's booking request, as posted to `POST /api/bookings`. Shared by the
 * route handler and the booking form so both validate the same way. Dates are
 * `YYYY-MM-DD` with check-out exclusive.
 */
export const bookingRequestSchema = z.object({
  roomId: z.number().int().positive(),
  checkIn: isoDay,
  checkOut: isoDay,
  guests: z.number().int().min(1),
  guestName: z.string().trim().min(1, "Your name is required").max(120, "Keep it under 120 characters"),
  guestEmail: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email")),
  guestPhone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s().-]{6,24}$/, "Enter a valid phone number"),
  message: z.string().trim().max(1000, "Keep it under 1000 characters").optional(),
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;
