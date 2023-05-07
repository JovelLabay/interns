// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import { useRouter } from 'next/router';

// FOOTER OR HEADER
import SecondayStaticFooter from 'lib/components/blocks/staticPage/SecondayStaticFooter';

// TOAST AND LOADER
import { ToastContainer } from 'react-toastify';
import SplashLoading from '@component//interface/loading/SplashLoading';
import classNames from 'classnames';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogSignValidator } from '@validator/forms';
import axios from 'axios';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';

function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [submit, setSubmit] = useState({
    isSubmitting: false,
    incorrect: false,
    notFound: false,
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm<FormLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LogSignValidator),
  });

  useEffect(() => {
    document.title = 'Student | Log in';

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 8 * 60 * 60 * 1000);

    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('authStudentCookie='));
    const valueCookie = cookie?.split('=')[1];

    if (valueCookie) {
      axios
        .get(`/api/data/authStudent?checkAuth=${valueCookie}`)
        .then((res) => {
          if (res.data.message === 'CORRECT_CREDENTIALS') {
            const cookieString = `authStudentCookie=${
              res.data.responsePayload
            }; expires=${expirationTime.toUTCString()}; path=/`;
            document.cookie = cookieString;

            router.push('/user/student/dashboard');
          }
        })
        .catch((err) => {
          console.log(err);
          errorNotify('Something went wrong');
          document.cookie =
            'authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div className="min-h-[80vh] bg-primaryYellow">
      <div className="dynamic-main-container flex min-h-[80vh] flex-col items-center justify-center">
        <div className="rounded-md bg-white p-5">
          {/* TITLE */}
          <h2 className="text-center text-[28px]">
            <span className="font-bold">
              Student |{' '}
              <span className="font-light">
                {isForgotPassword ? 'Forgot Password' : 'Log in'}
              </span>
            </span>
          </h2>
          <p className="my-5 text-center font-medium text-secondaryWhite">
            {isForgotPassword
              ? 'Forgot your password'
              : 'Authentication for the Student'}
          </p>

          {/* FORM */}
          <form
            className="mx-auto grid w-[300px] grid-cols-1 gap-4"
            onSubmit={(e) => {
              e.preventDefault();

              if (isForgotPassword) {
                setValue('password', 'JUST_FORGOT_PASSWORD');

                handleSubmit((data) => {
                  sendResetEmail('Student User', data.email);
                })();
              } else {
                handleSubmit((data) => {
                  authentication(data);
                })();
              }
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-secondaryWhite">
                Email Address
              </label>
              <input
                className={classNames(
                  'rounded border-2 border-primaryYellow py-3 px-2 outline-none',
                  {
                    'border-red-500 bg-red-100 placeholder:text-white':
                      errors.password,
                  }
                )}
                type="email"
                placeholder="Email Address"
                {...register('email')}
              />
              {errors.email?.message && (
                <p className="rounded bg-red-100 p-2 text-center text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            {!isForgotPassword && (
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-secondaryWhite">
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
            )}

            <div className="flex justify-end">
              <button
                className="my-3 text-primaryYellow underline"
                onClick={(e) => {
                  e.preventDefault();

                  setIsForgotPassword(!isForgotPassword);
                  clearPassEmail();
                }}
              >
                {isForgotPassword ? 'Back' : 'Forgot your password?'}
              </button>
            </div>

            <button
              className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-primaryYellow py-2 font-semibold text-secondaryWhite duration-150 hover:cursor-pointer hover:bg-primaryYellowHover"
              type="submit"
            >
              {(function () {
                if (isForgotPassword) {
                  if (submit.isSubmitting) {
                    return 'Sending...';
                  } else {
                    return 'Forgot Password';
                  }
                }

                if (submit.isSubmitting) {
                  return 'Logging...';
                } else {
                  return 'Login';
                }
              })()}
            </button>
          </form>
        </div>
      </div>

      {/* TOAST */}
      <ToastContainer />
    </div>
  );

  function clearPassEmail() {
    reset();

    clearErrors();
  }

  function sendResetEmail(last_name: string, email_address: string) {
    setSubmit({ isSubmitting: true, incorrect: false, notFound: false });
    const currentTime = new Date().getTime();

    const data = JSON.stringify({
      subject: 'Reset Your Password',
      message: '',
      email: email_address,
      time: currentTime,
      lastName: last_name,
      type: 'RESET_STUDENT_EMAIL',
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/notification/email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        successfulNotify('Reset Password Email Sent!');
        reset();

        setSubmit({
          isSubmitting: false,
          incorrect: false,
          notFound: false,
        });
        reset();
      })
      .catch((error) => {
        console.error(error);
        errorNotify('Something went wrong!');

        setSubmit({
          isSubmitting: false,
          incorrect: false,
          notFound: false,
        });
        reset();
      });
  }

  function authentication(data: FormLogin) {
    setSubmit({ isSubmitting: true, incorrect: false, notFound: false });

    axios
      .post(
        `/api/data/authStudent?authEmail=${data.email}&authPassword=${data.password}`
      )
      .then((res) => {
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 8 * 60 * 60 * 1000);

        const responseCookie = res.data.responsePayload;
        const responseMessage = res.data.message;

        if (responseMessage === 'CORRECT_CREDENTIALS') {
          const cookieString = `authStudentCookie=${responseCookie}; expires=${expirationTime.toUTCString()}; path=/`;
          document.cookie = cookieString;

          setSubmit({
            isSubmitting: false,
            incorrect: false,
            notFound: false,
          });

          router.push('/user/student/dashboard');
        } else if (responseMessage === 'INCORRECT_PASSWORD') {
          warningNotify('Incorrect Credentials');
          setValue('password', '');
          setSubmit({
            isSubmitting: false,
            incorrect: true,
            notFound: false,
          });
        } else if (responseMessage === 'ACCOUNT_IS_INACTIVE') {
          warningNotify(`${watch('email')} is Inactive`);
          setValue('password', '');
          setSubmit({
            isSubmitting: false,
            notFound: true,
            incorrect: false,
          });
        } else {
          warningNotify(`${watch('email')} Does Not Exist`);
          setValue('password', '');
          setSubmit({
            isSubmitting: false,
            notFound: true,
            incorrect: false,
          });
        }
      })
      .catch((err) => {
        errorNotify('Something went wrong');
        console.error(err);
      });
  }
}

export default Auth;

Auth.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayStaticFooter />
    </>
  );
};
