@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Maryama is the website for a guest house in Imsouane, Morocco: a public landing page plus an API and an admin area backed by Supabase (Postgres + Auth).

## Commands

```bash
npm run dev            # Start development server (http://localhost:3000)
npm run build          # Build for production
npm run lint           # Run ESLint
npx tsc --noEmit       # Type-check
npx prisma generate    # Regenerate the Prisma client into app/generated/prisma
npx prisma migrate dev # Create/apply a migration (uses DIRECT_URL)
npx prisma db seed     # Seed rooms (prisma/seed.ts)
```

> There is no test suite yet.

## Architecture

**Framework**: Next.js 16 (App Router, React 19) with TypeScript. No `src/` folder: the path alias `@/*` maps to the project root.

**Linting**: ESLint 9 with `eslint-config-next` (core-web-vitals + typescript).

### Project Structure

```
app/
├── admin/             # Back office: login/ + (protected)/ (calendar, bookings, rooms, rooms/[id])
├── api/               # Route handlers (rooms, rooms/[id], bookings, bookings/[id], auth/login, auth/logout)
├── generated/prisma/  # Generated Prisma client, do not edit
├── layout.tsx         # Root layout, wraps everything in the Chakra Provider
└── page.tsx           # Landing page
assets/
├── colors/            # COLORS tokens
└── fonts/             # Montserrat + FONTS type scale
components/
├── core/text/         # Text: Chakra Text with a `font` token prop
├── admin/             # Back-office layout, calendar, bookings, rooms, ui (DataTable, …), icons; layout constants in tokens.ts
├── landing/           # Landing sections; copy in content.ts, visual constants in tokens.ts
└── ui/                # Chakra provider + Emotion cache
lib/
├── prisma.ts          # Shared Prisma client (pg driver adapter)
├── auth.ts            # getAdmin / isAdmin / requireAdmin (server-only)
├── dates.ts           # Calendar date helpers; parseDay() for DATE columns
├── booking-status.ts  # Status → badge/bar colours
├── booking-transitions.ts # Allowed status changes
└── supbase/           # Supabase server client, proxy session refresh, cookie options
prisma/                # schema.prisma, migrations, seed.ts
proxy.ts               # Next.js proxy (middleware): guards /admin/*
types/                 # Shared types (Room, …)
public/images/         # Landing photos
```

Each component lives in its own folder as `index.tsx` (+ `props.ts` when it has a props interface). Sub-components get a sub-folder (e.g. `faq/faq-item/`). **Extract a separate component whenever a piece of UI is reusable or makes a section easier to read.**

**No inline functions in JSX props.** Never write `onClick={() => …}`, `onChange={(value) => …}`, `getRowId={(row) => …}` etc. Declare a named handler in the component body (`const handleClose = () => onOpenChange(false);`) or a module-level helper when it uses no state (`const getRoomRowId = (room: Room) => String(room.id);`), then pass it by name: `onClick={handleClose}`. Pass an existing function directly when the signatures match (`onPageChange={setPage}`). Inside a `.map`, don't bind the item with an arrow: give the item component the value and have it call back with it (`<PagePill page={token} onClick={onPageChange} />`, where `PagePill` calls `onClick(page)` from its own `handleClick`). TanStack column definitions (`cell`, `header`) are config, not props, and are exempt.

### Data & API

