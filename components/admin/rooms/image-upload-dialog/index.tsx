'use client';

import { Grid, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { AdminButton } from '@/components/admin/ui/admin-button';
import { AdminDialog } from '@/components/admin/ui/admin-dialog';
import { Text } from '@/components/core/text';
import { ROOM_IMAGE_MAX_BYTES, ROOM_IMAGE_MAX_MB, ROOM_IMAGE_TYPES } from '@/lib/room-images';
import { DropZone } from './drop-zone';
import type { ImageUploadDialogProps } from './props';
import { UploadPreview } from './upload-preview';

interface Selected {
  file: File;
  url: string;
}

/**
 * Upload window for room photos: pick or drop files, review thumbnails, remove
 * any by mistake, then upload them all at once. Wrong types and oversized files
 * are rejected with a message before anything is sent.
 */
export const ImageUploadDialog = ({
  open,
  onOpenChange,
  onUpload,
  loading = false,
  error,
}: ImageUploadDialogProps) => {
  const [selected, setSelected] = useState<Selected[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  // Start empty every time the window opens.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setSelected([]);
      setRejected([]);
    }
  }

  // Free preview object URLs once their file leaves the selection, and on unmount.
  const previous = useRef<Selected[]>([]);
  useEffect(() => {
    for (const s of previous.current) {
      if (!selected.includes(s)) URL.revokeObjectURL(s.url);
    }
    previous.current = selected;
  }, [selected]);
  useEffect(() => () => previous.current.forEach((s) => URL.revokeObjectURL(s.url)), []);

  const addFiles = (files: File[]) => {
    const accepted = files.filter(
      (f) => ROOM_IMAGE_TYPES.includes(f.type) && f.size <= ROOM_IMAGE_MAX_BYTES,
    );
    setRejected(files.filter((f) => !accepted.includes(f)).map((f) => f.name));
    setSelected((current) => [
      ...current,
      ...accepted.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
  };

  const handleRemove = (url: string) =>
    setSelected((current) => current.filter((s) => s.url !== url));

  const handleOpenChange = (next: boolean) => {
    if (!loading) onOpenChange(next);
  };

  const handleCancel = () => onOpenChange(false);

  const handleUpload = () => onUpload(selected.map((s) => s.file));

  const count = selected.length;

  return (
    <AdminDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Add photos"
      maxW="560px"
      footer={
        <>
          <AdminButton variant="secondary" disabled={loading} onClick={handleCancel}>
            Cancel
          </AdminButton>
          <AdminButton
            disabled={count === 0}
            loading={loading}
            onClick={handleUpload}
          >
            {count > 1 ? `Upload ${count} photos` : 'Upload photo'}
          </AdminButton>
        </>
      }
    >
      <VStack align="stretch" gap="16px">
        <DropZone onFiles={addFiles} disabled={loading} />

        {count > 0 && (
          <Grid templateColumns="repeat(auto-fill, minmax(96px, 1fr))" gap="10px">
            {selected.map((s) => (
              <UploadPreview
                key={s.url}
                file={s.file}
                url={s.url}
                disabled={loading}
                onRemove={handleRemove}
              />
            ))}
          </Grid>
        )}

        {rejected.length > 0 && (
          <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgError}>
            Skipped {rejected.join(', ')}: only JPG, PNG or WebP up to {ROOM_IMAGE_MAX_MB} MB.
          </Text>
        )}
        {error && (
          <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgError}>
            {error}
          </Text>
        )}
      </VStack>
    </AdminDialog>
  );
};

export default ImageUploadDialog;
