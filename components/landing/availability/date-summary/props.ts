export interface DateSummaryProps {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  onGuestsChange: (guests: number) => void;
}
