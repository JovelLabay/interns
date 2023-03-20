// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  const data = await prisma.user.findMany({
    include: {
      posts: {
        include: {
          categories: true,
        },
      },
      profile: true,
    },
  });

  if (req.method === 'GET') {
    res.status(200).json({ message: 'GET request', other: data });
  } else {
    res.status(200).json({ message: 'POST request' });
  }
}
