export interface AvailabilityCalendarProps {
  /** Any day of the month on display. */
  month: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onMonthChange: (month: Date) => void;
  onSelect: (day: Date) => void;
}
