import type { ReactNode } from "react";
import type { BoxProps } from "@chakra-ui/react";

export interface AvailabilityProps extends Pick<BoxProps, "pt" | "pb"> {
  /** Anchor id of the section. */
  id: string;
  /** Eyebrow above the section ("03 — Availability"). */
  label: string;
  /** The availability form, wired by the page. */
  children: ReactNode;
}
