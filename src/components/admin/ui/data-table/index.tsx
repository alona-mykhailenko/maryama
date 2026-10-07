'use client';

import { Box, Table } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { DataTableProps } from './props';

/**
 * Plain react-table renderer: uppercase grey headers, hairline row separators,
 * optional clickable rows. Cells render whatever the column definitions return.
 */
export const DataTable = <T,>({
  columns,
  data,
  getRowId,
  onRowClick,
  emptyMessage = 'No data yet.',
  minWidth = '760px',
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
  });

  return (
    <Box overflowX="auto" maxW="100%">
      <Table.Root minW={minWidth} bg={COLORS.Bg.Default}>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id} bg={COLORS.Bg.Default}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeader
                  key={header.id}
                  textAlign={header.column.columnDef.meta?.align ?? 'left'}
                  px="16px"
                  py="13px"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  borderBottom="1px solid"
                  borderColor={COLORS.Border.Default}
                  width={header.column.columnDef.meta?.width}
                >
                  {!header.column.columnDef.meta?.hideHeader && (
                    <Text font={FONTS.T2.T12px.Medium} color={COLORS.Text.FgFaint}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                  )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row
              key={row.id}
              bg={COLORS.Bg.Default}
              cursor={onRowClick ? 'pointer' : undefined}
              onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              _hover={onRowClick ? { bg: COLORS.Bg.Subtle } : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  px="16px"
                  py="18px"
                  borderBottom="1px solid"
                  borderColor={COLORS.Border.Subtle}
                  textAlign={cell.column.columnDef.meta?.align ?? 'left'}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {data.length === 0 && (
        <Box px="16px" py="28px">
          <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgSubtle}>
            {emptyMessage}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default DataTable;
