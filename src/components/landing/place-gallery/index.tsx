import { Box, Grid } from "@chakra-ui/react";
import { PLACE_GALLERY } from "@/components/landing/content";
import { ImageSlot } from "@/components/landing/image-slot";
import { SectionContainer } from "@/components/landing/section-container";
import LANDING from "@/theme/landing-tokens";

/**
 * The portrait triptych under "The Place": three vertical photos side by side,
 * the middle one set lower. Stacks into a single column on phones.
 */
export const PlaceGallery = () => {
  const middle = Math.floor(PLACE_GALLERY.images.length / 2);

  return (
    <SectionContainer as="section" pt={LANDING.space.related}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={LANDING.space.gallery}
        alignItems="start"
      >
        {PLACE_GALLERY.images.map((image, index) => (
          // The middle photo sits lower than its neighbours for a staggered rhythm.
          <Box
            key={image.id}
            mt={index === middle ? { base: "0", md: "96px" } : "0"}
          >
            <ImageSlot
              id={image.id}
              src={image.src}
              alt={image.alt}
              ratio={PLACE_GALLERY.ratio}
              placeholder={image.placeholder}
            />
          </Box>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default PlaceGallery;
