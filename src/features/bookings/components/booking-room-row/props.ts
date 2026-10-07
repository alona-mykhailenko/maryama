import type { Room } from "@/features/rooms/types";

export interface BookingRoomRowProps {
  room: Pick<Room, "id" | "name" | "capacity" | "pricePerNight" | "images">;
}
