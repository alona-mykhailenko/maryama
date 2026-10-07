import type { ReactNode } from "react";

export interface PageShellProps {
  /** Passed to the `Navbar`: hide the "Reserve" call to action (on the reserve page). */
  showReserve?: boolean;
  children: ReactNode;
}
