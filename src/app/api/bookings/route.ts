import { BookingStatus, Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { MAX_STAY_NIGHTS } from "@/lib/dates";
import { bookingRequestSchema } from "@/features/bookings/schema";

const DAY_MS = 24 * 60 * 60 * 1000;

/** `YYYY-MM-DD` as UTC midnight, the way `DATE` columns are stored. */
const toUtcDay = (day: string) => new Date(`${day}T00:00:00.000Z`);

/** Admin only: every booking, oldest check-in first. */
export async function GET() {
  if (!(await getAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { checkIn: "asc" },
    });

    return Response.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return Response.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

/**
 * Public: a guest's booking request. Always created as `PENDING` for the
 * admin to confirm. Rejects past or too-long stays (400), more guests than the
 * room sleeps (400), unknown rooms (404) and dates that overlap a pending or
 * confirmed booking (409). Returns only the new id and status.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const { roomId, guests, guestName, guestEmail, guestPhone, message } = parsed.data;
  const checkIn = toUtcDay(parsed.data.checkIn);
  const checkOut = toUtcDay(parsed.data.checkOut);
  const nights = (checkOut.getTime() - checkIn.getTime()) / DAY_MS;
  // One day of slack so a guest a few time zones behind UTC can still book "today".
  const earliestCheckIn = Date.now() - 2 * DAY_MS;
  if (
    isNaN(nights) ||
    nights < 1 ||
    nights > MAX_STAY_NIGHTS ||
    checkIn.getTime() < earliestCheckIn
  ) {
    return Response.json({ error: "invalid_dates" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const room = await tx.room.findUnique({ where: { id: roomId }, select: { capacity: true } });
        if (!room) return { error: "not_found", status: 404 } as const;
        if (guests > room.capacity) return { error: "too_many_guests", status: 400 } as const;

        const overlapping = await tx.booking.count({
          where: {
            roomId,
            status: { not: BookingStatus.CANCELLED },
            checkIn: { lt: checkOut },
            checkOut: { gt: checkIn },
          },
        });
        if (overlapping > 0) return { error: "dates_unavailable", status: 409 } as const;

        const booking = await tx.booking.create({
          data: {
            roomId,
            checkIn,
            checkOut,
            guests,
            guestName,
            guestEmail,
            guestPhone,
            message: message || null,
            status: BookingStatus.PENDING,
          },
          select: { id: true, status: true },
        });
        return { booking } as const;
      },
      // Two requests for the same nights can't both pass the overlap check.
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    if ("error" in result) {
      return Response.json({ error: result.error }, { status: result.status });
    }
    return Response.json(result.booking, { status: 201 });
  } catch (error) {
    // Serialization failure: another booking for these nights won the race.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034") {
      return Response.json({ error: "dates_unavailable" }, { status: 409 });
    }
    console.error("Failed to create booking:", error);
    return Response.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
