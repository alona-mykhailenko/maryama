import { Box, VStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { PLACE } from "@/config/content";
import { SplitSection } from "@/components/site/ui/split-section";
import LANDING from "@/theme/landing-tokens";

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
