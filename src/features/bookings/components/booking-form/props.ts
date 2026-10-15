import type { BookingRequest } from "@/features/bookings/schema";
import type { Room } from "@/features/rooms/types";

/** A stay handed over from the room page (`YYYY-MM-DD`, check-out exclusive). */
export interface InitialStay {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingFormProps {
  room: Pick<Room, "id" | "capacity" | "pricePerNight">;
  /** Prefills the calendar and guests, e.g. from the room page's reserve card. */
  initialStay?: InitialStay;
  isSubmitting: boolean;
  /** API error code of the last attempt ("dates_unavailable", …), shown above the button. */
  errorCode?: string | null;
  /** Called with a request that passed validation. */
  onSubmit: (request: BookingRequest) => void;
  /** Called when the guest changes the dates, so a stale error can be cleared. */
  onStayChange?: () => void;
}
