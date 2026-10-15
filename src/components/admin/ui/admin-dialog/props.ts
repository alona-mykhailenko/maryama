import type { ReactNode } from 'react';

export interface AdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Buttons row, right-aligned. */
  footer?: ReactNode;
  /** Max width of the window. */
  maxW?: string;
  children?: ReactNode;
}
