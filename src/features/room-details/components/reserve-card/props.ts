import type { StayDates } from "@/features/availability/types";
import type { RoomDetails } from "@/features/room-details/types";

/** Where the availability check of the picked stay stands. */
export type ReserveAvailability = "idle" | "checking" | "available" | "unavailable" | "error";

export interface ReserveCardProps {
  room: Pick<RoomDetails, "id" | "capacity" | "pricePerNight">;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  /** `idle` until both dates are picked. */
  availability: ReserveAvailability;
  onDatesChange: (dates: StayDates) => void;
  onGuestsChange: (guests: number) => void;
}
