import { VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { GuestCellProps } from './props';

/** Guest name over their email and phone, for the bookings table. */
export const GuestCell = ({ name, email, phone }: GuestCellProps) => {
  return (
    <VStack align="start" gap="0">
      <Text font={FONTS.T2.T14px.Medium} whiteSpace="nowrap">
        {name}
      </Text>
      <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgSubtle}>
        {email}
      </Text>
      {phone && (
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgSubtle} whiteSpace="nowrap">
          {phone}
        </Text>
      )}
    </VStack>
  );
};

export default GuestCell;
