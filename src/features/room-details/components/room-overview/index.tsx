import { Box, Grid, VStack } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY, ROOM_DETAILS, ROOMS } from "@/config/content";
import { ImageSlot } from "@/components/landing/ui/image-slot";
import { SectionContainer } from "@/components/landing/ui/section-container";
import { SectionLabel } from "@/components/landing/ui/section-label";
import LANDING from "@/theme/landing-tokens";
import { BackLink } from "../back-link";
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
 * portrait beside its name, description, key facts and the book button.
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

          {/* Booking isn't wired up yet: the button does nothing for now. */}
          <Box
            asChild
            alignSelf="start"
            px="28px"
            py="14px"
            bg={LANDING.ink}
            letterSpacing=".28em"
            textTransform="uppercase"
            cursor="pointer"
            transition="opacity .2s ease"
            _hover={{ opacity: 0.75 }}
          >
            <button type="button">
              <Text font={FONTS.T1.T10px.Regular} color={COLORS.Text.FgInverted}>
                {ROOM_DETAILS.book}
              </Text>
            </button>
          </Box>
        </VStack>
      </Grid>
    </SectionContainer>
  );
};

export default RoomOverview;
