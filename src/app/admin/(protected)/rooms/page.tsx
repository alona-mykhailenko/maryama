'use client';

import { HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { ChevronRightIcon } from '@/components/admin/icons/chevron-right';
import { PageHeader } from '@/components/admin/layout/page-header';
import { DataTable } from '@/components/admin/ui/data-table';
import { QueryState } from '@/components/admin/ui/query-state';
import { Text } from '@/components/core/text';
import { getRooms, roomsQueryKey } from '@/services/rooms';
import type { Room } from '@/services/types/room';

const columnHelper = createColumnHelper<Room>();

const COLUMNS = [
  columnHelper.accessor('name', {
    header: () => 'Room',
    cell: (info) => (
      <Text font={FONTS.T2.T14px.Medium} whiteSpace="nowrap">
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor('capacity', {
    header: () => 'Max guests',
    cell: (info) => (
      <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgMuted}>
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor('pricePerNight', {
    header: () => 'Price',
    meta: { align: 'right' },
    cell: (info) => (
      <Text font={FONTS.T2.T14px.Medium} whiteSpace="nowrap" fontVariantNumeric="tabular-nums">
        €{info.getValue()}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'chevron',
    header: () => '',
    meta: { hideHeader: true, width: '40px' },
    cell: () => (
      <HStack color={COLORS.Text.FgFaint} gap="0">
        <ChevronRightIcon />
      </HStack>
    ),
  }),
];

const getRoomRowId = (room: Room) => String(room.id);

export default function RoomsPage() {
  const router = useRouter();
  const handleRowClick = (room: Room) => router.push(`/admin/rooms/${room.id}`);
  const { data, isLoading, isError } = useQuery({ queryKey: roomsQueryKey, queryFn: getRooms });

  return (
    <>
      <PageHeader heading="Rooms" />
      <VStack align="stretch" gap="0">
        <QueryState isLoading={isLoading} isError={isError} />
        {data && (
          <DataTable
            columns={COLUMNS}
            data={data}
            getRowId={getRoomRowId}
            onRowClick={handleRowClick}
            emptyMessage="No rooms yet."
          />
        )}
      </VStack>
    </>
  );
}
