import { Box, VStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/core/text";
import type { SummaryFieldProps } from "./props";

/** A tracked eyebrow ("Check-in") over the field's value. */
export const SummaryField = ({ label, children }: SummaryFieldProps) => (
  <VStack align="stretch" gap="4px" minW="0">
    <Box letterSpacing=".34em" textTransform="uppercase" opacity={0.5}>
      <Text font={FONTS.T1.T9px.Regular}>{label}</Text>
    </Box>
    {children}
  </VStack>
);

export default SummaryField;
