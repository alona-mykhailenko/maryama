import type { Room } from "@/features/rooms/types";

/** The public fields of a room shown on its details page. */
export type RoomDetails = Omit<Room, "createdAt">;
