-- Close the Supabase Data API (PostgREST) on every table: RLS with no policies.
-- The app only reads/writes through Prisma as the table owner, which bypasses RLS.
ALTER TABLE "Room" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RoomImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
