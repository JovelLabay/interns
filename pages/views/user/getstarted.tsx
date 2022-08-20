import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FiChevronRight } from 'react-icons/fi';
function Getstarted() {
  const getStartedOptions = ['Company', 'Student'];

  const [selectedOption, setSelectedOption] = React.useState('');

  const setOptionHandler = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <Head>
        <title>ddfgdfgdfg</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center gap-10 md:gap-14 md:py-0 py-10">
        <div className="text-center flex-col flex gap-5">
          <h3 className="text-[24px] md:text-[34px] font-semibold">
            Get Started
          </h3>
          <p className="text-secondaryWhite text-[18px] md:text-[22px]">
            Start your journey with us
          </p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 ">
          {getStartedOptions.map((option, index) => {
            return (
              <div
                key={index}
                onClick={() => setOptionHandler(option)}
                className={
                  selectedOption === option
                    ? 'border-2 border-primaryYellow rounded-xl h-[300px] w-[230px] flex flex-col justify-center items-center gap-20 hover:border-primaryYellow hover:cursor-pointer'
                    : 'border-2 border-customBorder rounded-xl h-[300px] w-[230px] flex flex-col justify-center items-center gap-20 hover:border-primaryYellow hover:cursor-pointer'
                }
              >
                <div className="h-[80px] w-[80px] rounded-full bg-yellowBg flex items-center justify-center">
                  {option === 'Company' ? (
                    <HiOutlineOfficeBuilding className="text-[40px] text-primaryYellow" />
                  ) : (
                    <BsPerson className="text-[40px] text-primaryYellow" />
                  )}
                </div>
                <p className="text-[24px] font-semibold">{option}</p>
              </div>
            );
          })}
        </div>

        <Link href="">
          <button
            style={
              selectedOption === '' ? { pointerEvents: 'none' } : undefined
            }
            className={
              selectedOption !== ''
                ? 'opacity-100 bg-primaryYellow py-3 w-[200px] rounded-md flex flex-row items-center justify-center gap-5 '
                : 'opacity-0 '
            }
          >
            continue <FiChevronRight />
          </button>
        </Link>
      </main>
    </div>
  );
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
