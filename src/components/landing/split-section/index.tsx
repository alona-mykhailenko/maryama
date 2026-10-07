import { Grid } from "@chakra-ui/react";
import { SectionContainer } from "@/components/landing/section-container";
import { SectionLabel } from "@/components/landing/section-label";
import LANDING from "@/theme/landing-tokens";
import type { SplitSectionProps } from "./props";

/**
 * A landing section laid out as an eyebrow over two columns: a narrow `aside`
 * (heading) beside a wider body. The columns stack on phones. Pass box props
 * (`id`, vertical padding, …) to the section itself.
 */
export const SplitSection = ({
  label,
  aside,
  children,
  ...rest
}: SplitSectionProps) => {
  return (
    <SectionContainer as="section" {...rest}>
      <SectionLabel mb={LANDING.space.label}>{label}</SectionLabel>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1.35fr" }}
        gap={LANDING.space.columns}
        alignItems="start"
      >
        {aside}
        {children}
      </Grid>
    </SectionContainer>
  );
};

export default SplitSection;
