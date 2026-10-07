/** A room as returned by `GET /api/rooms`. */
export interface RoomImage {
  id: number;
  url: string;
  position: number;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  createdAt: string;
  images: RoomImage[];
}
