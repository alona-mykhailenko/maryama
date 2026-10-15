import type { BoxProps } from '@chakra-ui/react';

export interface ImageSlotProps extends BoxProps {
  /** Stable id — mirrors the design's `<image-slot id>` persistence key. */
  id?: string;
  /** Real image source. When omitted, a labelled placeholder is shown. */
  src?: string;
  alt?: string;
  /** object-fit for a real image. */
  fit?: 'cover' | 'contain';
  /** Caption shown while no `src` is set. */
  placeholder?: string;
  /**
   * Intrinsic aspect ratio (e.g. `16 / 10`). When set the slot sizes itself;
   * otherwise it fills a positioned parent.
   */
  ratio?: number;
}
