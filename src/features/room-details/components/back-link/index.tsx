import { HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { ROOM_DETAILS } from "@/config/content";
import { ChevronLeftIcon } from "@/components/landing/icons/chevron-left";

/** Small tracked "‹ All rooms" link back to the landing rooms section. */
export const BackLink = () => {
  return (
    <HStack
      asChild
      gap="6px"
      letterSpacing=".3em"
      textTransform="uppercase"
      transition="opacity .2s ease"
      opacity={0.6}
      _hover={{ opacity: 1 }}
    >
      <NextLink href={ROOM_DETAILS.backHref}>
        <ChevronLeftIcon />
        <Text font={FONTS.T1.T9px.Light}>
          {ROOM_DETAILS.back}
        </Text>
      </NextLink>
    </HStack>
  );
};

export default BackLink;
