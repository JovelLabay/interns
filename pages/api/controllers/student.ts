import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';

class Student {
  private prisma = new PrismaClient();

  public addStudent: () => Promise<void>;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    // const {} = req.body;

    const { id, bulkImport } = req.query;

    this.addStudent = async () => {
      if (bulkImport === 'true') {
        Papa.parse(req.body, {
          header: true,
          skipEmptyLines: true,
          complete: async function (results) {
            const valuesArray = results.data.map((d: any) => {
              return Object.values(d);
            });

            try {
              res.status(200).json({
                message: 'Successful',
                responsePayload: valuesArray,
              });
            } catch (error) {
              res.status(500).json({ message: 'Unsuccessful', error });
            }
          },
        });
      } else {
        res.send('Sdf');
      }
    };
  }
}

export default Student;
