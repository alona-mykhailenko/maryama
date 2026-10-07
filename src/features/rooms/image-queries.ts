import type { RoomImage } from "@/features/rooms/types";

/** Uploads photos to a room (admin only). */
export async function uploadRoomImages({
  roomId,
  files,
}: {
  roomId: number;
  files: File[];
}): Promise<RoomImage[]> {
  const body = new FormData();
  for (const file of files) body.append("files", file);

  const response = await fetch(`/api/rooms/${roomId}/images`, { method: "POST", body });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error ?? "upload_failed");
  }
  return response.json();
}

/** Deletes one photo from a room (admin only). */
export async function deleteRoomImage({
  roomId,
  imageId,
}: {
  roomId: number;
  imageId: number;
}): Promise<void> {
  const response = await fetch(`/api/rooms/${roomId}/images/${imageId}`, { method: "DELETE" });
  if (!response.ok) throw new Error("delete_failed");
}
