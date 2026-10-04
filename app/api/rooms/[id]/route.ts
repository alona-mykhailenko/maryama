import prisma from "@/lib/prisma";

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
      include: {
        images: {
          orderBy: { position: "asc" },
          select: { id: true, url: true, position: true },
        },
      },
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
