import type { SegmentedOption } from '../segmented-toggle/props';

export interface SegmentedTabsProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}
