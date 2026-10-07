import { Box, VStack } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY } from "@/config/content";
import { AvailableRoom } from "./available-room";
import type { AvailabilityState, RoomResultsProps } from "./props";

const MESSAGES: Record<Exclude<AvailabilityState["kind"], "ready" | "idle">, string> = {
  loading: AVAILABILITY.loading,
  error: AVAILABILITY.error,
};

/**
 * Below the "Check availability" button: nothing until a stay is checked, then
 * the rooms free for the whole stay, or a "no rooms" note when none are.
 */
export const RoomResults = ({ state }: RoomResultsProps) => {
  if (state.kind === "idle") return null;

  if (state.kind !== "ready") {
    return (
      <Box maxW="52ch" opacity={0.65} aria-live="polite">
        <Text font={FONTS.T1.T13px.Light} color={state.kind === "error" ? COLORS.Text.FgError : undefined}>
          {MESSAGES[state.kind]}
        </Text>
      </Box>
    );
  }

  if (state.rooms.length === 0) {
    return (
      <VStack align="stretch" gap="8px" py="24px" borderY="1px solid" borderColor={COLORS.Earth.Tan} aria-live="polite">
        <Box letterSpacing=".24em" textTransform="uppercase">
          <Text font={FONTS.T1.T12px.Regular}>{AVAILABILITY.noneTitle}</Text>
        </Box>
        <Box maxW="52ch" opacity={0.65}>
          <Text font={FONTS.T1.T13px.Light}>{AVAILABILITY.noneNote}</Text>
        </Box>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap="0" aria-live="polite">
      <Box
        pb="12px"
        borderBottom="1px solid"
        borderColor={COLORS.Earth.Tan}
        letterSpacing=".34em"
        textTransform="uppercase"
      >
        <Box opacity={0.5}>
          <Text font={FONTS.T1.T9px.Regular}>{AVAILABILITY.availableTitle(state.rooms.length)}</Text>
        </Box>
      </Box>
      {state.rooms.map((room) => (
        <AvailableRoom key={room.id} room={room} nights={state.nights} />
      ))}
    </VStack>
  );
};

export default RoomResults;
