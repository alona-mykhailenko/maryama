import { VStack } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import { PlusIcon } from '@/components/admin/icons/plus';
import ADMIN from '../../../tokens';
import type { AddImageTileProps } from './props';

/** Dashed "+" tile after the last photo; opens the upload window. */
export const AddImageTile = ({ onClick }: AddImageTileProps) => {
  return (
    <VStack
      as="button"
      aria-label="Add photos"
      justify="center"
      w="140px"
      h={ADMIN.galleryPhotoMaxH}
      flexShrink={0}
      borderRadius="12px"
      border="1px dashed"
      borderColor={COLORS.Border.Emphasized}
      bg={COLORS.Bg.Subtle}
      color={COLORS.Text.FgMuted}
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: COLORS.Bg.Muted, color: COLORS.Text.Fg, borderColor: COLORS.Border.Inverted }}
    >
      <PlusIcon size={22} />
    </VStack>
  );
};

export default AddImageTile;
