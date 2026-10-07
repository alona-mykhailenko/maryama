'use client';

import { chakra, VStack } from '@chakra-ui/react';
import { type ChangeEvent, type DragEvent, useState } from 'react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { UploadIcon } from '@/components/admin/icons/upload';
import { Text } from '@/components/ui/text';
import { ROOM_IMAGE_MAX_MB, ROOM_IMAGE_TYPES } from '@/features/rooms/image-rules';
import ADMIN from '@/theme/admin-tokens';
import type { DropZoneProps } from './props';

/** Dashed area that opens the file picker on click and accepts dropped files. */
export const DropZone = ({ onFiles, disabled = false }: DropZoneProps) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled) onFiles(Array.from(event.dataTransfer.files));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFiles(Array.from(event.target.files ?? []));
    // Let the same file be picked again after removing it.
    event.target.value = '';
  };

  return (
    <VStack
      asChild
      gap="10px"
      py="30px"
      px="20px"
      borderRadius={ADMIN.radius}
      border="1px dashed"
      borderColor={dragging ? COLORS.Border.Inverted : COLORS.Border.Emphasized}
      bg={dragging ? COLORS.Bg.Muted : COLORS.Bg.Subtle}
      color={COLORS.Text.FgMuted}
      cursor={disabled ? 'default' : 'pointer'}
      opacity={disabled ? 0.6 : 1}
      textAlign="center"
      _hover={disabled ? undefined : { bg: COLORS.Bg.Muted }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label>
        <UploadIcon size={22} />
        <Text font={FONTS.T2.T14px.Medium}>Click to choose photos or drag them here</Text>
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgSubtle}>
          JPG, PNG or WebP · up to {ROOM_IMAGE_MAX_MB} MB each
        </Text>
        <chakra.input
          type="file"
          multiple
          accept={ROOM_IMAGE_TYPES.join(',')}
          disabled={disabled}
          display="none"
          onChange={handleChange}
        />
      </label>
    </VStack>
  );
};

export default DropZone;
