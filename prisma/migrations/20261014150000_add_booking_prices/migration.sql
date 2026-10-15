-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "pricePerNight" INTEGER,
ADD COLUMN     "totalPrice" INTEGER;

-- Backfill existing bookings at their room's current price
UPDATE "Booking" b
SET "pricePerNight" = r."pricePerNight",
    "totalPrice"    = r."pricePerNight" * (b."checkOut" - b."checkIn")
FROM "Room" r
WHERE r."id" = b."roomId";

ALTER TABLE "Booking" ALTER COLUMN "pricePerNight" SET NOT NULL,
ALTER COLUMN "totalPrice" SET NOT NULL;
