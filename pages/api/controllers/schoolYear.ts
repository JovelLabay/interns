import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@utils/backendFunction';

class SchoolYearController {
  protected prisma = new PrismaClient();

  public postSchoolYear: () => Promise<void>;
  public getSchoolYear: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const {
      start_date,
      end_date,
      school_year_name,
      school_year_description,
      school_year_code,
      is_active,
    } = req.body;

    const { id, deactivate, year_code } = req.query;

    this.postSchoolYear = async () => {
      try {
        const responsePayload = await this.prisma.school_Year.create({
          data: {
            start_date: new Date(),
            end_date: new Date(),
            school_year_name,
            school_year_description,
            school_year_code,
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `New school year created: FROM:${'start_date'} END:${'end_date'}`,
            activity_action: 'CREATE',
            school_year_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.getSchoolYear = async () => {
      try {
        const responsePayload = await this.prisma.school_Year.findMany({
          where: {
            deletedAt: {
              equals: null,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default SchoolYearController;
