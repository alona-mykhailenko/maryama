import { Faq } from "@/features/landing/components/faq";
import { Hero } from "@/features/landing/components/hero";
import { PageShell } from "@/components/site/layout/page-shell";
import { PlaceGallery } from "@/features/landing/components/place-gallery";
import { Rooms } from "@/features/landing/components/rooms";
import { ThePlace } from "@/features/landing/components/the-place";
import { getPublicRooms } from "@/services/rooms-server";

/**
 * Landing page inside the shared `PageShell` (navbar + footer): a full-viewport
 * `Hero`, the story + gallery of `ThePlace`, the `Rooms` list (loaded here,
 * on the server), and the
 * `Faq` accordion. All copy lives in `@/config/content`.
 */
export default async function Home() {
  const rooms = await getPublicRooms();

  return (
    <PageShell>
      <Hero />
      <ThePlace />
      <PlaceGallery />
      <Rooms rooms={rooms} />
      <Faq />
    </PageShell>
  );
}
