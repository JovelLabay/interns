// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@/src/firebase/firebaseConfig';
import { onValue, ref } from 'firebase/database';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = database;

  // GET JOB CATEGORIES
  const jobCategories = new Promise((resolve, reject) => {
    const internshipReference = ref(db, 'school/categories');
    onValue(internshipReference, (snapshot) => {
      const data = snapshot.val() === null ? {} : snapshot.val();

      resolve(data);
      reject('error');
    });
  });

  Promise.all([jobCategories])
    .then((data) => res.status(200).send(data))
    .catch((error) => res.send(error));
}
