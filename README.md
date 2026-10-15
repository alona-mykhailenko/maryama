# Maryama

Website for Maryama, a guest house in Imsouane, Morocco.

- **Public site**: landing page, room pages, an availability search and a booking request form. Requests are saved as pending until the hosts confirm them.
- **Admin area** (`/admin`): a bookings calendar and list where requests are confirmed or cancelled, plus room management (prices and photos).

Built with Next.js (App Router), Chakra UI, Prisma and Supabase (Postgres, Auth and Storage).

## Getting started

Create `.env.local` with the variables listed in [CLAUDE.md](CLAUDE.md#environment-variables), then:

```bash
npm install
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
