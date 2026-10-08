"use client";

import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { ChevronLeftIcon } from "@/components/admin/icons/chevron-left";
import { Text } from "@/components/ui/text";
import type { BackButtonProps } from "./props";

/** "‹ Back" button: calls `onBack`, or goes to the previous page when none is given. */
export const BackButton = ({ onBack }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <HStack
      as="button"
      gap="8px"
      color={COLORS.Text.FgMuted}
      cursor="pointer"
      _hover={{ color: COLORS.Text.Fg }}
      onClick={handleBack}
    >
      <ChevronLeftIcon size={16} />
      <Text font={FONTS.T2.T14px.Regular} color="inherit">
        Back
      </Text>
    </HStack>
  );
};

export default BackButton;
