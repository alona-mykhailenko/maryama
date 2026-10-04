import type { MouseEvent } from 'react';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import ADMIN from '../../../tokens';
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
      border="1px solid"
      borderColor={COLORS.Border.Default}
      color={COLORS.Text.FgSecondary}
      bg={COLORS.Bg.Default}
      cursor={disabled ? 'default' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      _hover={disabled ? undefined : { bg: COLORS.Bg.Muted }}
      onClick={handleClick}
    >
      {label}
    </Text>
  );
};

export default TransitionButton;
