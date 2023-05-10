import type { NextApiRequest, NextApiResponse } from 'next';
import Company from '../controllers/company';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const company = new Company(req, res);

  switch (method) {
    case 'GET':
      company.getCompany();
      break;
    case 'POST':
      company.postCompany();
      break;
    case 'PUT':
      company.updateCompany();
      break;
    case 'DELETE':
      company.deleteCompany();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
