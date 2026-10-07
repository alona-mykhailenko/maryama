import { Box, HStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import { BOOKING_STATUS_TONE } from '@/features/bookings/status';

/** Swatch + label for every booking status, under the calendar. */
export const CalendarLegend = () => {
  return (
    <HStack gap="24px" px="2px" pt="18px" flexWrap="wrap">
      {Object.values(BOOKING_STATUS_TONE).map((tone) => (
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
