import type { NextApiRequest, NextApiResponse } from 'next';
import AuthStudent from '../controllers/authStudent';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authStudent = new AuthStudent(req, res);

  const { method } = req;

  switch (method) {
    case 'POST':
      authStudent.authenticateStudent();
      break;
    case 'GET':
      authStudent.checkAuthenticationStudent();
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
