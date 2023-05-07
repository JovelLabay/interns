import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

class Reports {
  private prisma = new PrismaClient();

  public getReports: () => Promise<void>;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { typeofQuery } = req.query;

    this.getReports = async () => {
      try {
        if (typeofQuery === 'ELIGIBLE') {
          const responsePayload = await this.prisma.student_User.findMany({
            where: {
              is_eligible: {
                equals: true,
              },
            },
          });

          res.status(200).json({ message: 'ELIGIBLE', responsePayload });
        } else if (typeofQuery === 'COMPLETE') {
          res.status(200).json({ message: 'COMPLETE' });
        } else if (typeofQuery === 'INCOMPLETE') {
          res.status(200).json({ message: 'INCOMPLETE' });
        } else if (typeofQuery === 'APPLYING') {
          res.status(200).json({ message: 'APPLYING' });
        } else if (typeofQuery === 'APPLIED') {
          res.status(200).json({ message: 'APPLIED' });
        } else if (typeofQuery === 'FINISHED') {
          res.status(200).json({ message: 'FINISHED' });
        } else {
          res.status(400).json({ message: 'CLIENT_ERROR' });
        }
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
      }
    };
  }
}

export default Reports;
