import { getAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createStorageClient, storagePathFromUrl } from "@/lib/supbase/storage";

/** Admin only: removes a room photo from Storage and the database. */
export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/rooms/[id]/images/[imageId]">,
) {
  if (!(await getAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id, imageId } = await ctx.params;
  const roomId = Number(id);
  const imageIdNumber = Number(imageId);
  if (!Number.isInteger(roomId) || !Number.isInteger(imageIdNumber)) {
    return Response.json({ error: "invalid_id" }, { status: 400 });
  }

  const image = await prisma.roomImage.findFirst({
    where: { id: imageIdNumber, roomId },
  });
  if (!image) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  const path = storagePathFromUrl(image.url);
  if (path) {
    const { error } = await createStorageClient().remove([path]);
    if (error) {
      console.error("Failed to delete room image file:", error);
      return Response.json({ error: "delete_failed" }, { status: 500 });
    }
  }

  await prisma.roomImage.delete({ where: { id: image.id } });

  return new Response(null, { status: 204 });
}
