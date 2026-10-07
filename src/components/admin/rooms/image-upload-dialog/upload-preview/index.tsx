import { Box, IconButton, Image } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import { XIcon } from '@/components/admin/icons/x';
import type { UploadPreviewProps } from './props';

/** Thumbnail of a selected file with a cross to take it out of the selection. */
export const UploadPreview = ({ file, url, onRemove, disabled = false }: UploadPreviewProps) => {
  const handleRemove = () => onRemove(url);

  return (
    <Box position="relative" h="84px" borderRadius="10px" overflow="hidden" bg={COLORS.Bg.Muted}>
      <Image src={url} alt={file.name} w="100%" h="100%" objectFit="cover" display="block" />
      <IconButton
        aria-label={`Remove ${file.name}`}
        position="absolute"
        top="5px"
        right="5px"
        size="2xs"
        minW="22px"
        h="22px"
        borderRadius="full"
        bg="rgba(18, 18, 18, 0.6)"
        color={COLORS.Text.FgContrast}
        disabled={disabled}
        onClick={handleRemove}
        _hover={{ bg: 'rgba(18, 18, 18, 0.8)' }}
      >
        <XIcon size={12} />
      </IconButton>
    </Box>
  );
};

export default UploadPreview;
