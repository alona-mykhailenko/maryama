"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReserveCard } from "@/features/room-details/components/reserve-card";
import type { StayDates } from "@/features/availability/types";
import type {
  ReserveAvailability,
  ReserveCardProps,
} from "@/features/room-details/components/reserve-card/props";
import { formatIsoDay } from "@/lib/dates";
import { getRoomAvailability, roomAvailabilityQueryKey } from "@/services/rooms";

const DEFAULT_GUESTS = 2;

interface RoomReserveProps {
  room: ReserveCardProps["room"];
}

/**
 * Client half of the room page: holds the stay picked in the `ReserveCard` and
 * checks the room is free for it (`GET /api/rooms/availability`) as soon as
 * both dates are set.
 */
export const RoomReserve = ({ room }: RoomReserveProps) => {
  const [dates, setDates] = useState<StayDates>({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState(() => Math.min(DEFAULT_GUESTS, room.capacity));

  const checkInDay = dates.checkIn ? formatIsoDay(dates.checkIn) : "";
  const checkOutDay = dates.checkOut ? formatIsoDay(dates.checkOut) : "";
  const hasStay = checkInDay !== "" && checkOutDay !== "";

  const availabilityQuery = useQuery({
    queryKey: roomAvailabilityQueryKey(checkInDay, checkOutDay),
    queryFn: () => getRoomAvailability(checkInDay, checkOutDay),
    enabled: hasStay,
  });

  const getAvailability = (): ReserveAvailability => {
    if (!hasStay) return "idle";
    if (availabilityQuery.isError) return "error";
    if (!availabilityQuery.data) return "checking";
    return availabilityQuery.data.includes(room.id) ? "available" : "unavailable";
  };

  return (
    <ReserveCard
      room={room}
      checkIn={dates.checkIn}
      checkOut={dates.checkOut}
      guests={guests}
      availability={getAvailability()}
      onDatesChange={setDates}
      onGuestsChange={setGuests}
    />
  );
};

export default RoomReserve;
