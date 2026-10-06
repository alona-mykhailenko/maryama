import { Box, VStack } from "@chakra-ui/react";
import FONTS from "@/assets/fonts";
import { Text } from "@/components/core/text";
import { PLACE } from "../content";
import { SplitSection } from "../split-section";
import LANDING from "../tokens";

/**
 * "01 — The Place": a narrow eyebrow + heading column beside a wider column of
 * three body paragraphs telling the house's story.
 */
export const ThePlace = () => {
  return (
    <SplitSection
      id="place"
      pt={LANDING.space.section}
      label={PLACE.label}
      aside={
        <Box letterSpacing=".06em">
          <Text font={FONTS.T1.T40px.ExtraLight}>{PLACE.heading}</Text>
        </Box>
      }
    >
      <VStack align="stretch" gap={LANDING.space.stack} pt="6px">
        {PLACE.paragraphs.map((paragraph) => (
          <Box key={paragraph} maxW="52ch" letterSpacing=".02em">
            <Text font={FONTS.T1.T14px.Light}>{paragraph}</Text>
          </Box>
        ))}
      </VStack>
    </SplitSection>
  );
};

export default ThePlace;
