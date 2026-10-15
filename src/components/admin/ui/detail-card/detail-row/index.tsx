import { HStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { DetailRowProps } from './props';

/** Label on the left, value on the right, separated from the next row by a hairline. */
export const DetailRow = ({ label, children }: DetailRowProps) => {
  return (
    <HStack
      justify="space-between"
      align="baseline"
      gap="16px"
      py="10px"
      borderBottom="1px solid"
      borderColor={COLORS.Border.Subtle}
      _last={{ borderBottom: 'none', pb: '0' }}
    >
      <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgSubtle} whiteSpace="nowrap">
        {label}
      </Text>
      <Text
        as="div"
        font={FONTS.T2.T14px.Regular}
        textAlign="right"
        minW="0"
        overflowWrap="anywhere"
        fontVariantNumeric="tabular-nums"
      >
        {children}
      </Text>
    </HStack>
  );
};

export default DetailRow;