- **Database**: Prisma 7 with the `prisma-client` generator and `@prisma/adapter-pg`. Import the client from `@/lib/prisma`, never instantiate a new one. Config is in `prisma7.config.ts`.
- **Models**: `Room`, `RoomImage`, `Booking` (see `prisma/schema.prisma`). Prices are whole euros.
- **Public routes** (no auth): `GET /api/rooms` and `GET /api/rooms/[id]` return rooms with their images ordered by `position`. Never return booking/guest data from public routes.
- **Admin routes**: `GET /api/bookings`, `PATCH /api/bookings/[id]` (status), `POST /api/rooms/[id]/images` (multipart `files`), `DELETE /api/rooms/[id]/images/[imageId]`. Every admin route handler checks `getAdmin()` and returns 401 otherwise — the proxy only guards `/admin/*` pages, not `/api`.
- **Room photos**: stored in the public Supabase Storage bucket `rooms-images` under `rooms/<roomId>/`, accessed only server-side through `createStorageClient()` (`lib/supbase/storage.ts`, secret key, call after `getAdmin()`). `RoomImage.url` holds the public URL; the object path is derived from it on delete. Accepted types/size limit live in `lib/room-images.ts`, shared by the API and the upload dialog.
- **Client data**: fetchers + query keys live in `services/` (`rooms.ts`, `bookings.ts`, `auth.ts`), types in `services/types/`. Pages call them through React Query (`useQuery` / `useMutation`). Enums come from `@/app/generated/prisma/enums` (safe to import client-side).
- **Admin auth**: Supabase Auth via `@supabase/ssr`, httpOnly cookies only (there is no browser Supabase client). `proxy.ts` refreshes the session and redirects unauthenticated `/admin/*` requests to `/admin/login`. In server code use `requireAdmin()` from `@/lib/auth`.

### Localization

None for now. All copy is plain English in `components/landing/content.ts`. Do not add next-intl or translation keys.

## UI

**Chakra UI v3** with Emotion (`components/ui/provider.tsx`, `defaultSystem`). No Tailwind: style with Chakra props only.

### Styling

- **Inline Chakra style props only.** Write props directly on the element (`<Box position="absolute" inset="0">`). No `styles.ts` files and no `const styles = {...}` objects.
- **Prefer `VStack` / `HStack`** over `Stack`, `Flex` or a wrapper `Box` for rows and columns. Both default to `align="center"` and `gap="0.5rem"`, so pass `align="stretch"` for columns of block content and an explicit `gap` (`gap="0"` if none).
- Don't put a `maxW` + `mx="auto"` container inside a stretched `VStack`: the auto margins shrink it to its content width. Keep those section wrappers as `Box`, or use `SectionContainer`.
- **Responsive values**: Chakra object syntax, `{ base: '24px', md: '40px' }`. Spacing is written in px.
- **Icons**: plain inline `<svg>` components with `fill="none"` and `stroke="currentColor"`, so they inherit color from their parent: `components/landing/icons/` for the landing page, `components/admin/icons/` (Lucide geometry on the shared `IconBase`) for the back office. No icon libraries.

### Colors

- **Never hardcode hex values in JSX.** Use tokens:
  - `COLORS` from `@/assets/colors`, organised as **semantic tokens first, palettes second**:
    - `Bg`: `Default` (white back-office surface), `Subtle`, `Muted`, `Emphasized`, `Inverted` (`#221616` dark fills), `Brand` (`#F4EBDD` cream ground).
    - `Border`: `Default`, `Subtle`, `Emphasized` (dashed outlines), `Inverted`, `Brand` (form underline), `Error`.
    - `Text`: `Fg` (`#221616`), `FgSecondary`, `FgMuted`, `FgSubtle`, `FgFaint`, `FgDisabled`, `FgInverted` (cream on dark), `FgContrast` (white on dark), `FgError`.
    - Palettes: `Earth` (`LightCream` → `DarkBrown`) and `Accent` (`Terracotta`, `Olive`, `Sage`, `LightRed`).
  - **Pick by role, not by hue**: a background uses `Bg.*`, a border `Border.*`, text `Text.*`. Reach for a palette colour only when no semantic token fits.
  - `LANDING` from `@/components/landing/tokens` on the landing page: `cream` (page ground), `ink` (text, borders, dark sections), `hairline` / `hairlineOnDark` / `hairlineOnDarkStrong`, `maxWidth` (`1240px`) and `gutter`.
- The design is two-colour: cream ground + near-black ink brown. Use the palette/accent tones sparingly.
- **Text on dark grounds**: landing (hero, room cards, footer) `color={COLORS.Text.FgInverted}`; back office (active nav, primary buttons, confirmed status) `COLORS.Text.FgContrast`.
- Photo scrims/veils use `rgba(18, 18, 18, <alpha>)` gradients inline. That is the only accepted raw color value.
- `app/globals.css` sets the body background/color to the same cream/ink so there is no flash before Chakra loads. Keep them in sync if the tokens change.
- **Back office** (`/admin`): `Bg.Default` surfaces with `Bg.Subtle` / `Bg.Muted` tints and `Border.Default` / `Border.Subtle` hairlines; dark fills use `Bg.Inverted`; errors use `Text.FgError` (solid danger buttons `Accent.LightRed`). Layout constants (sidebar width, header height, gutter, radii) are in `ADMIN` from `components/admin/tokens.ts`.
- When a new color is needed, add it to the right semantic group in `COLORS` (or a palette) first, then use the token. Never hardcode hex values in components.

