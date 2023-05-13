import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '@utils/backendFunction';

import jwt from 'jsonwebtoken';

class AuthStudent {
  private prisma = new PrismaClient();

  public authenticateStudent: () => Promise<void>;
  public checkAuthenticationStudent: () => Promise<void>;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    const { authEmail, authPassword, checkAuth } = req.query;

    this.authenticateStudent = async () => {
      try {
        const authStudentPayload = await this.prisma.student_User.findUnique({
          where: {
            email: authEmail as string,
          },
        });

        if (authStudentPayload?.is_active === true) {
          const responsePayloadPassword =
            authStudentPayload?.password as string;
          const checkpass = await comparePassword(
            authPassword as string,
            responsePayloadPassword
          );

          if (checkpass) {
            res.status(200).json({
              message: 'CORRECT_CREDENTIALS',
              responsePayload: jwt.sign(
                {
                  email: authStudentPayload.email,
                  password: authStudentPayload.password,
                },
                process.env.NEXT_PUBLIC_JWT_SECRET as string
              ),
            });
          } else {
            res.status(200).json({ message: 'INCORRECT_PASSWORD' });
          }
        } else if (authStudentPayload?.is_active === false) {
          res.status(200).json({ message: 'ACCOUNT_IS_INACTIVE' });
        } else {
          res.status(200).json({ message: 'ACCOUNT_DOES_NOT_EXIST' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });

        console.error(error);
      }
    };

    this.checkAuthenticationStudent = async () => {
      try {
        const decoded = jwt.verify(
          checkAuth as string,
          process.env.NEXT_PUBLIC_JWT_SECRET as string
        ) as { email: string; password: string; iat: number };

        const responsePayload = await this.prisma.student_User.findUnique({
          where: {
            email: decoded.email,
          },
        });

        const studentDetails = await this.prisma.student_User_Profile.findFirst(
          {
            where: {
              student_user_id: responsePayload?.id,
            },
            include: {
              College_Department: true,
            },
          }
        );

        if (
          responsePayload?.email === decoded.email &&
          responsePayload?.password === decoded.password &&
          responsePayload.is_active
        ) {
          res.status(200).json({
            message: 'CORRECT_CREDENTIALS',
            responsePayload: jwt.sign(
              {
                email: responsePayload?.email,
                password: responsePayload?.password,
              },
              process.env.NEXT_PUBLIC_JWT_SECRET as string
            ),
            otherData: {
              ...studentDetails,
              email: responsePayload.email,
              firstName: responsePayload.first_name,
              middleName: responsePayload.middle_name,
              lastName: responsePayload.last_name,
              isEligible: responsePayload.is_eligible,
              semestreId: responsePayload.school_semester_id,
            },
          });
        } else {
          res.status(200).json({ message: 'INCORRECT_CREDENTIALS' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Unsuccessful', error });

        console.error(error);
      }
    };
  }
}

export default AuthStudent;
