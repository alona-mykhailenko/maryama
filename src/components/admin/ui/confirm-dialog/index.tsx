'use client';

import { VStack } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import { AdminButton } from '../admin-button';
import { AdminDialog } from '../admin-dialog';
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
