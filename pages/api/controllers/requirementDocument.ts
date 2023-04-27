import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

class RequirementDocument {
  private prisma = new PrismaClient();

  public getRequirementDocuments: () => Promise<void>;
  public postRequirementDocuments: () => Promise<void>;
  public deleteRequirementDocuments: () => Promise<void>;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { id, collegeDepartmentId } = req.query;

    const { nameOfDocument, bucketUrlOfDocument } = req.body;

    this.getRequirementDocuments = async () => {
      try {
        const documentsPayload =
          await this.prisma.requirement_Document.findMany({
            where: {
              college_department_id: Number(collegeDepartmentId),
              deletedAt: {
                equals: null,
              },
            },
          });

        res.status(200).json({ message: 'Successful', documentsPayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.postRequirementDocuments = async () => {
      try {
        const documentsPayload = await this.prisma.requirement_Document.upsert({
          where: {
            documentName: nameOfDocument,
          },
          create: {
            documentName: nameOfDocument,
            college_department_id: Number(collegeDepartmentId),
            bucketUrlOfDocument: bucketUrlOfDocument,
          },
          update: {
            documentName: nameOfDocument,
            college_department_id: Number(collegeDepartmentId),
            bucketUrlOfDocument: bucketUrlOfDocument,
            deletedAt: null,
          },
        });

        res.status(200).json({ message: 'Successful', documentsPayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.deleteRequirementDocuments = async () => {
      try {
        await this.prisma.requirement_Document.update({
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
        console.log(error);
      }
    };
  }
}

export default RequirementDocument;
