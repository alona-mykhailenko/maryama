import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await prisma.room.createMany({
    data: [
      { name: "Garden Double", description: "Quiet double room facing the garden.", pricePerNight: 90, capacity: 2 },
      { name: "Ocean View Suite", description: "Large suite with a sea-view balcony.", pricePerNight: 160, capacity: 3 },
      { name: "Family Room", description: "Two bedrooms, perfect for families.", pricePerNight: 190, capacity: 5 },
    ],
  });
}

main().finally(() => prisma.$disconnect());