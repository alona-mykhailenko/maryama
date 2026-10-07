'use client';

import { HStack, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { BedIcon } from '@/components/admin/icons/bed';
import { CalendarIcon } from '@/components/admin/icons/calendar';
import { ClipboardIcon } from '@/components/admin/icons/clipboard';
import { Text } from '@/components/ui/text';
import ADMIN from '@/theme/admin-tokens';
import type { SidebarProps } from './props';
import { SidebarNavItem } from './sidebar-nav-item';
import { SidebarUserFooter } from './sidebar-user-footer';

const NAV_ITEMS = [
  { href: '/admin', label: 'Calendar', icon: CalendarIcon },
  { href: '/admin/bookings', label: 'Bookings', icon: ClipboardIcon },
  { href: '/admin/rooms', label: 'Rooms', icon: BedIcon },
];

/** Left column: wordmark, navigation and the signed-in admin. */
export const Sidebar = ({ email, isLoggingOut, onLogout }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <VStack
      as="aside"
      position="fixed"
      top="0"
      left="0"
      w={ADMIN.sidebarWidth}
      h="100vh"
      zIndex="10"
      align="stretch"
      gap="0"
      borderRight="1px solid"
      borderColor={COLORS.Border.Default}
      bg={COLORS.Bg.Default}
      pb="14px"
    >
      <HStack
        h={ADMIN.headerHeight}
        px="24px"
        borderBottom="1px solid"
        borderColor={COLORS.Border.Default}
        letterSpacing="0.1em"
        textTransform="uppercase"
      >
        <Text font={FONTS.T1.T16px.SemiBold}>Maryama</Text>
      </HStack>

      <VStack as="nav" align="stretch" gap="4px" px="14px" pt="18px" flex="1">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)}
          />
        ))}
      </VStack>

      <SidebarUserFooter email={email} isLoggingOut={isLoggingOut} onLogout={onLogout} />
    </VStack>
  );
};

export default Sidebar;
