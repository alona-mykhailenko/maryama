import { HStack } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import type { SegmentedToggleProps } from './props';
import { ToggleOption } from './toggle-option';

/** Compact pill switch (e.g. Week / Month) on a grey track. */
export const SegmentedToggle = <T extends string>({
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) => {
  return (
    <HStack gap="6px" p="3px" borderRadius="11px" bg={COLORS.Bg.Muted}>
      {options.map((option) => (
        <ToggleOption
          key={option.value}
          option={option}
          active={option.value === value}
          onSelect={onChange}
        />
      ))}
    </HStack>
  );
};

export default SegmentedToggle;
