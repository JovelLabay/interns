import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

class EmailTemplate {
  private prisma = new PrismaClient();

  public getEmailTemplate: () => Promise<void>;
  public postEmailTemplate: () => Promise<void>;
  public putEmailTemplate: () => Promise<void>;
  public deleteEmailTemplate: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { data } = req.body;
    const { id } = req.query;

    const { email_template_name, email_template_subject, email_template_body } =
      JSON.parse(data);

    this.postEmailTemplate = async () => {
      try {
        const checkTemplate = await this.prisma.email_Template.findFirst({
          where: {
            email_template_name: email_template_name,
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
              deletedAt: new Date(),
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
        console.log(error);
      }
    };
    this.putEmailTemplate = async () => {
      null;
    };
    this.deleteEmailTemplate = async () => {
      null;
    };
  }
}

export default EmailTemplate;
