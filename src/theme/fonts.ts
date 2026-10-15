import { Montserrat, Sora } from "next/font/google";

export interface Font {
  fontWeight: number | string;
  fontSize: number | string;
  lineHeight: number | string;
  letterSpacing?: number;
  className?: string;
  fontStyle?: string;
}

export interface SizeVariants {
  Title: Font;
  Light: Font;
  Regular: Font;
  Medium: Font;
  SemiBold: Font;
}

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/** Back-office face. */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const WEIGHTS = {
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
} as const;

/**
 * Type scale. Each size carries its own line height; most display sizes
 * (22px and up) are fluid and shrink on narrow screens, capped at their nominal
 * size; 30px stays fixed for the hero wordmark.
 */
const SIZES = {
  T9px: { fontSize: "9px", lineHeight: 1.5 },
  T10px: { fontSize: "10px", lineHeight: 1.5 },
  T12px: { fontSize: "12px", lineHeight: 1.8 },
  T13px: { fontSize: "13px", lineHeight: 2 },
  T14px: { fontSize: "14px", lineHeight: 2 },
  T16px: { fontSize: "16px", lineHeight: 1.6 },
  T22px: { fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.3 },
  T24px: { fontSize: "clamp(20px, 1.8vw, 24px)", lineHeight: 1.3 },
  T30px: { fontSize: "30px", lineHeight: 1.2 },
  T34px: { fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.35 },
  T40px: { fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.35 },
  T56px: { fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.1 },
} as const;

type Sizes = Record<string, { fontSize: string; lineHeight: number }>;

export type FontWeightName = keyof typeof WEIGHTS;
export type FontSizeName = keyof typeof SIZES;
export type FontScale<S extends Sizes = typeof SIZES> = Record<
  keyof S,
  Record<FontWeightName, Font>
>;

export interface Fonts {
  /** Typeface 1 — Montserrat (landing page). */
  T1: FontScale;
  /**
   * Typeface 2 — Sora (back office). Fixed px sizes with explicit line heights;
   * the font family comes from `sora.className` on the admin shell and dialogs.
   */
  T2: {
    T10px: SizeVariants; // 2xs
    T12px: SizeVariants; // xs
    T14px: SizeVariants; // sm
    T16px: SizeVariants; // md
    T18px: SizeVariants; // lg
    T20px: SizeVariants; // xl
    T24px: SizeVariants; // 2xl
    T30px: SizeVariants; // 3xl
    T36px: SizeVariants; // 4xl
    T48px: SizeVariants; // 5xl
    T60px: SizeVariants; // 6xl — body variants have letterSpacing: -0.4
    T72px: SizeVariants; // 7xl — body variants have letterSpacing: -0.4
  };
}

const scale = <S extends Sizes>(className: string, sizes: S): FontScale<S> =>
  Object.fromEntries(
    Object.entries(sizes).map(([sizeName, size]) => [
      sizeName,
      Object.fromEntries(
        Object.entries(WEIGHTS).map(([weightName, fontWeight]) => [
          weightName,
          { className, fontWeight, ...size, fontStyle: "normal" },
        ]),
      ),
    ]),
  ) as FontScale<S>;

/**
 * Typography tokens: `FONTS.<typeface>.<size>.<weight>`, e.g.
 * `FONTS.T1.T14px.Regular`. Pass one to the core `Text` via its `font` prop.
 */
const FONTS: Fonts = {
  T1: scale(montserrat.className, SIZES),
  T2: {
    // 2xs — 10px
    T10px: {
      Title: {
        fontWeight: 400,
        fontSize: 10,
        lineHeight: "12px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 10,
        lineHeight: "14px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 10,
        lineHeight: "14px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 10,
        lineHeight: "14px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 10,
        lineHeight: "14px",
      },
    },

    // xs — 12px
    T12px: {
      Title: {
        fontWeight: 400,
        fontSize: 12,
        lineHeight: "14px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 12,
        lineHeight: "16px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 12,
        lineHeight: "16px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 12,
        lineHeight: "16px",
      },
    },

    // sm — 14px
    T14px: {
      Title: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "18px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 14,
        lineHeight: "20px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "20px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "20px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "20px",
      },
    },

    // md — 16px
    T16px: {
      Title: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "22px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 16,
        lineHeight: "24px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
      },
    },

    // lg — 18px
    T18px: {
      Title: {
        fontWeight: 400,
        fontSize: 18,
        lineHeight: "26px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 18,
        lineHeight: "28px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 18,
        lineHeight: "28px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: "28px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "28px",
      },
    },

    // xl — 20px
    T20px: {
      Title: {
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "28px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 20,
        lineHeight: "30px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "30px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 20,
        lineHeight: "30px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "30px",
      },
    },

    // 2xl — 24px
    T24px: {
      Title: {
        fontWeight: 400,
        fontSize: 24,
        lineHeight: "30px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 24,
        lineHeight: "32px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 24,
        lineHeight: "32px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 24,
        lineHeight: "32px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 24,
        lineHeight: "32px",
      },
    },

    // 3xl — 30px
    T30px: {
      Title: {
        fontWeight: 400,
        fontSize: 30,
        lineHeight: "36px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 30,
        lineHeight: "38px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 30,
        lineHeight: "38px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 30,
        lineHeight: "38px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 30,
        lineHeight: "38px",
      },
    },

    // 4xl — 36px
    T36px: {
      Title: {
        fontWeight: 400,
        fontSize: 36,
        lineHeight: "42px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 36,
        lineHeight: "44px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 36,
        lineHeight: "44px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 36,
        lineHeight: "44px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 36,
        lineHeight: "44px",
      },
    },

    // 5xl — 48px
    T48px: {
      Title: {
        fontWeight: 400,
        fontSize: 48,
        lineHeight: "58px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 48,
        lineHeight: "60px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 48,
        lineHeight: "60px",
      },
      Medium: {
        fontWeight: 500,
        fontSize: 48,
        lineHeight: "60px",
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 48,
        lineHeight: "60px",
      },
    },

    // 6xl — 60px (body variants have letterSpacing: -0.4)
    T60px: {
      Title: {
        fontWeight: 400,
        fontSize: 60,
        lineHeight: "70px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 60,
        lineHeight: "72px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 60,
        lineHeight: "72px",
        letterSpacing: -0.4,
      },
      Medium: {
        fontWeight: 500,
        fontSize: 60,
        lineHeight: "72px",
        letterSpacing: -0.4,
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 60,
        lineHeight: "72px",
        letterSpacing: -0.4,
      },
    },

    // 7xl — 72px (body variants have letterSpacing: -0.4)
    T72px: {
      Title: {
        fontWeight: 400,
        fontSize: 72,
        lineHeight: "90px",
      },
      Light: {
        fontWeight: 300,
        fontSize: 72,
        lineHeight: "92px",
      },
      Regular: {
        fontWeight: 400,
        fontSize: 72,
        lineHeight: "92px",
        letterSpacing: -0.4,
      },
      Medium: {
        fontWeight: 500,
        fontSize: 72,
        lineHeight: "92px",
        letterSpacing: -0.4,
      },
      SemiBold: {
        fontWeight: 600,
        fontSize: 72,
        lineHeight: "92px",
        letterSpacing: -0.4,
      },
    },
  },
};

export default FONTS;
