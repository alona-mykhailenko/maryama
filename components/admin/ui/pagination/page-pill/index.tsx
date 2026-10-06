import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import ADMIN from '../../../tokens';
import type { PagePillProps } from './props';

/** One round page button; filled ink when active. */
export const PagePill = ({
  label,
  page,
  active = false,
  disabled = false,
  onClick,
}: PagePillProps) => {
  const handleClick = () => onClick(page);

  return (
    <Text
      as="button"
      font={FONTS.T2.T14px.Regular}
      minW="34px"
      h="34px"
      px="10px"
      borderRadius={ADMIN.pill}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      cursor={disabled ? 'default' : 'pointer'}
      opacity={disabled ? 0.4 : 1}
      bg={active ? COLORS.Bg.Inverted : COLORS.Bg.Muted}
      color={active ? COLORS.Text.FgContrast : COLORS.Text.FgMuted}
      onClick={disabled ? undefined : handleClick}
    >
      {label}
    </Text>
  );
};

export default PagePill;
