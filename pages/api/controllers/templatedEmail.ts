import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

class EmailTemplate {
  private prisma = new PrismaClient();

  public postEmailTemplate: () => Promise<void>;
  public getEmailTemplate: () => Promise<void>;
  public putEmailTemplate: () => Promise<void>;
  public deleteEmailTemplate: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { data } = req.body;
    const { id } = req.query;

    this.postEmailTemplate = async () => {
      const {
        email_template_name,
        email_template_subject,
        email_template_body,
      } = JSON.parse(data);
      try {
        const checkTemplate = await this.prisma.email_Template.findFirst({
          where: {
            email_template_name: email_template_name,
            deletedAt: {
              equals: null,
            },
          },
        });
        if (checkTemplate) {
          res.status(200).json({ message: 'DUPLIDATE_EMAIL_TEMPLATE' });
        } else {
          const responsePayload = await this.prisma.email_Template.create({
            data: {
              email_template_name: email_template_name,
              email_template_subject: email_template_subject,
              email_template_body: email_template_body,
            },
          });
          res.status(200).json({ message: 'Successful', responsePayload });
        }
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.getEmailTemplate = async () => {
      try {
        const responsePayload = await this.prisma.email_Template.findMany({
          where: {
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

    this.putEmailTemplate = async () => {
      try {
        await this.prisma.email_Template.update({
          where: {
            id: Number(id),
          },
          data: {
            updatedAt: new Date(),
            ...JSON.parse(data),
          },
        });

        res.status(200).json({ message: 'Successful' });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.deleteEmailTemplate = async () => {
      try {
        await this.prisma.email_Template.update({
          where: {
            id: Number(id),
          },
          data: {
            deletedAt: new Date(),
          },
        });

        res.status(200).json({ message: 'Successful' });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default EmailTemplate;
