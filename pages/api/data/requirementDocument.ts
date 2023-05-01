import type { NextApiRequest, NextApiResponse } from 'next';
import RequirementDocument from '../controllers/requirementDocument';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requirementDocument = new RequirementDocument(req, res);
  const { method } = req;

  switch (method) {
    case 'GET':
      requirementDocument.getRequirementDocuments();
      break;
    case 'POST':
      requirementDocument.postRequirementDocuments();
      break;
    case 'PUT':
      requirementDocument.putRequirementDocuments();
      break;
    case 'DELETE':
      requirementDocument.deleteRequirementDocuments();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
