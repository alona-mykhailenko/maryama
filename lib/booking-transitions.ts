import { BookingStatus } from '@/app/generated/prisma/enums';

export interface BookingTransition {
  label: string;
  to: BookingStatus;
}

/** Status transitions available from each booking status. */
export const BOOKING_TRANSITIONS: Record<BookingStatus, BookingTransition[]> = {
  [BookingStatus.PENDING]: [
    { label: 'Confirm', to: BookingStatus.CONFIRMED },
    { label: 'Cancel', to: BookingStatus.CANCELLED },
  ],
  [BookingStatus.CONFIRMED]: [{ label: 'Cancel', to: BookingStatus.CANCELLED }],
  [BookingStatus.CANCELLED]: [],
};
