// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import { useRouter } from 'next/router';

// FOOTER OR HEADER
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';

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

function Auth() {
  const router = useRouter();
  const db = database;
  const [code, setCode] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(emailPassAuth, (user) => {
      if (user !== null) {
        if (user?.phoneNumber !== null) {
          router.push('/views/user/school/dashboard');
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const [digit1Ref, digit2Ref, digit3Ref, digit4Ref, digit5Ref, digit6Ref] = [
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ];

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div className="min-h-[80vh] bg-primaryYellow">
      <div className="dynamic-main-container hidden min-h-[80vh] flex-col items-center justify-center lg:flex">
        <div className="rounded-md bg-white p-5">
          <h2 className="text-center text-[28px]">
            <span className="font-bold">School |</span>
            {' Log in'}
          </h2>
          <p className="my-5 text-center font-medium text-secondaryWhite">
            System Code for your University
          </p>
          <div>
            <div className="my-4 flex flex-row justify-center gap-3">
              <input
                title="first_digit"
                className="w-[20px] border-b-[2px] border-primaryYellow px-1 outline-none"
                ref={digit1Ref}
                value={code.digit1}
                onChange={(e) => {
                  setCode({ ...code, digit1: e.target.value });
                  digit2Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="w-[20px] border-b-[2px] border-primaryYellow px-1 outline-none"
                ref={digit2Ref}
                value={code.digit2}
                onChange={(e) => {
                  setCode({ ...code, digit2: e.target.value });
                  digit3Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="w-[20px] border-b-[2px] border-primaryYellow px-1 outline-none"
                ref={digit3Ref}
                value={code.digit3}
                onChange={(e) => {
                  setCode({ ...code, digit3: e.target.value });
                  digit4Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="w-[20px] border-b-[2px] border-primaryYellow px-1 outline-none"
                ref={digit4Ref}
                value={code.digit4}
                onChange={(e) => {
                  setCode({ ...code, digit4: e.target.value });
                  digit5Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="w-[20px] border-b-[2px] border-primaryYellow px-1 outline-none"
                ref={digit5Ref}
                value={code.digit5}
                onChange={(e) => {
                  setCode({ ...code, digit5: e.target.value });
                  digit6Ref.current?.focus();
                }}
              />
              <input
                title="first_digit"
                className="w-[20px] border-b-[2px] border-primaryYellow px-1 outline-none"
                ref={digit6Ref}
                value={code.digit6}
                onChange={(e) => {
                  setCode({ ...code, digit6: e.target.value });
                  digit6Ref.current?.blur();
                }}
              />
            </div>
            <p className="mb-3 w-[300px] text-center font-light italic text-placeholderColor">
              *
              {
                "Code will be sent to the active set phone number of the school's admin"
              }
            </p>
            {isCodeSent ? null : (
              <button
                className="flex w-full flex-row items-center justify-center gap-3 rounded-md border-2 border-customBorder bg-white py-2 font-semibold text-secondaryWhite duration-150 hover:bg-customBorder"
                onClick={requestOtp}
              >
                {!isSendLoading ? (
                  'Request'
                ) : (
                  <BeatLoader color="#000" size={5} />
                )}
              </button>
            )}

            <br />
            <button
              className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-primaryYellow py-2 font-semibold text-secondaryWhite duration-150 hover:bg-primaryYellowHover"
              onClick={verifyOtp}
            >
              Validate
            </button>
          </div>
        </div>
      </div>

      {/* RECAPTCHA DIV */}
      <div id="recaptcha-container" />

      {/* TOAST */}
      <ToastContainer />
    </div>
  );

  function generateOtp() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => null,
      },
      emailPassAuth
    );
  }

  function requestOtp() {
    setIsSendLoading(true);
    generateOtp();

    const userCurrentNumber = ref(db, 'school/currentNumber');
    onValue(userCurrentNumber, (snapshot) => {
      const data = snapshot.val();
      signInWithPhoneNumber(
        emailPassAuth,
        data.number,
        window.recaptchaVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setIsCodeSent(true);
          successfulNotify('OPT has been sent Successfully');
          setIsSendLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  function verifyOtp() {
    const combinedCode = `${code.digit1}${code.digit2}${code.digit3}${code.digit4}${code.digit5}${code.digit6}`;
    if (!combinedCode) {
      errorNotify('Please enter OTP');
    } else {
      window.confirmationResult
        .confirm(combinedCode)
        .then(() => router.push('/views/user/school/dashboard'))
        .catch(() => {
          errorNotify("Couldn't verify OTP");
        });
    }
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
