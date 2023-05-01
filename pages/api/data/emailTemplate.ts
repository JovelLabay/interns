import type { NextApiRequest, NextApiResponse } from 'next';
import EmailTemplate from '../controllers/emailTemplate';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emailTemplate = new EmailTemplate(req, res);

  const { method } = req;

  switch (method) {
    case 'GET':
      emailTemplate.getEmailTemplate();
      break;
    case 'POST':
      emailTemplate.postEmailTemplate();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
