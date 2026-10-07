import { chakra } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY } from "@/components/landing/content";
import LANDING from "@/theme/landing-tokens";
import type { CheckAvailabilityButtonProps } from "./props";

/** Ink "Check availability" button, as wide as the stay summary above it. */
export const CheckAvailabilityButton = ({ disabled, onClick }: CheckAvailabilityButtonProps) => {
  return (
    <chakra.button
      type="button"
      h="56px"
      bg={LANDING.ink}
      letterSpacing=".16em"
      textTransform="uppercase"
      cursor={disabled ? "default" : "pointer"}
      opacity={disabled ? 0.35 : 1}
      transition="opacity .2s ease"
      _hover={disabled ? undefined : { opacity: 0.85 }}
      _focusVisible={{ outline: "1px solid", outlineColor: LANDING.ink, outlineOffset: "3px" }}
      disabled={disabled}
      onClick={onClick}
    >
      <Text font={FONTS.T1.T10px.Regular} color={COLORS.Text.FgInverted}>
        {AVAILABILITY.check}
      </Text>
    </chakra.button>
  );
};

export default CheckAvailabilityButton;
