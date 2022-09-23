import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SplashLoading from '@/src/components/common/SplashLoading';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import CompanyHeader from '@/src/components/Header/CompanyHeader';
import { DynamicContext } from '@/src/contexts/context';
import CompanyDashboardContainer from '@/src/components/dashboards/companyDashboardContainer';

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
    onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/company/auth');
      } else {
        if (user?.displayName !== null && user?.photoURL !== null) {
          setIsLoading(false);
        } else {
          router.push('/views/user/company/setup');
        }
      }
    });
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
