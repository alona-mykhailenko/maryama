import { z } from "zod";
import { BookingStatus } from "@/generated/prisma/enums";
import { getAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

const updateBookingSchema = z.object({
  status: z.enum(BookingStatus),
});

/** Admin only: change a booking's status. */
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

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: parsed.data.status },
    });

    return Response.json(booking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    return Response.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
