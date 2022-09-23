import SplashLoading from '@/src/components/common/SplashLoading';
import SchoolDashboardContainer from '@/src/components/dashboards/schoolDashboardContainer';
import SchoolHeader from '@/src/components/Header/SchoolHeader';
import { DynamicContext } from '@/src/contexts/context';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

function SchoolDashboard() {
  const router = useRouter();

  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/school/auth');
      } else {
        setIsLoading(false);
        context?.setUser((prev) => {
          return {
            ...prev,
            userName: user.displayName || 'No Data Found',
            userEmail: user.email || user.phoneNumber || 'No Data Found',
          };
        });
      }
    });
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div className="min-h-screen bg-mainBgWhite lg:block hidden">
      <SchoolHeader
        userName={context?.user.userName}
        userEmail={context?.user.userEmail}
        userPhotoUrl={context?.user.userPhotoUrl}
      />
      <SchoolDashboardContainer />
    </div>
  );
}

export default SchoolDashboard;

SchoolDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
