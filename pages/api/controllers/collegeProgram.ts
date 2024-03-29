import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

class CollegeProgram {
  private prisma = new PrismaClient();

  public postCollegProgram: () => Promise<void>;
  public getCollegProgram: () => Promise<void>;
  public putCollegProgram: () => Promise<void>;
  public deleteCollegProgram: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const {
      collegeLogo,
      departmentName,
      departmentDescription,
      coordinator,
      programName,
      abbreaviatedProgramName,
      practicum_coordinator_email,
    } = req.body;

    const { id, skip, isDeleted } = req.query;

    this.postCollegProgram = async () => {
      try {
        const checkCollegeName = await this.prisma.college_Department.findFirst(
          {
            where: {
              college_department_name: {
                equals: departmentName,
              },
              complete_program_name: {
                equals: programName,
              },
              deletedAt: {
                equals: null,
              },
            },
          }
        );

        if (checkCollegeName) {
          res.status(200).json({ message: 'DUPLICATE_COLLEGE_NAME' });
        } else {
          const responsePayload = await this.prisma.college_Department.create({
            data: {
              college_department_image: collegeLogo || null,
              college_department_name: departmentName,
              college_department_description: departmentDescription || null,
              college_coordinator: coordinator,
              complete_program_name: programName,
              abbreviated_program_name: abbreaviatedProgramName,
              practicum_coordinator_email: practicum_coordinator_email,
            },
          });

          await this.prisma.activity_Logs.create({
            data: {
              activity_message: `New College created: ${responsePayload.college_department_name}`,
              activity_action: 'CREATE',
              college_department_id: responsePayload.id,
            },
          });

          res.status(200).json({ message: 'Successful', responsePayload });
        }
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
        console.log(error);
      }
    };

    this.putCollegProgram = async () => {
      try {
        const responsePayload = await this.prisma.college_Department.update({
          where: {
            id: Number(id),
          },
          data: {
            college_department_image: collegeLogo || null,
            college_department_name: departmentName,
            college_department_description: departmentDescription || null,
            college_coordinator: coordinator,
            complete_program_name: programName,
            abbreviated_program_name: abbreaviatedProgramName,
            practicum_coordinator_email: practicum_coordinator_email,
            updatedAt: new Date(),
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `College updated: ${responsePayload.college_department_name}`,
            activity_action: 'UPDATE',
            college_department_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.deleteCollegProgram = async () => {
      try {
        const responsePayload = await this.prisma.college_Department.update({
          where: {
            id: Number(id),
          },
          data: {
            deletedAt: new Date(),
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `College deleted: ${responsePayload.college_department_name}`,
            activity_action: 'DELETE',
            college_department_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.getCollegProgram = async () => {
      try {
        if (isDeleted === 'true') {
          const responsePayload = await this.prisma.college_Department.findMany(
            {
              where: {
                deletedAt: {
                  not: null,
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            }
          );

          responsePayload.forEach(async (item) => {
            await this.prisma.activity_Logs.create({
              data: {
                activity_message: `College extported: ${item.college_department_name}`,
                activity_action: 'EXPORT',
                college_department_id: item.id,
              },
            });
          });

          await this.prisma.college_Department.deleteMany({
            where: {
              deletedAt: {
                not: null,
              },
            },
          });

          res.status(200).json({
            message: 'Successful',
            responsePayload,
            responsePayloadLength: responsePayload.length,
          });
        } else {
          const responsePayload = await this.prisma.college_Department.findMany(
            {
              where: {
                deletedAt: {
                  equals: null,
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
              skip: skip ? Number(skip) : 0,
              take: 20,
            }
          );

          res.status(200).json({
            message: 'Successful',
            responsePayload,
            responsePayloadLength: responsePayload.length,
          });
        }
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default CollegeProgram;
