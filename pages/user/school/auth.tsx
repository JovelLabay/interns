// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import { useRouter } from 'next/router';

// FOOTER OR HEADER
import SecondayStaticFooter from 'lib/components/blocks/staticPage/SecondayStaticFooter';

// FIREBASE CONFIG
import { database, emailPassAuth } from '@/src/firebase/firebaseConfig';

// FIREBASE FUNCTIONS
import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { onValue, ref } from 'firebase/database';

// TOAST AND LOADER
import { errorNotify, successfulNotify } from '@/src/components/common/toast';
import { ToastContainer } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import SplashLoading from '@/src/components/common/SplashLoading';
import classNames from 'classnames';

// SUPABASE
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogSignValidator } from '@validator/forms';
import { supabase } from '@supabase/supabaseClient';

function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submit, setSubmit] = useState({
    isSubmitting: false,
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormLogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LogSignValidator),
  });

  useEffect(() => {
    document.title = 'School | Log in';
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div className="min-h-[80vh] bg-primaryYellow">
      <div className="flex min-h-[80vh] items-center justify-center lg:hidden">
        <h2 className="text-center text-white">
          Please do not use Table/Phone devices
        </h2>
      </div>
      <div className="dynamic-main-container hidden min-h-[80vh] flex-col items-center justify-center lg:flex">
        <div className="rounded-md bg-white p-5">
          {/* TITLE */}
          <h2 className="text-center text-[28px]">
            <span className="font-bold">
              School |{' '}
              <span className="font-light">
                {isForgotPassword ? 'Forgot Password' : 'Log in'}
              </span>
            </span>
          </h2>
          <p className="my-5 text-center font-medium text-secondaryWhite">
            {isForgotPassword
              ? 'Forgot your password'
              : 'Authentication for the College'}
          </p>

          {/* FORM */}
          <form
            className="mx-auto grid w-[300px] grid-cols-1 gap-4"
            onSubmit={(e) => {
              e.preventDefault();

              handleSubmit((data) => {
                console.log(data);
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
