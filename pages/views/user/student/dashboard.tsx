import SplashLoading from '@/src/components/common/SplashLoading';
import { DynamicContext } from '@/src/contexts/context';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

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
          ? 'bg-mainBgBlack min-h-screen lg:block hidden duration-300'
          : 'bg-mainBgWhite min-h-screen lg:block hidden duration-300'
      }
    >
      <h1>dashboard</h1>
    </div>
  );
}

export default StudentDashboard;

StudentDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
