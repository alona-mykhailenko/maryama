import type { RoomDetails } from "@/features/room-details/types";

export interface RoomsProps {
  /** Loaded by the page, one panel each. */
  rooms: RoomDetails[];
}
