import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { id: "asc" },
      include: {
        images: {
          orderBy: { position: "asc" },
          select: { id: true, url: true, position: true },
        },
      },
    });

    return Response.json(rooms);
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return Response.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}
