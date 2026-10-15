import { Box, HStack, IconButton, VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { LogOutIcon } from '@/components/admin/icons/log-out';
import { Text } from '@/components/ui/text';
import type { SidebarUserFooterProps } from './props';

/** Signed-in admin (initial + email) with the log-out button. */
export const SidebarUserFooter = ({ email, isLoggingOut, onLogout }: SidebarUserFooterProps) => {
  return (
    <HStack pt="14px" px="18px" borderTop="1px solid" borderColor={COLORS.Border.Default} gap="11px">
      <Box
        w="32px"
        h="32px"
        borderRadius="full"
        bg={COLORS.Bg.Muted}
        display="grid"
        placeItems="center"
        flexShrink={0}
        textTransform="uppercase"
      >
        <Text font={FONTS.T2.T12px.SemiBold} color={COLORS.Text.FgSecondary}>
          {email.charAt(0)}
        </Text>
      </Box>
      <VStack gap="0" align="start" flex="1" minW="0">
        <Text font={FONTS.T2.T14px.SemiBold} lineClamp={1}>
          Admin
        </Text>
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgSubtle} lineClamp={1}>
          {email}
        </Text>
      </VStack>
      <IconButton
        aria-label="Log out"
        variant="ghost"
        size="xs"
        color={COLORS.Text.FgSubtle}
        loading={isLoggingOut}
        onClick={onLogout}
        _hover={{ color: COLORS.Text.Fg, bg: 'transparent' }}
      >
        <LogOutIcon />
      </IconButton>
    </HStack>
  );
};

export default SidebarUserFooter;