### Fonts

- **Typeface**: Montserrat via `next/font/google` (`montserrat` in `@/assets/fonts`, all weights 100–900). The landing page applies `montserrat.className` on its root `Box`.
- **Type scale**: `FONTS.T1.<size>.<weight>`, e.g. `FONTS.T1.T14px.Light`.
  - Sizes: `T9px`, `T10px`, `T12px`, `T13px`, `T14px`, `T16px`, `T22px`, `T24px`, `T30px`, `T34px`, `T40px`, `T56px`. Each carries its own line height. Sizes from 22px up are fluid `clamp()` values capped at their nominal size, except `T30px`, which is fixed (hero wordmark).
  - Weights: `ExtraLight` (200), `Light` (300), `Regular` (400), `Medium` (500), `SemiBold` (600), `Bold` (700).
- **Always render text through the core `<Text>`** (`@/components/core/text`) with a `font` token: `<Text font={FONTS.T1.T14px.Light}>`. Don't set `fontSize` / `fontWeight` / `lineHeight` by hand on text.
- `Text` defaults to `COLORS.Text.Fg` and `display="block"`, and accepts `hoverColor`.
- **Letter-spacing, uppercase and opacity** go on a wrapping `Box`, not on `Text`:
  ```tsx
  <Box letterSpacing=".34em" textTransform="uppercase" opacity={0.5}>
    <Text font={FONTS.T1.T9px.Regular}>01 — The Place</Text>
  </Box>
  ```
- The look is light, airy and wide-tracked: headings mostly `ExtraLight`/`Light`, labels small uppercase with wide letter-spacing (`.24em`–`.44em`). Follow existing sections for consistency.
- **Back office** uses typeface 2 — Sora — via `FONTS.T2.<size>.<variant>`: fixed sizes `T10px`, `T12px`, `T14px`, `T16px`, `T18px`, `T20px`, `T24px`, `T30px`, `T36px`, `T48px`, `T60px`, `T72px` (2xs → 7xl), each with `Title` / `Light` / `Regular` / `Medium` / `SemiBold` and an explicit px line height (60/72px body variants add `letterSpacing: -0.4`). The family comes from `sora.className` on the admin shell and dialogs. The sidebar wordmark stays Montserrat (`FONTS.T1`).
- When a new size or weight is needed, add it to `SIZES` / `WEIGHTS` (landing) or the `T2` table (back office) in `assets/fonts/index.ts` rather than writing raw values.

### Landing components worth knowing

- **`ImageSlot`**: cover-fit image box. Pass `ratio` for a fixed aspect ratio, otherwise it fills its parent. Shows a dashed labelled placeholder when `src` is missing.
- **`SectionContainer`**: the centred page-width column (`LANDING.maxWidth` + responsive gutter). Wrap every landing section in it.
- **`SplitSection`**: `SectionContainer` + eyebrow `label` over a `1fr 1.35fr` grid (heading in `aside`, body as `children`).
- **`SectionLabel`**: tracked uppercase eyebrow ("01 — The Place").
- **`Navbar`**: fixed header, transparent over the `#top` hero, solid cream once it scrolls past.
- **`Rooms` / `RoomCard`**: client component fetching `/api/rooms`, one full-height panel per room.

## Environment Variables

Kept in `.env` / `.env.local` (never commit them).

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres via the Supabase transaction-mode pooler, used by the app's Prisma client |
| `DIRECT_URL` | Postgres via the session-mode pooler, used by Prisma CLI / migrations |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (server client + proxy) |
| `SUPABASE_URL` / `SUPABASE_SECRET_KEY` | Server-only Storage client for room photos (`lib/supbase/storage.ts`). Never expose the secret key with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (`sb_publishable_…`) used by the server client and the proxy |
