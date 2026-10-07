import { Box, VStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY } from "@/config/content";
import { SplitSection } from "@/components/landing/ui/split-section";
import LANDING from "@/theme/landing-tokens";
import type { AvailabilityProps } from "./props";

/**
 * Landing "Availability" section: the heading and a short note on the left,
 * `children` on the right (the page's `AvailabilityForm`: dates, guests,
 * check button, results).
 */
export const Availability = ({ id, label, pt, pb, children }: AvailabilityProps) => {
  return (
    <SplitSection
      id={id}
      pt={pt}
      pb={pb}
      label={label}
      aside={
        <VStack align="stretch" gap={LANDING.space.stack}>
          <Box letterSpacing=".06em">
            <Text font={FONTS.T1.T34px.ExtraLight}>{AVAILABILITY.heading}</Text>
          </Box>
          <Box maxW="30ch" opacity={0.65}>
            <Text font={FONTS.T1.T13px.Light}>{AVAILABILITY.note}</Text>
          </Box>
        </VStack>
      }
    >
      {children}
    </SplitSection>
  );
};

export default Availability;
