export type Color = string;

export const COLORS = {
  // Background semantic tokens
  Bg: {
    Default: "#ffffff",
    Subtle: "#fcfcfb",
    Muted: "#F5F4F2",
    Emphasized: "#F2F1EF",
    Inverted: "#221616",
    Brand: "#F4EBDD",
  },

  // Border semantic tokens
  Border: {
    Default: "#EDEDEB",
    Subtle: "#F2F1EF",
    Emphasized: "#A5A29F",
    Inverted: "#221616",
    Brand: "#C4A882",
    Error: "#8C4A2F",
  },

  // Text semantic tokens
  Text: {
    Fg: "#221616",
    FgSecondary: "#4B4846",
    FgMuted: "#6D6A67",
    FgSubtle: "#9B9895",
    FgFaint: "#A5A29F",
    FgDisabled: "#EDEDEB",
    FgInverted: "#F4EBDD",
    FgContrast: "#FFFFFF",
    FgError: "#8C4A2F",
  },

  // ─── Color Palettes ───────────────────────────────────────────────────────

  Earth: {
    LightCream: "#FBF5EA",
    Cream: "#F4EBDD",
    Sand: "#EBDFC9",
    Tan: "#DCC9A8",
    Khaki: "#C4A882",
    Taupe: "#9C8468",
    Coffee: "#6F5843",
    Mocha: "#4A3629",
    Espresso: "#2E1F19",
    DarkBrown: "#221616",
  },

  Accent: {
    Terracotta: "#B5714B",
    Olive: "#7A7350",
    Sage: "#5F6B4C",
    LightRed: "#dc2511",
  },
};

export default COLORS;
