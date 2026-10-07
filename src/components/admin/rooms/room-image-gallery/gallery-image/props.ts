import type { RoomImage } from '@/services/types/room';

export interface GalleryImageProps {
  image: RoomImage;
  alt: string;
  /** Shows the delete cross in the top-right corner when set. */
  onDelete?: (image: RoomImage) => void;
}
