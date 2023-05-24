import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

class Recommendation {
  private prisma = new PrismaClient();

  public postRecommendation: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { studentId } = req.query;

    const { companyName, directSupervisor, companyAddress } = req.body;

    this.postRecommendation = async () => {
      try {
        const responsePayload = await this.prisma.student_Recommendation.create(
          {
            data: {
              student_User_Id: Number(studentId),
              company_name: companyName,
              company_address: companyAddress,
              supervisor_name: directSupervisor,
            },
          }
        );

        await this.prisma.activity_Logs.create({
          data: {
            student_Recommendation_Id: responsePayload.id,
            activity_message: `Student ${studentId} has requested a recommendation letter`,
            activity_action: 'REQUESTED',
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default Recommendation;
