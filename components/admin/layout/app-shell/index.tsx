import { Grid, VStack } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import { sora } from '@/assets/fonts';
import ADMIN from '../../tokens';
import { Sidebar } from '../sidebar';
import type { AppShellProps } from './props';

/** Back-office frame: fixed-width sidebar beside the scrolling page. */
export const AppShell = ({ email, children }: AppShellProps) => {
  return (
    <Grid
      className={sora.className}
      templateColumns={`${ADMIN.sidebarWidth} minmax(0, 1fr)`}
      minH="100vh"
      bg={COLORS.Bg.Default}
      color={COLORS.Text.Fg}
    >
      <Sidebar email={email} />
      <VStack align="stretch" gap="0" minW="0" bg={COLORS.Bg.Default}>
        {children}
      </VStack>
    </Grid>
  );
};

export default AppShell;
