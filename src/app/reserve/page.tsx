import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import { RESERVE } from "@/config/content";
import { PageShell } from "@/components/site/layout/page-shell";
import { SectionContainer } from "@/components/site/ui/section-container";
import LANDING from "@/theme/landing-tokens";
import { ReserveSearch } from "@/features/availability/components/reserve-search";

export const metadata: Metadata = {
  title: RESERVE.pageTitle,
};

/**
 * Reserve page, reached from the "Reserve" call to action: the availability
 * search, centred on the page and clear of the fixed header.
 */
export default function Reserve() {
  return (
    <PageShell showReserve={false}>
      <SectionContainer as="section" id="reserve" pt={{ base: "112px", md: "144px" }} pb={LANDING.space.section}>
        <Box maxW="960px" mx="auto">
          <ReserveSearch />
        </Box>
      </SectionContainer>
    </PageShell>
  );
}
