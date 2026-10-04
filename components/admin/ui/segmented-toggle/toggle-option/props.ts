import type { SegmentedOption } from '../props';

export interface ToggleOptionProps<T extends string> {
  option: SegmentedOption<T>;
  active: boolean;
  onSelect: (value: T) => void;
}
