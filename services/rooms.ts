import type { Room } from "@/services/types/room";

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
