import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '@utils/backendFunction';

class SchoolYearController {
  protected prisma = new PrismaClient();

  public postSchoolYear: () => Promise<void>;
  public deleteSchoolYear: () => Promise<void>;
  public putSchoolYear: () => Promise<void>;
  public getSchoolYear: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const {
      start_date,
      end_date,
      school_year_name,
      school_year_description,
      school_year_code,
      is_active,
    } = req.body;

    const { id } = req.query;

    const selection = {
      id: true,
      end_date: true,
      start_date: true,
      school_year_name: true,
      school_year_description: true,
      is_active: true,
      createdAt: true,
    };

    this.postSchoolYear = async () => {
      try {
        const checkSchoolYearCode = await this.prisma.school_Year.findFirst({
          where: {
            school_year_name,
            deletedAt: {
              equals: null,
            },
          },
        });

        if (checkSchoolYearCode) {
          res.status(200).json({
            message: 'School Year Code Already Exist',
          });
        } else {
          const responsePayload = await this.prisma.school_Year.create({
            data: {
              start_date: start_date,
              end_date: end_date,
              school_year_name,
              school_year_description,
              school_year_code: await hashPassword(school_year_code),
            },
            select: {
              ...selection,
              School_Semester: true,
            },
          });

          await this.prisma.activity_Logs.create({
            data: {
              activity_message: `New school year created: FROM:${start_date} END:${end_date}`,
              activity_action: 'CREATE',
              school_year_id: responsePayload.id,
            },
          });

          res.status(200).json({ message: 'Successful', responsePayload });
        }
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.deleteSchoolYear = async () => {
      try {
        const responsePayload = await this.prisma.school_Year.update({
          where: {
            id: Number(id),
          },
          data: {
            deletedAt: new Date(),
          },
          select: {
            ...selection,
            School_Semester: true,
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `School year deleted: ${responsePayload.school_year_name}`,
            activity_action: 'DELETE',
            school_year_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.putSchoolYear = async () => {
      try {
        const getAllSemesterUnderThisSchoolYear =
          await this.prisma.school_Year.findFirst({
            where: {
              id: Number(id),
            },
            include: {
              School_Semester: {
                where: {
                  is_active: true,
                },
              },
            },
          });

        const checkOtherSchoolYear = await this.prisma.school_Year.findFirst({
          where: {
            id: {
              not: Number(id),
            },
            deletedAt: null,
          },
        });

        if (getAllSemesterUnderThisSchoolYear?.School_Semester.length !== 0) {
          res.status(200).json({ message: 'THERE_ARE_ACTIVE_SCHOOL_SEMESTRE' });
        } else {
          if (checkOtherSchoolYear?.is_active) {
            res.status(200).json({ message: 'THERE_ARE_ACTIVE_SCHOOL_YEAR' });
          } else {
            const checkPassword = await this.prisma.school_Year.findUnique({
              where: {
                id: Number(id),
              },
            });

            const checkPasswordFirst = await comparePassword(
              school_year_code,
              checkPassword?.school_year_code as string
            );

            if (checkPasswordFirst) {
              const responsePayload = await this.prisma.school_Year.update({
                where: {
                  id: Number(id),
                },
                data: {
                  is_active,
                  school_year_description,
                  updatedAt: new Date(),
                },
                select: {
                  ...selection,
                  School_Semester: true,
                },
              });

              await this.prisma.activity_Logs.create({
                data: {
                  activity_message: `School year updated: ${responsePayload.school_year_name}`,
                  activity_action: 'UPDATE',
                  school_year_id: responsePayload.id,
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

    this.getSchoolYear = async () => {
      if (id) {
        try {
          const responsePayload = await this.prisma.school_Year.findMany({
            where: {
              id: Number(id),
              deletedAt: {
                equals: null,
              },
            },
            select: {
              ...selection,
              School_Semester: {
                where: {
                  deletedAt: {
                    equals: null,
                  },
                },
              },
            },
          });

          res.status(200).json({ message: 'Successful', responsePayload });
        } catch (error) {
          res.status(500).json({ message: 'Unsuccessful', error });
        }
      } else {
        try {
          const responsePayload = await this.prisma.school_Year.findMany({
            where: {
              deletedAt: {
                equals: null,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              ...selection,
              School_Semester: {
                where: {
                  deletedAt: {
                    equals: null,
                  },
                },
              },
            },
          });

          res.status(200).json({ message: 'Successful', responsePayload });
        } catch (error) {
          res.status(500).json({ message: 'Unsuccessful', error });
        }
      }
    };
  }
}

export default SchoolYearController;
