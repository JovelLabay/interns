import React, { ReactElement, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import SecondayFooter from 'lib/components/blocks/staticPage/SecondayStaticFooter';
import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import ApplicantsContainer from '@/src/components/menuContainer/company/applicantsContainer';

function InternshipSlug() {
  const context = useContext(DynamicContext);
  const router = useRouter();

  const [states, setStates] = useState({
    submitButton: 'Next',
  });

  return (
    <div
      className={classNames(
        'min-h-[80vh]',
        context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
      )}
    >
      <header className="flex h-[70px] items-center bg-primaryYellow">
        <div className="dynamic-main-container flex w-screen justify-start xl:px-[250px] 2xl:px-[300px] ">
          <button className="" onClick={() => router.back()}>
            Back
          </button>
        </div>
      </header>
      <main className="xl:px-[250px] 2xl:px-[300px] ">
        <ApplicantsContainer />
      </main>
    </div>
  );
}

export default InternshipSlug;

InternshipSlug.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayFooter />
    </>
  );
};
