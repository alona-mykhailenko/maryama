import { Box, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { BOOKING } from "@/config/content";
import { SectionLabel } from "@/components/site/ui/section-label";
import LANDING from "@/theme/landing-tokens";
import type { BookingSuccessProps } from "./props";

/** Shown in place of the form once the request is sent: the booking is pending until we confirm it. */
export const BookingSuccess = ({ email }: BookingSuccessProps) => {
  return (
    <VStack align="stretch" gap={LANDING.space.label} py={LANDING.space.related} role="status">
      <SectionLabel>{BOOKING.successLabel}</SectionLabel>
      <Box letterSpacing=".06em">
        <Text font={FONTS.T1.T40px.ExtraLight}>{BOOKING.successTitle}</Text>
      </Box>
      <Box maxW="52ch" letterSpacing=".02em">
        <Text font={FONTS.T1.T14px.Light}>{BOOKING.successNote(email)}</Text>
      </Box>
      <Box
        asChild
        alignSelf="start"
        letterSpacing=".3em"
        textTransform="uppercase"
        borderBottom="1px solid"
        pb="4px"
        transition="opacity .2s ease"
        _hover={{ opacity: 0.55 }}
      >
        <NextLink href="/">
          <Text font={FONTS.T1.T10px.Regular}>{BOOKING.successBack}</Text>
        </NextLink>
      </Box>
    </VStack>
  );
};

export default BookingSuccess;
