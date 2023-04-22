// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // PAYLOAD
  const { companyEmail, message, subject } = req.body;

  // EMAIL CONTENT
  const content = {
    personalizations: [{ to: [{ email: companyEmail }], subject: subject }],
    from: { email: process.env.NEXT_DEFAULT_INTERNS_EMAIL },
    content: [
      {
        type: 'text/html',
        value: `
    <h5>Hi there,</h5>

    <p>${message}</p>

    <h5>Best,</h5>
    <h4>Interns</h4>
    <p>Developed by Eluvent Platforms</p>
    `,
      },
    ],
  };

  // AXIOS CONFIG
  const options = {
    method: 'POST',
    url: process.env.NEXT_RAPID_EMAIL_API_URL,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_RAPID_EMAIL_API_KEY || '',
      'X-RapidAPI-Host': process.env.NEXT_RAPID_EMAIL_API_HOST || '',
    },
    data: JSON.stringify(content),
  };

  if (req.method === 'POST') {
    try {
      await axios.request(options);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(500).send('Bad Request');
  }
}
