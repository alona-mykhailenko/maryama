import { z } from "zod";
import { BookingStatus } from "@/generated/prisma/enums";
import { getAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BOOKING_TRANSITIONS } from "@/features/bookings/transitions";

const updateBookingSchema = z.object({
  status: z.enum(BookingStatus),
});

/** Admin only: one booking. Unknown ids get 404. */
export async function GET(_request: Request, ctx: RouteContext<"/api/bookings/[id]">) {
  if (!(await getAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const bookingId = Number(id);
  if (!Number.isInteger(bookingId)) {
    return Response.json({ error: "invalid_id" }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }
    return Response.json(booking);
  } catch (error) {
    console.error("Failed to fetch booking:", error);
    return Response.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

/**
 * Admin only: change a booking's status. Only the moves in `BOOKING_TRANSITIONS`
 * are allowed (pending → confirmed / cancelled, confirmed → cancelled), so a
 * cancelled booking can never come back over nights that were rebooked.
 * Unknown ids get 404, disallowed moves 409 `invalid_transition`.
 */
export async function PATCH(request: Request, ctx: RouteContext<"/api/bookings/[id]">) {
  if (!(await getAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const bookingId = Number(id);
  if (!Number.isInteger(bookingId)) {
    return Response.json({ error: "invalid_id" }, { status: 400 });
  }

  const parsed = updateBookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const { status } = parsed.data;

  try {
    const current = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { status: true },
    });
    if (!current) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }
    if (!BOOKING_TRANSITIONS[current.status].some((transition) => transition.to === status)) {
      return Response.json({ error: "invalid_transition" }, { status: 409 });
    }

    // Only applies if nobody changed the status since it was read.
    const { count } = await prisma.booking.updateMany({
      where: { id: bookingId, status: current.status },
      data: { status },
    });
    if (count === 0) {
      return Response.json({ error: "invalid_transition" }, { status: 409 });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    return Response.json(booking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    return Response.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
