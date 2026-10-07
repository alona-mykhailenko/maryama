import { Box, VStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import type { StayCellProps } from "./props";

/** One cell of the reserve card's stay box: a tracked label over its value. */
export const StayCell = ({ label, children }: StayCellProps) => (
  <VStack align="stretch" gap="6px" px="16px" py="14px" minW="0" textAlign="left">
    <Box letterSpacing=".34em" textTransform="uppercase" opacity={0.5}>
      <Text font={FONTS.T1.T9px.Regular}>{label}</Text>
    </Box>
    {children}
  </VStack>
);

export default StayCell;
