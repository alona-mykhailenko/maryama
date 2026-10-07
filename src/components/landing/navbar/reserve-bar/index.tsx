import { Box } from "@chakra-ui/react";
import NextLink from "next/link";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/core/text";
import { RESERVE } from "@/components/landing/content";
import LANDING from "@/theme/landing-tokens";

/** Height of the phone bottom bar; the page shell pads its bottom by this much. */
export const RESERVE_BAR_HEIGHT = "56px";

/**
 * Phone-only "Reserve" bar pinned to the bottom of the screen, where the
 * header has no room left for another call to action.
 */
export const ReserveBar = () => {
  return (
    <Box
      asChild
      display={{ base: "flex", md: "none" }}
      position="fixed"
      left="0"
      right="0"
      bottom="0"
      zIndex={20}
      h={RESERVE_BAR_HEIGHT}
      alignItems="center"
      justifyContent="center"
      bg={LANDING.ink}
      letterSpacing=".34em"
      textTransform="uppercase"
    >
      <NextLink href={RESERVE.href}>
        <Text font={FONTS.T1.T10px.Regular} color={COLORS.Text.FgInverted}>
          {RESERVE.button}
        </Text>
      </NextLink>
    </Box>
  );
};

export default ReserveBar;
