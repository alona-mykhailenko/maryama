"use client";

import { useState } from "react";
import { Box, chakra, HStack, Popover, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY, ROOM_DETAILS } from "@/config/content";
import { AvailabilityCalendar } from "@/features/availability/components/availability-calendar";
import { GuestsSelect } from "@/features/availability/components/date-summary/guests-select";
import type { StayDates } from "@/features/availability/types";
import { diffInDays, formatIsoDay } from "@/lib/dates";
import { checkAvailability, roomAvailabilityQueryKey } from "@/services/rooms";
import LANDING from "@/theme/landing-tokens";
import { ReserveButton } from "./reserve-button";
import { StayCell } from "./stay-cell";
import type { ReserveAvailability, ReserveCardProps } from "./props";

const DEFAULT_GUESTS = 2;

const formatCellDay = (date: Date) =>
  date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

/**
 * The room page's booking box, and its only client component: check-in /
 * check-out (picked on a calendar popover) and guests up to the room's
 * capacity. Once both dates are set it checks the room is free
 * (`GET /api/rooms/availability`) and shows the stay total; "Reserve" then
 * opens the booking form with the stay filled in. Nothing is booked from here.
 */
export const ReserveCard = ({ room }: ReserveCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(() => new Date());
  const [dates, setDates] = useState<StayDates>({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState(() => Math.min(DEFAULT_GUESTS, room.capacity));
  const { checkIn, checkOut } = dates;

  const checkInDay = checkIn ? formatIsoDay(checkIn) : "";
  const checkOutDay = checkOut ? formatIsoDay(checkOut) : "";
  const hasStay = checkIn !== null && checkOut !== null;

  const availabilityQuery = useQuery({
    queryKey: roomAvailabilityQueryKey(checkInDay, checkOutDay),
    queryFn: () => checkAvailability(checkInDay, checkOutDay),
    enabled: hasStay,
  });

  const getAvailability = (): ReserveAvailability => {
    if (!hasStay) return "idle";
    if (availabilityQuery.isError) return "error";
    if (!availabilityQuery.data) return "checking";
    return availabilityQuery.data.includes(room.id) ? "available" : "unavailable";
  };

  const availability = getAvailability();
  const nights = hasStay ? diffInDays(checkIn, checkOut) : null;
  const bookHref = hasStay
    ? `${ROOM_DETAILS.bookHref(room.id)}?${new URLSearchParams({
        checkIn: checkInDay,
        checkOut: checkOutDay,
        guests: String(guests),
      })}`
    : ROOM_DETAILS.bookHref(room.id);

  const handleOpenChange = ({ open }: Popover.OpenChangeDetails) => setIsOpen(open);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSelect = (day: Date) => {
    if (checkIn === null || checkOut !== null || day <= checkIn) {
      setDates({ checkIn: day, checkOut: null });
      return;
    }
    setDates({ checkIn, checkOut: day });
    setIsOpen(false);
  };

  const handleClear = () => setDates({ checkIn: null, checkOut: null });

  const renderAction = () => {
    if (!hasStay) return <ReserveButton label={AVAILABILITY.check} onClick={handleOpen} />;
    if (availability === "unavailable") return <ReserveButton label={ROOM_DETAILS.reserve.changeDates} onClick={handleOpen} />;
    if (availability === "available") return <ReserveButton label={ROOM_DETAILS.reserve.reserve} href={bookHref} />;
    return <ReserveButton label={ROOM_DETAILS.reserve.reserve} disabled />;
  };

  const renderStatus = () => {
    if (availability === "idle") return null;
    if (availability === "checking") {
      return (
        <Box opacity={0.6}>
          <Text font={FONTS.T1.T12px.Light}>{ROOM_DETAILS.reserve.checking}</Text>
        </Box>
      );
    }
    if (availability === "error" || availability === "unavailable") {
      return (
        <Text font={FONTS.T1.T12px.Light} color={COLORS.Text.FgError} role="alert">
          {availability === "error" ? AVAILABILITY.error : ROOM_DETAILS.reserve.unavailable}
        </Text>
      );
    }
    return (
      <Box opacity={0.6} textAlign="center">
        <Text font={FONTS.T1.T12px.Light}>{ROOM_DETAILS.reserve.note}</Text>
      </Box>
    );
  };

  return (
    <VStack
      align="stretch"
      gap="24px"
      p={{ base: "20px", md: "28px" }}
      border="1px solid"
      borderColor={COLORS.Earth.Tan}
      w="100%"
      maxW="420px"
    >
      <VStack align="stretch" gap="4px">
        <Box letterSpacing=".04em">
          <Text font={FONTS.T1.T22px.Light}>
            {nights !== null
              ? AVAILABILITY.total(room.pricePerNight * nights)
              : ROOM_DETAILS.reserve.addDates}
          </Text>
        </Box>
        <Box opacity={0.6}>
          <Text font={FONTS.T1.T12px.Light}>
            {nights !== null
              ? ROOM_DETAILS.reserve.breakdown(nights, room.pricePerNight)
              : AVAILABILITY.perNight(room.pricePerNight)}
          </Text>
        </Box>
      </VStack>

      <Box border="1px solid" borderColor={LANDING.ink}>
        <Popover.Root
          open={isOpen}
          onOpenChange={handleOpenChange}
          positioning={{ placement: "bottom-start", gutter: 8 }}
          lazyMount
          unmountOnExit
        >
          <Popover.Trigger asChild>
            <chakra.button
              type="button"
              display="grid"
              gridTemplateColumns="1fr 1fr"
              w="100%"
              cursor="pointer"
              color={LANDING.ink}
              transition="background .2s ease"
              _hover={{ bg: COLORS.Earth.Sand }}
              _focusVisible={{ outline: "1px solid", outlineColor: LANDING.ink, outlineOffset: "-4px" }}
              aria-label={ROOM_DETAILS.reserve.chooseDates}
            >
              <StayCell label={AVAILABILITY.checkInLabel}>
                <Box opacity={checkIn ? 1 : 0.45}>
                  <Text font={FONTS.T1.T14px.Light}>
                    {checkIn ? formatCellDay(checkIn) : ROOM_DETAILS.reserve.addDate}
                  </Text>
                </Box>
              </StayCell>
              <Box borderLeft="1px solid" borderColor={LANDING.ink}>
                <StayCell label={AVAILABILITY.checkOutLabel}>
                  <Box opacity={checkOut ? 1 : 0.45}>
                    <Text font={FONTS.T1.T14px.Light}>
                      {checkOut ? formatCellDay(checkOut) : ROOM_DETAILS.reserve.addDate}
                    </Text>
                  </Box>
                </StayCell>
              </Box>
            </chakra.button>
          </Popover.Trigger>
          <Popover.Positioner>
            {/* No portal, so the calendar keeps the page's Montserrat. */}
            <Popover.Content
              zIndex={10}
              w={{ base: "calc(100vw - 48px)", sm: "360px" }}
              p="16px"
              bg={LANDING.cream}
              border="1px solid"
              borderColor={COLORS.Earth.Tan}
              borderRadius="0"
              boxShadow="0 12px 32px rgba(18, 18, 18, 0.08)"
              outline="none"
            >
              <VStack align="stretch" gap="12px">
                <AvailabilityCalendar
                  month={month}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onMonthChange={setMonth}
                  onSelect={handleSelect}
                />
                <HStack justify="space-between" gap="16px" letterSpacing=".24em" textTransform="uppercase">
                  <chakra.button
                    type="button"
                    py="6px"
                    cursor="pointer"
                    opacity={0.6}
                    _hover={{ opacity: 1 }}
                    onClick={handleClear}
                  >
                    <Text font={FONTS.T1.T9px.Regular}>{ROOM_DETAILS.reserve.clear}</Text>
                  </chakra.button>
                  <chakra.button
                    type="button"
                    py="6px"
                    cursor="pointer"
                    _hover={{ opacity: 0.6 }}
                    onClick={handleClose}
                  >
                    <Text font={FONTS.T1.T9px.Regular}>{ROOM_DETAILS.reserve.close}</Text>
                  </chakra.button>
                </HStack>
              </VStack>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>

        <Box borderTop="1px solid" borderColor={LANDING.ink}>
          <StayCell label={AVAILABILITY.guestsLabel}>
            <GuestsSelect value={guests} max={room.capacity} onChange={setGuests} />
          </StayCell>
        </Box>
      </Box>

      <VStack align="stretch" gap="12px">
        {renderAction()}
        {renderStatus()}
      </VStack>
    </VStack>
  );
};

export default ReserveCard;
