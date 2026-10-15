import { Box, HStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import type { RoomFactProps } from "./props";

/** One row of the room's facts: tracked label on the left, value on the right. */
export const RoomFact = ({ label, value }: RoomFactProps) => {
  return (
    <HStack
      justify="space-between"
      gap="24px"
      py="8px"
    >
      <Box as="dt" letterSpacing=".3em" textTransform="uppercase" opacity={0.5}>
        <Text font={FONTS.T1.T9px.Regular}>{label}</Text>
      </Box>
      <Box as="dd" letterSpacing=".04em" textAlign="right">
        <Text font={FONTS.T1.T13px.Light}>{value}</Text>
      </Box>
    </HStack>
  );
};

export default RoomFact;
