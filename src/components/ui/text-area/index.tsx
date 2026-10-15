import { Box, Field, Textarea } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { TextAreaProps } from './props';

/**
 * Multi-line twin of `TextInput`: tracked uppercase label, a single hairline
 * underneath (Chakra `flushed`) and a clay error message. Grows with its
 * content. Extra props are forwarded to the Chakra `Textarea`. `thinUnderline`
 * swaps the hairline for a finer 0.5px line.
 */
export const TextArea = ({
  label,
  error,
  invalid = false,
  thinUnderline = false,
  ...rest
}: TextAreaProps) => {
  return (
    <Field.Root invalid={invalid} gap="10px">
      <Field.Label m="0">
        <Box letterSpacing=".3em" textTransform="uppercase" opacity={0.6}>
          <Text font={FONTS.T1.T9px.Regular}>{label}</Text>
        </Box>
      </Field.Label>
      <Textarea
        variant="flushed"
        autoresize
        rows={1}
        minH="44px"
        color={COLORS.Text.Fg}
        borderBottomColor={COLORS.Border.Brand}
        _placeholder={{ color: COLORS.Text.FgFaint }}
        {...FONTS.T1.T14px.Light}
        css={{
          '--focus-color': COLORS.Text.Fg,
          '--error-color': COLORS.Border.Error,
        }}
        {...(thinUnderline && {
          borderBottomWidth: '0.5px',
          borderBottomColor: COLORS.Border.Emphasized,
          _focus: { borderBottomColor: COLORS.Text.Fg },
          _focusVisible: { boxShadow: 'none', _invalid: { boxShadow: 'none' } },
          _invalid: { borderBottomColor: COLORS.Border.Error },
        })}
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

export default TextArea;
