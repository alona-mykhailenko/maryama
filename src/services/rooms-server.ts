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

/** One room with its images, or `null`. Cached per request (metadata + page). */
export const getPublicRoom = cache(async (id: number) => {
  return prisma.room.findUnique({ where: { id }, select: publicRoomSelect });
});
