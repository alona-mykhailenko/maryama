'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BookingStatus } from '@/generated/prisma/enums';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { GuestCell } from '@/features/admin/bookings/components/guest-cell';
import { PageLayout } from '@/components/admin/layout/page-layout';
import { DataTable } from '@/components/admin/ui/data-table';
import { Pagination } from '@/components/admin/ui/pagination';
import { QueryState } from '@/components/admin/ui/query-state';
import { SegmentedTabs } from '@/components/admin/ui/segmented-tabs';
import type { SegmentedOption } from '@/components/admin/ui/segmented-toggle/props';
import { StatusBadge } from '@/components/admin/ui/status-badge';
import { Text } from '@/components/ui/text';
import { bookingStatusTone } from '@/features/admin/bookings/status';
import { formatShortDate } from '@/lib/dates';
import { bookingsPageQueryKey, getBookingsPage } from '@/services/bookings';
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

  const router = useRouter();
  const query = {
    page,
    pageSize: PAGE_SIZE,
    status: statusFilter === 'all' ? undefined : statusFilter,
  };
  const bookings = useQuery({
    queryKey: bookingsPageQueryKey(query),
    queryFn: () => getBookingsPage(query),
    // Keep the current rows on screen while the next page loads.
    placeholderData: keepPreviousData,
  });
  const rooms = useQuery({ queryKey: roomsQueryKey, queryFn: getRooms });

  const roomsById = useMemo(
    () => new Map((rooms.data ?? []).map((room) => [room.id, room])),
    [rooms.data],
  );

  const total = bookings.data?.total ?? 0;
  const pageCount = bookings.data?.pageCount ?? 1;
  const currentPage = bookings.data?.page ?? page;

  // A status change elsewhere can shrink the list below the current page.
  if (page > pageCount) setPage(pageCount);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => 'Booking',
        cell: (info) => (
          <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgMuted} fontVariantNumeric="tabular-nums">
            {info.getValue()}
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
          <GuestCell
            name={info.row.original.guestName}
            email={info.row.original.guestEmail}
            phone={info.row.original.guestPhone}
          />
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
        cell: (info) => (
          <Text font={FONTS.T2.T14px.Medium} fontVariantNumeric="tabular-nums">
            €{info.row.original.totalPrice}
          </Text>
        ),
      }),
    ],
    [roomsById],
  );

  const handleRowClick = (booking: Booking) => router.push(`/admin/bookings/${booking.id}`);

  const handleStatusFilterChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setPage(1);
  };

  const rangeFrom = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeTo = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <PageLayout
      heading="Bookings"
      toolbar={
        <SegmentedTabs
          options={TAB_OPTIONS}
          value={statusFilter}
          onChange={handleStatusFilterChange}
        />
      }
    >
      <QueryState
        isLoading={bookings.isLoading || rooms.isLoading}
        isError={bookings.isError || rooms.isError}
      />

      {bookings.data && rooms.data && (
        <>
          <DataTable
            columns={columns}
            data={bookings.data.items}
            getRowId={getBookingRowId}
            onRowClick={handleRowClick}
            emptyMessage="No bookings in this view."
          />
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={setPage}
            rangeLabel={
              total === 0 ? 'No bookings' : `Showing ${rangeFrom}–${rangeTo} of ${total}`
            }
          />
        </>
      )}
    </PageLayout>
  );
}
