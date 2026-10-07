import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { PageShell } from "@/components/landing/page-shell";
import { PlaceGallery } from "@/components/landing/place-gallery";
import { Rooms } from "@/components/landing/rooms";
import { ThePlace } from "@/components/landing/the-place";

/**
 * Landing page inside the shared `PageShell` (navbar + footer): a full-viewport
 * `Hero`, the story + gallery of `ThePlace`, the `Rooms` list, and the
 * `Faq` accordion. All copy lives in `@/components/landing/content`.
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
