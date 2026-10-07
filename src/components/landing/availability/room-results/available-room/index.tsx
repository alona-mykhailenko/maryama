import { Box, HStack, VStack } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY, ROOMS } from "@/components/landing/content";
import { ImageSlot } from "@/components/landing/ui/image-slot";
import type { AvailableRoomProps } from "./props";

/**
 * A free room for the chosen stay: small photo, tracked name, capacity, and the
 * nightly rate with the stay total.
 */
export const AvailableRoom = ({ room, nights }: AvailableRoomProps) => {
  return (
    <HStack
      align="center"
      gap={{ base: "16px", md: "24px" }}
      py="20px"
      borderBottom="1px solid"
      borderColor={COLORS.Earth.Tan}
    >
      <Box flex="none" w={{ base: "72px", md: "96px" }}>
        <ImageSlot
          ratio={4 / 3}
          src={room.images[0]?.url}
          alt=""
          id={`mry-availability-room-${room.id}`}
          placeholder={ROOMS.photoPlaceholder(room.name)}
        />
      </Box>
      <VStack align="stretch" gap="2px" flex="1" minW="0">
        <Box letterSpacing=".3em" textTransform="uppercase">
          <Text font={FONTS.T1.T13px.Regular}>{room.name}</Text>
        </Box>
        <Box opacity={0.6}>
          <Text font={FONTS.T1.T12px.Light}>{AVAILABILITY.guests(room.capacity)}</Text>
        </Box>
      </VStack>
      <VStack align="end" gap="2px" flex="none" textAlign="right">
        <Text font={FONTS.T1.T13px.Regular}>{AVAILABILITY.total(room.pricePerNight * nights)}</Text>
        <Box opacity={0.6}>
          <Text font={FONTS.T1.T12px.Light}>{AVAILABILITY.perNight(room.pricePerNight)}</Text>
        </Box>
      </VStack>
    </HStack>
  );
};

export default AvailableRoom;
