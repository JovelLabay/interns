import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next/types';
import Papa from 'papaparse';

class Company {
  private prisma = new PrismaClient();

  public postCompany: () => Promise<void>;
  public getCompany: () => Promise<void>;
  public updateCompany: () => Promise<void>;
  public deleteCompany: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;

    const { id, bulkImport } = req.query;

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
      try {
        if (bulkImport === 'true') {
          Papa.parse(req.body, {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
              const prisma = new PrismaClient();
              const valuesArray = results.data.map((d) => {
                return Object.values(d as string[]);
              });

              const objectedValuesArray = valuesArray.map((d: string[]) => {
                return {
                  company_name: d[0],
                  company_description: d[1],
                  company_address: d[2],
                  company_website: d[3],
                  company_email: d[4],
                  comapny_contact_person: d[5],
                };
              }) as {
                company_name: string;
                company_description: string;
                company_address: string;
                company_website: string;
                company_email: string;
                comapny_contact_person: string;
              }[];

              objectedValuesArray.map(async (d) => {
                const checkCompanyName = await prisma.company_List.create({
                  data: {
                    company_name: d.company_name,
                    company_description: d.company_description,
                    company_address: d.company_address,
                    company_website: d.company_website,
                    company_email: d.company_email,
                    comapny_contact_person: d.comapny_contact_person,
                  },
                });

                await prisma.activity_Logs.create({
                  data: {
                    activity_message: `Company with name: ${checkCompanyName.company_name}has imported.`,
                    activity_action: 'IMPORTED',
                    company_list_id: checkCompanyName.id,
                  },
                });

                res.status(200).json({ message: 'Successful' });
              });
            },
          });
        } else {
          const {
            company_name,
            company_description,
            company_image,
            company_address,
            company_website,
            company_email,
            comapny_contact_person,
          } = JSON.parse(body.data);

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
        }
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
