import type { BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface SplitSectionProps extends Omit<BoxProps, "children"> {
  /** Eyebrow shown above both columns ("01 — The Place"). */
  label: string;
  /** Narrow left column — usually the heading. */
  aside: ReactNode;
  /** Wider right column — the section's body. */
  children: ReactNode;
}
