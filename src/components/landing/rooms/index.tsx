"use client";

import { Box, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getRooms, roomsQueryKey } from "@/services/rooms";
import { ROOMS } from "@/components/landing/content";
import { SectionContainer } from "@/components/landing/section-container";
import { SectionLabel } from "@/components/landing/section-label";
import LANDING from "@/theme/landing-tokens";
import { RoomCard } from "./room-card";

export const Rooms = () => {
  // Shared with the availability search, so the rooms are fetched once.
  const { data: rooms = [] } = useQuery({ queryKey: roomsQueryKey, queryFn: getRooms });

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
