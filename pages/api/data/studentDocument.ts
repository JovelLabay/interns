import type { NextApiRequest, NextApiResponse } from 'next';
import StudentDocument from '../controllers/studentDocument';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const studentDocument = new StudentDocument(req, res);
  const { method } = req;

  switch (method) {
    case 'GET':
      studentDocument.getDocuments();
      break;
    case 'POST':
      studentDocument.upsertDocuments();
      break;
    case 'PUT':
      studentDocument.putDocument();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
