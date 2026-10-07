import { HStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import ADMIN from '@/theme/admin-tokens';
import type { SegmentedTabsProps } from './props';
import { TabOption } from './tab-option';

/** Underlined filter tabs that sit under the page header. */
export const SegmentedTabs = <T extends string>({
  options,
  value,
  onChange,
}: SegmentedTabsProps<T>) => {
  return (
    <HStack
      gap="6px"
      px={ADMIN.gutter}
      borderBottom="1px solid"
      borderColor={COLORS.Border.Default}
      overflowX="auto"
    >
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
