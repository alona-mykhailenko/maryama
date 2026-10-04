import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import { bookingStatusTone } from '@/lib/booking-status';
import type { BookingChipProps } from './props';

/** "Room · Guest" chip inside a month-grid day cell. */
export const BookingChip = ({ booking, roomName }: BookingChipProps) => {
  const tone = bookingStatusTone(booking.status);

  return (
    <Text
      font={FONTS.T2.T12px.Regular}
      truncate
      px="7px"
      py="3px"
      borderRadius="7px"
      bg={tone.bg}
      color={tone.fg}
      border={tone.border}
    >
      {roomName} · {booking.guestName}
    </Text>
  );
};

export default BookingChip;
