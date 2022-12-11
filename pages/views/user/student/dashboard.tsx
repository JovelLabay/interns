// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// LOADING
import SplashLoading from '@/src/components/common/SplashLoading';

// NEXT
import { useRouter } from 'next/router';

// REDUX
import { DynamicContext } from '@/src/contexts/context';

// FIREBASE
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function StudentDashboard() {
  const router = useRouter();
  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      console.log(user);
      if (user === null) {
        router.push('/views/user/student/auth');
      }

      if (
        user?.displayName?.length !== 20 &&
        user?.providerData[0].providerId === 'password'
      ) {
        router.push('/views/user/student/setup');
      }

      if (
        user?.displayName?.length === 20 &&
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
    <div
      className={
        context?.isDarkMode
          ? 'bg-mainBgBlack min-h-screen duration-300'
          : 'bg-mainBgWhite min-h-screen duration-300'
      }
    >
      <p
        onClick={() => {
          signOut(emailPassAuth)
            .then(() => {
              localStorage.removeItem('studentDetials');
              null;
            })
            .catch(() => null);
        }}
      >
        dashboard
      </p>
    </div>
  );
}

export default StudentDashboard;

StudentDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
