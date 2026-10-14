'use client';

import { useRouter } from 'next/navigation';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import { bookingStatusTone } from '@/features/admin/bookings/status';
import type { BookingChipProps } from './props';

/** "Room · Guest" chip inside a month-grid day cell. Opens the booking on click. */
export const BookingChip = ({ booking, roomName }: BookingChipProps) => {
  const router = useRouter();
  const tone = bookingStatusTone(booking.status);

  const handleClick = () => router.push(`/admin/bookings/${booking.id}`);

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
      cursor="pointer"
      _hover={{ opacity: 0.88 }}
      onClick={handleClick}
    >
      {roomName} · {booking.guestName}
    </Text>
  );
};

export default BookingChip;
