import { Box, VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import { sora } from '@/theme/fonts';
import ADMIN from '@/theme/admin-tokens';
import { Sidebar } from '@/components/admin/layout/sidebar';
import type { AppShellProps } from './props';

/** Back-office frame: fixed sidebar beside the scrolling page. */
export const AppShell = ({ email, isLoggingOut, onLogout, children }: AppShellProps) => {
  return (
    <Box
      className={sora.className}
      data-admin-shell
      minH="100vh"
      bg={COLORS.Bg.Default}
      color={COLORS.Text.Fg}
    >
      <Sidebar email={email} isLoggingOut={isLoggingOut} onLogout={onLogout} />
      <VStack align="stretch" gap="0" minW="0" minH="100vh" ml={ADMIN.sidebarWidth} bg={COLORS.Bg.Default}>
        {children}
      </VStack>
    </Box>
  );
};

export default AppShell;
