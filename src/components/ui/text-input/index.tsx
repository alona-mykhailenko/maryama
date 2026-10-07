import { Box, Field, Input } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { TextInputProps } from './props';

/**
 * Labelled text field in the Maryama style: tracked uppercase label, a single
 * ink hairline underneath (Chakra `flushed`) and a clay error message. Extra
 * props are forwarded to the Chakra `Input`.
 */
export const TextInput = ({
  label,
  error,
  invalid = false,
  ...rest
}: TextInputProps) => {
  return (
    <Field.Root invalid={invalid} gap="10px">
      <Field.Label m="0">
        <Box letterSpacing=".3em" textTransform="uppercase" opacity={0.6}>
          <Text font={FONTS.T1.T9px.Regular}>{label}</Text>
        </Box>
      </Field.Label>
      <Input
        variant="flushed"
        color={COLORS.Text.Fg}
        borderBottomColor={COLORS.Border.Brand}
        {...FONTS.T1.T14px.Light}
        css={{
          '--focus-color': COLORS.Text.Fg,
          '--error-color': COLORS.Border.Error,
        }}
        {...rest}
      />
      <Field.ErrorText m="0">
        <Text font={FONTS.T1.T12px.Light} color={COLORS.Text.FgError}>
          {error}
        </Text>
      </Field.ErrorText>
    </Field.Root>
  );
};

export default TextInput;
