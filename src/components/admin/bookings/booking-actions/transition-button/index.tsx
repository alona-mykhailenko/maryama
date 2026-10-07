import type { MouseEvent } from 'react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import ADMIN from '@/theme/admin-tokens';
import type { TransitionButtonProps } from './props';

/** One outlined pill that moves a booking to `to`. */
export const TransitionButton = ({
  bookingId,
  to,
  label,
  disabled = false,
  onTransition,
}: TransitionButtonProps) => {
  const handleClick = (event: MouseEvent) => {
    // The button sits inside a table row; don't trigger the row's click.
    event.stopPropagation();
    if (!disabled) onTransition({ id: bookingId, status: to });
  };

  return (
    <Text
      as="button"
      font={FONTS.T2.T12px.Medium}
      px="11px"
      py="6px"
      borderRadius={ADMIN.pill}
      color={COLORS.Text.FgSecondary}
      bg={COLORS.Bg.Muted}
      cursor={disabled ? 'default' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      _hover={disabled ? undefined : { bg: COLORS.Bg.Emphasized }}
      onClick={handleClick}
    >
      {label}
    </Text>
  );
};

export default TransitionButton;
