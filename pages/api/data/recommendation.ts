import type { NextApiRequest, NextApiResponse } from 'next';
import Recommendation from '../controllers/recommendation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recommendation = new Recommendation(req, res);
  const { method } = req;

  switch (method) {
    case 'POST':
      recommendation.postRecommendation();
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
