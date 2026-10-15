import type { ReactNode } from 'react';

export interface PagePillProps {
  label: ReactNode;
  /** Page this pill leads to, passed back to `onClick`. */
  page: number;
  active?: boolean;
  disabled?: boolean;
  onClick: (page: number) => void;
}
