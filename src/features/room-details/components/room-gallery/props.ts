import type { RoomImage } from "@/features/rooms/types";

export interface RoomGalleryProps {
  roomName: string;
  /** Photos after the hero one. */
  images: RoomImage[];
  /** Index of the first photo in the room's full list, for alt text. */
  startIndex: number;
}
