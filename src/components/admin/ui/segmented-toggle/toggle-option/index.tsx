import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { ToggleOptionProps } from './props';

/** One pill of the toggle; white and raised when active. */
export const ToggleOption = <T extends string>({
  option,
  active,
  onSelect,
}: ToggleOptionProps<T>) => {
  const handleClick = () => onSelect(option.value);

  return (
    <Text
      as="button"
      font={active ? FONTS.T2.T14px.SemiBold : FONTS.T2.T14px.Regular}
      px="14px"
      py="6px"
      borderRadius="8px"
      cursor="pointer"
      bg={active ? COLORS.Bg.Default : 'transparent'}
      color={active ? COLORS.Text.Fg : COLORS.Text.FgMuted}
      boxShadow={active ? '0 1px 2px rgba(0,0,0,.05)' : 'none'}
      onClick={handleClick}
    >
      {option.label}
    </Text>
  );
};

export default ToggleOption;
