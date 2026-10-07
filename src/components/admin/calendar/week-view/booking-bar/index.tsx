import { VStack } from '@chakra-ui/react';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/core/text';
import { bookingStatusTone } from '@/lib/booking-status';
import ADMIN from '@/theme/admin-tokens';
import type { BookingBarProps } from './props';

/** A stay drawn across the room's row: guest name over the status. */
export const BookingBar = ({ booking, startOffset, span }: BookingBarProps) => {
  const tone = bookingStatusTone(booking.status);

  return (
    <VStack
      gridRow="1"
      gridColumn={`${startOffset + 2} / span ${span}`}
      align="stretch"
      justify="center"
      gap="0"
      m="13px 4px"
      p="8px"
      borderRadius={ADMIN.radiusSm}
      overflow="hidden"
      bg={tone.bg}
      color={tone.fg}
      border={tone.border}
      _hover={{ opacity: 0.88 }}
    >
      <Text font={FONTS.T2.T12px.Medium} color="inherit" truncate>
        {booking.guestName}
      </Text>
      <Text font={FONTS.T2.T12px.Regular} color="inherit" opacity={0.7} truncate>
        {tone.label}
      </Text>
    </VStack>
  );
};

export default BookingBar;
