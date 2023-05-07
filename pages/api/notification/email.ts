// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// APP DOMAIN
const appDomain = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // PAYLOAD
  const { subject, message, email, time, lastName, type } = req.body;

  // EMAIL CONTENT
  const content = {
    personalizations: [{ to: [{ email: email }], subject: subject }],
    from: { email: process.env.NEXT_DEFAULT_INTERNS_EMAIL },
    content: [
      selectionOfEmailType(type, {
        message,
        subject,
        time,
        lastName,
        email,
      }),
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

function selectionOfEmailType(
  type: string,
  objectContent: {
    message: string;
    subject: string;
    time: string;
    lastName: string;
    email: string;
  }
) {
  if (type === 'RESET_EMAIL') {
    const jsonWebToken = jwt.sign(
      {
        email: objectContent.email,
        time: objectContent.time,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );

    const contentConfiguration = {
      type: 'text/html',
      value: `
    <h4>Dear ${objectContent.lastName},</h4>

    <p>We received a request to reset your password. If you did not make this request, please ignore this email and your account will remain secure.</p>
    <p>If you did request a password reset, please follow the instructions below to create a new password:</p>

    <ol>
      <li>
        <a href="${appDomain}/reset/admin/${jsonWebToken}">Click here.</a>
      </li>
      <li>You will be redirected to a page where you can enter your new password. Please choose a strong password that is at least 8 characters long and contains a combination of uppercase and lowercase letters, numbers, and symbols.
      </li>
      <li>Once you have entered your new password, click the "Submit" button.
      </li>
    </ol>


    <p>Thank you for your prompt attention to this matter.</p>

    <h5>Best,</h5>
    <h4>Interns</h4>
    <h3>Developed by Eluvent Platforms</h3>
    `,
    };

    return contentConfiguration;
  }

  if (type === 'RESET_STUDENT_EMAIL') {
    const jsonWebToken = jwt.sign(
      {
        email: objectContent.email,
        time: objectContent.time,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );

    const contentConfiguration = {
      type: 'text/html',
      value: `
    <h4>Dear ${objectContent.lastName},</h4>

    <p>We received a request to reset your password. If you did not make this request, please ignore this email and your account will remain secure.</p>
    <p>If you did request a password reset, please follow the instructions below to create a new password:</p>

    <ol>
      <li>
        <a href="${appDomain}/reset/student/${jsonWebToken}">Click here.</a>
      </li>
      <li>You will be redirected to a page where you can enter your new password. Please choose a strong password that is at least 8 characters long and contains a combination of uppercase and lowercase letters, numbers, and symbols.
      </li>
      <li>Once you have entered your new password, click the "Submit" button.
      </li>
    </ol>


    <p>Thank you for your prompt attention to this matter.</p>

    <h5>Best,</h5>
    <h4>Interns</h4>
    <h3>Developed by Eluvent Platforms</h3>
    `,
    };

    return contentConfiguration;
  }

  if (type === 'ELIGIBILITY_EMAIL') {
    const contentConfiguration = {
      type: 'text/html',
      value: `
    <h4>Dear ${objectContent.lastName},</h4>

    <p>${objectContent.message}</p>

    <p>Any concerns about practicum, email your coordinatior.</p>

    <h5>Best,</h5>
    <h4>Interns</h4>
    <h3>Developed by Eluvent Platforms</h3>
    `,
    };

    return contentConfiguration;
  }

  if (type === 'OTHERS') {
    const contentConfiguration = {
      type: 'text/html',
      value: `
    <h4>Dear ${objectContent.lastName},</h4>

    <p>${objectContent.message}</p>

    <h5>Best,</h5>
    <h4>Interns</h4>
    <h3>Developed by Eluvent Platforms</h3>
    `,
    };

    return contentConfiguration;
  }

  return null;
}
