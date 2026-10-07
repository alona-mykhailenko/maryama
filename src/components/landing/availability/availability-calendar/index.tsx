"use client";

import { useState } from "react";
import { Box, chakra, Grid, HStack, VStack } from "@chakra-ui/react";
import FONTS from "@/assets/fonts";
import { Text } from "@/components/core/text";
import {
  addDays,
  formatMonthLabel,
  isSameDay,
  MAX_STAY_NIGHTS,
  monthGridStart,
  startOfDay,
  startOfMonth,
  WEEKDAY_LABELS,
} from "@/lib/dates";
import { AVAILABILITY } from "../../content";
import { ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRightIcon } from "../../icons/chevron-right";
import LANDING from "../../tokens";
import { DayCell } from "./day-cell";
import type { AvailabilityCalendarProps } from "./props";

const GRID_DAYS = 42;

const addMonths = (month: Date, amount: number) =>
  new Date(month.getFullYear(), month.getMonth() + amount, 1);

/**
 * Month grid for picking a stay: first click sets check-in, the next later day
 * sets check-out (hovering previews the nights in between). Past days are
 * faded and the month cannot go back before the current one.
 */
export const AvailabilityCalendar = ({
  month,
  checkIn,
  checkOut,
  onMonthChange,
  onSelect,
}: AvailabilityCalendarProps) => {
  const [hoverDay, setHoverDay] = useState<Date | null>(null);

  const today = startOfDay(new Date());
  const shownMonth = startOfMonth(month);
  const gridStart = monthGridStart(shownMonth);
  const days = Array.from({ length: GRID_DAYS }, (_, index) => addDays(gridStart, index));
  const isChoosingCheckOut = checkIn !== null && checkOut === null;
  const lastCheckOut = checkIn ? addDays(checkIn, MAX_STAY_NIGHTS) : null;
  const previewEnd =
    checkOut ??
    (isChoosingCheckOut && hoverDay && hoverDay > checkIn && lastCheckOut && hoverDay <= lastCheckOut
      ? hoverDay
      : null);
  const canGoBack = shownMonth > startOfMonth(today);

  const handlePrevious = () => onMonthChange(addMonths(shownMonth, -1));
  const handleNext = () => onMonthChange(addMonths(shownMonth, 1));
  const handleMouseLeave = () => setHoverDay(null);

  return (
    <VStack align="stretch" gap="16px">
      <HStack justify="space-between" gap="16px">
        <chakra.button
          type="button"
          p="8px"
          color={LANDING.ink}
          cursor={canGoBack ? "pointer" : "default"}
          opacity={canGoBack ? 1 : 0.2}
          _hover={canGoBack ? { opacity: 0.55 } : undefined}
          disabled={!canGoBack}
          aria-label={AVAILABILITY.previousMonth}
          onClick={handlePrevious}
        >
          <ChevronLeftIcon />
        </chakra.button>
        <Box letterSpacing=".34em" textTransform="uppercase" pl=".34em">
          <Text font={FONTS.T1.T12px.Regular} aria-live="polite">
            {formatMonthLabel(shownMonth)}
          </Text>
        </Box>
        <chakra.button
          type="button"
          p="8px"
          color={LANDING.ink}
          cursor="pointer"
          _hover={{ opacity: 0.55 }}
          aria-label={AVAILABILITY.nextMonth}
          onClick={handleNext}
        >
          <ChevronRightIcon />
        </chakra.button>
      </HStack>

      <Grid templateColumns="repeat(7, 1fr)">
        {WEEKDAY_LABELS.map((label) => (
          <Box key={label} textAlign="center" letterSpacing=".24em" textTransform="uppercase" opacity={0.5}>
            <Text font={FONTS.T1.T9px.Regular}>{label}</Text>
          </Box>
        ))}
      </Grid>

      <Grid templateColumns="repeat(7, 1fr)" onMouseLeave={handleMouseLeave}>
        {days.map((day) => {
          const isEdge =
            (checkIn !== null && isSameDay(day, checkIn)) ||
            (checkOut !== null && isSameDay(day, checkOut));
          const isInRange =
            checkIn !== null &&
            previewEnd !== null &&
            day > checkIn &&
            (day < previewEnd || (checkOut === null && isSameDay(day, previewEnd)));
          const isDisabled =
            day < today || (isChoosingCheckOut && lastCheckOut !== null && day > lastCheckOut);

          return (
            <DayCell
              key={day.getTime()}
              day={day}
              isOutside={day.getMonth() !== shownMonth.getMonth()}
              isDisabled={isDisabled}
              isEdge={isEdge}
              isInRange={isInRange}
              isToday={isSameDay(day, today)}
              onSelect={onSelect}
              onHover={setHoverDay}
            />
          );
        })}
      </Grid>
    </VStack>
  );
};

export default AvailabilityCalendar;
