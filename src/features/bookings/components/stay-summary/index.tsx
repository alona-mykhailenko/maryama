import { Box, Grid, HStack, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY, BOOKING } from "@/config/content";
import { SummaryField } from "@/features/availability/components/date-summary/summary-field";
import { diffInDays } from "@/lib/dates";
import type { StaySummaryProps } from "./props";

const formatStayDay = (date: Date) =>
  date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });

/**
 * The stay already picked on the room page, read-only: check-in, check-out,
 * guests, nights and the total, with a link back to change it.
 */
export const StaySummary = ({ checkIn, checkOut, guests, pricePerNight, changeHref }: StaySummaryProps) => {
  const nights = diffInDays(checkIn, checkOut);

  return (
    <VStack align="stretch" gap="32px">
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, auto)" }}
        justifyContent="start"
        columnGap={{ base: "40px", md: "64px" }}
        rowGap="32px"
      >
        <SummaryField label={AVAILABILITY.checkInLabel}>
          <Text font={FONTS.T1.T14px.Light}>{formatStayDay(checkIn)}</Text>
        </SummaryField>
        <SummaryField label={AVAILABILITY.checkOutLabel}>
          <Text font={FONTS.T1.T14px.Light}>{formatStayDay(checkOut)}</Text>
        </SummaryField>
        <SummaryField label={AVAILABILITY.guestsLabel}>
          <Text font={FONTS.T1.T14px.Light}>{BOOKING.guestCount(guests)}</Text>
        </SummaryField>
        <SummaryField label={AVAILABILITY.stayLabel}>
          <Text font={FONTS.T1.T14px.Light}>{AVAILABILITY.nights(nights)}</Text>
        </SummaryField>
        <SummaryField label={BOOKING.totalLabel}>
          <Text font={FONTS.T1.T14px.Regular}>{AVAILABILITY.total(pricePerNight * nights)}</Text>
        </SummaryField>
      </Grid>
      <HStack
        asChild
        alignSelf="start"
        gap="0"
        letterSpacing=".3em"
        textTransform="uppercase"
        borderBottom="1px solid"
        pb="4px"
        opacity={0.6}
        transition="opacity .2s ease"
        _hover={{ opacity: 1 }}
      >
        <NextLink href={changeHref}>
          <Box>
            <Text font={FONTS.T1.T9px.Regular}>{BOOKING.changeStay}</Text>
          </Box>
        </NextLink>
      </HStack>
    </VStack>
  );
};

export default StaySummary;
