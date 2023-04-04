import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// SEEDING FUNCTION
const seeding = async () => null;

// PERFORM THE SEEDING
seeding()
  .catch((data) => {
    console.log({
      data,
      message: 'Prisma seed has been executed',
    });
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
