import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';
import React, { ReactElement, useEffect, useState } from 'react';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { number } from 'yup';
import { useRouter } from 'next/router';

function Auth() {
  const router = useRouter();

  const [code, setCode] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  });

  const [digit1Ref, digit2Ref, digit3Ref, digit4Ref, digit5Ref, digit6Ref] = [
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ];

  const generateOtp = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => null,
      },
      emailPassAuth
    );
  };

  const requestOtp = () => {
    generateOtp();
    signInWithPhoneNumber(
      emailPassAuth,
      '+639397715303',
      window.recaptchaVerifier
    )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log('OTP sent');
      })
      .catch(() => {
        console.log('fgdf');
      });
  };

  const verifyOtp = () => {
    const combinedCode = `${code.digit1}${code.digit2}${code.digit3}${code.digit4}${code.digit5}${code.digit6}`;
    window.confirmationResult
      .confirm(combinedCode)
      .then(() => router.push('/views/user/school/dashboard'))
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-[80vh] bg-primaryYellow">
      <div className="dynamic-main-container min-h-[80vh] flex-col justify-center items-center lg:flex hidden">
        <div className="bg-white p-5 rounded-md">
          <h2 className="text-center text-[28px]">
            <span className="font-bold">School |</span>
            {' Log in'}
          </h2>
          <p className="my-4 text-secondaryWhite font-medium">
            System Code for your University
          </p>
          <div>
            <div className="flex flex-row gap-3 justify-center my-4">
              <input
                title="first_digit"
                className="outline-none border-b-[2px] border-primaryYellow w-[20px] px-1"
                ref={digit1Ref}
                value={code.digit1}
                onChange={(e) => {
                  setCode({ ...code, digit1: e.target.value });
                  digit2Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="outline-none border-b-[2px] border-primaryYellow w-[20px] px-1"
                ref={digit2Ref}
                value={code.digit2}
                onChange={(e) => {
                  setCode({ ...code, digit2: e.target.value });
                  digit3Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="outline-none border-b-[2px] border-primaryYellow w-[20px] px-1"
                ref={digit3Ref}
                value={code.digit3}
                onChange={(e) => {
                  setCode({ ...code, digit3: e.target.value });
                  digit4Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="outline-none border-b-[2px] border-primaryYellow w-[20px] px-1"
                ref={digit4Ref}
                value={code.digit4}
                onChange={(e) => {
                  setCode({ ...code, digit4: e.target.value });
                  digit5Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="outline-none border-b-[2px] border-primaryYellow w-[20px] px-1"
                ref={digit5Ref}
                value={code.digit5}
                onChange={(e) => {
                  setCode({ ...code, digit5: e.target.value });
                  digit6Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="outline-none border-b-[2px] border-primaryYellow w-[20px] px-1"
                ref={digit6Ref}
                value={code.digit6}
                onChange={(e) => {
                  setCode({ ...code, digit6: e.target.value });
                  // unfocus
                  digit6Ref.current?.blur();
                }}
              />
            </div>
            <p className="text-placeholderColor font-light italic text-center mb-3 w-[300px]">
              *
              {
                "Code will be sent to the active set phone number of the school's admin"
              }
            </p>
            <button
              className="bg-white rounded-md py-2 w-full border-2 flex flex-row justify-center items-center gap-3 font-semibold text-secondaryWhite hover:bg-customBorder border-customBorder duration-150"
              onClick={requestOtp}
            >
              Request
            </button>
            <br />
            <button
              className="bg-primaryYellow rounded-md py-2 w-full flex flex-row justify-center items-center gap-3 font-semibold text-secondaryWhite hover:bg-primaryYellowHover duration-150"
              onClick={verifyOtp}
            >
              Validate
            </button>
          </div>
        </div>
      </div>

      {/* RECAPTCHA DIV */}
      <div id="recaptcha-container" />
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
