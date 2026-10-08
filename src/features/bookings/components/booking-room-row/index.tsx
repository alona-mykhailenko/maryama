import { Box, HStack, VStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY } from "@/config/content";
import { ImageSlot } from "@/components/site/ui/image-slot";
import type { BookingRoomRowProps } from "./props";

/**
 * The room being booked, as one line at the top of the booking page: a small
 * portrait photo, the tracked room name with its capacity, and the nightly rate.
 */
export const BookingRoomRow = ({ room }: BookingRoomRowProps) => {
  return (
    <HStack
      align="center"
      gap={{ base: "16px", md: "24px" }}
    >
      <Box flex="none" w={{ base: "56px", md: "64px" }}>
        <ImageSlot
          ratio={2 / 3}
          src={room.images[0]?.url}
          alt=""
          id={`mry-booking-room-${room.id}`}
          placeholder=""
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
    </HStack>
  );
};

export default BookingRoomRow;
