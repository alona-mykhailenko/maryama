/** Layout constants for the back office. Colours live in `COLORS` (`Bg`, `Border`, `Text`). */
export const ADMIN = {
  sidebarWidth: '262px',
  headerHeight: '74px',
  /** Horizontal page gutter. */
  gutter: '28px',
  /** Space above / below a page's content column (`PageLayout`). */
  contentPt: '24px',
  contentPb: '48px',
  /** Gap between blocks of a page's content column (`PageLayout`). */
  sectionGap: '20px',
  /** Cards, tables, calendar frames. */
  radius: '14px',
  /** Nav items, calendar bars. */
  radiusSm: '10px',
  pill: '999px',
  /** Max height of a room photo in the admin gallery (width follows the photo's ratio). */
  galleryPhotoMaxH: '400px',
} as const;

export default ADMIN;
