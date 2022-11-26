import SplashLoading from '@/src/components/common/SplashLoading';
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

function Setup() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      console.log(user);
      if (user === null) {
        router.push('/views/user/student/auth');
      }

      if (
        user?.displayName?.length === 20 &&
        user?.providerData[0].providerId === 'password'
      ) {
        router.push('/views/user/student/dashboard');
      }

      if (
        user?.displayName?.length !== 20 &&
        user?.providerData[0].providerId === 'password'
      ) {
        setIsLoading(false);
      }
    });

    return () => {
      authMe();
    };
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div>
      <Head>
        <title>Interns | Student Setup</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-[80vh]">
        <header className="bg-primaryYellow h-[70px] flex items-center">
          <div className="dynamic-main-container flex w-screen md:justify-around justify-between">
            <h1 className="font-bold md:text-lg mt-2 text-md">
              Student Account Setup
            </h1>
            <div className="flex flex-row justify-center items-center gap-10">
              <button
                className="border-mainBgWhite md:py-2 md:px-10 py-1 px-5 rounded border-2 font-medium text-mainBgWhite hover:text-secondaryBgBlack hover:bg-mainBgWhite transition duration-300"
                onClick={() => {
                  signOut(emailPassAuth)
                    .then(() => {
                      null;
                    })
                    .catch(() => null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </header>
        <main className="dynamic-main-container xl:px-[250px] 2xl:px-[300px] py-5">
          sdfsdf
        </main>
      </div>
      ;
    </div>
  );
}

export default Setup;

Setup.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayStaticFooter />
    </>
  );
};
