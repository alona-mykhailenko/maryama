import type { FocusEventHandler } from 'react';
import type { CountryIso2 } from 'react-international-phone';

export interface PhoneInputProps {
  label?: string;
  error?: string;
  invalid?: boolean;
  /** Draws a finer, softer hairline (0.5px brand tone) instead of the default underline. */
  thinUnderline?: boolean;
  name?: string;
  autoComplete?: string;
  /** Country shown before the guest picks or types one. */
  defaultCountry?: CountryIso2;
  /** Countries listed first in the dropdown. */
  preferredCountries?: CountryIso2[];
  /** The number in E.164 (`+212612345678`), or `""` while only the dial code is typed. */
  onChange: (phone: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
