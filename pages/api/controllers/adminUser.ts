import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { hashPassword } from '@utils/backendFunction';

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

    const { id, skip, isDeleted } = req.query;

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
            activity_message: `New user created: ${firstName} ${middleName} ${lastName}`,
            activity_action: 'CREATE',
            admin_user_id: responsePayload.id,
          },
        });

        res.status(200).json({ message: 'Successful', responsePayload });
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });
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
            activity_message: `User updated: ${firstName} ${middleName} ${lastName}`,
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
