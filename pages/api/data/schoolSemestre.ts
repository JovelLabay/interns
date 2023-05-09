import type { NextApiRequest, NextApiResponse } from 'next';
import SchoolSemestreController from '../controllers/schoolSemestre';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const schoolSemestreController = new SchoolSemestreController(req, res);
  const { method } = req;

  switch (method) {
    case 'GET':
      schoolSemestreController.getSchoolSemestre();
      break;
    case 'POST':
      schoolSemestreController.postSchoolSemestre();
      break;
    case 'PUT':
      schoolSemestreController.putSchoolSemestre()
      break;
    case 'DELETE':
      schoolSemestreController.deleteSchoolSemestre();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
