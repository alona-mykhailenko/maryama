"use client";

import { useEffect, useState } from "react";
import { HStack, Link } from "@chakra-ui/react";
import { NAV_LINKS } from "@/components/landing/content";
import LANDING from "@/theme/landing-tokens";
import type { NavbarProps } from "./props";
import { ReserveBar } from "./reserve-bar";
import { ReserveButton } from "./reserve-button";

/**
 * Amount of the hero (`#top`) still on screen, in px, before the header flips
 * from its transparent over-image state to the solid cream bar. Straight from
 * the design's scroll logic.
 */
const SOLID_AT = 78;

/**
 * Fixed site header.
 *
 * Over the hero it is transparent with cream text and a soft shadow, sitting
 * on the hero's dark top band so it reads against the photo. Once the
 * hero has scrolled past, it becomes an opaque cream bar with ink text and a
 * hairline underline. Pages without the hero (`/reserve`) get the solid bar
 * straight away. The "Reserve" call to action sits at the end of the header,
 * or in a bar pinned to the bottom of the screen on phones.
 */
export const Navbar = ({ showReserve = true }: NavbarProps) => {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const check = () => {
      const hero = document.getElementById("top");
      const bottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setSolid(bottom <= SOLID_AT);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <>
      <HStack
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex={20}
        justify="space-between"
        gap="0"
        px={LANDING.gutter}
        py="24px"
        bg={solid ? LANDING.cream : "transparent"}
        borderBottom="1px solid"
        borderColor={solid ? LANDING.hairline : "transparent"}
        textShadow={solid ? "none" : "0 1px 12px rgba(0, 0, 0, 0.45)"}
        transition="background .4s ease, border-color .4s ease"
      >
        <Link
          href="/#top"
          color={solid ? LANDING.ink : LANDING.cream}
          fontSize="13px"
          fontWeight={400}
          letterSpacing=".42em"
          textTransform="uppercase"
          _hover={{ opacity: 0.55 }}
        >
          Maryama
        </Link>

        <HStack
          as="nav"
          gap={{ base: "18px", md: "34px" }}
          fontSize="10px"
          fontWeight={300}
          letterSpacing=".28em"
          textTransform="uppercase"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              color={solid ? LANDING.ink : LANDING.cream}
              _hover={{ opacity: 0.55 }}
            >
              {link.label}
            </Link>
          ))}
          {showReserve && <ReserveButton solid={solid} />}
        </HStack>
      </HStack>
      {showReserve && <ReserveBar />}
    </>
  );
};

export default Navbar;
