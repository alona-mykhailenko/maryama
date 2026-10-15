import { HStack } from '@chakra-ui/react';
import { AddImageTile } from './add-image-tile';
import { GalleryImage } from './gallery-image';
import type { RoomImageGalleryProps } from './props';

/**
 * Every room photo at its real size, in upload order, wrapping onto new lines
 * as needed, closed by a "+" tile. Each photo carries a delete cross.
 */
export const RoomImageGallery = ({ images, roomName, onAdd, onDelete }: RoomImageGalleryProps) => {
  return (
    <HStack align="flex-start" gap="12px" flexWrap="wrap" minW="0">
      {images.map((image, index) => (
        <GalleryImage
          key={image.id}
          image={image}
          alt={index === 0 ? roomName : `${roomName} — photo ${index + 1}`}
          onDelete={onDelete}
        />
      ))}
      <AddImageTile onClick={onAdd} />
    </HStack>
  );
};

export default RoomImageGallery;
