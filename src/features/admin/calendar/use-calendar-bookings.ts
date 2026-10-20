import { keepPreviousData, useQueries, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { CalendarBooking } from '@/features/bookings/types';
import { formatIsoDay, startOfMonth } from '@/lib/dates';
import { calendarBookingsQueryKey, getCalendarBookings } from '@/services/bookings';

const addMonths = (month: Date, amount: number) =>
  new Date(month.getFullYear(), month.getMonth() + amount, 1);

/** Query options for one calendar month, `[1st, 1st of next month)`. */
const monthQuery = (month: Date) => {
  const from = formatIsoDay(month);
  const to = formatIsoDay(addMonths(month, 1));
  return {
    queryKey: calendarBookingsQueryKey(from, to),
    queryFn: () => getCalendarBookings({ from, to }),
  };
};

/** First day of every month that `[start, end)` touches. */
const monthsBetween = (start: Date, end: Date) => {
  const months: Date[] = [];
  for (let month = startOfMonth(start); month < end; month = addMonths(month, 1)) {
    months.push(month);
  }
  return months;
};

/** Merges the months, once each: a stay across a month boundary is in both. */
const combineMonths = (results: UseQueryResult<CalendarBooking[]>[]) => {
  const bookings = new Map<number, CalendarBooking>();
  for (const result of results) {
    for (const booking of result.data ?? []) bookings.set(booking.id, booking);
  }
  return {
    data: results.every((result) => result.data) ? [...bookings.values()] : undefined,
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
  };
};

/**
 * Pending and confirmed bookings for the days `[start, end)` the calendar shows.
 * Fetched and cached per month, so week and month views share the data, and
 * the months either side are prefetched so prev/next is instant.
 */
export function useCalendarBookings(start: Date, end: Date) {
  const months = monthsBetween(start, end);
  const firstMonth = months[0];
  const lastMonth = months[months.length - 1];

  const bookings = useQueries({
    queries: months.map((month) => ({ ...monthQuery(month), placeholderData: keepPreviousData })),
    combine: combineMonths,
  });

  const queryClient = useQueryClient();
  const firstMonthTime = firstMonth.getTime();
  const lastMonthTime = lastMonth.getTime();
  useEffect(() => {
    queryClient.prefetchQuery(monthQuery(addMonths(new Date(firstMonthTime), -1)));
    queryClient.prefetchQuery(monthQuery(addMonths(new Date(lastMonthTime), 1)));
  }, [queryClient, firstMonthTime, lastMonthTime]);

  return bookings;
}
