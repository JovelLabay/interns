import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '@utils/backendFunction';

class SchoolSemestreController {
  private prisma = new PrismaClient();

  public postSchoolSemestre: () => Promise<void>;
  public deleteSchoolSemestre: () => Promise<void>;
  public putSchoolSemestre: () => Promise<void>;
  public getSchoolSemestre: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const {
      school_semester_name,
      school_semester_description,
      school_semester_code,
      is_active,
    } = req.body;

    const { schoolYearId, id } = req.query;

    const selection = {
      id: true,
      school_semester_name: true,
      school_semester_description: true,
      is_active: true,
    };

    this.postSchoolSemestre = async () => {
      try {
        const responsePayload = await this.prisma.school_Semester.create({
          data: {
            school_semester_name,
            school_semester_description,
            school_semester_code: await hashPassword(school_semester_code),
            school_year_id: Number(schoolYearId),
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `New school semester created ${responsePayload.school_semester_name}`,
            activity_action: 'CREATE',
            school_semester_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.deleteSchoolSemestre = async () => {
      try {
        const responsePayload = await this.prisma.school_Semester.update({
          where: {
            id: Number(id),
          },
          data: {
            deletedAt: new Date(),
          },
          select: {
            ...selection,
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `School semester deleted: ${responsePayload.school_semester_name}`,
            activity_action: 'DELETE',
            school_semester_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.putSchoolSemestre = async () => {
      try {
        const checkSchoolYearIfActive =
          await this.prisma.school_Semester.findFirst({
            where: {
              id: Number(id),
            },
            include: {
              school_year: true,
            },
          });

        const checkOtherSchoolSemestreIfActive =
          await this.prisma.school_Semester.findFirst({
            where: {
              id: {
                not: Number(id),
              },
              deletedAt: null,
            },
          });

        if (!checkSchoolYearIfActive?.school_year.is_active) {
          res.status(200).json({
            message:
              'CANNOT_ACTIVATE_SEMESTRE_BECAUSE_SCHOOL_YEAR_IS_NOT_ACTIVE',
          });
        } else {
          if (checkOtherSchoolSemestreIfActive?.is_active) {
            res.status(200).json({
              message:
                'CANNOT_ACTIVATE_SEMESTRE_BECAUSE_OTHER_SCHOOL_SEMESTRE_IS_ACTIVE',
            });
          } else {
            const checkPassword = await this.prisma.school_Semester.findUnique({
              where: {
                id: Number(id),
              },
            });

            const checkPasswordFirst = await comparePassword(
              school_semester_code,
              checkPassword?.school_semester_code as string
            );

            if (checkPasswordFirst) {
              const responsePayload = await this.prisma.school_Semester.update({
                where: {
                  id: Number(id),
                },
                data: {
                  is_active,
                  school_semester_description,
                  updatedAt: new Date(),
                },
                select: {
                  ...selection,
                },
              });

              await this.prisma.activity_Logs.create({
                data: {
                  activity_message: `School semester updated: ${responsePayload.school_semester_name}`,
                  activity_action: 'UPDATED',
                  school_semester_id: responsePayload.id,
                },
              });

              res
                .status(200)
                .json({ message: 'CORRECT_PASSCODE', responsePayload });
            } else {
              res.status(200).json({ message: 'INCORRECT_PASSCODE' });
            }
          }
        }
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.getSchoolSemestre = async () => {
      try {
        const responsePayload = await this.prisma.school_Year.findMany({
          where: {
            deletedAt: {
              not: null,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            School_Semester: true,
          },
        });
        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };
  }
}

export default SchoolSemestreController;
