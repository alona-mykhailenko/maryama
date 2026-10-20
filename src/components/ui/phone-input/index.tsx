'use client';

import 'react-international-phone/style.css';
import { Box, Field, HStack, Input } from '@chakra-ui/react';
import { CountrySelector, type ParsedCountry, usePhoneInput } from 'react-international-phone';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { PhoneInputProps } from './props';

const FIELD_HEIGHT = '40px';

/**
 * Phone twin of `TextInput`: same tracked uppercase label, hairline and clay
 * error, with a flag + country dropdown before the number
 * (`react-international-phone`). The number is formatted as the guest types and
 * reported to `onChange` in E.164. Uncontrolled: the field keeps its own text.
 */
export const PhoneInput = ({
  label,
  error,
  invalid = false,
  thinUnderline = false,
  name,
  autoComplete = 'tel',
  defaultCountry = 'ma',
  preferredCountries,
  onChange,
  onBlur,
}: PhoneInputProps) => {
  const handlePhoneChange = ({ phone, country }: { phone: string; country: ParsedCountry }) => {
    // A bare "+212" is the prefilled dial code, not a number yet.
    onChange(phone === `+${country.dialCode}` ? '' : phone);
  };

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry,
    onChange: handlePhoneChange,
  });

  const handleCountrySelect = (selected: ParsedCountry) =>
    setCountry(selected.iso2, { focusOnInput: true });

  const underlineColor = thinUnderline ? COLORS.Border.Emphasized : COLORS.Border.Inverted;

  return (
    <Field.Root invalid={invalid} gap="10px">
      <Field.Label m="0">
        <Box letterSpacing=".3em" textTransform="uppercase" opacity={0.6}>
          <Text font={FONTS.T1.T9px.Regular}>{label}</Text>
        </Box>
      </Field.Label>
      <HStack
        position="relative"
        w="full"
        gap="12px"
        borderBottom={`${thinUnderline ? '0.5px' : '1px'} solid`}
        borderBottomColor={invalid ? COLORS.Border.Error : underlineColor}
        transition="border-color 0.2s"
        _focusWithin={{ borderBottomColor: invalid ? COLORS.Border.Error : COLORS.Text.Fg }}
        css={{
          '--react-international-phone-height': FIELD_HEIGHT,
          '--react-international-phone-background-color': 'transparent',
          '--react-international-phone-border-color': 'transparent',
          '--react-international-phone-text-color': COLORS.Text.Fg,
          '--react-international-phone-font-size': '13px',
          '--react-international-phone-flag-width': '20px',
          '--react-international-phone-flag-height': '20px',
          '--react-international-phone-country-selector-background-color-hover': 'transparent',
          '--react-international-phone-country-selector-arrow-color': COLORS.Text.FgMuted,
          '--react-international-phone-dropdown-top': `calc(${FIELD_HEIGHT} + 8px)`,
          '--react-international-phone-dropdown-shadow': 'none',
          '--react-international-phone-dropdown-item-background-color': COLORS.Bg.Brand,
          '--react-international-phone-dropdown-item-text-color': COLORS.Text.Fg,
          '--react-international-phone-dropdown-item-dial-code-color': COLORS.Text.FgMuted,
          '--react-international-phone-dropdown-item-height': '32px',
          '--react-international-phone-dropdown-preferred-list-divider-color': COLORS.Border.Brand,
          '--react-international-phone-selected-dropdown-item-background-color': COLORS.Earth.Sand,
          '--react-international-phone-selected-dropdown-item-text-color': COLORS.Text.Fg,
          '--react-international-phone-selected-dropdown-item-dial-code-color': COLORS.Text.FgMuted,
          '& .react-international-phone-country-selector-button': { borderRadius: 0, paddingInline: 0 },
          '& .react-international-phone-country-selector-dropdown': {
            border: `0.5px solid ${COLORS.Border.Brand}`,
            outline: 'none',
            fontFamily: 'inherit',
            fontWeight: 300,
          },
          '& .react-international-phone-country-selector-dropdown__list-item:hover, & .react-international-phone-country-selector-dropdown__list-item--focused':
            { backgroundColor: COLORS.Earth.Sand },
        }}
      >
        <CountrySelector
          selectedCountry={country.iso2}
          onSelect={handleCountrySelect}
          preferredCountries={preferredCountries}
        />
        <Input
          ref={inputRef}
          name={name}
          type="tel"
          autoComplete={autoComplete}
          value={inputValue}
          onChange={handlePhoneValueChange}
          onBlur={onBlur}
          variant="flushed"
          h={FIELD_HEIGHT}
          borderBottomWidth="0"
          color={COLORS.Text.Fg}
          {...FONTS.T1.T14px.Light}
          fontVariantNumeric="tabular-nums"
          _focusVisible={{ boxShadow: 'none', _invalid: { boxShadow: 'none' } }}
          _invalid={{ boxShadow: 'none' }}
        />
      </HStack>
      <Field.ErrorText m="0">
        <Text font={FONTS.T1.T12px.Light} color={COLORS.Text.FgError}>
          {error}
        </Text>
      </Field.ErrorText>
    </Field.Root>
  );
};

export default PhoneInput;
