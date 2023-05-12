import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

class Company {
  private prisma = new PrismaClient();

  public postCompany: () => Promise<void>;
  public getCompany: () => Promise<void>;
  public updateCompany: () => Promise<void>;
  public deleteCompany: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;

    const { id } = req.query;

    this.getCompany = async () => {
      try {
        const responsePayload = await this.prisma.company_List.findMany({
          where: {
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

    this.postCompany = async () => {
      const {
        company_name,
        company_description,
        company_image,
        company_address,
        company_website,
        company_email,
        comapny_contact_person,
      } = JSON.parse(body.data);

      try {
        const checkCompanyName = await this.prisma.company_List.findFirst({
          where: {
            company_name,
            deletedAt: {
              equals: null,
            },
          },
        });

        if (checkCompanyName) {
          res.status(200).json({ message: 'COMPANY_NAME_EXIST' });
        } else {
          const responsePayload = await this.prisma.company_List.create({
            data: {
              company_name,
              company_description,
              company_image,
              company_address,
              company_website,
              company_email,
              comapny_contact_person,
            },
          });

          await this.prisma.activity_Logs.create({
            data: {
              activity_message: `Company added: ${responsePayload.company_name} `,
              activity_action: 'ADDED',
              company_list_id: responsePayload.id,
            },
          });
        }

        res.status(200).json({ message: 'Successful' });
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
      }
    };

    this.updateCompany = async () => {
      const {
        company_name,
        company_description,
        company_image,
        company_address,
        company_website,
        company_email,
        comapny_contact_person,
      } = JSON.parse(body.body);

      try {
        const responsePayload = await this.prisma.company_List.update({
          where: {
            id: Number(id),
          },
          data: {
            company_name,
            company_description,
            company_image,
            company_address,
            company_website,
            company_email,
            comapny_contact_person,
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `Company updated: ${responsePayload.company_name} `,
            activity_action: 'UPDATED',
            company_list_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful' });
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
      }
    };

    this.deleteCompany = async () => {
      try {
        const responsePayload = await this.prisma.company_List.update({
          where: {
            id: Number(id),
          },
          data: {
            deletedAt: new Date(),
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `Company deleted: ${responsePayload.company_name} `,
            activity_action: 'DELETED',
            company_list_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful' });
      } catch (error) {
        res.status(400).json({ message: 'Unsuccessful' });
      }
    };
  }
}

export default Company;
