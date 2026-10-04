import { randomUUID } from "node:crypto";
import { getAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ROOM_IMAGE_MAX_BYTES, ROOM_IMAGE_TYPES } from "@/lib/room-images";
import { createStorageClient } from "@/lib/supbase/storage";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Admin only: uploads one or more photos (multipart field `files`) to the
 * room, appended after its existing images.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/rooms/[id]/images">) {
  if (!(await getAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const roomId = Number(id);
  if (!Number.isInteger(roomId)) {
    return Response.json({ error: "invalid_id" }, { status: 400 });
  }

  const formData = await request.formData().catch(() => null);
  const files = (formData?.getAll("files") ?? []).filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return Response.json({ error: "no_files" }, { status: 400 });
  }
  if (files.some((f) => !ROOM_IMAGE_TYPES.includes(f.type))) {
    return Response.json({ error: "invalid_type" }, { status: 400 });
  }
  if (files.some((f) => f.size > ROOM_IMAGE_MAX_BYTES)) {
    return Response.json({ error: "file_too_large" }, { status: 400 });
  }

  const room = await prisma.room.findUnique({ where: { id: roomId }, select: { id: true } });
  if (!room) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  const storage = createStorageClient();
  const last = await prisma.roomImage.findFirst({
    where: { roomId },
    orderBy: { position: "desc" },
    select: { position: true },
  });
  let position = (last?.position ?? -1) + 1;

  const created = [];
  for (const file of files) {
    const path = `rooms/${roomId}/${randomUUID()}.${EXTENSIONS[file.type]}`;
    const { error } = await storage.upload(path, file, { contentType: file.type });
    if (error) {
      console.error("Failed to upload room image:", error);
      return Response.json({ error: "upload_failed", uploaded: created }, { status: 500 });
    }

    const { data } = storage.getPublicUrl(path);
    try {
      created.push(
        await prisma.roomImage.create({
          data: { roomId, url: data.publicUrl, position: position++ },
          select: { id: true, url: true, position: true },
        }),
      );
    } catch (error) {
      // Don't leave an orphaned file behind if the row can't be saved.
      await storage.remove([path]);
      console.error("Failed to save room image:", error);
      return Response.json({ error: "upload_failed", uploaded: created }, { status: 500 });
    }
  }

  return Response.json(created, { status: 201 });
}
