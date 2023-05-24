import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

class AppliedCompany {
  private prisma = new PrismaClient();

  public postAppliedCompany: () => Promise<void>;
  public getAppliedCompany: () => Promise<void>;
  public deleteAppliedCompany: () => Promise<void>;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { studentId, id } = req.query;

    const {
      company_name,
      date_applied,
      direct_supervisor,
      contact_number,
      company_address,
    } = req.body;

    this.getAppliedCompany = async () => {
      try {
        const responsePayload =
          await this.prisma.student_Applying_Companies.findMany({
            where: {
              student_User_Id: Number(studentId),
              deletedAt: {
                equals: null,
              },
            },
          });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.postAppliedCompany = async () => {
      try {
        const responsePayload =
          await this.prisma.student_Applying_Companies.create({
            data: {
              student_User_Id: Number(studentId),
              company_name,
              date_applied,
              direct_supervisor,
              contact_number,
              company_address,
            },
          });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `Student with id ${responsePayload.student_User_Id} applied to ${company_name}`,
            activity_action: 'APPLIED',
            student_Applying_Companies_Id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful' });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.deleteAppliedCompany = async () => {
      try {
        const responsePayload =
          await this.prisma.student_Applying_Companies.update({
            where: {
              id: Number(id),
            },
            data: {
              deletedAt: new Date(),
            },
          });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `Student with id ${responsePayload.student_User_Id} deleted an application to ${responsePayload.company_name}`,
            activity_action: 'DELETED',
            student_Applying_Companies_Id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful' });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default AppliedCompany;
