import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { comparePassword, hashPassword } from '@utils/backendFunction';

class Users {
  private prisma = new PrismaClient();

  public getUsers: () => Promise<void>;
  public postUser: () => Promise<void>;
  public putUser: () => Promise<void>;
  public deleteUser: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const {
      profileImage,
      email,
      password,
      firstName,
      middleName,
      lastName,
      levelOfUser,
      isActive,
    } = req.body;

    const { id, skip, isDeleted, authPassword, authEmail, checkAuth } =
      req.query;

    this.getUsers = async () => {
      try {
        if (isDeleted === 'true') {
          const responsePayload = await this.prisma.admin_User.findMany({
            where: {
              deletedAt: {
                not: null,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          responsePayload.forEach(async (item) => {
            await this.prisma.activity_Logs.create({
              data: {
                activity_message: `User extported: ${item.first_name} ${item.middle_name} ${item.last_name}`,
                activity_action: 'EXPORT',
                admin_user_id: item.id,
              },
            });
          });

          await this.prisma.admin_User.deleteMany({
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
          const responsePayload = await this.prisma.admin_User.findMany({
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
            select: {
              id: true,
              admin_user_image: true,
              first_name: true,
              middle_name: true,
              last_name: true,
              email_address: true,
              password: true,
              isActive: true,
              level_of_user: true,
              createdAt: true,
            },
          });

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

    this.postUser = async () => {
      // CHECK FOR UPON AUTHENTICATION
      if (authPassword && authEmail) {
        const responsePayload = await this.prisma.admin_User.findUnique({
          where: {
            email_address: authEmail as string,
          },
        });

        // CHECK IF ACCOUNT EXISTS
        if (responsePayload) {
          const responsePayloadPassword = responsePayload?.password as string;
          const checkpass = await comparePassword(
            authPassword as string,
            responsePayloadPassword
          );

          // CHECK IF PASSWORD IS CORRECT
          if (checkpass) {
            res.status(200).json({
              message: 'CORRECT_CREDENTIALS',
              responsePayload: jwt.sign(
                {
                  email: responsePayload?.email_address,
                  password: responsePayload?.password,
                },
                process.env.NEXT_PUBLIC_JWT_SECRET as string
              ),
              otherData: {
                name: `${responsePayload?.first_name} ${responsePayload?.middle_name} ${responsePayload?.last_name}`,
                levelOfUser: responsePayload?.level_of_user,
                image: responsePayload?.admin_user_image || '',
              },
            });

            await this.prisma.activity_Logs.create({
              data: {
                activity_message: `Admin user: ${responsePayload.first_name} ${responsePayload.middle_name} ${responsePayload.last_name} is logged in`,
                activity_action: 'LOGIN',
                admin_user_id: responsePayload.id,
              },
            });
          } else {
            res.status(200).json({
              message: 'INCORRECT_CREDENTIALS',
            });
          }
        } else {
          res.status(200).json({
            message: 'ACCOUNT_NOT_FOUND',
          });
        }

        // CHECK OLD TOKEN
      } else if (checkAuth) {
        const decoded = jwt.verify(
          checkAuth as string,
          process.env.NEXT_PUBLIC_JWT_SECRET as string
        ) as { email: string; password: string; iat: number };

        const responsePayload = await this.prisma.admin_User.findUnique({
          where: {
            email_address: decoded.email,
          },
        });

        if (
          responsePayload?.email_address === decoded.email &&
          responsePayload?.password === decoded.password
        ) {
          res.status(200).json({
            message: 'CORRECT_CREDENTIALS',
            responsePayload: jwt.sign(
              {
                email: responsePayload?.email_address,
                password: responsePayload?.password,
              },
              process.env.NEXT_PUBLIC_JWT_SECRET as string
            ),
            otherData: {
              name: `${responsePayload?.first_name} ${responsePayload?.middle_name} ${responsePayload?.last_name}`,
              levelOfUser: responsePayload?.level_of_user,
              image: responsePayload?.admin_user_image || '',
            },
          });

          await this.prisma.activity_Logs.create({
            data: {
              activity_message: `Admin user: ${responsePayload.first_name} ${responsePayload.middle_name} ${responsePayload.last_name} is relogged in`,
              activity_action: 'RELOGIN',
              admin_user_id: responsePayload.id,
            },
          });
        }

        // CREATE NEW USER
      } else {
        const hashedPassword = await hashPassword(password);

        try {
          const responsePayload = await this.prisma.admin_User.create({
            data: {
              admin_user_image: profileImage || null,
              first_name: firstName,
              middle_name: middleName,
              last_name: lastName,
              email_address: email,
              password: hashedPassword,
              level_of_user: levelOfUser,
            },
          });

          await this.prisma.activity_Logs.create({
            data: {
              activity_message: `New user created: ${responsePayload.first_name} ${responsePayload.middle_name} ${responsePayload.last_name}`,
              activity_action: 'CREATE',
              admin_user_id: responsePayload.id,
            },
          });

          res.status(200).json({ message: 'Successful', responsePayload });
        } catch (error) {
          res.status(500).json({ message: 'Unsuccessful', error });
        }
      }
    };

    this.putUser = async () => {
      try {
        const responsePayload = await this.prisma.admin_User.update({
          where: {
            id: Number(id),
          },
          data: {
            admin_user_image: profileImage || null,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            level_of_user: levelOfUser,
            isActive: isActive,
            updatedAt: new Date(),
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `User updated: ${responsePayload.first_name} ${responsePayload.middle_name} ${responsePayload.last_name}`,
            activity_action: 'UPDATED',
            admin_user_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };

    this.deleteUser = async () => {
      try {
        const responsePayload = await this.prisma.admin_User.update({
          where: {
            id: Number(id),
          },
          data: {
            deletedAt: new Date(),
          },
        });

        await this.prisma.activity_Logs.create({
          data: {
            activity_message: `User deleted: ${responsePayload.first_name} ${responsePayload.middle_name} ${responsePayload.last_name}`,
            activity_action: 'DELETED',
            admin_user_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
      }
    };
  }
}

export default Users;
