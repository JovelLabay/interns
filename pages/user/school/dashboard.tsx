// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// LOADER COMPONENT
import SplashLoading from '@component//interface/loading/SplashLoading';

// COMPONENTS
import SchoolDashboardContainer from '@component/blocks/navigation/school/schoolDashboardContainer';
import SchoolHeader from 'lib/components/blocks/navigation/school/SchoolHeader';

// STATE MANAGEMENT
import { DynamicContext } from '@redux//context';

// NEXT
import { useRouter } from 'next/router';
import axios from 'axios';
import { errorNotify } from '@component/interface/toast/toast';

function SchoolDashboard() {
  const router = useRouter();
  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Interns | School Dashboard';

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 8 * 60 * 60 * 1000);

    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('authCookie='));
    const valueCookie = cookie?.split('=')[1];

    if (valueCookie) {
      axios
        .post(`/api/data/adminUser?checkAuth=${valueCookie}`)
        .then((res) => {
          if (res.data.message === 'CORRECT_CREDENTIALS') {
            const cookieString = `authCookie=${
              res.data.responsePayload
            }; expires=${expirationTime.toUTCString()}; path=/`;
            document.cookie = cookieString;

            context?.setUserData({
              image: res.data.otherData.image,
              name: res.data.otherData.name,
              levelOfUser: res.data.otherData.levelOfUser,
            });

            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          errorNotify('Something went wrong');
          document.cookie =
            'authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

          router.push('/user/school/auth');
        });
    } else {
      router.push('/user/school/auth');
    }
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center xl:hidden">
        <h2 className="text-center">Please do not use Table/Phone devices</h2>
      </div>
      <div className="hidden min-h-screen bg-mainBgWhite xl:block">
        <SchoolHeader />
        <SchoolDashboardContainer />
      </div>
    </>
  );
}

export default SchoolDashboard;

SchoolDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
