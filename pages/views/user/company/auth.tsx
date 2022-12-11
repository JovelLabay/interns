// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import Head from 'next/head';
import { useRouter } from 'next/router';

// COMPONENTS OR LAYOUTS
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';
import AuthContainer from '@/src/components/common/AuthContainer';

// FIREBASE FUNCTIONS
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// TOASTIFY
import { ToastContainer } from 'react-toastify';

// LOADER COMPONENT
import SplashLoading from '@/src/components/common/SplashLoading';
function Auth() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        setIsLoading(false);
      }

      if (
        user !== null &&
        (user?.providerData[0].providerId === 'facebook.com' ||
          user?.providerData[0].providerId === 'google.com')
      ) {
        router.push('/views/user/company/dashboard');
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
        <title>Interns | Company Auth</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-primaryYellow">
        <div className="dynamic-main-container min-h-[80vh] flex-col justify-center items-center lg:flex hidden">
          <AuthContainer />
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
