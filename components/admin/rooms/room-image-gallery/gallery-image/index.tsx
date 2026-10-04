import { Box, IconButton, Image } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import { XIcon } from '@/components/admin/icons/x';
import ADMIN from '../../../tokens';
import type { GalleryImageProps } from './props';

/**
 * A photo in its real proportions — never cropped or enlarged, only scaled
 * down to fit `ADMIN.galleryPhotoMaxH` and the available width — with an
 * optional delete cross.
 */
export const GalleryImage = ({ image, alt, onDelete }: GalleryImageProps) => {
  const handleDelete = () => onDelete?.(image);

  return (
    <Box position="relative" w="fit-content" maxW="100%" borderRadius="12px" overflow="hidden" bg={COLORS.Bg.Muted}>
      <Image src={image.url} alt={alt} maxW="100%" maxH={ADMIN.galleryPhotoMaxH} w="auto" h="auto" display="block" />
      {onDelete && (
        <IconButton
          aria-label="Delete photo"
          position="absolute"
          top="8px"
          right="8px"
          size="xs"
          minW="28px"
          h="28px"
          borderRadius="full"
          bg="rgba(18, 18, 18, 0.55)"
          color={COLORS.Text.FgContrast}
          onClick={handleDelete}
          _hover={{ bg: 'rgba(18, 18, 18, 0.8)' }}
        >
          <XIcon size={14} />
        </IconButton>
      )}
    </Box>
  );
};

export default GalleryImage;
