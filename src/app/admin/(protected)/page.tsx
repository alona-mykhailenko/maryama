'use client';

import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { CalendarLegend } from '@/features/admin/calendar/components/calendar-legend';
import { CalendarToolbar } from '@/features/admin/calendar/components/calendar-toolbar';
import { MonthView } from '@/features/admin/calendar/components/month-view';
import type { CalendarView } from '@/features/admin/calendar/types';
import { useCalendarBookings } from '@/features/admin/calendar/use-calendar-bookings';
import { WeekView } from '@/features/admin/calendar/components/week-view';
import { PageLayout } from '@/components/admin/layout/page-layout';
import { QueryState } from '@/components/admin/ui/query-state';
import {
  addDays,
  formatMonthLabel,
  formatRangeLabel,
  isoWeekNumber,
  startOfMonth,
  startOfWeek,
} from '@/lib/dates';
import { getRooms, roomsQueryKey } from '@/services/rooms';

export default function CalendarPage() {
  const [view, setView] = useState<CalendarView>('week');
  const [anchor, setAnchor] = useState(() => new Date());

  const rooms = useQuery({ queryKey: roomsQueryKey, queryFn: getRooms });

  const weekStart = useMemo(() => startOfWeek(anchor), [anchor]);
  const month = useMemo(() => startOfMonth(anchor), [anchor]);

  // The days on screen; the month view only draws the days of its month.
  const rangeStart = view === 'week' ? weekStart : month;
  const rangeEnd =
    view === 'week' ? addDays(weekStart, 7) : new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const bookings = useCalendarBookings(rangeStart, rangeEnd);

  const rangeLabel =
    view === 'week' ? formatRangeLabel(weekStart, addDays(weekStart, 6)) : formatMonthLabel(month);
  const rangeNote =
    view === 'week'
      ? `Week ${isoWeekNumber(weekStart)}`
      : `${new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()} days · ${rooms.data?.length ?? 0} rooms`;

  const step = (direction: 1 | -1) =>
    setAnchor((date) =>
      view === 'week'
        ? addDays(date, 7 * direction)
        : new Date(date.getFullYear(), date.getMonth() + direction, 1),
    );
  const handlePrev = () => step(-1);
  const handleNext = () => step(1);

  const isLoading = rooms.isLoading || bookings.isLoading;
  const isError = rooms.isError || bookings.isError;

  return (
    <PageLayout
      heading="Calendar"
      toolbar={
        <CalendarToolbar
          rangeLabel={rangeLabel}
          rangeNote={rangeNote}
          view={view}
          onViewChange={setView}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      }
    >
      <QueryState isLoading={isLoading} isError={isError} />

      {rooms.data && bookings.data && (
        <Box>
          {view === 'week' ? (
            <WeekView weekStart={weekStart} rooms={rooms.data} bookings={bookings.data} />
          ) : (
            <MonthView month={month} rooms={rooms.data} bookings={bookings.data} />
          )}
          <CalendarLegend />
        </Box>
      )}
    </PageLayout>
  );
}
