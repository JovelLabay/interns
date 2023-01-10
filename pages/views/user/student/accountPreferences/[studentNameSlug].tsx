import StudentHeader from '@/src/components/Header/StudentHeader';
import AccountPreferencesContainer from '@/src/components/menuContainer/students/accountPreferencesContainer';
import { DynamicContext } from '@/src/contexts/context';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { signoutStudent } from '@/src/functions/utils/accountUtils';
import { useRouter } from 'next/router';
import { data } from 'Data';
import SplashLoading from '@/src/components/common/SplashLoading';

function StudentNameSlug() {
  const context = useContext(DynamicContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (context?.user.userId === '') {
      router.push(data.backRoute);
    } else {
      document.title = 'Interns | ' + context?.user.userName || 'Unknown';
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }
  return (
    <div
      className={
        context?.isDarkMode
          ? 'min-h-screen bg-mainBgBlack duration-300'
          : 'min-h-screen bg-mainBgWhite duration-300'
      }
    >
      <StudentHeader signoutStudent={signoutStudent} />
      <AccountPreferencesContainer />
    </div>
  );
}

export default StudentNameSlug;

StudentNameSlug.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
