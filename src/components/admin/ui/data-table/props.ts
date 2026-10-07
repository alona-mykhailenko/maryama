import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    align?: 'left' | 'right' | 'center';
    width?: string;
    hideHeader?: boolean;
  }
}

export interface DataTableProps<T> {
  // react-table columns are heterogeneous per-column value types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  /** Stable id for each row, forwarded to react-table's `getRowId`. */
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: ReactNode;
  minWidth?: string;
}
