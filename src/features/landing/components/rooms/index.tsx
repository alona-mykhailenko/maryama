import { Box, Grid } from "@chakra-ui/react";
import { ROOMS } from "@/config/content";
import { SectionContainer } from "@/components/landing/ui/section-container";
import { SectionLabel } from "@/components/landing/ui/section-label";
import LANDING from "@/theme/landing-tokens";
import { RoomCard } from "./room-card";
import type { RoomsProps } from "./props";

/** Landing "Rooms" section: one full-height photo panel per room, loaded by the page. */
export const Rooms = ({ rooms }: RoomsProps) => {
  return (
    <Box as="section" id="rooms" pt={LANDING.space.section}>
      <SectionContainer mb={LANDING.space.label}>
        <SectionLabel>{ROOMS.label}</SectionLabel>
      </SectionContainer>

      {/* Edge-to-edge panels: stacked on phones, one equal column per room above. */}
      <Grid
        templateColumns="1fr"
        gridAutoFlow={{ base: "row", md: "column" }}
        gridAutoColumns={{ md: "1fr" }}
        gap="0"
      >
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </Grid>
    </Box>
  );
};

export default Rooms;
