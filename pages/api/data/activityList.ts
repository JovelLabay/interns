import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const prisma = new PrismaClient();

  switch (method) {
    case 'GET':
      (async function () {
        const responsePayload = await prisma.activity_Logs.findMany();
        res.status(200).json({ message: 'Successful', responsePayload });
      })();
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
