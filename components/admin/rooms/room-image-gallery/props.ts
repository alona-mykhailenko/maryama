import type { RoomImage } from '@/services/types/room';

export interface RoomImageGalleryProps {
  images: RoomImage[];
  roomName: string;
  /** Opens the upload window from the "+" tile. */
  onAdd: () => void;
  /** Asks to delete a photo (the caller confirms first). */
  onDelete: (image: RoomImage) => void;
}
