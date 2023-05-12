// REACT
import React, { ReactElement } from 'react';

// NEXT
import Head from 'next/head';
import Link from 'next/link';

// STATIC DATA
import generalData from '@data/general.data.json';

// COMPONENTS OR LAYOUTS
import SecondayStaticFooter from 'lib/components/blocks/staticPage/SecondayStaticFooter';

// ICONS
import { BsPerson } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FiChevronRight } from 'react-icons/fi';

function Getstarted() {
  const [selectedOption, setSelectedOption] = React.useState('');

  return (
    <div>
      <Head>
        <title>Interns | Get Started</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-10 py-10 md:gap-14 md:py-0">
        <div className="flex flex-col gap-5 text-center">
          <h3 className="text-[24px] font-semibold md:text-[34px]">
            Get Started
          </h3>
          <p className="text-[18px] text-secondaryWhite md:text-[22px]">
            Start your journey with us
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 ">
          {generalData.getStartedButtons.map((option, index) => {
            return (
              <div
                key={index}
                onClick={() => setOptionHandler(option.name)}
                className={
                  selectedOption === option.name
                    ? 'flex h-[300px] w-[230px] flex-col items-center justify-center gap-20 rounded-xl border-2 border-primaryYellow hover:cursor-pointer hover:border-primaryYellow'
                    : 'flex h-[300px] w-[230px] flex-col items-center justify-center gap-20 rounded-xl border-2 border-customBorder hover:cursor-pointer hover:border-primaryYellow'
                }
              >
                <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-yellowBg">
                  {option.name === 'School Faculty' ? (
                    <HiOutlineOfficeBuilding className="text-[40px] text-primaryYellow" />
                  ) : (
                    <BsPerson className="text-[40px] text-primaryYellow" />
                  )}
                </div>
                <p className="text-[24px] font-semibold">{option.name}</p>
              </div>
            );
          })}
        </div>

        <Link
          href={
            selectedOption === 'School Faculty'
              ? '/user/school/dashboard'
              : '/user/student/dashboard'
          }
        >
          <button
            onClick={cookieHandler}
            style={
              selectedOption === '' ? { pointerEvents: 'none' } : undefined
            }
            className={
              selectedOption !== ''
                ? 'flex w-[200px] flex-row items-center justify-center gap-5 rounded-md bg-primaryYellow py-3 opacity-100 '
                : 'opacity-0 '
            }
          >
            continue <FiChevronRight />
          </button>
        </Link>
      </main>
    </div>
  );

  function setOptionHandler(option: string) {
    setSelectedOption(option);
  }

  function cookieHandler() {
    if (selectedOption === 'School Faculty') {
      localStorage.setItem('cookieInterns', 'schoolAdmin');
    }
    if (selectedOption === 'Student') {
      localStorage.setItem('cookieInterns', 'student');
    }
  }
}

export default Getstarted;

Getstarted.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayStaticFooter />
    </>
  );
};
