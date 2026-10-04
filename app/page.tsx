import { Box } from "@chakra-ui/react";
import { montserrat } from "@/assets/fonts";
import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { PlaceGallery } from "@/components/landing/place-gallery";
import { Rooms } from "@/components/landing/rooms";
import { SiteFooter } from "@/components/landing/site-footer";
import { ThePlace } from "@/components/landing/the-place";
import LANDING from "@/components/landing/tokens";

/**
 * Landing page: fixed scroll-aware `Navbar`, a full-viewport `Hero`, the story
 * + gallery of `ThePlace`, the `Rooms` list, the `Faq` accordion and the dark
 * `SiteFooter`. All copy lives in `@/components/landing/content`.
 */
export default function Home() {
  return (
    <Box
      className={montserrat.className}
      bg={LANDING.cream}
      color={LANDING.ink}
      fontFamily="'Montserrat', system-ui, sans-serif"
    >
      <Navbar />
      <Box as="main">
        <Hero />
        <ThePlace />
        <PlaceGallery />
        <Rooms />
        <Faq />
      </Box>
      <SiteFooter />
    </Box>
  );
}
