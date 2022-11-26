// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import Head from 'next/head';

// COMPONENTS OR LAYOUTS
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';
import { FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';
import { Listbox } from '@headlessui/react';
import { database, emailPassAuth } from '@/src/firebase/firebaseConfig';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { verifyStudentEmailAndCollege } from '@/src/functions/firebaseFirestore';
import SplashLoading from '@/src/components/common/SplashLoading';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { errorNotify } from '@/src/components/common/toast';
import ExistingForm from './existingForm';

function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isNewStudentUser, setIsNewStudentUser] = useState(true);
  const [isStudentOkay, setIStudentOkay] = useState(false);
  const [collegesList, setCollegesList] = useState({
    myCollegeList: {},
    setCollege: 'Select College',
    setEmail: '',
    setPassword: '',
  });

  useEffect(() => {
    const db = database;

    // GET AUTHENTICATION DATA
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      console.log(user);
      if (user === null) {
        setIsLoading(false);
      }

      if (user !== null && user?.providerData[0].providerId === 'password') {
        router.push('/views/user/student/dashboard');
      }
    });

    // GET COMPANY TYPES
    const currentCompanyTypes = ref(db, 'school/colleges');
    onValue(currentCompanyTypes, (snapshot) => {
      const data = snapshot.val();
      setCollegesList((prev) => {
        return { ...prev, myCollegeList: data };
      });
    });

    return () => {
      authMe();
    };
  }, []);

  const colleges: [string, CollegeListInterface][] =
    Object.entries(collegesList.myCollegeList) || [];

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div>
      <Head>
        <title>Interns | Student Auth</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-[80vh] bg-primaryYellow flex flex-col justify-center items-center">
        <div className="w-[350px] bg-white rounded-lg p-5">
          <h2 className="text-center text-[28px]">
            <span className="font-bold">Student |</span>
            {' Sign up'}
          </h2>
          {isNewStudentUser ? (
            <form
              className="flex flex-col gap-3 mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (!isStudentOkay) {
                  continueHandler();
                } else {
                  signInStudent();
                }
              }}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-secondaryWhite">
                  Email Address
                </label>
                <input
                  className={classNames(
                    'border-2 rounded py-3 px-2 outline-none border-primaryYellow',
                    {
                      'bg-teriaryWhite': isStudentOkay,
                    }
                  )}
                  type="email"
                  placeholder="Email Address"
                  value={collegesList.setEmail}
                  disabled={isStudentOkay}
                  onChange={(e) => {
                    setCollegesList((prev) => {
                      return { ...prev, setEmail: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-secondaryWhite">
                  Select College
                </label>
                <Listbox
                  value={collegesList.setCollege}
                  disabled={isStudentOkay}
                  onChange={(e) =>
                    setCollegesList({ ...collegesList, setCollege: e })
                  }
                >
                  {({ open }: { open: boolean }) => (
                    <div className="relative">
                      <Listbox.Button
                        className={classNames(
                          'bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-full flex justify-between',
                          {
                            'bg-teriaryWhite': isStudentOkay,
                          }
                        )}
                      >
                        {collegesList.setCollege}
                        <FiChevronDown
                          size={30}
                          className={classNames(
                            'duration-300 text-secondaryWhite',
                            {
                              'rotate-180': open,
                            }
                          )}
                        />
                      </Listbox.Button>
                      <Listbox.Options className="absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] z-30 overflow-auto">
                        {colleges.map(
                          (
                            person: [string, CollegeListInterface],
                            key: number
                          ) => (
                            <Listbox.Option
                              className="py-1"
                              key={key}
                              value={person[1].collegeName}
                            >
                              {person[1].collegeName}
                            </Listbox.Option>
                          )
                        )}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>
              {isStudentOkay && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-secondaryWhite">
                    Password
                  </label>
                  <input
                    type="password"
                    className="border-2 rounded py-3 px-2 outline-none"
                    placeholder="Password"
                    value={collegesList.setPassword}
                    onChange={(e) => {
                      setCollegesList((prev) => {
                        return { ...prev, setPassword: e.target.value };
                      });
                    }}
                  />
                </div>
              )}

              <button
                className="self-end text-primaryYellow my-3 underline"
                onClick={() => setIsNewStudentUser(!isNewStudentUser)}
              >
                Login Existing Student Account
              </button>

              <input
                className="bg-primaryYellow rounded-md py-2 w-full flex flex-row justify-center items-center gap-3 font-semibold text-secondaryWhite hover:bg-primaryYellowHover duration-150"
                value={isStudentOkay ? 'Sign In' : 'Continue'}
                type="submit"
              />
            </form>
          ) : (
            <ExistingForm />
          )}
        </div>

        {/* TOAST CONTAINER */}
        <ToastContainer />
      </main>
    </div>
  );

  // CONTINUE HANDLER
  function continueHandler() {
    if (
      collegesList.setCollege === 'Select College' ||
      collegesList.setEmail === ''
    ) {
      alert('Please select college and enter email');
    } else {
      verifyStudentEmailAndCollege(
        collegesList.setCollege,
        collegesList.setEmail
      )
        .then((res: any) => {
          if (res?.data.defaultEmail === collegesList.setEmail) {
            setIStudentOkay(true);
            localStorage.setItem(
              'studentDetials',
              JSON.stringify({
                email: res?.data.defaultEmail,
                firstName: res?.data.firstName,
                lastName: res?.data.lastName,
                middleName: res?.data.middlerName,
                college: res?.data.college,
              })
            );
          } else {
            console.log('Email not found');
            alert('Email not found');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function signInStudent() {
    const auth = emailPassAuth;
    createUserWithEmailAndPassword(
      auth,
      collegesList.setEmail,
      collegesList.setPassword
    )
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
        alert('Sdfsdf');
        errorNotify('Dfgdfg');
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
