import { Box, Flex, Image } from "@chakra-ui/react";
import LANDING from "../tokens";
import type { ImageSlotProps } from "./props";

/**
 * Fillable image area — the app-side stand-in for the design's `<image-slot>`.
 *
 * With `src` it renders the photo cover-fitted to its box; without one it shows
 * the same dark, dashed, labelled placeholder the design used for shots that
 * had not been taken yet.
 */
export const ImageSlot = ({
  src,
  alt = "",
  fit = "cover",
  placeholder,
  ratio,
  ...rest
}: ImageSlotProps) => {
  return (
    <Box
      position="relative"
      w="100%"
      h={ratio ? "auto" : "100%"}
      aspectRatio={ratio}
      overflow="hidden"
      bg={LANDING.ink}
      {...rest}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          objectFit={fit}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          display="block"
        />
      ) : (
        <Flex
          position="absolute"
          inset="0"
          align="center"
          justify="center"
          p="24px"
          textAlign="center"
          color={LANDING.hairlineOnDarkStrong}
          border="1px dashed"
          borderColor={LANDING.hairlineOnDarkStrong}
          fontSize="10px"
          fontWeight={300}
          letterSpacing=".26em"
          textTransform="uppercase"
        >
          {placeholder}
        </Flex>
      )}
    </Box>
  );
};

export default ImageSlot;
