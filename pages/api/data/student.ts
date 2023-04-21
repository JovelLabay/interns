import type { NextApiRequest, NextApiResponse } from 'next';
import Papa from 'papaparse';
import Student from '../controllers/student';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const student = new Student(req, res);

  switch (method) {
    case 'GET':
      null;
      break;
    case 'POST':
      student.addStudent();
      break;
    case 'PUT':
      null;
      break;
    case 'DELETE':
      null;
      null;
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
