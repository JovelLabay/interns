// REACT
import React, { ReactElement, useContext, useState } from 'react';

// NEXT
import Head from 'next/head';

// COMPONENTS OR LAYOUTS
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';

// STATE CONTEXT
import AuthContainer from '@/src/components/common/AuthContainer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogSignValidator } from '@/src/validator/LogSignValidator';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { createAuth, signAuth } from '@/src/functions/firebasetEmailPassAuth';
import { useRouter } from 'next/router';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { notify } from '@/src/components/common/toast';
import { ToastContainer } from 'react-toastify';

function Auth() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const { register, handleSubmit, formState } = useForm<AuthEmailPassword>({
    resolver: yupResolver(LogSignValidator),
  });

  const { errors } = formState;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isToggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  // AUTH SIGNIN AND LOGIN HANDLER
  const authSignLog = (data: AuthEmailPassword) => {
    if (isLogin) {
      signAuth(data.email, data.password)
        .then(() => router.push('/views/user/company/dashboard'))
        .catch((authError) => notify(authError.message));
    } else {
      createAuth(data.email, data.password)
        .then(() => router.push('/views/user/company/setup'))
        .catch((authError) => notify(authError.message));
    }
  };

  const resetEmailHandler = () => {
    const data = prompt(
      'Enter your email address in order to reset your password'
    );
    if (data) {
      sendPasswordResetEmail(emailPassAuth, data)
        .then(() => {
          notify('Link sent to your email address');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const companyAuthLogin = (
    <div className="flex flex-col mt-6 gap-2 w-[300px]">
      <label htmlFor="Email" className=" text-secondaryWhite font-medium">
        Email Address
      </label>
      <input
        className="bg-mainBgWhite border-2 border-primaryYellow rounded-md py-2 px-1 focus:outline-none"
        type="email"
        placeholder="Email Address"
        {...register('email')}
      />
      {errors.email?.message && (
        <p className="bg-red-200 rounded font-light py-1 px-2">
          {errors.email?.message}
        </p>
      )}
      <label
        htmlFor="Password"
        className="mt-4 text-secondaryWhite font-medium"
      >
        Password
      </label>

      <div className="flex flex-row items-center bg-mainBgWhite border-2 border-primaryYellow rounded-md px-1">
        <input
          className="bg-mainBgWhite focus:outline-none w-full py-2"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
        />
        {!showPassword ? (
          <AiFillEye
            size={20}
            className="hover:cursor-pointer"
            onClick={toggleShowPassword}
          />
        ) : (
          <AiFillEyeInvisible
            size={20}
            className="hover:cursor-pointer"
            onClick={toggleShowPassword}
          />
        )}
      </div>
      {errors.password?.message && (
        <p className="bg-red-200 rounded font-light py-1 px-2">
          {errors.password?.message}
        </p>
      )}

      <div className="my-2 gap-2 flex flex-col items-end">
        {isLogin && (
          <button
            className="text-secondaryWhite underline hover:text-primaryYellowHover duration-150"
            onClick={resetEmailHandler}
          >
            Forgot Password?
          </button>
        )}
        <button
          className="text-secondaryWhite underline hover:text-primaryYellowHover duration-150"
          onClick={isToggleLoginSignup}
        >
          {isLogin
            ? 'Create an Account? Sign in'
            : 'Already have an account? Log in'}
        </button>
      </div>

      <button
        type="submit"
        className="bg-primaryYellow rounded-md py-2 mt-1 text-secondaryWhite font-semibold hover:bg-primaryYellowHover duration-200"
        onClick={handleSubmit(authSignLog)}
      >
        {isLogin ? 'Log in' : 'Sign up'}
      </button>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Interns | Company Auth</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-primaryYellow">
        <div className="dynamic-main-container min-h-[80vh] flex-col justify-center items-center lg:flex hidden">
          <AuthContainer companyAuth={companyAuthLogin} isLogin={isLogin} />
        </div>

        {/* TOAST CONTAINER */}
        <ToastContainer />
      </main>
    </div>
  );
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
