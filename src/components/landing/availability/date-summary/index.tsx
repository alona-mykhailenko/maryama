import { Box, Grid } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { diffInDays } from "@/lib/dates";
import { AVAILABILITY } from "@/components/landing/content";
import { GuestsSelect } from "./guests-select";
import type { DateSummaryProps } from "./props";
import { SummaryField } from "./summary-field";

/** Fits the longest stay day ("Wed 30 September"), so the summary keeps its size as dates change. */
const FIELD_WIDTH = "140px";

const formatStayDay = (date: Date) =>
  date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });

/**
 * The stay being picked, above the calendar: check-in / check-out, a guests
 * dropdown and the number of nights.
 */
export const DateSummary = ({
  checkIn,
  checkOut,
  guests,
  onGuestsChange,
}: DateSummaryProps) => {
  const nights = checkIn && checkOut ? diffInDays(checkIn, checkOut) : null;

  return (
    <Grid
      templateColumns={`repeat(2, ${FIELD_WIDTH})`}
      columnGap={{ base: "40px", md: "100px" }}
      rowGap="44px"
    >
      <SummaryField label={AVAILABILITY.checkInLabel}>
        <Box opacity={checkIn ? 1 : 0.45}>
          <Text font={FONTS.T1.T14px.Light}>{checkIn ? formatStayDay(checkIn) : AVAILABILITY.emptyDate}</Text>
        </Box>
      </SummaryField>
      <SummaryField label={AVAILABILITY.checkOutLabel}>
        <Box opacity={checkOut ? 1 : 0.45}>
          <Text font={FONTS.T1.T14px.Light}>{checkOut ? formatStayDay(checkOut) : AVAILABILITY.emptyDate}</Text>
        </Box>
      </SummaryField>
      <SummaryField label={AVAILABILITY.guestsLabel}>
        <GuestsSelect value={guests} onChange={onGuestsChange} />
      </SummaryField>
      <SummaryField label={AVAILABILITY.stayLabel}>
        <Box opacity={nights !== null ? 1 : 0.45}>
          <Text font={FONTS.T1.T14px.Light}>
            {nights !== null ? AVAILABILITY.nights(nights) : AVAILABILITY.emptyStay}
          </Text>
        </Box>
      </SummaryField>
    </Grid>
  );
};

export default DateSummary;
