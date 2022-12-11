import React, { useContext, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// REDUX
import { DynamicContext } from '@/src/contexts/context';

import internsLogo from 'public/logo/interns_logo.png';
import { FiMenu } from 'react-icons/fi';
import StudentHeaderOptions from './StudentHeaderOptions';
import { GrClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

function StudentHeader({ signoutStudent }: { signoutStudent: () => void }) {
  const context = useContext(DynamicContext);

  const [isShowMobileNav, setIsShowMobileNav] = useState(false);

  return (
    <div
      className={classNames(
        'flex flex-row justify-between items-center h-[10vh] px-2',
        context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
      )}
    >
      <div>
        <Link href="/">
          <div className="logo hover:cursor-pointer">
            <p
              className={classNames(
                'text-[26px] sm:text-[32px] md:text-[38px] font-bold',
                {
                  'text-white': context?.isDarkMode,
                }
              )}
            >
              <span className={'text-primaryYellow'}>I</span>
              nterns
            </p>
          </div>
        </Link>
      </div>

      {/* SETTINGS */}
      <div className="flex items-center justify-center gap-5">
        <div className="hidden md:flex flex-row items-center justify-center gap-3">
          <Image
            src={context?.user.userPhotoUrl || internsLogo}
            width={40}
            height={40}
            style={{ borderRadius: '100%', border: '2px solid #F2C94C' }}
          />
          <p
            className={classNames('font-medium', {
              'text-white': context?.isDarkMode,
            })}
          >
            {context?.user.userName}
          </p>
        </div>

        <div className="flex items-center justify-center">
          {/* OPTIONS */}
          <StudentHeaderOptions
            theClass="hidden lg:flex"
            darkModeHandler={darkModeHandler}
            signoutStudent={signoutStudent}
          />

          {/* TOGGLE */}
          <button className="block lg:hidden" onClick={mobileNavhandler}>
            <FiMenu size={30} color={!context?.isDarkMode ? '#000' : '#fff'} />
          </button>
        </div>
      </div>

      {/* MOBILE VIEW */}
      {isShowMobileNav && (
        <motion.div
          className={classNames(
            'px-3 lg:hidden bg-white shadow-md absolute top-0 right-0 w-full z-50 h-screen',
            context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
          )}
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-row justify-between items-center mt-6 mx-0 md:mx-10">
            <div className="logo hover:cursor-pointer">
              <p
                className={classNames(
                  'text-[26px] sm:text-[32px] md:text-[38px] font-bold',
                  {
                    'text-white': context?.isDarkMode,
                  }
                )}
              >
                <span className={'text-primaryYellow'}>I</span>
                nterns
              </p>
            </div>
            <button onClick={mobileNavhandler}>
              <AiOutlineClose
                size={30}
                color={!context?.isDarkMode ? '#000' : '#fff'}
              />
            </button>
          </div>

          {/* OPTIONS */}
          <div className="mt-10">
            <div className="flex md:hidden flex-col items-center justify-center gap-3 mb-10 mt-[-20px]">
              <Image
                src={internsLogo}
                width={80}
                height={80}
                style={{ borderRadius: '100%', border: '2px solid #F2C94C' }}
              />
              <p
                className={classNames('font-medium', {
                  'text-white': context?.isDarkMode,
                })}
              >
                Your account has been disabled. Please contact your coordinator
              </p>
            </div>

            <StudentHeaderOptions
              darkModeHandler={darkModeHandler}
              signoutStudent={signoutStudent}
            />
          </div>
        </motion.div>
      )}
    </div>
  );

  function mobileNavhandler() {
    setIsShowMobileNav(!isShowMobileNav);
  }

  // HANDLER FOR THE DARKMODE TOGGLE
  function darkModeHandler() {
    context?.setIsDarkMode(!context?.isDarkMode);
    localStorage.setItem(
      'darkModeCompany',
      JSON.stringify(!context?.isDarkMode)
    );
  }
}

export default StudentHeader;
