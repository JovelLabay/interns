import StudentHeader from '@/src/components/Header/StudentHeader';
import { DynamicContext } from '@/src/contexts/context';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import React, { ReactElement, useContext } from 'react';

function CompanyNameSlug() {
  const context = useContext(DynamicContext);

  return (
    <div
      className={
        context?.isDarkMode
          ? 'min-h-screen bg-mainBgBlack duration-300'
          : 'min-h-screen bg-mainBgWhite duration-300'
      }
    >
      <StudentHeader signoutStudent={signoutStudent} />
      <div className="my-3 mx-3 lg:mx-0 xl:px-[250px] 2xl:px-[300px]">
        <h1>Save Companes</h1>
      </div>
    </div>
  );

  function signoutStudent() {
    signOut(emailPassAuth)
      .then(() => {
        localStorage.removeItem('studentDetials');
        null;
      })
      .catch(() => null);
  }
}

export default CompanyNameSlug;

CompanyNameSlug.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
