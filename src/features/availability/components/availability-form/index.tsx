"use client";

import { useState, useSyncExternalStore } from "react";
import { Box, Grid, VStack } from "@chakra-ui/react";
import LANDING from "@/theme/landing-tokens";
import { AvailabilityCalendar } from "@/features/availability/components/availability-calendar";
import { CheckAvailabilityButton } from "@/features/availability/components/check-availability-button";
import { DateSummary } from "@/features/availability/components/date-summary";
import { RoomResults } from "@/features/availability/components/room-results";
import type { AvailabilityFormProps } from "./props";

const noopSubscribe = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

/**
 * The availability search itself: pick check-in, check-out and guests, then
 * press "Check availability" to see the rooms free for the whole stay (or a
 * note when none are). Changing any pick clears the results until the next
 * check. Calendar on the left, stay summary and button on the right (stacked
 * below `lg`), results underneath. Presentational: the stay, the check and
 * its results are owned by the page; only the shown month lives here. The
 * calendar depends on today's date, so it only renders in the browser.
 */
export const AvailabilityForm = ({
  checkIn,
  checkOut,
  guests,
  state,
  onDatesChange,
  onGuestsChange,
  onCheck,
}: AvailabilityFormProps) => {
  const isClient = useSyncExternalStore(noopSubscribe, getIsClient, getIsServer);
  const [month, setMonth] = useState(() => new Date());

  const canCheck = checkIn !== null && checkOut !== null;

  const handleSelect = (day: Date) => {
    if (checkIn === null || checkOut !== null || day <= checkIn) {
      onDatesChange({ checkIn: day, checkOut: null });
      return;
    }
    onDatesChange({ checkIn, checkOut: day });
  };

  return (
    <VStack align="stretch" gap={LANDING.space.related} w="100%">
      {/* Calendar on the left, the stay and the check button on the right; stacked on smaller screens. */}
      <Grid
        templateColumns={{ base: "1fr", lg: "1.3fr 1fr" }}
        gap={{ base: "40px", lg: "96px" }}
        alignItems="start"
      >
        {/* Reserves the calendar's height on the server so nothing jumps on hydration. */}
        <Box minH={{ base: "320px", md: "340px" }}>
          {isClient && (
            <AvailabilityCalendar
              month={month}
              checkIn={checkIn}
              checkOut={checkOut}
              onMonthChange={setMonth}
              onSelect={handleSelect}
            />
          )}
        </Box>
        {/* Shrinks to the summary's width so the button below matches it. */}
        <VStack align="stretch" gap="40px" w="fit" maxW="100%">
          <DateSummary
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            onGuestsChange={onGuestsChange}
          />
          <CheckAvailabilityButton disabled={!canCheck} onClick={onCheck} />
        </VStack>
      </Grid>
      <RoomResults state={state} />
    </VStack>
  );
};

export default AvailabilityForm;
