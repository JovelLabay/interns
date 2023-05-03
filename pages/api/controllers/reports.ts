import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

class Reports {
  private prisma = new PrismaClient();

  public getReports: () => Promise<void>;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { typeofQuery } = req.query;

    this.getReports = async () => {
      try {
        switch (typeofQuery) {
          case 'ELIGIBLE':
            const responsePayload = await this.prisma.student_User.findMany({
              where: {
                is_eligible: {
                  equals: true,
                },
              },
            });

            res.status(200).json({ message: 'ELIGIBLE', responsePayload });
            break;
          case 'COMPLETE':
            res.status(200).json({ message: 'COMPLETE' });
            break;
          case 'INCOMPLETE':
            res.status(200).json({ message: 'INCOMPLETE' });
            break;
          case 'APPLYING':
            res.status(200).json({ message: 'APPLYING' });
            break;
          case 'APPLIED':
            res.status(200).json({ message: 'APPLIED' });
            break;
          case 'FINISHED':
            res.status(200).json({ message: 'FINISHED' });
            break;
          default:
            res.status(400).json({ message: 'CLIENT_ERROR' });
        }
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
      }
    };
  }
}

export default Reports;
