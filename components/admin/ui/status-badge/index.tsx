import { Box, HStack } from '@chakra-ui/react';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import ADMIN from '../../tokens';
import type { StatusBadgeProps } from './props';

/** Pill with a status dot, coloured by the booking status tone. */
export const StatusBadge = ({ tone }: StatusBadgeProps) => {
  return (
    <HStack
      display="inline-flex"
      gap="7px"
      px="11px"
      py="5px"
      borderRadius={ADMIN.pill}
      whiteSpace="nowrap"
      bg={tone.bg}
      color={tone.fg}
      border={tone.border}
    >
      <Box as="span" w="7px" h="7px" borderRadius="full" bg="currentColor" opacity={0.6} />
      <Text font={FONTS.T2.T12px.Regular} color="inherit">
        {tone.label}
      </Text>
    </HStack>
  );
};

export default StatusBadge;
