import type { NextApiRequest, NextApiResponse } from 'next';
import TemplatedEmail from '../controllers/templatedEmail';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emailTemplate = new TemplatedEmail(req, res);

  const { method } = req;

  switch (method) {
    case 'GET':
      emailTemplate.getEmailTemplate();
      break;
    case 'POST':
      emailTemplate.postEmailTemplate();
      break;
    case 'PUT':
      emailTemplate.putEmailTemplate();
      break;
    case 'DELETE':
      emailTemplate.deleteEmailTemplate();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
