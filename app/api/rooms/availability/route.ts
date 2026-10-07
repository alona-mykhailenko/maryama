import { type NextRequest } from "next/server";
import { z } from "zod";
import { BookingStatus } from "@/app/generated/prisma/enums";
import { MAX_STAY_NIGHTS } from "@/lib/dates";
import prisma from "@/lib/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;

const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const querySchema = z
  .object({ checkIn: isoDay, checkOut: isoDay })
  .transform(({ checkIn, checkOut }) => ({
    checkIn: new Date(`${checkIn}T00:00:00.000Z`),
    checkOut: new Date(`${checkOut}T00:00:00.000Z`),
  }))
  .refine(({ checkIn, checkOut }) => !isNaN(checkIn.getTime()) && !isNaN(checkOut.getTime()))
  .refine(({ checkIn, checkOut }) => {
    const nights = (checkOut.getTime() - checkIn.getTime()) / DAY_MS;
    return nights >= 1 && nights <= MAX_STAY_NIGHTS;
  });

/**
 * Public: ids of the rooms free for the whole stay `[checkIn, checkOut)`
 * (`?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD`). A room is taken when a pending or
 * confirmed booking overlaps the stay. Returns ids only, never booking data.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const parsed = querySchema.safeParse({
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
  });
  if (!parsed.success) {
    return Response.json({ error: "invalid_dates" }, { status: 400 });
  }

  const { checkIn, checkOut } = parsed.data;

  try {
    const rooms = await prisma.room.findMany({
      where: {
        bookings: {
          none: {
            status: { not: BookingStatus.CANCELLED },
            checkIn: { lt: checkOut },
            checkOut: { gt: checkIn },
          },
        },
      },
      orderBy: { id: "asc" },
      select: { id: true },
    });

    return Response.json({ roomIds: rooms.map((room) => room.id) });
  } catch (error) {
    console.error("Failed to check availability:", error);
    return Response.json({ error: "Failed to check availability" }, { status: 500 });
  }
}
