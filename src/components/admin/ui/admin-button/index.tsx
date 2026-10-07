import { Button } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import ADMIN from '@/theme/admin-tokens';
import type { AdminButtonProps } from './props';

const VARIANTS = {
  primary: { bg: COLORS.Bg.Inverted, color: COLORS.Text.FgContrast, borderColor: COLORS.Border.Inverted },
  secondary: { bg: COLORS.Bg.Muted, color: COLORS.Text.Fg, borderColor: COLORS.Border.Default },
  danger: {
    bg: COLORS.Accent.LightRed,
    color: COLORS.Text.FgContrast,
    borderColor: COLORS.Accent.LightRed,
  },
} as const;

/**
 * Back-office pill button, borderless unless `bordered` is set. Forwards Chakra
 * Button props (`loading`, `disabled`, …).
 */
export const AdminButton = ({
  variant = 'primary',
  bordered = false,
  children,
  ...rest
}: AdminButtonProps) => {
  const tone = VARIANTS[variant];

  return (
    <Button
      {...FONTS.T2.T14px.Medium}
      h="40px"
      px="18px"
      borderRadius={ADMIN.pill}
      border={bordered ? '1px solid' : 'none'}
      borderColor={bordered ? tone.borderColor : undefined}
      bg={tone.bg}
      color={tone.color}
      _hover={{ opacity: 0.85 }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AdminButton;
