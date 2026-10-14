import { HStack } from '@chakra-ui/react';
import type { SegmentedTabsProps } from './props';
import { TabOption } from './tab-option';

/** Underlined filter tabs, meant for the `PageLayout` toolbar. */
export const SegmentedTabs = <T extends string>({
  options,
  value,
  onChange,
}: SegmentedTabsProps<T>) => {
  return (
    <HStack gap="6px" overflowX="auto">
      {options.map((option) => (
        <TabOption
          key={option.value}
          option={option}
          active={option.value === value}
          onSelect={onChange}
        />
      ))}
    </HStack>
  );
};

export default SegmentedTabs;
