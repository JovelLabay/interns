import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

class CompanyJob {
  private prisma = new PrismaClient();

  public postCompanyList: () => Promise<void>;
  public getCompanyList: () => Promise<void>;
  public updateCompanyList: () => Promise<void>;
  public deleteCompanyList: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;

    const { id, companyId } = req.query;

    this.getCompanyList = async () => {
      try {
        const responsePayload = await this.prisma.company_Job_List.findMany({
          where: {
            company_list_id: Number(companyId),
            deletedAt: {
              equals: null,
            },
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
        console.log(error);
      }
    };

    this.postCompanyList = async () => {
      try {
        const { job_title, job_description, job_requirements } = JSON.parse(
          body.body
        );

        const responsePayload = await this.prisma.company_Job_List.create({
          data: {
            company_list_id: Number(companyId),
            job_title,
            job_requirements,
            job_description,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
      }
    };

    this.updateCompanyList = async () => {
      null;
    };

    this.deleteCompanyList = async () => {
      null;
    };
  }
}

export default CompanyJob;
