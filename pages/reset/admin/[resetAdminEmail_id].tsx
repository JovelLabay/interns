// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import SecondayStaticFooter from '@component/blocks/staticPage/SecondayStaticFooter';
import resetPasswordIllustration from '@/assets/images/resetPassword/resetPassword.jpg';
import { LogSignValidator } from '@validator/forms';

import classNames from 'classnames';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';

import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';

function ResetAdminEmail() {
  const [isExpired, setIsExpired] = React.useState(false);
  const router = useRouter();

  const [submit, setSubmit] = useState({
    isSubmitting: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LogSignValidator),
  });

  const decoded = jwt.decode(router.query.resetAdminEmail_id as string) as {
    email: string;
    time: string;
    iat: number;
  };

  useEffect(() => {
    document.title = 'School | Reset Password';

    if (decoded !== null) {
      setValue('email', decoded.email);
      const inputDate = new Date(Number(decoded.time));

      setIsExpired(isWithinFiveMinutes(inputDate));
    }
  }, [decoded]);

  return (
    <div>
      <Head>
        <title>Interns | Get Started</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-10 bg-primaryYellow py-10 md:gap-14 md:py-0">
        <div className="max-w-[400px] rounded-md bg-white p-5">
          {/* TITLE */}
          <h2 className="mb-5 text-center text-[16px] md:text-[20px] lg:text-[28px]">
            <span className="font-bold">
              School | <span className="font-light">Forgot Password</span>
            </span>
          </h2>

          {!isExpired ? (
            <div className="flex flex-col items-center justify-center">
              <Image src={resetPasswordIllustration} objectFit="fill" />
              <h3 className="text-center font-medium text-secondaryWhite">
                This password reset Link has expired
              </h3>
            </div>
          ) : (
            <form
              className="mx-auto grid w-[300px] grid-cols-1 gap-4"
              onSubmit={(e) => {
                e.preventDefault();

                handleSubmit((data) => {
                  sendPasswordReset(data);
                })();
              }}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-secondaryWhite">
                  Password
                </label>
                <input
                  className={classNames(
                    'rounded border-2 border-primaryYellow py-3 px-2 outline-none',
                    {
                      'border-red-500 bg-red-100 placeholder:text-white':
                        errors.password,
                    }
                  )}
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                />
                {errors.password?.message && (
                  <p className="rounded bg-red-100 p-2 text-center text-xs text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <button
                className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-primaryYellow py-2 font-semibold text-secondaryWhite duration-150 hover:cursor-pointer hover:bg-primaryYellowHover"
                type="submit"
              >
                {(function () {
                  if (submit.isSubmitting) {
                    return 'Sending...';
                  } else {
                    return 'Forgot Password';
                  }
                })()}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* TOAST */}
      <ToastContainer />
    </div>
  );

  function isWithinFiveMinutes(dateTimeStr: Date) {
    const inputDate = new Date(dateTimeStr);
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

    if (inputDate >= fiveMinutesAgo && inputDate <= fiveMinutesFromNow) {
      // console.log('Input time is within 5 minutes of current time.');
      return true;
    } else {
      // console.log('Input time is NOT within 5 minutes of current time.');
      return false;
    }
  }

  function sendPasswordReset(data: FormLogin) {
    setSubmit({
      isSubmitting: true,
    });

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: '/api/data/adminUser?resetPassword=true',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then((res) => {
        const response = res.data.message;

        if (response === 'THE_SAME_PASSWORD') {
          setSubmit({
            isSubmitting: false,
          });
          reset();

          warningNotify(
            'You cannot use the same password as your current password'
          );
        } else {
          setSubmit({
            isSubmitting: false,
          });
          document.cookie =
            'authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          reset();
          successfulNotify('Password reset successful. You can now login');

          setTimeout(() => {
            router.push('/user/school/login');
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);

        setSubmit({
          isSubmitting: false,
        });

        errorNotify('Something went wrong');
      });
  }
}

export default ResetAdminEmail;

ResetAdminEmail.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayStaticFooter />
    </>
  );
};
