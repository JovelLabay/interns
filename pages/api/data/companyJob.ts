import type { NextApiRequest, NextApiResponse } from 'next';
import CompanyJob from '../controllers/companyJob';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const companyList = new CompanyJob(req, res);

  switch (method) {
    case 'GET':
      companyList.getCompanyList();
      break;
    case 'POST':
      companyList.postCompanyList();
      break;
    case 'PUT':
      companyList.updateCompanyList();
      break;
    case 'DELETE':
      companyList.deleteCompanyList();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
