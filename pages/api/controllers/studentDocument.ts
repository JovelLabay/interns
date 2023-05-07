import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

class StudentDocument {
  private prisma = new PrismaClient();

  public getDocuments: () => Promise<void>;
  public upsertDocuments: () => Promise<void>;
  public putDocument: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { collegeId, studentUserProfileId } = req.query;

    const { data } = req.body;

    this.getDocuments = async () => {
      try {
        const requirementPayload =
          await this.prisma.requirement_Document.findMany({
            where: {
              college_department_id: Number(collegeId),
              deletedAt: {
                equals: null,
              },
            },
          });

        const studentSubmittedDocuments =
          await this.prisma.student_Submitted_Document.findMany({
            where: {
              student_user_profile_id: Number(studentUserProfileId),
            },
          });

        res.status(200).json({
          message: 'Successful',
          responsePayload: requirementPayload,
          submittedDocuments: studentSubmittedDocuments,
        });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.upsertDocuments = async () => {
      try {
        const parseData = JSON.parse(data);

        parseData.map(async (item: any) => {
          const submittedDocumentId = item.id + studentUserProfileId;

          await this.prisma.student_Submitted_Document.upsert({
            where: {
              id: Number(submittedDocumentId),
            },
            create: {
              id: Number(submittedDocumentId),
              student_user_profile_id: Number(studentUserProfileId),
              submitted_document_name: item.documentName,
            },
            update: {
              student_user_profile_id: Number(studentUserProfileId),
              submitted_document_name: item.documentName,
            },
          });
        });

        res.status(200).json({ message: 'Unsuccessful' });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.putDocument = async () => {
      try {
        const parseData = JSON.parse(data);

        await this.prisma.student_Submitted_Document.update({
          where: {
            id: parseData.id,
          },
          data: {
            submitted_document: parseData.submitted_document,
          },
        });
        res.status(200).json({ message: 'Unsuccessful' });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };
  }
}

export default StudentDocument;
