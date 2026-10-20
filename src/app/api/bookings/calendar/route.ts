import { type NextRequest } from "next/server";
import { z } from "zod";
import { BookingStatus } from "@/generated/prisma/enums";
import { getAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Widest range one request may ask for (a month view needs at most 31 days). */
const MAX_RANGE_DAYS = 92;

const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const querySchema = z
  .object({ from: isoDay, to: isoDay })
  .transform(({ from, to }) => ({
    from: new Date(`${from}T00:00:00.000Z`),
    to: new Date(`${to}T00:00:00.000Z`),
  }))
  .refine(({ from, to }) => !isNaN(from.getTime()) && !isNaN(to.getTime()))
  .refine(({ from, to }) => {
    const days = (to.getTime() - from.getTime()) / DAY_MS;
    return days >= 1 && days <= MAX_RANGE_DAYS;
  });

/**
 * Admin only: the bookings the calendar draws for `[from, to)`
 * (`?from=YYYY-MM-DD&to=YYYY-MM-DD`, `to` exclusive): pending and confirmed
 * bookings with at least one night in the range, oldest check-in first. Only
 * the fields the calendar shows, no guest contact details.
 */
export async function GET(request: NextRequest) {
  if (!(await getAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const parsed = querySchema.safeParse({
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  });
  if (!parsed.success) {
    return Response.json({ error: "invalid_dates" }, { status: 400 });
  }

  const { from, to } = parsed.data;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        // Cancelled bookings free their nights, so the calendar leaves them out.
        status: { not: BookingStatus.CANCELLED },
        checkIn: { lt: to },
        checkOut: { gt: from },
      },
      orderBy: [{ checkIn: "asc" }, { id: "asc" }],
      select: {
        id: true,
        roomId: true,
        checkIn: true,
        checkOut: true,
        guestName: true,
        status: true,
      },
    });

    return Response.json(bookings);
  } catch (error) {
    console.error("Failed to fetch calendar bookings:", error);
    return Response.json({ error: "Failed to fetch calendar bookings" }, { status: 500 });
  }
}
