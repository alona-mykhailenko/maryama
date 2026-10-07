import { chakra } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { BOOKING } from "@/config/content";
import LANDING from "@/theme/landing-tokens";
import type { SubmitBookingButtonProps } from "./props";

/** Ink "Request booking" submit button, faded while the request is sent. */
export const SubmitBookingButton = ({ loading }: SubmitBookingButtonProps) => {
  return (
    <chakra.button
      type="submit"
      alignSelf="start"
      px="32px"
      h="56px"
      bg={LANDING.ink}
      letterSpacing=".28em"
      textTransform="uppercase"
      cursor={loading ? "default" : "pointer"}
      opacity={loading ? 0.5 : 1}
      transition="opacity .2s ease"
      _hover={loading ? undefined : { opacity: 0.85 }}
      _focusVisible={{ outline: "1px solid", outlineColor: LANDING.ink, outlineOffset: "3px" }}
      disabled={loading}
      aria-busy={loading}
    >
      <Text font={FONTS.T1.T10px.Regular} color={COLORS.Text.FgInverted}>
        {BOOKING.submit}
      </Text>
    </chakra.button>
  );
};

export default SubmitBookingButton;
