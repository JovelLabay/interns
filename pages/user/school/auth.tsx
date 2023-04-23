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
import { errorNotify, warningNotify } from '@component/interface/toast/toast';

function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [submit, setSubmit] = useState({
    isSubmitting: false,
    incorrect: false,
    notFound: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LogSignValidator),
  });

  useEffect(() => {
    document.title = 'School | Log in';

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 8 * 60 * 60 * 1000);

    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('authCookie='));
    const valueCookie = cookie?.split('=')[1];

    if (valueCookie) {
      axios
        .post(`/api/data/adminUser?checkAuth=${valueCookie}`)
        .then((res) => {
          console.log(res);
          if (res.data.message === 'CORRECT_CREDENTIALS') {
            const cookieString = `authCookie=${
              res.data.responsePayload
            }; expires=${expirationTime.toUTCString()}; path=/`;
            document.cookie = cookieString;

            router.push('/user/school/dashboard');
          }
        })
        .catch((err) => {
          console.error(err);
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
      <div className="flex min-h-[80vh] items-center justify-center xl:hidden">
        <h2 className="text-center text-white">
          Please do not use Table/Phone devices
        </h2>
      </div>
      <div className="dynamic-main-container hidden min-h-[80vh] flex-col items-center justify-center xl:flex">
        <div className="rounded-md bg-white p-5">
          {/* TITLE */}
          <h2 className="text-center text-[28px]">
            <span className="font-bold">
              School | <span className="font-light">Log in</span>
            </span>
          </h2>
          <p className="my-5 text-center font-medium text-secondaryWhite">
            Authentication for the College
          </p>

          {/* FORM */}
          <form
            className="mx-auto grid w-[300px] grid-cols-1 gap-4"
            onSubmit={(e) => {
              e.preventDefault();

              handleSubmit((data) => {
                authentication(data);
              })();
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

            {submit.incorrect && (
              <p className="rounded bg-red-100 p-2 text-center text-xs text-red-500">
                Either Email or Password is incorrect
              </p>
            )}

            {submit.notFound && (
              <p className="rounded bg-red-100 p-2 text-center text-xs text-red-500">
                Account does not exist or Account is Inactive
              </p>
            )}

            <button
              className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-primaryYellow py-2 font-semibold text-secondaryWhite duration-150 hover:cursor-pointer hover:bg-primaryYellowHover"
              type="submit"
            >
              {(function () {
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

  function authentication(data: FormLogin) {
    setSubmit({ isSubmitting: true, incorrect: false, notFound: false });

    axios
      .post(
        `/api/data/adminUser?authPassword=${data.password}&authEmail=${data.email}`
      )
      .then((res) => {
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 8 * 60 * 60 * 1000);

        const responseCookie = res.data.responsePayload;
        const responseMessage = res.data.message;

        if (responseMessage === 'CORRECT_CREDENTIALS') {
          const cookieString = `authCookie=${responseCookie}; expires=${expirationTime.toUTCString()}; path=/`;
          document.cookie = cookieString;

          setSubmit({
            isSubmitting: false,
            incorrect: false,
            notFound: false,
          });

          router.push('/user/school/dashboard');
        } else if (responseMessage === 'INCORRECT_CREDENTIALS') {
          warningNotify('Incorrect Credentials');
          setValue('password', '');
          setSubmit({ isSubmitting: false, incorrect: true, notFound: false });
        } else {
          warningNotify(`${watch('email')} Does Not Exist or is Inactive`);
          setValue('password', '');
          setSubmit({ isSubmitting: false, notFound: true, incorrect: false });
        }
      })
      .catch((err) => {
        console.log(err);
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
