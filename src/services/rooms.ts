import type { Room } from "@/features/rooms/types";

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
