import { Box } from '@chakra-ui/react';
import LANDING from '../../tokens';

/**
 * The small plus mark beside each FAQ question. Rotates 45° to read as a close
 * "×" while the row is open.
 */
export const ToggleIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Box
      as="span"
      flex="none"
      position="relative"
      w="11px"
      h="11px"
      transform={isOpen ? 'rotate(45deg)' : 'rotate(0deg)'}
      transition="transform .3s ease"
    >
      <Box
        as="span"
        position="absolute"
        top="5px"
        left="0"
        w="11px"
        h="1px"
        bg={LANDING.ink}
      />
      <Box
        as="span"
        position="absolute"
        left="5px"
        top="0"
        w="1px"
        h="11px"
        bg={LANDING.ink}
      />
    </Box>
  );
};

export default ToggleIcon;
