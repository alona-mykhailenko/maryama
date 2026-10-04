import { Grid } from "@chakra-ui/react";
import { SectionContainer } from "../section-container";
import { SectionLabel } from "../section-label";
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
      <SectionLabel mb="34px">{label}</SectionLabel>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1.35fr" }}
        gap={{ base: "40px", md: "80px" }}
        alignItems="start"
      >
        {aside}
        {children}
      </Grid>
    </SectionContainer>
  );
};

export default SplitSection;
