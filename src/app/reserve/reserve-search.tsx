"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AvailabilityForm } from "@/features/availability/components/availability-form";
import type { AvailabilityState } from "@/features/availability/components/room-results/props";
import type { StayDates } from "@/features/availability/types";
import { diffInDays, formatIsoDay, parseDay } from "@/lib/dates";
import {
  getRoomAvailability,
  getRooms,
  roomAvailabilityQueryKey,
  roomsQueryKey,
} from "@/services/rooms";

const DEFAULT_GUESTS = 2;

/** The stay the guest last checked; results always describe this, not the live picks. */
interface StaySearch {
  checkIn: string;
  checkOut: string;
  guests: number;
}

/**
 * Client half of `/reserve`: holds the stay picked in the `AvailabilityForm`
 * and, when the guest presses "Check availability", loads the rooms and the
 * ones free for that stay (`GET /api/rooms`, `GET /api/rooms/availability`).
 * Changing any pick clears the results until the next check.
 */
export const ReserveSearch = () => {
  const [dates, setDates] = useState<StayDates>({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState(DEFAULT_GUESTS);
  const [search, setSearch] = useState<StaySearch | null>(null);

  const roomsQuery = useQuery({ queryKey: roomsQueryKey, queryFn: getRooms });
  const availabilityQuery = useQuery({
    queryKey: roomAvailabilityQueryKey(search?.checkIn ?? "", search?.checkOut ?? ""),
    queryFn: () => getRoomAvailability(search?.checkIn ?? "", search?.checkOut ?? ""),
    enabled: search !== null,
  });

  const handleDatesChange = (next: StayDates) => {
    setSearch(null);
    setDates(next);
  };

  const handleGuestsChange = (value: number) => {
    setSearch(null);
    setGuests(value);
  };

  const handleCheck = () => {
    if (!dates.checkIn || !dates.checkOut) return;
    setSearch({ checkIn: formatIsoDay(dates.checkIn), checkOut: formatIsoDay(dates.checkOut), guests });
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
    <AvailabilityForm
      checkIn={dates.checkIn}
      checkOut={dates.checkOut}
      guests={guests}
      state={getState()}
      onDatesChange={handleDatesChange}
      onGuestsChange={handleGuestsChange}
      onCheck={handleCheck}
    />
  );
};

export default ReserveSearch;
