import { Faq } from "@/features/landing/components/faq";
import { Hero } from "@/features/landing/components/hero";
import { PageShell } from "@/components/landing/layout/page-shell";
import { PlaceGallery } from "@/features/landing/components/place-gallery";
import { Rooms } from "@/features/landing/components/rooms";
import { ThePlace } from "@/features/landing/components/the-place";

/**
 * Landing page inside the shared `PageShell` (navbar + footer): a full-viewport
 * `Hero`, the story + gallery of `ThePlace`, the `Rooms` list, and the
 * `Faq` accordion. All copy lives in `@/config/content`.
 */
export default function Home() {
  return (
    <PageShell>
      <Hero />
      <ThePlace />
      <PlaceGallery />
      <Rooms />
      <Faq />
    </PageShell>
  );
}
