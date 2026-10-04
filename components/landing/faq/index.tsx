import { Box, VStack } from "@chakra-ui/react";
import FONTS from "@/assets/fonts";
import { Text } from "@/components/core/text";
import { FAQ } from "../content";
import { SplitSection } from "../split-section";
import { FaqList } from "./faq-list";

export const Faq = () => {
  return (
    <SplitSection
      id="faq"
      pt="100px"
      pb="130px"
      label={FAQ.label}
      aside={
        <VStack align="stretch" gap="26px">
          <Box letterSpacing=".06em">
            <Text font={FONTS.T1.T34px.ExtraLight}>
              {FAQ.heading}
            </Text>
          </Box>
          <Box maxW="26ch" opacity={0.65}>
            <Text font={FONTS.T1.T13px.Light}>
              {FAQ.note}
            </Text>
          </Box>
        </VStack>
      }
    >
      <FaqList items={FAQ.items} />
    </SplitSection>
  );
};

export default Faq;
