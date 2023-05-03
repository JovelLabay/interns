import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Reports from '../controllers/reports';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reports = new Reports(req, res);
  const { method } = req;

  switch (method) {
    case 'GET':
      reports.getReports();
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
