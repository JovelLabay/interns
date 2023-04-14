import type { NextApiRequest, NextApiResponse } from 'next';
import CollegeProgram from '../controllers/collegeProgram';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collegeProgram = new CollegeProgram(req, res);
  const { method } = req;

  switch (method) {
    case 'GET':
      collegeProgram.getCollegProgram();
      break;
    case 'POST':
      collegeProgram.postCollegProgram();
      break;
    case 'PUT':
      collegeProgram.putCollegProgram();
      break;
    case 'DELETE':
      collegeProgram.deleteCollegProgram();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
