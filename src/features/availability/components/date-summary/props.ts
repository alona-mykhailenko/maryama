export interface DateSummaryProps {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  /** Caps the guests dropdown (a room's capacity). */
  maxGuests?: number;
  onGuestsChange: (guests: number) => void;
}
