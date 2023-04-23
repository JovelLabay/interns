import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/utils/backendFunction';

const prisma = new PrismaClient();

export const admin_user_list = [
  {
    first_name: 'Admin',
    middle_name: 'Admin',
    last_name: 'Admin',
    email_address: 'jovellabay@gmail.com',
    isActive: true,
  },
];

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
