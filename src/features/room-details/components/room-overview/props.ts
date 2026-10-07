import type { ReactNode } from "react";
import type { RoomDetails } from "@/features/room-details/types";

export interface RoomOverviewProps {
  room: RoomDetails;
  /** Booking box under the facts (the page's reserve card). */
  reserve?: ReactNode;
}
