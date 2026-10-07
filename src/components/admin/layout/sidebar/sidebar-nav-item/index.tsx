import { HStack } from '@chakra-ui/react';
import Link from 'next/link';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/core/text';
import ADMIN from '@/theme/admin-tokens';
import type { SidebarNavItemProps } from './props';

/** One sidebar link; the active item is a filled ink pill. */
export const SidebarNavItem = ({ href, label, icon: Icon, active = false }: SidebarNavItemProps) => {
  return (
    <HStack
      asChild
      gap="13px"
      px="14px"
      py="12px"
      borderRadius={ADMIN.radiusSm}
      bg={active ? COLORS.Bg.Inverted : 'transparent'}
      color={active ? COLORS.Text.FgContrast : COLORS.Text.FgSecondary}
      _hover={{ bg: active ? COLORS.Bg.Inverted : COLORS.Bg.Muted }}
    >
      <Link href={href}>
        <Icon size={19} />
        <Text font={active ? FONTS.T2.T14px.SemiBold : FONTS.T2.T14px.Regular} color="inherit">
          {label}
        </Text>
      </Link>
    </HStack>
  );
};

export default SidebarNavItem;
