import type { NextApiRequest, NextApiResponse } from 'next';
import SchoolYearController from '../controllers/schoolYear';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const schoolYearController = new SchoolYearController(req, res);
  const { method } = req;

  switch (method) {
    case 'GET':
      schoolYearController.getSchoolYear();
      break;
    case 'POST':
      schoolYearController.postSchoolYear();
      break;
    case 'PUT':
      null;
      break;
    case 'DELETE':
      null;
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
