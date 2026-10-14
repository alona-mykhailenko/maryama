import { z } from "zod";

/**
 * A room's new nightly price, as sent to `PATCH /api/rooms/[id]`. Shared by
 * the route handler and the admin price dialog. Whole euros.
 */
export const roomPriceSchema = z.object({
  pricePerNight: z
    .number("Enter a price")
    .int("Use whole euros")
    .min(1, "The price must be at least €1")
    .max(10000, "The price can't be more than €10,000"),
});

export type RoomPriceUpdate = z.infer<typeof roomPriceSchema>;
