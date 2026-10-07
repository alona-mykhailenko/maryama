'use client';

import { Dialog, type DialogOpenChangeDetails, HStack, IconButton, Portal } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS, { sora } from '@/theme/fonts';
import { XIcon } from '@/components/admin/icons/x';
import { Text } from '@/components/ui/text';
import ADMIN from '@/theme/admin-tokens';
import type { AdminDialogProps } from './props';

/** Centred back-office modal: title + close cross, body, and a footer of actions. */
export const AdminDialog = ({
  open,
  onOpenChange,
  title,
  footer,
  maxW = '440px',
  children,
}: AdminDialogProps) => {
  const handleOpenChange = (details: DialogOpenChangeDetails) => onOpenChange(details.open);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
      placement="center"
      lazyMount
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop bg="rgba(18, 18, 18, 0.4)" />
        <Dialog.Positioner px="16px">
          <Dialog.Content
            className={sora.className}
            maxW={maxW}
            bg={COLORS.Bg.Default}
            color={COLORS.Text.Fg}
            borderRadius={ADMIN.radius}
            boxShadow="0 20px 50px rgba(0, 0, 0, 0.12)"
          >
            <Dialog.Header px="24px" pt="22px" pb="0">
              <Dialog.Title>
                <Text font={FONTS.T2.T18px.Medium}>{title}</Text>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px="24px" pt="14px" pb="0">
              {children}
            </Dialog.Body>
            {footer && (
              <Dialog.Footer px="24px" pt="22px" pb="22px">
                <HStack gap="10px" justify="flex-end" w="100%">
                  {footer}
                </HStack>
              </Dialog.Footer>
            )}
            <Dialog.CloseTrigger asChild top="14px" right="14px">
              <IconButton
                aria-label="Close"
                variant="ghost"
                size="sm"
                color={COLORS.Text.FgSubtle}
                _hover={{ bg: COLORS.Bg.Muted, color: COLORS.Text.Fg }}
              >
                <XIcon size={16} />
              </IconButton>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AdminDialog;
