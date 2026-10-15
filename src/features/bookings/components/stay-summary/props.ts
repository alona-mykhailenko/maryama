export interface StaySummaryProps {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  pricePerNight: number;
  /** Where "Change dates" leads (the room page, where the stay was picked). */
  changeHref: string;
}
