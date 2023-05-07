import type { NextApiRequest, NextApiResponse } from 'next';
import Users from '../controllers/adminUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = new Users(req, res);
  const { method } = req;

  switch (method) {
    case 'GET':
      users.getUsers();
      break;
    case 'POST':
      users.postUser();
      break;
    case 'PUT':
      users.putUser();
      break;
    case 'DELETE':
      users.deleteUser();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
