import { Box, VStack } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { HERO } from "@/config/content";
import { ImageSlot } from "@/components/landing/ui/image-slot";
import LANDING from "@/theme/landing-tokens";

/**
 * Full-viewport opening section: hero photograph, a dark top-to-bottom
 * gradient scrim, the centred kicker + "Welcome home" wordmark, and the
 * location caption pinned bottom-left. The whole block fades and rises in
 * once (`mrise`, defined in globals.css).
 */
export const Hero = () => {
  return (
    <Box
      as="section"
      id="top"
      position="relative"
      h="100vh"
      minH="640px"
      overflow="hidden"
      bg={LANDING.ink}
    >
      <ImageSlot
        id={HERO.slotId}
        src={HERO.slotSrc}
        alt={HERO.slotAlt}
        placeholder={HERO.slotPlaceholder}
        position="absolute"
        inset="0"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="140px"
        pointerEvents="none"
        background="linear-gradient(180deg, rgba(18,18,18,.5) 0%, rgba(18,18,18,0) 100%)"
      />

      <VStack
        position="absolute"
        inset="0"
        justify="center"
        gap="0"
        px={LANDING.gutter}
        textAlign="center"
        pointerEvents="none"
        background="linear-gradient(180deg, rgba(18,18,18,.22) 0%, rgba(18,18,18,0) 40%, rgba(18,18,18,.3) 100%)"
        animation="mrise 1.2s ease both"
      >
        <VStack gap="44px" transform="translateY(9vh)">
          <Box maxW="1000px" letterSpacing=".34em" textTransform="uppercase">
            <Text font={FONTS.T1.T12px.Light} color={COLORS.Text.FgInverted}>
              {HERO.kicker}
            </Text>
          </Box>
          <Box letterSpacing=".28em" textTransform="uppercase">
            <Text
              font={FONTS.T1.T30px.ExtraLight}
              color={COLORS.Text.FgInverted}
            >
              {HERO.title}
            </Text>
          </Box>
        </VStack>
      </VStack>

      <Box
        position="absolute"
        bottom={LANDING.gutter}
        left={LANDING.gutter}
        letterSpacing=".3em"
        textTransform="uppercase"
        pointerEvents="none"
      >
        <Text font={FONTS.T1.T9px.Light} color={COLORS.Text.FgInverted}>
          {HERO.location}
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;
