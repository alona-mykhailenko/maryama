import type { SegmentedOption } from '@/components/admin/ui/segmented-toggle/props';

export interface TabOptionProps<T extends string> {
  option: SegmentedOption<T>;
  active: boolean;
  onSelect: (value: T) => void;
}
