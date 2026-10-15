import { Box, HStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import { BookingStatus } from '@/generated/prisma/enums';
import { BOOKING_STATUS_TONE } from '@/features/admin/bookings/status';

// The calendar hides cancelled bookings, so the legend doesn't list them.
const LEGEND_TONES = [
  BOOKING_STATUS_TONE[BookingStatus.PENDING],
  BOOKING_STATUS_TONE[BookingStatus.CONFIRMED],
];

/** Swatch + label for each booking status shown on the calendar. */
export const CalendarLegend = () => {
  return (
    <HStack gap="24px" px="2px" pt="18px" flexWrap="wrap">
      {LEGEND_TONES.map((tone) => (
        <HStack key={tone.label} gap="8px">
          <Box w="22px" h="12px" borderRadius="4px" bg={tone.bg} border={tone.border} />
          <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgMuted}>
            {tone.label}
          </Text>
        </HStack>
      ))}
    </HStack>
  );
};

export default CalendarLegend;
