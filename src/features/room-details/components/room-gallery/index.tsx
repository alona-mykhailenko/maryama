import { Grid } from "@chakra-ui/react";
import { ROOM_DETAILS, ROOMS } from "@/config/content";
import { ImageSlot } from "@/components/site/ui/image-slot";
import { SectionContainer } from "@/components/site/ui/section-container";
import LANDING from "@/theme/landing-tokens";
import type { RoomGalleryProps } from "./props";

/**
 * The room's remaining photos as portrait tiles, three per row (two on
 * tablets, one on phones).
 */
export const RoomGallery = ({ roomName, images, startIndex }: RoomGalleryProps) => {
  return (
    <SectionContainer as="section" pt={LANDING.space.related}>
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={LANDING.space.gallery}
      >
        {images.map((image, index) => (
          <ImageSlot
            key={image.id}
            id={`mry-room-photo-${image.id}`}
            src={image.url}
            alt={ROOM_DETAILS.photoAlt(roomName, startIndex + index)}
            ratio={2 / 3}
            placeholder={ROOMS.photoPlaceholder(roomName)}
          />
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default RoomGallery;
