// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// NEXT
import { useRouter } from 'next/router';

// LOADER COMPONENT
import SplashLoading from '@/src/components/common/SplashLoading';

// FIREBASE FUNCTIONS
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';

// COMPONENTS OR LAYOUTS
import CompanyHeader from '@/src/components/Header/CompanyHeader';
import CompanyDashboardContainer from '@/src/components/dashboards/companyDashboardContainer';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';
function CompanyDashboard() {
  const router = useRouter();

  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);

  const signout = () => {
    signOut(emailPassAuth)
      .then(() => null)
      .catch(() => null);
  };

  useEffect(() => {
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/company/auth');
      } else {
        if (
          user?.displayName === null ||
          user?.photoURL === null ||
          user?.email === null
        ) {
          router.push('/views/user/company/setup');
        } else {
          setIsLoading(false);
          context?.setUser({
            userName: user.displayName,
            userEmail: user.email,
            userPhotoUrl: user.photoURL,
          });
        }
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
      <CompanyHeader signout={signout} />
      <CompanyDashboardContainer />
    </div>
  );
}

export default CompanyDashboard;

CompanyDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
