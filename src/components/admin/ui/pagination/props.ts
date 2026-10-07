export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** "Showing 1–8 of 20" */
  rangeLabel: string;
}
