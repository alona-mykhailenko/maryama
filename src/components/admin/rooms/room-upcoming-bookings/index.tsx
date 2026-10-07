import { Box, HStack, VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/core/text';
import { formatShortDate } from '@/lib/dates';
import ADMIN from '@/theme/admin-tokens';
import type { RoomUpcomingBookingsProps } from './props';

/** Card listing the room's next stays: guest name and dates. */
export const RoomUpcomingBookings = ({ bookings }: RoomUpcomingBookingsProps) => {
  return (
    <Box border="1px solid" borderColor={COLORS.Border.Default} borderRadius={ADMIN.radius} p="20px">
      <Box letterSpacing="0.05em" textTransform="uppercase" mb="12px">
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgFaint}>
          Upcoming
        </Text>
      </Box>
      {bookings.length === 0 && (
        <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgSubtle}>
          No upcoming bookings.
        </Text>
      )}
      <VStack align="stretch" gap="0">
        {bookings.map((booking) => (
          <HStack
            key={booking.id}
            justify="space-between"
            align="baseline"
            gap="12px"
            py="9px"
            borderBottom="1px solid"
            borderColor={COLORS.Border.Subtle}
          >
            <Text font={FONTS.T2.T14px.Regular}>{booking.guestName}</Text>
            <Text
              font={FONTS.T2.T12px.Regular}
              color={COLORS.Text.FgSubtle}
              whiteSpace="nowrap"
              fontVariantNumeric="tabular-nums"
            >
              {formatShortDate(booking.checkIn)} – {formatShortDate(booking.checkOut)}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default RoomUpcomingBookings;
