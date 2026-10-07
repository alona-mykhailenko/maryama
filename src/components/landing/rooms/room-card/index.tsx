import { Box, Link } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/core/text';
import { ROOMS } from '@/components/landing/content';
import { ImageSlot } from '@/components/landing/image-slot';
import LANDING from '@/theme/landing-tokens';
import type { RoomCardProps } from './props';

/**
 * One full-height room panel: the room's photo edge to edge with its name
 * centred on top in wide-tracked capitals and a hairline underline. The photo
 * eases in slightly on hover. Takes the raw API `Room`.
 */
export const RoomCard = ({ room }: RoomCardProps) => {
  const imageUrl = room.images[0]?.url;

  return (
    <Link
      className="group"
      aria-label={room.name}
      position="relative"
      display="block"
      h={{ base: '75vh', md: 'min(100vh, 900px)' }}
      minH="480px"
      overflow="hidden"
      bg={LANDING.ink}
      _focusVisible={{ outline: '1px solid', outlineColor: LANDING.cream, outlineOffset: '-6px' }}
    >
      {/* Holds the photo so it can slowly zoom on hover without moving the label. */}
      <Box
        position="absolute"
        inset="0"
        transition="transform 1.2s ease"
        _groupHover={{ transform: 'scale(1.04)' }}
      >
        <ImageSlot
          src={imageUrl}
          alt=""
          id={`mry-room-${room.id}`}
          placeholder={ROOMS.photoPlaceholder(room.name)}
        />
      </Box>
      {/* Light, even veil so the cream name stays readable on bright walls. */}
      <Box
        position="absolute"
        inset="0"
        bg="rgba(18, 18, 18, 0.18)"
        transition="background .4s ease"
        _groupHover={{ bg: 'rgba(18, 18, 18, 0.28)' }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        pb="6px"
        pl=".4em"
        borderBottom="0.1px solid"
        borderColor={LANDING.cream}
        letterSpacing=".4em"
        textTransform="uppercase"
        whiteSpace="nowrap"
        textShadow="0 1px 12px rgba(0, 0, 0, 0.35)"
      >
        <Text font={FONTS.T1.T13px.Light} color={COLORS.Text.FgInverted}>
          {room.name}
        </Text>
      </Box>
    </Link>
  );
};

export default RoomCard;
