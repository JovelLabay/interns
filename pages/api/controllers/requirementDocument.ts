import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

class RequirementDocument {
  private prisma = new PrismaClient();

  public getRequirementDocuments: () => Promise<void>;
  public postRequirementDocuments: () => Promise<void>;
  public deleteRequirementDocuments: () => Promise<void>;
  public putRequirementDocuments: () => Promise<void>;

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
        const checkIfDocumentExists =
          await this.prisma.requirement_Document.findFirst({
            where: {
              college_department_id: Number(collegeDepartmentId),
              documentName: nameOfDocument,
              deletedAt: {
                equals: null,
              },
            },
          });

        if (checkIfDocumentExists) {
          res.status(200).json({ message: 'DOCUMENT_ALREADY_EXIST' });
        } else {
          const documentsPayload =
            await this.prisma.requirement_Document.create({
              data: {
                documentName: nameOfDocument,
                college_department_id: Number(collegeDepartmentId),
                bucketUrlOfDocument: bucketUrlOfDocument,
              },
            });

          res.status(200).json({ message: 'Successful', documentsPayload });
        }
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
      }
    };

    this.putRequirementDocuments = async () => {
      try {
        const documentsPayload = await this.prisma.requirement_Document.update({
          where: {
            id: Number(id),
          },
          data: {
            documentName: nameOfDocument,
            bucketUrlOfDocument: bucketUrlOfDocument,
          },
        });

        res.status(200).json({ message: 'Successful', documentsPayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default RequirementDocument;
