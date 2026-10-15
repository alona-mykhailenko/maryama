import type { StayDates } from "@/features/availability/types";
import type { AvailabilityState } from "@/features/availability/components/room-results/props";

export interface AvailabilityFormProps {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  /** Results of the last check (`idle` until the guest presses the button). */
  state: AvailabilityState;
  onDatesChange: (dates: StayDates) => void;
  onGuestsChange: (guests: number) => void;
  /** "Check availability" pressed with both dates set. */
  onCheck: () => void;
}
