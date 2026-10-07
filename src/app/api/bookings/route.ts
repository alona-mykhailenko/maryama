import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";

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
