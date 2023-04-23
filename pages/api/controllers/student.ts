import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';

class Student {
  private prisma = new PrismaClient();

  public addStudent: () => Promise<void>;
  public getStudents: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    // const {} = req.body;

    const {
      id,
      bulkImport,
      schoolYear,
      schoolSemestre,
      collegeDepartment,
      skip,
    } = req.query;

    const parsedDataObjectSchoolYear =
      schoolYear && JSON.parse(schoolYear as string);
    const parsedDataObjectSchoolSemestre =
      schoolSemestre && JSON.parse(schoolSemestre as string);
    const parsedDataObjectCollegeDepartment =
      collegeDepartment && JSON.parse(collegeDepartment as string);

    const selection = {
      id: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      email: true,
      is_active: true,
    };

    const selection2nd = {
      id: true,
      student_profile_image: true,
      address: true,
      phone_number: true,
      self_introduction: true,
      date_of_birth: true,
      sex: true,
      student_verfication: true,
      student_status: true,
    };

    this.addStudent = async () => {
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
                firsName: d[0],
                middleName: d[1],
                lastName: d[2],
                email: d[3],
              };
            }) as {
              firsName: string;
              middleName: string;
              lastName: string;
              email: string;
            }[];

            try {
              objectedValuesArray.map(async (d) => {
                const upsertImported = await prisma.student_User.upsert({
                  where: {
                    email: d.email,
                  },
                  create: {
                    first_name: d.firsName,
                    last_name: d.lastName,
                    middle_name: d.middleName,
                    email: d.email,
                    school_semester_id: parsedDataObjectSchoolSemestre.id,
                  },
                  update: {
                    first_name: d.firsName,
                    last_name: d.lastName,
                    middle_name: d.middleName,
                  },
                });

                const upsertImportedUserProfile =
                  await prisma.student_User_Profile.upsert({
                    where: {
                      student_user_id: upsertImported.id,
                    },
                    create: {
                      student_user_id: upsertImported.id,
                      college_Department_Id:
                        parsedDataObjectCollegeDepartment.id,
                    },
                    update: {
                      student_user_id: upsertImported.id,
                      college_Department_Id:
                        parsedDataObjectCollegeDepartment.id,
                    },
                  });

                await prisma.activity_Logs.create({
                  data: {
                    activity_message: `Student imported: ${upsertImported.email}`,
                    activity_action: 'IMPORTED',
                    student_user_id: upsertImported.id,
                  },
                });

                await prisma.activity_Logs.create({
                  data: {
                    activity_message: `Student profile imported & created: ${upsertImported.email}`,
                    activity_action: 'IMPORTED & CREATED',
                    student_user_profile_id: upsertImportedUserProfile.id,
                  },
                });

                res.status(200).json({ message: 'Successful' });
              });
            } catch (error) {
              res.status(500).json({ message: 'Unsuccessful', error });
            }
          },
        });
      } else {
        res.send('Sdf');
      }
    };

    this.getStudents = async () => {
      try {
        const responsePayload = await this.prisma.student_User.findMany({
          where: {
            deletedAt: {
              equals: null,
            },
            school_semester_id: {
              equals: parsedDataObjectSchoolSemestre.id,
            },
            Student_User_Profile: {
              college_Department_Id: {
                equals: parsedDataObjectCollegeDepartment.id,
              },
            },
            ...(id && {
              id: {
                equals: Number(id),
              },
            }),
          },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            ...selection,
            school_semester: true,
            Student_User_Profile: {
              select: {
                ...selection2nd,
                College_Department: true,
              },
            },
          },
          skip: skip ? Number(skip) : 0,
          take: 20,
        });

        res.status(200).json({
          message: 'Successful',
          responsePayload,
          responsePayloadLength: responsePayload.length,
        });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default Student;
