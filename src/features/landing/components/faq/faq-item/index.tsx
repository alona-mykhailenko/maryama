import { Box, HStack } from "@chakra-ui/react";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import LANDING from "@/theme/landing-tokens";
import { ToggleIcon } from "@/features/landing/components/faq/toggle-icon";
import type { FaqItemProps } from "./props";

/**
 * A single FAQ row: a clickable question line with the rotating toggle mark
 */
export const FaqItem = ({
  question,
  answer,
  index,
  isOpen,
  isLast,
  onToggle,
}: FaqItemProps) => {
  const handleToggle = () => onToggle(index);

  return (
    <Box
      borderTop="1px solid"
      borderColor={LANDING.hairline}
      borderBottom={isLast ? "1px solid" : undefined}
      borderBottomColor={isLast ? LANDING.hairline : undefined}
    >
      <HStack
        justify="space-between"
        gap="24px"
        py="24px"
        cursor="pointer"
        userSelect="none"
        _hover={{ opacity: 0.6 }}
        onClick={handleToggle}
      >
        <Box letterSpacing=".1em" textTransform="uppercase">
          <Text font={FONTS.T1.T14px.Regular}>
            {question}
          </Text>
        </Box>
        <ToggleIcon isOpen={isOpen} />
      </HStack>

      {/* Animating the grid row 0fr → 1fr tweens the answer's real height, so
          opening and closing move at the same pace whatever the answer length. */}
      <Box
        display="grid"
        gridTemplateRows={isOpen ? "1fr" : "0fr"}
        opacity={isOpen ? 1 : 0}
        transition="grid-template-rows .5s cubic-bezier(.4, 0, .2, 1), opacity .4s ease"
      >
        <Box overflow="hidden" minH="0">
          <Box pb="32px" maxW="52ch">
            <Text font={FONTS.T1.T14px.Light}>
              {answer}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FaqItem;
