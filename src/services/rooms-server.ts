import "server-only";
import { cache } from "react";
import prisma from "@/lib/prisma";

/** Public room fields only, never bookings or guest data. */
const publicRoomSelect = {
  id: true,
  name: true,
  description: true,
  pricePerNight: true,
  capacity: true,
  images: {
    orderBy: { position: "asc" },
    select: { id: true, url: true, position: true },
  },
} as const;

/** Room id from a URL segment, or `null` when it isn't a positive integer. */
export const parseRoomId = (id: string) => {
  const roomId = Number(id);
  return Number.isInteger(roomId) && roomId > 0 ? roomId : null;
};

/** Every room with its images, oldest first (the landing's room panels). */
export const getPublicRooms = cache(async () => {
  return prisma.room.findMany({ orderBy: { id: "asc" }, select: publicRoomSelect });
});

/** One room with its images, or `null`. Cached per request (metadata + page). */
export const getPublicRoom = cache(async (id: number) => {
  return prisma.room.findUnique({ where: { id }, select: publicRoomSelect });
});
