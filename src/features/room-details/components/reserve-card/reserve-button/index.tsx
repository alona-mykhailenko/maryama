import { chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import LANDING from "@/theme/landing-tokens";
import type { ReserveButtonProps } from "./props";

/** Full-width ink action of the reserve card: a link once the stay can be booked, a button otherwise. */
export const ReserveButton = ({ label, href, disabled, onClick }: ReserveButtonProps) => {
  const content = (
    <Text font={FONTS.T1.T10px.Regular} color={COLORS.Text.FgInverted}>
      {label}
    </Text>
  );

  return (
    <chakra.button
      asChild={!!href}
      type={href ? undefined : "button"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="56px"
      bg={LANDING.ink}
      letterSpacing=".16em"
      textTransform="uppercase"
      cursor={disabled ? "default" : "pointer"}
      opacity={disabled ? 0.35 : 1}
      transition="opacity .2s ease"
      _hover={disabled ? undefined : { opacity: 0.85 }}
      _focusVisible={{ outline: "1px solid", outlineColor: LANDING.ink, outlineOffset: "3px" }}
      disabled={href ? undefined : disabled}
      onClick={onClick}
    >
      {href ? <NextLink href={href}>{content}</NextLink> : content}
    </chakra.button>
  );
};

export default ReserveButton;
