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
npx prisma generate    # Regenerate the Prisma client into src/generated/prisma
npx prisma migrate dev # Create/apply a migration (uses DIRECT_URL)
npx prisma db seed     # Seed rooms (prisma/seed.ts)
```

> There is no test suite yet.

## Architecture

**Framework**: Next.js 16 (App Router, React 19) with TypeScript. Application code lives in `src/`: the path alias `@/*` maps to `./src/*`. Config files, `prisma/` and `public/` stay at the root.

**Linting**: ESLint 9 with `eslint-config-next` (core-web-vitals + typescript).

### Project Structure

```
src/
├── app/                   # Routes ONLY: page.tsx, layout.tsx, route.ts (+ globals.css, favicon). No component files.
│   ├── admin/             # Back office: login/ + (protected)/ (calendar, bookings, rooms, rooms/[id])
│   ├── api/               # Route handlers (rooms, rooms/[id], rooms/[id]/images, rooms/availability, bookings, bookings/calendar, bookings/[id], auth/login, auth/logout)
│   ├── reserve/           # Availability search page
│   ├── rooms/[id]/        # Public room page + book/ (booking request form)
│   ├── layout.tsx         # Root layout, wraps everything in the Chakra + React Query providers
│   └── page.tsx           # Landing page
├── components/            # Generic UI with no domain knowledge
│   ├── ui/                # Primitives: text/ (Chakra Text with a `font` token prop), text-input/, text-area/
│   ├── providers/         # Chakra provider + Emotion cache, React Query provider
│   ├── site/              # Generic PUBLIC-SITE UI: ui/ (image-slot, section-container, section-label, split-section), layout/ (navbar, site-footer, page-shell), icons/
│   └── admin/             # Generic ADMIN UI: ui/ (DataTable, AdminButton, StatusBadge, …), layout/ (admin-shell, app-shell, sidebar, page-header, page-layout), icons/
├── services/              # Every API / data call: auth.ts, bookings.ts, rooms.ts (client fetchers + query keys), rooms-server.ts (server-only Prisma reads)
├── features/
│   ├── auth/              # types, schema (login zod schema)
│   ├── availability/      # Public availability search: calendar, form, date summary, room results, reserve-search; StayDates type
│   ├── bookings/          # Public booking UI (booking-form, book-room-view, stay-summary, …) + shared booking logic: types, schema, transitions
│   ├── landing/           # Landing page sections (hero, the-place, place-gallery, rooms, faq)
│   ├── room-details/      # Public room page (/rooms/[id]): room-overview, room-gallery, reserve-card, back-link
│   ├── rooms/             # Shared room logic only, no components: types (Room, RoomImage), image-rules
│   └── admin/             # Admin-only domain UI (+ logic only admin uses)
│       ├── bookings/      # components/ (booking-actions, guest-cell), status.ts (status → badge tone)
│       ├── calendar/      # components/ (week/month views, toolbar, legend), types.ts (CalendarView), use-calendar-bookings.ts
│       └── rooms/         # components/ (image-upload-dialog, room-image-gallery, room-price-card, room-upcoming-bookings)
├── config/content.ts      # All site copy
├── theme/                 # colors (COLORS), fonts (Montserrat/Sora + FONTS), admin-tokens (ADMIN), landing-tokens (LANDING)
├── lib/
│   ├── prisma.ts          # Shared Prisma client (pg driver adapter), server-only
│   ├── auth.ts            # getAdmin / isAdmin / requireAdmin, server-only
│   ├── dates.ts           # Calendar date helpers; parseDay() for DATE columns
│   └── supabase/          # Supabase server client, storage client, proxy session refresh (all server-only), cookie options
├── generated/prisma/      # Generated Prisma client (gitignored), do not edit
└── proxy.ts               # Next.js proxy (middleware): guards /admin/*
prisma/                    # schema.prisma, migrations, seed.ts
public/images/             # Landing photos
```

**Pages are server components that load data directly; only interactive parts are client components.** A `page.tsx` has no `"use client"`: it reads data straight from the database through `@/services/rooms-server` (never over HTTP from its own `/api`), exports `generateMetadata` when the title depends on that data, and calls `notFound()` for invalid or unknown ids (a database error is left to the error page, not turned into a 404). Every interactive part is its own `"use client"` component in its feature folder (`features/<domain>/components/<name>/`), receives only plain serialisable props from the server (ids, prices, capacities — no functions), and owns its state and its client API calls through React Query and the fetchers in `@/services/<domain>.ts` (relative URLs). Example: `app/rooms/[id]/page.tsx` → `RoomOverview` (server) → `ReserveCard` (the only client component, calls `checkAvailability`). Other components stay presentational and never call the API. Admin pages are still client pages using React Query directly. Every admin page renders inside `PageLayout` (`@/components/admin/layout/page-layout`: `heading`, `actions`, `toolbar` for full-width bars like filter tabs or the back link); it owns the gutter and vertical padding, so pages and admin UI components never add `px={ADMIN.gutter}` themselves The one exception is `DataTable`, which is full-bleed: it uses Chakra's `Bleed` to cancel the layout's gutter and top padding and insets its first/last columns by `ADMIN.gutter`. `app/` never holds component files.

**Where a file goes:**
- `components/site/` = generic public-site UI, `components/admin/` = generic admin UI. No domain knowledge: they take plain props (a `StatusBadge` gets a `tone`, not a booking).
- `features/<domain>/` = public domain UI + domain logic shared by both sides (anything imported by public code, `services/` or an API route stays here, e.g. `bookings/types`, `bookings/schema`, `bookings/transitions`, `rooms/types`, `rooms/image-rules`).
- `features/admin/<domain>/` = admin-only domain UI, and logic that only admin code uses (`admin/bookings/status.ts`, `admin/calendar/types.ts`). Admin code may import from `features/<domain>/`.
- **Public code never imports from `features/admin/`.** Only `app/admin/`, `components/admin/` and `features/admin/` may.
- `"use client"` doesn't decide the folder; what the component is about does. Never duplicate a file to split it between the two sides.

**Server-only data files start with `import "server-only";`** (the `server-only` package): anything that imports Prisma (`@/lib/prisma`), the Supabase server/storage/proxy clients, secret env vars or `next/headers`. Currently `lib/prisma.ts`, `lib/auth.ts`, `lib/supabase/server.ts`, `lib/supabase/storage.ts`, `lib/supabase/proxy.ts` and `services/rooms-server.ts`. Route handlers (`route.ts`) and the proxy are server-only by nature and don't need it. Never add it to `services/rooms.ts` / `bookings.ts` / `auth.ts`: client components import those.

Each component lives in its own folder as `index.tsx` (+ `props.ts` when it has a props interface). Sub-components get a sub-folder (e.g. `faq/faq-item/`). **Extract a separate component whenever a piece of UI is reusable or makes a section easier to read.**

**No inline functions in JSX props.** Never write `onClick={() => …}`, `onChange={(value) => …}`, `getRowId={(row) => …}` etc. Declare a named handler in the component body (`const handleClose = () => onOpenChange(false);`) or a module-level helper when it uses no state (`const getRoomRowId = (room: Room) => String(room.id);`), then pass it by name: `onClick={handleClose}`. Pass an existing function directly when the signatures match (`onPageChange={setPage}`). Inside a `.map`, don't bind the item with an arrow: give the item component the value and have it call back with it (`<PagePill page={token} onClick={onPageChange} />`, where `PagePill` calls `onClick(page)` from its own `handleClick`). TanStack column definitions (`cell`, `header`) are config, not props, and are exempt.

### Data & API

- **Database**: Prisma 7 with the `prisma-client` generator and `@prisma/adapter-pg`. Import the client from `@/lib/prisma`, never instantiate a new one. Config is in `prisma7.config.ts`.
- **Models**: `Room`, `RoomImage`, `Booking` (see `prisma/schema.prisma`). Prices are whole euros.
- **Row Level Security**: every table in `public` (including `_prisma_migrations`) has RLS enabled with **no policies**, so the Supabase Data API (`/rest/v1`) returns nothing with the publishable key. The app only accesses data through Prisma, which connects as the `postgres` owner and bypasses RLS (don't `FORCE` it). Any new table needs `ALTER TABLE "<Table>" ENABLE ROW LEVEL SECURITY;` in its migration (`--create-only`, then add the line).
- **Public routes** (no auth): `GET /api/rooms` and `GET /api/rooms/[id]` return rooms with their images ordered by `position`. Never return booking/guest data from public routes.
- **Booking requests**: `POST /api/bookings` is public (the `/rooms/[id]/book` form). It validates with `bookingRequestSchema` (`src/features/bookings/schema.ts`, shared with the form), checks capacity and overlaps in a serializable transaction (409 `dates_unavailable`), always creates the booking as `PENDING`, and returns only `{ id, status }`.
- **Admin routes**: `GET /api/bookings` (every booking as an array; with `?page=&pageSize=&status=` one page as `{ items, total, page, pageSize, pageCount }`), `GET /api/bookings/calendar?from=&to=` (non-cancelled bookings overlapping the range, calendar fields only; the calendar fetches it per month via `useCalendarBookings`), `PATCH /api/bookings/[id]` (status), `POST /api/rooms/[id]/images` (multipart `files`), `DELETE /api/rooms/[id]/images/[imageId]`. Every admin route handler checks `getAdmin()` and returns 401 otherwise — the proxy only guards `/admin/*` pages, not `/api`.
- **Room photos**: stored in the public Supabase Storage bucket `rooms-images` under `rooms/<roomId>/`, accessed only server-side through `createStorageClient()` (`src/lib/supabase/storage.ts`, secret key, call after `getAdmin()`). `RoomImage.url` holds the public URL; the object path is derived from it on delete. Accepted types/size limit live in `src/features/rooms/image-rules.ts`, shared by the API and the upload dialog.
- **Client data**: fetchers + query keys live in `src/services/` (`rooms.ts`, `bookings.ts`, `auth.ts`), types in each feature's `types.ts`. They are called through React Query (`useQuery` / `useMutation`) from client pages and interactive client components. Server pages read through `src/services/rooms-server.ts` (`server-only`, public fields only). Enums come from `@/generated/prisma/enums` (safe to import client-side).
- **Admin auth**: Supabase Auth via `@supabase/ssr`, httpOnly cookies only (there is no browser Supabase client). `src/proxy.ts` refreshes the session and redirects unauthenticated `/admin/*` requests to `/admin/login`. In server code use `requireAdmin()` from `@/lib/auth`.

### Localization

None for now. All copy is plain English in `src/config/content.ts`. Do not add next-intl or translation keys.

## UI

**Chakra UI v3** with Emotion (`src/components/providers/provider.tsx`, `defaultSystem`). No Tailwind: style with Chakra props only.

### Styling

- **Inline Chakra style props only.** Write props directly on the element (`<Box position="absolute" inset="0">`). No `styles.ts` files and no `const styles = {...}` objects.
- **Prefer `VStack` / `HStack`** over `Stack`, `Flex` or a wrapper `Box` for rows and columns. Both default to `align="center"` and `gap="0.5rem"`, so pass `align="stretch"` for columns of block content and an explicit `gap` (`gap="0"` if none).
- Don't put a `maxW` + `mx="auto"` container inside a stretched `VStack`: the auto margins shrink it to its content width. Keep those section wrappers as `Box`, or use `SectionContainer`.
- **Responsive values**: Chakra object syntax, `{ base: '24px', md: '40px' }`. Spacing is written in px.
- **Icons**: plain inline `<svg>` components with `fill="none"` and `stroke="currentColor"`, so they inherit color from their parent: `src/components/site/icons/` for the landing page, `src/components/admin/icons/` (Lucide geometry on the shared `IconBase`) for the back office. No icon libraries.

### Colors

- **Never hardcode hex values in JSX.** Use tokens:
  - `COLORS` from `@/theme/colors`, organised as **semantic tokens first, palettes second**:
    - `Bg`: `Default` (white back-office surface), `Subtle`, `Muted`, `Emphasized`, `Inverted` (`#221616` dark fills), `Brand` (`#F4EBDD` cream ground).
    - `Border`: `Default`, `Subtle`, `Emphasized` (dashed outlines), `Inverted`, `Brand` (form underline), `Error`.
    - `Text`: `Fg` (`#221616`), `FgSecondary`, `FgMuted`, `FgSubtle`, `FgFaint`, `FgDisabled`, `FgInverted` (cream on dark), `FgContrast` (white on dark), `FgError`.
    - Palettes: `Earth` (`LightCream` → `DarkBrown`) and `Accent` (`Terracotta`, `Olive`, `Sage`, `LightRed`).
  - **Pick by role, not by hue**: a background uses `Bg.*`, a border `Border.*`, text `Text.*`. Reach for a palette colour only when no semantic token fits.
  - `LANDING` from `@/theme/landing-tokens` on the landing page: `cream` (page ground), `ink` (text, borders, dark sections), `hairline` / `hairlineOnDark` / `hairlineOnDarkStrong`, `maxWidth` (`1240px`), `gutter` and the `space` scale.
- **Landing spacing** comes from `LANDING.space` (8px grid, responsive): `section` (80/128px) is the top padding of every section, plus the bottom of the last one before the footer; `related` (48/80px) is for a block that continues the previous one; `label` for eyebrow → content; `columns`, `gallery` and `stack` for gaps. Use `LANDING.gutter` for every horizontal page edge (navbar and hero included). Don't invent one-off section paddings.
- The design is two-colour: cream ground + near-black ink brown. Use the palette/accent tones sparingly.
- **Text on dark grounds**: landing (hero, room cards, footer) `color={COLORS.Text.FgInverted}`; back office (active nav, primary buttons, confirmed status) `COLORS.Text.FgContrast`.
- Photo scrims/veils use `rgba(18, 18, 18, <alpha>)` gradients inline. That is the only accepted raw color value.
- `src/app/globals.css` sets the body background/color to the same cream/ink so there is no flash before Chakra loads. Keep them in sync if the tokens change.
- **Back office** (`/admin`): `Bg.Default` surfaces with `Bg.Subtle` / `Bg.Muted` tints and `Border.Default` / `Border.Subtle` hairlines; dark fills use `Bg.Inverted`; errors use `Text.FgError` (solid danger buttons `Accent.LightRed`). Layout constants (sidebar width, header height, gutter, radii) are in `ADMIN` from `src/theme/admin-tokens.ts`.
- When a new color is needed, add it to the right semantic group in `COLORS` (or a palette) first, then use the token. Never hardcode hex values in components.

### Fonts

- **Typeface**: Montserrat via `next/font/google` (`montserrat` in `@/theme/fonts`, all weights 100–900). The landing page applies `montserrat.className` on its root `Box`.
- **Type scale**: `FONTS.T1.<size>.<weight>`, e.g. `FONTS.T1.T14px.Light`.
  - Sizes: `T9px`, `T10px`, `T12px`, `T13px`, `T14px`, `T16px`, `T22px`, `T24px`, `T30px`, `T34px`, `T40px`, `T56px`. Each carries its own line height. Sizes from 22px up are fluid `clamp()` values capped at their nominal size, except `T30px`, which is fixed (hero wordmark).
  - Weights: `ExtraLight` (200), `Light` (300), `Regular` (400), `Medium` (500), `SemiBold` (600), `Bold` (700).
- **Always render text through the core `<Text>`** (`@/components/ui/text`) with a `font` token: `<Text font={FONTS.T1.T14px.Light}>`. Don't set `fontSize` / `fontWeight` / `lineHeight` by hand on text.
- `Text` defaults to `COLORS.Text.Fg` and `display="block"`, and accepts `hoverColor`.
- **Letter-spacing, uppercase and opacity** go on a wrapping `Box`, not on `Text`:
  ```tsx
  <Box letterSpacing=".34em" textTransform="uppercase" opacity={0.5}>
    <Text font={FONTS.T1.T9px.Regular}>01 — The Place</Text>
  </Box>
  ```
- The look is light, airy and wide-tracked: headings mostly `ExtraLight`/`Light`, labels small uppercase with wide letter-spacing (`.24em`–`.44em`). Follow existing sections for consistency.
- **Back office** uses typeface 2 — Sora — via `FONTS.T2.<size>.<variant>`: fixed sizes `T10px`, `T12px`, `T14px`, `T16px`, `T18px`, `T20px`, `T24px`, `T30px`, `T36px`, `T48px`, `T60px`, `T72px` (2xs → 7xl), each with `Title` / `Light` / `Regular` / `Medium` / `SemiBold` and an explicit px line height (60/72px body variants add `letterSpacing: -0.4`). The family comes from `sora.className` on the admin shell and dialogs. The sidebar wordmark stays Montserrat (`FONTS.T1`).
- When a new size or weight is needed, add it to `SIZES` / `WEIGHTS` (landing) or the `T2` table (back office) in `src/theme/fonts.ts` rather than writing raw values.

### Public-site components worth knowing (`components/site/`)

- **`ImageSlot`**: cover-fit image box. Pass `ratio` for a fixed aspect ratio, otherwise it fills its parent. Shows a dashed labelled placeholder when `src` is missing.
- **`SectionContainer`**: the centred page-width column (`LANDING.maxWidth` + responsive gutter). Wrap every landing section in it.
- **`SplitSection`**: `SectionContainer` + eyebrow `label` over a `1fr 1.35fr` grid (heading in `aside`, body as `children`).
- **`SectionLabel`**: tracked uppercase eyebrow ("01 — The Place").
- **`Navbar`**: fixed header, transparent over the `#top` hero, solid cream once it scrolls past.
- **`Rooms` / `RoomCard`**: one full-height panel per room; the landing page loads the rooms on the server and passes them in.

## Environment Variables

Kept in `.env` / `.env.local` (never commit them).

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres via the Supabase transaction-mode pooler, used by the app's Prisma client |
| `DIRECT_URL` | Postgres via the session-mode pooler, used by Prisma CLI / migrations |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (server client + proxy) |
| `SUPABASE_URL` / `SUPABASE_SECRET_KEY` | Server-only Storage client for room photos (`src/lib/supabase/storage.ts`). Never expose the secret key with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (`sb_publishable_…`) used by the server client and the proxy |
