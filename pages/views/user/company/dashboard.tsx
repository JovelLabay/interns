// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// NEXT
import { useRouter } from 'next/router';

// LOADER COMPONENT
import SplashLoading from '@/src/components/common/SplashLoading';

// FIREBASE FUNCTIONS
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { database, emailPassAuth } from '@/src/firebase/firebaseConfig';

// COMPONENTS OR LAYOUTS
import CompanyHeader from '@/src/components/Header/CompanyHeader';
import CompanyDashboardContainer from '@/src/components/dashboards/companyDashboardContainer';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';
import { onValue, ref } from 'firebase/database';
function CompanyDashboard() {
  const router = useRouter();
  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);

  const signout = () => {
    signOut(emailPassAuth)
      .then(() => {
        null;
      })
      .catch(() => null);
  };

  useEffect(() => {
    const db = database;

    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/company/auth');
      }

      if (
        user?.displayName?.length !== 28 &&
        (user?.providerData[0].providerId === 'facebook.com' ||
          user?.providerData[0].providerId === 'google.com')
      ) {
        router.push('/views/user/company/setup');
      }

      if (
        user?.displayName?.length === 28 &&
        (user?.providerData[0].providerId === 'facebook.com' ||
          user?.providerData[0].providerId === 'google.com')
      ) {
        setIsLoading(false);
        const postCatRef = ref(db, `companies/${user.displayName}`);
        onValue(postCatRef, (snapshot) => {
          context?.setUser({
            userName: snapshot.val().companyName,
            userPhotoUrl: snapshot.val().companyLogo,
            userEmail: snapshot.val().companyEmail,
            userId: user.displayName || 'Unknown',
          });
        });
      }

      return null;
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
