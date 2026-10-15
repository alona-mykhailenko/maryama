import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { getAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { roomPriceSchema } from "@/features/rooms/schema";

const ROOM_INCLUDE = {
  images: {
    orderBy: { position: "asc" },
    select: { id: true, url: true, position: true },
  },
} satisfies Prisma.RoomInclude;

/** Public: one room with its images ordered by position. */
export async function GET(_request: Request, ctx: RouteContext<"/api/rooms/[id]">) {
  const { id } = await ctx.params;
  const roomId = Number(id);
  if (!Number.isInteger(roomId)) {
    return Response.json({ error: "invalid_id" }, { status: 400 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: ROOM_INCLUDE,
    });

    if (!room) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }

    return Response.json(room);
  } catch (error) {
    console.error("Failed to fetch room:", error);
    return Response.json({ error: "Failed to fetch room" }, { status: 500 });
  }
}

/**
 * Admin only: change a room's nightly price. Existing bookings keep the price
 * they were made at. Returns the updated room with its images; unknown ids get 404.
 */
export async function PATCH(request: Request, ctx: RouteContext<"/api/rooms/[id]">) {
  if (!(await getAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const roomId = Number(id);
  if (!Number.isInteger(roomId)) {
    return Response.json({ error: "invalid_id" }, { status: 400 });
  }

  const parsed = roomPriceSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "invalid_price" }, { status: 400 });
  }

  try {
    const room = await prisma.room.update({
      where: { id: roomId },
      data: { pricePerNight: parsed.data.pricePerNight },
      include: ROOM_INCLUDE,
    });
    // Public pages show the price and may be prerendered.
    revalidatePath("/", "layout");
    return Response.json(room);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return Response.json({ error: "not_found" }, { status: 404 });
    }
    console.error("Failed to update room:", error);
    return Response.json({ error: "Failed to update room" }, { status: 500 });
  }
}
