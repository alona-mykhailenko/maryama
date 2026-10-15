'use client';

import { VStack } from '@chakra-ui/react';
import { type ChangeEvent, type SubmitEvent, useState } from 'react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { AdminButton } from '@/components/admin/ui/admin-button';
import { AdminDialog } from '@/components/admin/ui/admin-dialog';
import { Text } from '@/components/ui/text';
import { TextInput } from '@/components/ui/text-input';
import { roomPriceSchema } from '@/features/rooms/schema';
import type { RoomPriceDialogProps } from './props';

const FORM_ID = 'room-price-form';

/**
 * Window to change a room's nightly price, prefilled with the current one.
 * Validated with the same schema as the API; existing bookings keep their price.
 */
export const RoomPriceDialog = ({
  open,
  onOpenChange,
  pricePerNight,
  onSave,
  loading = false,
  error,
}: RoomPriceDialogProps) => {
  const [value, setValue] = useState(String(pricePerNight));
  const [validationError, setValidationError] = useState<string | null>(null);

  // Start from the current price every time the window opens.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setValue(String(pricePerNight));
      setValidationError(null);
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (!loading) onOpenChange(next);
  };

  const handleCancel = () => onOpenChange(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setValidationError(null);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = roomPriceSchema.safeParse({
      pricePerNight: value.trim() === '' ? undefined : Number(value),
    });
    if (!parsed.success) {
      setValidationError(parsed.error.issues[0]?.message ?? 'Enter a valid price');
      return;
    }
    onSave(parsed.data.pricePerNight);
  };

  const unchanged = Number(value) === pricePerNight;

  return (
    <AdminDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Modify price per night"
      footer={
        <>
          <AdminButton variant="secondary" disabled={loading} onClick={handleCancel}>
            Cancel
          </AdminButton>
          <AdminButton type="submit" form={FORM_ID} disabled={unchanged} loading={loading}>
            Save price
          </AdminButton>
        </>
      }
    >
      <form id={FORM_ID} onSubmit={handleSubmit} noValidate>
        <VStack align="stretch" gap="14px">
          <TextInput
            name="pricePerNight"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            value={value}
            onChange={handleChange}
            disabled={loading}
            invalid={validationError !== null}
            error={validationError ?? undefined}
            autoFocus
          />
          <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgSubtle}>
            Applies to new bookings. Existing bookings keep the price they were made at.
          </Text>
          {error && (
            <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgError}>
              {error}
            </Text>
          )}
        </VStack>
      </form>
    </AdminDialog>
  );
};

export default RoomPriceDialog;
