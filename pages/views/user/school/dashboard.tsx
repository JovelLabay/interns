// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// LOADER COMPONENT
import SplashLoading from '@/src/components/common/SplashLoading';

// COMPONENTS
import SchoolDashboardContainer from '@/src/components/dashboards/schoolDashboardContainer';
import SchoolHeader from '@/src/components/Header/SchoolHeader';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// FIREBASE
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// NEXT
import { useRouter } from 'next/router';

function SchoolDashboard() {
  const router = useRouter();

  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Interns | School Dashboard';

    onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/school/auth');
      } else {
        if (user?.phoneNumber === null) {
          router.push('/views/user/school/auth');
        } else {
          document.title = 'Interns | School Dashboard';

          setIsLoading(false);
          context?.setUser((prev) => {
            return {
              ...prev,
              userName: user.displayName || 'No Data Found',
              userEmail: user.email || user.phoneNumber || 'No Data Found',
            };
          });
        }
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
