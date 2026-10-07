import { Link, type LinkProps } from '@chakra-ui/react';
import LANDING from '../../tokens';

/**
 * A plain cream text link in the footer (phone, email). Fades on hover.
 */
export const FooterLink = ({ children, ...rest }: LinkProps) => {
  return (
    <Link
      color={LANDING.cream}
      fontSize="13px"
      fontWeight={300}
      lineHeight="1.9"
      _hover={{ opacity: 0.55 }}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
