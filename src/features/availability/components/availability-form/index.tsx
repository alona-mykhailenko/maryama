"use client";

import { useState, useSyncExternalStore } from "react";
import { Box, Grid, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { diffInDays, formatIsoDay, parseDay } from "@/lib/dates";
import {
  getRoomAvailability,
  getRooms,
  roomAvailabilityQueryKey,
  roomsQueryKey,
} from "@/features/rooms/queries";
import LANDING from "@/theme/landing-tokens";
import { AvailabilityCalendar } from "@/features/availability/components/availability-calendar";
import { CheckAvailabilityButton } from "@/features/availability/components/check-availability-button";
import { DateSummary } from "@/features/availability/components/date-summary";
import { RoomResults } from "@/features/availability/components/room-results";
import type { AvailabilityState } from "@/features/availability/components/room-results/props";

const DEFAULT_GUESTS = 2;

/** The stay the guest last checked; results always describe this, not the live picks. */
interface StaySearch {
  checkIn: string;
  checkOut: string;
  guests: number;
}

const noopSubscribe = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

/**
 * The availability search itself: pick check-in, check-out and guests, then
 * press "Check availability" to see the rooms free for the whole stay (or a
 * note when none are). Changing any pick clears the results until the next
 * check. Calendar on the left, stay summary and button on the right (stacked
 * below `lg`), results underneath. Used by the landing section and on its own
 * on `/reserve`. The calendar depends on today's date, so it only
 * renders in the browser.
 */
export const AvailabilityForm = () => {
  const isClient = useSyncExternalStore(noopSubscribe, getIsClient, getIsServer);
  const [month, setMonth] = useState(() => new Date());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(DEFAULT_GUESTS);
  const [search, setSearch] = useState<StaySearch | null>(null);

  const roomsQuery = useQuery({ queryKey: roomsQueryKey, queryFn: getRooms });
  const availabilityQuery = useQuery({
    queryKey: roomAvailabilityQueryKey(search?.checkIn ?? "", search?.checkOut ?? ""),
    queryFn: () => getRoomAvailability(search?.checkIn ?? "", search?.checkOut ?? ""),
    enabled: search !== null,
  });

  const canCheck = checkIn !== null && checkOut !== null;

  const handleSelect = (day: Date) => {
    setSearch(null);
    if (checkIn === null || checkOut !== null || day <= checkIn) {
      setCheckIn(day);
      setCheckOut(null);
      return;
    }
    setCheckOut(day);
  };

  const handleGuestsChange = (value: number) => {
    setSearch(null);
    setGuests(value);
  };

  const handleCheck = () => {
    if (!checkIn || !checkOut) return;
    setSearch({ checkIn: formatIsoDay(checkIn), checkOut: formatIsoDay(checkOut), guests });
  };

  const getState = (): AvailabilityState => {
    if (search === null) return { kind: "idle" };
    if (roomsQuery.isError || availabilityQuery.isError) return { kind: "error" };
    if (!roomsQuery.data || !availabilityQuery.data) return { kind: "loading" };

    const freeIds = new Set(availabilityQuery.data);
    return {
      kind: "ready",
      rooms: roomsQuery.data.filter(
        (room) => freeIds.has(room.id) && room.capacity >= search.guests,
      ),
      nights: diffInDays(parseDay(search.checkIn), parseDay(search.checkOut)),
    };
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
            onGuestsChange={handleGuestsChange}
          />
          <CheckAvailabilityButton disabled={!canCheck} onClick={handleCheck} />
        </VStack>
      </Grid>
      <RoomResults state={getState()} />
    </VStack>
  );
};

export default AvailabilityForm;
