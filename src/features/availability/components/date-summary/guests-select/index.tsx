import { useMemo } from "react";
import { createListCollection, Select, type SelectValueChangeDetails } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { AVAILABILITY } from "@/config/content";
import { ChevronDownIcon } from "@/components/site/icons/chevron-down";
import LANDING from "@/theme/landing-tokens";
import type { GuestsSelectProps } from "./props";

/** Most guests a stay can be searched for (the largest room sleeps five). */
const MAX_GUESTS = 5;

const createGuestsCollection = (max: number) =>
  createListCollection({ items: Array.from({ length: max }, (_, index) => String(index + 1)) });

const GUESTS_COLLECTION = createGuestsCollection(MAX_GUESTS);

/**
 * Guest count dropdown (1–5, or up to `max` for one room): Chakra's `Select` for keyboard and screen-reader
 * support, restyled as a bare number with a flipping chevron. No portal, so the
 * list keeps the page's Montserrat.
 */
export const GuestsSelect = ({ value, max, onChange }: GuestsSelectProps) => {
  const selected = String(value);
  const collection = useMemo(
    () => (max ? createGuestsCollection(max) : GUESTS_COLLECTION),
    [max],
  );

  const handleValueChange = ({ value: [next] }: SelectValueChangeDetails) => {
    if (next) onChange(Number(next));
  };

  return (
    <Select.Root
      unstyled
      collection={collection}
      value={[selected]}
      positioning={{ placement: "bottom-start", gutter: 8 }}
      onValueChange={handleValueChange}
    >
      <Select.Control>
        <Select.Trigger
          display="flex"
          alignItems="center"
          gap="10px"
          p="0"
          color={LANDING.ink}
          cursor="pointer"
          outline="none"
          _hover={{ opacity: 0.55 }}
          // Focus returns here after a pick: a fade (not a frame) keeps keyboard focus visible.
          _focusVisible={{ opacity: 0.55 }}
          aria-label={AVAILABILITY.guestsLabel}
        >
          <Text font={FONTS.T1.T14px.Light}>{value}</Text>
          <Select.Indicator display="flex" transition="transform .25s ease" _open={{ transform: "rotate(180deg)" }}>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        {/* Ark copies the content's z-index onto the positioner, so it is set here. */}
        <Select.Content
          zIndex={10}
          minW="48px"
          py="6px"
          bg={LANDING.cream}
          border="1px solid"
          borderColor={COLORS.Earth.Tan}
          boxShadow="0 12px 32px rgba(18, 18, 18, 0.08)"
          outline="none"
        >
          {collection.items.map((guests) => (
            <Select.Item
              key={guests}
              item={guests}
              px="16px"
              py="4px"
              textAlign="center"
              cursor="pointer"
              transition="background .15s ease"
              _highlighted={{ bg: COLORS.Earth.Sand }}
            >
              <Text font={guests === selected ? FONTS.T1.T14px.Regular : FONTS.T1.T14px.Light}>{guests}</Text>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};

export default GuestsSelect;
