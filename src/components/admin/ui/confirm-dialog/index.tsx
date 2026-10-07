'use client';

import { VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import { AdminButton } from '@/components/admin/ui/admin-button';
import { AdminDialog } from '@/components/admin/ui/admin-dialog';
import type { ConfirmDialogProps } from './props';

/** "Are you sure?" window for destructive actions: Cancel + a red confirm button. */
export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Delete',
  onConfirm,
  loading = false,
  error,
}: ConfirmDialogProps) => {
  const handleOpenChange = (next: boolean) => {
    if (!loading) onOpenChange(next);
  };

  const handleCancel = () => onOpenChange(false);

  return (
    <AdminDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      footer={
        <>
          <AdminButton variant="secondary" disabled={loading} onClick={handleCancel}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </AdminButton>
        </>
      }
    >
      <VStack align="stretch" gap="10px">
        <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgMuted}>
          {description}
        </Text>
        {error && (
          <Text font={FONTS.T2.T12px.Regular} color={COLORS.Accent.Sage}>
            {error}
          </Text>
        )}
      </VStack>
    </AdminDialog>
  );
};

export default ConfirmDialog;
