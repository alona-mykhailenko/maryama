'use client';

import { Box, HStack, IconButton, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { LogOutIcon } from '@/components/admin/icons/log-out';
import { Text } from '@/components/core/text';
import { logout } from '@/services/auth';
import type { SidebarUserFooterProps } from './props';

/** Signed-in admin (initial + email) with the log-out button. */
export const SidebarUserFooter = ({ email }: SidebarUserFooterProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      router.replace('/admin/login');
      router.refresh();
    },
  });

  const handleLogout = () => mutation.mutate();

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
        loading={mutation.isPending}
        onClick={handleLogout}
        _hover={{ color: COLORS.Text.Fg, bg: 'transparent' }}
      >
        <LogOutIcon />
      </IconButton>
    </HStack>
  );
};

export default SidebarUserFooter;
