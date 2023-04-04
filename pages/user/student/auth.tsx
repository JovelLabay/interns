// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import Head from 'next/head';
import { useRouter } from 'next/router';

// COMPONENTS OR LAYOUTS
import SecondayStaticFooter from 'lib/components/blocks/staticPage/SecondayStaticFooter';
import SplashLoading from '@/src/components/common/SplashLoading';
import ExistingFormAuth from '../../../../src/components/form/student/existingFormAuth';

// ICONS
import { FiChevronDown } from 'react-icons/fi';

// EXTERNAL
import classNames from 'classnames';
import { Listbox } from '@headlessui/react';
import { errorNotify } from '@/src/components/common/toast';
import { ToastContainer } from 'react-toastify';

// FIREBASE
import { database, emailPassAuth } from '@/src/firebase/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import { verifyStudentEmailAndCollege } from '@/src/functions/firebaseFirestore';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

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

      <main className="flex min-h-[80vh] flex-col items-center justify-center bg-primaryYellow">
        <div className="w-[350px] rounded-lg bg-white p-5">
          <h2 className="text-center text-[28px]">
            <span className="font-bold">Student |</span>
            {isNewStudentUser ? ' Register' : ' Login'}
          </h2>
          {isNewStudentUser ? (
            <form
              className="mt-5 flex flex-col gap-3"
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
                    'rounded border-2 border-primaryYellow py-3 px-2 outline-none',
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
                          'flex w-full justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none',
                          {
                            'bg-teriaryWhite': isStudentOkay,
                          }
                        )}
                      >
                        {collegesList.setCollege}
                        <FiChevronDown
                          size={30}
                          className={classNames(
                            'text-secondaryWhite duration-300',
                            {
                              'rotate-180': open,
                            }
                          )}
                        />
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-30 max-h-[150px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
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
                    className="rounded border-2 py-3 px-2 outline-none"
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
                className="my-3 self-end text-primaryYellow underline"
                onClick={() => setIsNewStudentUser(!isNewStudentUser)}
              >
                Login Existing Student Account
              </button>

              <input
                className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-primaryYellow py-2 font-semibold text-secondaryWhite duration-150 hover:bg-primaryYellowHover"
                value={isStudentOkay ? 'Sign In' : 'Continue'}
                type="submit"
              />
            </form>
          ) : (
            <ExistingFormAuth
              setIsNewStudentUser={setIsNewStudentUser}
              isNewStudentUser={isNewStudentUser}
            />
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
      errorNotify('Please fill all the fields');
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
                middleName: res?.data.middleName,
                college: res?.data.college,
                id: res?.id,
              })
            );
          } else {
            errorNotify('Email not found');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function signInStudent() {
    errorNotify('Signing in...');

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
        errorNotify(error.message);
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
