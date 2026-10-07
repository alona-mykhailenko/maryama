import { Box, HStack } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import type { TabOptionProps } from './props';

/** One filter tab; underlined in ink when active. */
export const TabOption = <T extends string>({ option, active, onSelect }: TabOptionProps<T>) => {
  const handleClick = () => onSelect(option.value);

  return (
    <HStack
      as="button"
      gap="8px"
      px="14px"
      py="15px"
      whiteSpace="nowrap"
      cursor="pointer"
      color={active ? COLORS.Text.Fg : COLORS.Text.FgMuted}
      boxShadow={active ? `inset 0 -2px 0 ${COLORS.Border.Inverted}` : 'none'}
      onClick={handleClick}
    >
      <Box
        as="span"
        w="8px"
        h="8px"
        borderRadius="full"
        border="2px solid currentColor"
        opacity={0.55}
      />
      <Text font={active ? FONTS.T2.T14px.SemiBold : FONTS.T2.T14px.Regular} color="inherit">
        {option.label}
      </Text>
    </HStack>
  );
};

export default TabOption;
