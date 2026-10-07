import type { SegmentedOption } from '@/components/admin/ui/segmented-toggle/props';

export interface SegmentedTabsProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}
