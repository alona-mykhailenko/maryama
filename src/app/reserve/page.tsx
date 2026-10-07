import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import { AvailabilityForm } from "@/features/availability/components/availability-form";
import { RESERVE } from "@/components/landing/content";
import { PageShell } from "@/components/landing/layout/page-shell";
import { SectionContainer } from "@/components/landing/ui/section-container";
import LANDING from "@/theme/landing-tokens";

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
          <AvailabilityForm />
        </Box>
      </SectionContainer>
    </PageShell>
  );
}
