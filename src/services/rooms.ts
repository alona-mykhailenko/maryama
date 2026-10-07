import type { Room, RoomImage } from "@/features/rooms/types";

export const roomsQueryKey = ["rooms"] as const;
export const roomQueryKey = (id: number) => ["rooms", id] as const;

/** All rooms with their images. */
export async function getRooms(): Promise<Room[]> {
  const response = await fetch("/api/rooms");
  if (!response.ok) throw new Error("rooms_unavailable");
  return response.json();
}

/** One room with its images. */
export async function getRoom(id: number): Promise<Room> {
  const response = await fetch(`/api/rooms/${id}`);
  if (!response.ok) throw new Error("room_unavailable");
  return response.json();
}

export const roomAvailabilityQueryKey = (checkIn: string, checkOut: string) =>
  ["rooms", "availability", checkIn, checkOut] as const;

/** Ids of the rooms free for the whole stay (`YYYY-MM-DD`, check-out exclusive). */
export async function getRoomAvailability(checkIn: string, checkOut: string): Promise<number[]> {
  const params = new URLSearchParams({ checkIn, checkOut });
  const response = await fetch(`/api/rooms/availability?${params}`);
  if (!response.ok) throw new Error("availability_unavailable");
  const { roomIds }: { roomIds: number[] } = await response.json();
  return roomIds;
}


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
