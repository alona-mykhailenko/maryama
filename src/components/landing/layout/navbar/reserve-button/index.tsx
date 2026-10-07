import { Box } from "@chakra-ui/react";
import NextLink from "next/link";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { RESERVE } from "@/config/content";
import LANDING from "@/theme/landing-tokens";
import type { ReserveButtonProps } from "./props";

/**
 * Header "Reserve" call to action (tablet and up): a cream outline over the
 * hero, a solid ink block once the header turns cream.
 */
export const ReserveButton = ({ solid }: ReserveButtonProps) => {
  const color = solid ? COLORS.Text.FgInverted : LANDING.cream;

  return (
    <Box
      asChild
      display={{ base: "none", md: "inline-flex" }}
      alignItems="center"
      px="22px"
      py="10px"
      border="1px solid"
      borderColor={solid ? LANDING.ink : LANDING.cream}
      bg={solid ? LANDING.ink : "transparent"}
      letterSpacing=".28em"
      textTransform="uppercase"
      textShadow="none"
      transition="background .4s ease, border-color .4s ease, opacity .2s ease"
      _hover={{ opacity: 0.75 }}
    >
      <NextLink href={RESERVE.href}>
        <Text font={FONTS.T1.T10px.Regular} color={color}>
          {RESERVE.button}
        </Text>
      </NextLink>
    </Box>
  );
};

export default ReserveButton;
