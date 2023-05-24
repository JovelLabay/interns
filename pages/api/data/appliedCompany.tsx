import type { NextApiRequest, NextApiResponse } from 'next';
import AppliedCompany from '../controllers/appliedCompany';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const company = new AppliedCompany(req, res);

  switch (method) {
    case 'GET':
      company.getAppliedCompany();
      break;
    case 'POST':
      company.postAppliedCompany();
      break;
    case 'DELETE':
      company.deleteAppliedCompany();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
