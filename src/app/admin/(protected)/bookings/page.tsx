'use client';

import { VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { BookingStatus } from '@/generated/prisma/enums';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { BookingActions } from '@/features/bookings/components/booking-actions';
import { GuestCell } from '@/features/bookings/components/guest-cell';
import { PageHeader } from '@/components/admin/layout/page-header';
import { DataTable } from '@/components/admin/ui/data-table';
import { Pagination } from '@/components/admin/ui/pagination';
import { QueryState } from '@/components/admin/ui/query-state';
import { SegmentedTabs } from '@/components/admin/ui/segmented-tabs';
import type { SegmentedOption } from '@/components/admin/ui/segmented-toggle/props';
import { StatusBadge } from '@/components/admin/ui/status-badge';
import { Text } from '@/components/ui/text';
import { bookingStatusTone } from '@/features/bookings/status';
import { formatShortDate, nightsBetween } from '@/lib/dates';
import { bookingsQueryKey, getBookings, updateBookingStatus } from '@/features/bookings/queries';
import { getRooms, roomsQueryKey } from '@/services/rooms';
import type { Booking } from '@/features/bookings/types';

const PAGE_SIZE = 8;

type StatusFilter = 'all' | BookingStatus;

const TAB_OPTIONS: SegmentedOption<StatusFilter>[] = [
  { value: 'all', label: 'All' },
  { value: BookingStatus.PENDING, label: 'Pending' },
  { value: BookingStatus.CONFIRMED, label: 'Confirmed' },
  { value: BookingStatus.CANCELLED, label: 'Cancelled' },
];

const columnHelper = createColumnHelper<Booking>();

const getBookingRowId = (booking: Booking) => String(booking.id);

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();
  const bookings = useQuery({ queryKey: bookingsQueryKey, queryFn: getBookings });
  const rooms = useQuery({ queryKey: roomsQueryKey, queryFn: getRooms });

  const transition = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookingsQueryKey }),
  });

  const roomsById = useMemo(
    () => new Map((rooms.data ?? []).map((room) => [room.id, room])),
    [rooms.data],
  );

  const filtered = useMemo(() => {
    const data = bookings.data ?? [];
    return statusFilter === 'all' ? data : data.filter((b) => b.status === statusFilter);
  }, [bookings.data, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => 'Booking',
        cell: (info) => (
          <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgMuted} fontVariantNumeric="tabular-nums">
            #{info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor('status', {
        header: () => 'Status',
        cell: (info) => <StatusBadge tone={bookingStatusTone(info.getValue())} />,
      }),
      columnHelper.display({
        id: 'guest',
        header: () => 'Guest',
        cell: (info) => (
          <GuestCell name={info.row.original.guestName} email={info.row.original.guestEmail} />
        ),
      }),
      columnHelper.display({
        id: 'room',
        header: () => 'Room',
        cell: (info) => (
          <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgMuted} whiteSpace="nowrap">
            {roomsById.get(info.row.original.roomId)?.name ?? `Room #${info.row.original.roomId}`}
          </Text>
        ),
      }),
      columnHelper.display({
        id: 'stay',
        header: () => 'Stay',
        cell: (info) => (
          <Text
            font={FONTS.T2.T14px.Regular}
            color={COLORS.Text.FgMuted}
            whiteSpace="nowrap"
            fontVariantNumeric="tabular-nums"
          >
            {formatShortDate(info.row.original.checkIn)} – {formatShortDate(info.row.original.checkOut)}
          </Text>
        ),
      }),
      columnHelper.display({
        id: 'total',
        header: () => 'Total',
        meta: { align: 'right' },
        cell: (info) => {
          const room = roomsById.get(info.row.original.roomId);
          const nights = nightsBetween(info.row.original.checkIn, info.row.original.checkOut);
          return (
            <Text font={FONTS.T2.T14px.Medium} fontVariantNumeric="tabular-nums">
              {room ? `€${nights * room.pricePerNight}` : '—'}
            </Text>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => 'Actions',
        cell: (info) => (
          <BookingActions
            bookingId={info.row.original.id}
            status={info.row.original.status}
            disabled={transition.isPending}
            onTransition={transition.mutate}
          />
        ),
      }),
    ],
    [roomsById, transition],
  );

  const handleStatusFilterChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setPage(1);
  };

  const rangeFrom = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeTo = Math.min(currentPage * PAGE_SIZE, filtered.length);

  return (
    <>
      <PageHeader heading="Bookings" />
      <VStack align="stretch" gap="0" minH="0">
        <SegmentedTabs
          options={TAB_OPTIONS}
          value={statusFilter}
          onChange={handleStatusFilterChange}
        />

        <QueryState
          isLoading={bookings.isLoading || rooms.isLoading}
          isError={bookings.isError || rooms.isError}
        />

        {bookings.data && rooms.data && (
          <>
            <DataTable
              columns={columns}
              data={paged}
              getRowId={getBookingRowId}
              emptyMessage="No bookings in this view."
            />
            <Pagination
              page={currentPage}
              pageCount={pageCount}
              onPageChange={setPage}
              rangeLabel={
                filtered.length === 0
                  ? 'No bookings'
                  : `Showing ${rangeFrom}–${rangeTo} of ${filtered.length}`
              }
            />
          </>
        )}
      </VStack>
    </>
  );
}
