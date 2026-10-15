import type { RoomDetails } from "@/features/room-details/types";

/** Where the availability check of the picked stay stands. */
export type ReserveAvailability = "idle" | "checking" | "available" | "unavailable" | "error";

export interface ReserveCardProps {
  /** Plain room data only (it crosses from the server page into this client component). */
  room: Pick<RoomDetails, "id" | "capacity" | "pricePerNight">;
}
