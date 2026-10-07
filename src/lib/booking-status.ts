import COLORS from '@/theme/colors';
import { BookingStatus } from '@/generated/prisma/enums';

export interface StatusTone {
  label: string;
  bg: string;
  fg: string;
  border: string;
}

/** Visual tone per booking status — shared by table badges and calendar bars. */
export const BOOKING_STATUS_TONE: Record<BookingStatus, StatusTone> = {
  [BookingStatus.PENDING]: {
    label: 'Pending',
    bg: COLORS.Bg.Default,
    fg: COLORS.Text.FgMuted,
    border: `1px dashed ${COLORS.Border.Emphasized}`,
  },
  [BookingStatus.CONFIRMED]: {
    label: 'Confirmed',
    bg: COLORS.Bg.Inverted,
    fg: COLORS.Text.FgContrast,
    border: `1px solid ${COLORS.Border.Inverted}`,
  },
  [BookingStatus.CANCELLED]: {
    label: 'Cancelled',
    bg: COLORS.Bg.Default,
    fg: COLORS.Text.FgFaint,
    border: `1px solid ${COLORS.Border.Default}`,
  },
};

export function bookingStatusTone(status: BookingStatus): StatusTone {
  return BOOKING_STATUS_TONE[status] ?? BOOKING_STATUS_TONE[BookingStatus.PENDING];
}
