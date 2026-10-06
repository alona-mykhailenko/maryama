import COLORS from '@/assets/colors';

/**
 * Exact visual constants for the Maryama landing design.
 *
 * The design is a two-colour system — a warm cream ground and a near-black
 * "ink" brown — with hairline rules drawn as the ink (or the cream, on the
 * dark footer) at a low alpha. Values are kept verbatim from the source so
 * the recreation matches pixel for pixel.
 */
export const LANDING = {
  /** Page ground. */
  cream: COLORS.Bg.Brand, // #F4EBDD
  /** Text, borders, dark sections. */
  ink: COLORS.Bg.Inverted, // #221616

  /** Hairline rule on the cream ground — ink at ~13%. */
  hairline: '#F4EBDD',
  /** Hairline on the dark footer — cream at ~15%. */
  hairlineOnDark: '#F4EBDD',
  /** Slightly stronger cream hairline (social buttons, placeholder text). */
  hairlineOnDarkStrong: '#F4EBDD',

  /** Centred content column. */
  maxWidth: '1240px',
  /** Horizontal page gutter — flat 40px in the design, tightened on phones. */
  gutter: { base: '24px', md: '40px' } as const,

  /**
   * Vertical rhythm of the page. Every value sits on an 8px grid and shrinks
   * on phones. Sections only pad their top with `section` (the last one before
   * the footer pads its bottom too), so the gap between any two sections is
   * always the same.
   */
  space: {
    /** Between two unrelated sections. */
    section: { base: '80px', md: '128px' },
    /** Between a section and the block that continues it (story → gallery, footer grid → bottom bar). */
    related: { base: '48px', md: '80px' },
    /** Eyebrow label → the section's content. */
    label: { base: '24px', md: '32px' },
    /** Between the columns of a split or multi-column layout. */
    columns: { base: '40px', md: '80px' },
    /** Between photos in a gallery. */
    gallery: { base: '16px', md: '24px' },
    /** Between stacked paragraphs or small blocks. */
    stack: '24px',
  },
} as const;

export default LANDING;
