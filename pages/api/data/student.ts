import type { NextApiRequest, NextApiResponse } from 'next';
import Student from '../controllers/student';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const student = new Student(req, res);

  switch (method) {
    case 'GET':
      student.getStudents();
      break;
    case 'POST':
      student.addStudent();
      break;
    case 'PUT':
      student.putStudents();
      break;
    case 'DELETE':
      student.deleteStudents();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
