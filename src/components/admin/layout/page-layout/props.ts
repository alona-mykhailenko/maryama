import type { ReactNode } from "react";

export interface PageLayoutProps {
  heading: string;
  /** Buttons on the right of the page header. */
  actions?: ReactNode;
  /** Full-width bar under the header (filter tabs, back link, calendar controls). */
  toolbar?: ReactNode;
  children: ReactNode;
}
