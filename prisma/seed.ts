import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/utils/backendFunction';
import { admin_user_list } from './adminUser';

const prisma = new PrismaClient();

async function main() {
  await prisma.admin_User.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE admin_User AUTO_INCREMENT = 1;`;

  // users
  for (const admin_user_listing of admin_user_list) {
    await prisma.admin_User.create({
      data: {
        ...admin_user_listing,
        password: await hashPassword('123456'),
      },
    });
  }
}

main()
  .catch((e) => {
    console.log({
      e,
      message: 'Prisma seed has been executed',
    });
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
