import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

class Reports {
  private prisma = new PrismaClient();

  public getReports: () => Promise<void>;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { queryPayload } = req.query;

    const {
      eligibility,
      studentStatus,
      schoolSemestre,
      college,
    }: {
      eligibility: boolean;
      studentStatus: string;
      schoolSemestre: {
        name: string;
        id: number;
      };
      schoolYear: {
        name: string;
        id: number;
      };
      college: {
        name: string;
        id: number;
      };
    } = JSON.parse(queryPayload as string);

    const studentStatuses = () => {
      switch (studentStatus) {
        case 'Incomplete':
          return 'INCOMPLETE';
        case 'Complete':
          return 'COMPLETE';
        case 'Applying':
          return 'APPLYING';
        case 'Applied':
          return 'APPLIED';
        case 'Finished':
          return 'FINISHED';
        default:
          return 'NOT_STARTED';
      }
    };

    this.getReports = async () => {
      try {
        const studentListPayload = await this.prisma.student_User.findMany({
          where: {
            deletedAt: {
              equals: null,
            },
            school_semester_id: {
              equals: schoolSemestre.id,
            },
            is_eligible: {
              equals: eligibility,
            },
            Student_User_Profile: {
              student_status: studentStatuses(),
              college_Department_Id: {
                equals: college.id,
              },
            },
          },
          include: {
            Student_User_Profile: {
              include: {
                College_Department: true,
              },
            },
          },
        });

        res.status(200).json({ message: 'Successful', studentListPayload });
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
      }
    };
  }
}

export default Reports;
