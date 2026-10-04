import { Box, HStack } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { PencilIcon } from '@/components/admin/icons/pencil';
import { Text } from '@/components/core/text';
import ADMIN from '../../tokens';
import type { RoomPriceCardProps } from './props';

/** Nightly price card; the edit button is a disabled placeholder for now. */
export const RoomPriceCard = ({ pricePerNight }: RoomPriceCardProps) => {
  return (
    <Box border="1px solid" borderColor={COLORS.Border.Default} borderRadius={ADMIN.radius} p="20px">
      <Box letterSpacing="0.05em" textTransform="uppercase">
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgFaint}>
          Price per night
        </Text>
      </Box>
      <HStack align="baseline" gap="8px" mt="6px">
        <Text font={FONTS.T2.T36px.Medium} letterSpacing="-0.02em" fontVariantNumeric="tabular-nums">
          €{pricePerNight}
        </Text>
        <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgSubtle}>
          per night
        </Text>
      </HStack>
      <HStack
        as="button"
        title="Editing coming soon"
        gap="8px"
        mt="16px"
        w="100%"
        justify="center"
        px="15px"
        py="10px"
        borderRadius={ADMIN.pill}
        border="1px solid"
        borderColor={COLORS.Border.Default}
        color={COLORS.Text.Fg}
        cursor="not-allowed"
        opacity={0.6}
      >
        <PencilIcon size={16} />
        <Text font={FONTS.T2.T14px.Medium} color="inherit">
          Modify price per night
        </Text>
      </HStack>
    </Box>
  );
};

export default RoomPriceCard;
