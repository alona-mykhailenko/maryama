import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { PageShell } from "@/components/site/layout/page-shell";
import { RoomGallery } from "@/features/room-details/components/room-gallery";
import { RoomOverview } from "@/features/room-details/components/room-overview";
import { getPublicRoom, parseRoomId } from "@/services/rooms-server";
import LANDING from "@/theme/landing-tokens";

export async function generateMetadata(props: PageProps<"/rooms/[id]">): Promise<Metadata> {
  const roomId = parseRoomId((await props.params).id);
  const room = roomId ? await getPublicRoom(roomId) : null;
  if (!room) return {};

  return {
    title: room.name,
    description: room.description.slice(0, 160),
  };
}

/**
 * Public room page, reached from a room panel: the first photo beside the
 * room's story, facts and reserve card, then the rest of its photos. Loads the
 * room straight from the database (`getPublicRoom` is cached, so metadata and
 * page share one query). Invalid or unknown ids get the 404 page; a database
 * error goes to the error page instead.
 */
export default async function RoomPage(props: PageProps<"/rooms/[id]">) {
  const roomId = parseRoomId((await props.params).id);
  if (!roomId) notFound();

  const room = await getPublicRoom(roomId);
  if (!room) notFound();

  const galleryImages = room.images.slice(1);

  return (
    <PageShell>
      {/* The last section before the footer pads its bottom too. */}
      <Box pb={LANDING.space.section}>
        <RoomOverview room={room} />
        {galleryImages.length > 0 && (
          <RoomGallery roomName={room.name} images={galleryImages} startIndex={1} />
        )}
      </Box>
    </PageShell>
  );
}
