import { Box, Grid, VStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY, ROOM_DETAILS, ROOMS } from "@/config/content";
import { ImageSlot } from "@/components/site/ui/image-slot";
import { SectionContainer } from "@/components/site/ui/section-container";
import { SectionLabel } from "@/components/site/ui/section-label";
import LANDING from "@/theme/landing-tokens";
import { BackLink } from "../back-link";
import { ReserveCard } from "../reserve-card";
import { RoomFact } from "./room-fact";
import type { RoomOverviewProps } from "./props";

/** Splits the stored description into paragraphs on line breaks. */
const toParagraphs = (description: string) =>
  description
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

/**
 * Top of a room page, below the solid navbar: the room's first photo in
 * portrait beside its name, description, key facts and the `ReserveCard`
 * (the only client part). Server component.
 * The photo stacks above the text on phones.
 */
export const RoomOverview = ({ room }: RoomOverviewProps) => {
  return (
    <SectionContainer as="section" id="room" pt={{ base: "112px", md: "144px" }}>
      <BackLink />
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={LANDING.space.columns}
        alignItems="center"
        mt={LANDING.space.label}
      >
        <ImageSlot
          id={`mry-room-photo-${room.id}`}
          src={room.images[0]?.url}
          alt={ROOM_DETAILS.photoAlt(room.name, 0)}
          ratio={2 / 3}
          placeholder={ROOMS.photoPlaceholder(room.name)}
        />

        <VStack align="stretch" gap={{ base: "32px", md: "40px" }}>
          <VStack align="stretch" gap={LANDING.space.label}>
            <Box as="h1" letterSpacing=".06em">
              <Text font={FONTS.T1.T40px.ExtraLight}>{room.name}</Text>
            </Box>
          </VStack>

          <VStack align="stretch" gap={LANDING.space.stack}>
            {toParagraphs(room.description).map((paragraph) => (
              <Box key={paragraph} maxW="52ch" letterSpacing=".02em">
                <Text font={FONTS.T1.T14px.Light}>{paragraph}</Text>
              </Box>
            ))}
          </VStack>

          <Box as="dl">
            <RoomFact label={ROOM_DETAILS.guestsLabel} value={AVAILABILITY.guests(room.capacity)} />
            <RoomFact label={ROOM_DETAILS.rateLabel} value={AVAILABILITY.perNight(room.pricePerNight)} />
          </Box>

          <ReserveCard room={{ id: room.id, capacity: room.capacity, pricePerNight: room.pricePerNight }} />
        </VStack>
      </Grid>
    </SectionContainer>
  );
};

export default RoomOverview;
