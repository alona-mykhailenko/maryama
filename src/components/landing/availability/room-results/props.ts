import type { Room } from "@/features/rooms/types";

/** Where the search stands, from nothing checked yet to the free rooms. */
export type AvailabilityState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "ready"; rooms: Room[]; nights: number };

export interface RoomResultsProps {
  state: AvailabilityState;
}
