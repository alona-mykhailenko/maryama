"use client";

import { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import type { Room } from "@/services/types/room";
import { ROOMS } from "../content";
import { SectionContainer } from "../section-container";
import { SectionLabel } from "../section-label";
import LANDING from "../tokens";
import { RoomCard } from "./room-card";

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => (res.ok ? res.json() : []))
      .then(setRooms)
      .catch(() => setRooms([]));
  }, []);

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
