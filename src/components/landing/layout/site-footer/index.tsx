import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import { FOOTER } from '@/components/landing/content';
import { InstagramIcon } from '@/components/landing/icons/instagram';
import { SectionContainer } from '@/components/landing/ui/section-container';
import { WhatsAppIcon } from '@/components/landing/icons/whatsapp';
import LANDING from '@/theme/landing-tokens';
import { FooterColumn } from './footer-column';
import { FooterLink } from './footer-link';
import { SocialIconLink } from './social-icon-link';

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
} as const;

/**
 * Dark closing footer: brand block, address, contact links and social buttons
 * in a four-column grid, then a hairline bottom bar with the copyright and the
 * closing tagline.
 */
export const SiteFooter = () => {
  return (
    <Box
      as="footer"
      id="footer"
      bg={LANDING.ink}
      color={LANDING.cream}
      pt={LANDING.space.section}
      pb={LANDING.gutter}
    >
      <SectionContainer>
        <Grid
          templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1.4fr 1fr 1fr 1fr' }}
          gap={{ base: '40px', md: '56px' }}
          pb={LANDING.space.related}
        >
          <VStack align="stretch" gap="18px">
            <Box letterSpacing=".44em" textTransform="uppercase">
              <Text font={FONTS.T1.T30px.Light} color={COLORS.Text.FgInverted}>
                {FOOTER.brand}
              </Text>
            </Box>
            <Box letterSpacing=".26em" textTransform="uppercase" opacity={0.6}>
              <Text font={FONTS.T1.T10px.Light} color={COLORS.Text.FgInverted}>
                {FOOTER.tagline}
              </Text>
            </Box>
          </VStack>

          <FooterColumn label={FOOTER.address.label}>
            <Text font={FONTS.T1.T13px.Light} color={COLORS.Text.FgInverted}>
              {FOOTER.address.lines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < FOOTER.address.lines.length - 1 && <br />}
                </span>
              ))}
            </Text>
          </FooterColumn>

          <FooterColumn label={FOOTER.contact.label}>
            <FooterLink href={FOOTER.contact.phoneHref}>{FOOTER.contact.phone}</FooterLink>
            <FooterLink href={FOOTER.contact.emailHref}>{FOOTER.contact.email}</FooterLink>
          </FooterColumn>

          <FooterColumn label={FOOTER.follow.label}>
            <HStack gap="14px">
              {FOOTER.follow.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <SocialIconLink key={social.label} label={social.label} href={social.href}>
                    <Icon />
                  </SocialIconLink>
                );
              })}
            </HStack>
          </FooterColumn>
        </Grid>

        <HStack
          justify="space-between"
          gap="20px"
          pt="24px"
          borderTop="1px solid"
          borderColor={LANDING.hairlineOnDark}
          letterSpacing=".24em"
          textTransform="uppercase"
          opacity={0.5}
        >
          <Text font={FONTS.T1.T9px.Light} color={COLORS.Text.FgInverted}>
            {FOOTER.copyright}
          </Text>
          <Text font={FONTS.T1.T9px.Light} color={COLORS.Text.FgInverted}>
            {FOOTER.closingLine}
          </Text>
        </HStack>
      </SectionContainer>
    </Box>
  );
};

export default SiteFooter;
