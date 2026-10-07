import { Box } from "@chakra-ui/react";
import { montserrat } from "@/theme/fonts";
import { Navbar } from "@/components/landing/navbar";
import { RESERVE_BAR_HEIGHT } from "@/components/landing/navbar/reserve-bar";
import { SiteFooter } from "@/components/landing/site-footer";
import LANDING from "@/theme/landing-tokens";
import type { PageShellProps } from "./props";

/**
 * Frame shared by the public pages: Montserrat on the cream ground, the fixed
 * `Navbar`, the page's `main` content and the dark `SiteFooter`. On phones it
 * pads the bottom so the pinned "Reserve" bar never hides the footer.
 */
export const PageShell = ({ showReserve = true, children }: PageShellProps) => {
  return (
    <Box
      className={montserrat.className}
      bg={LANDING.cream}
      color={LANDING.ink}
      fontFamily="'Montserrat', system-ui, sans-serif"
      pb={showReserve ? { base: RESERVE_BAR_HEIGHT, md: "0" } : undefined}
    >
      <Navbar showReserve={showReserve} />
      <Box as="main">{children}</Box>
      <SiteFooter />
    </Box>
  );
};

export default PageShell;
