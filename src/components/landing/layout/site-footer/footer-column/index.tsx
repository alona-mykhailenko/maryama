import { Box, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';

/**
 * One labelled footer column — a tracked uppercase label over its stacked
 * content (address lines, contact links, social buttons).
 */
export const FooterColumn = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <VStack align="stretch" gap="12px">
      <Box mb="6px" letterSpacing=".3em" textTransform="uppercase" opacity={0.45}>
        <Text font={FONTS.T1.T9px.Regular} color={COLORS.Text.FgInverted}>
          {label}
        </Text>
      </Box>
      {children}
    </VStack>
  );
};

export default FooterColumn;
