import { Link } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import LANDING from '../../tokens';

/**
 * A 44px square outlined icon button. The outline brightens to full cream on
 * hover.
 */
export const SocialIconLink = ({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      display="flex"
      alignItems="center"
      justifyContent="left"
      w="44px"
      h="44px"
      color={LANDING.cream}
      transition="border-color .25s ease"
      _hover={{ borderColor: LANDING.cream }}
    >
      {children}
    </Link>
  );
};

export default SocialIconLink;
