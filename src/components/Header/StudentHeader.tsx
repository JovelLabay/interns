import React, { useContext, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// REDUX
import { DynamicContext } from '@/src/contexts/context';

import internsLogo from 'public/logo/interns_logo.png';
import { FiMenu } from 'react-icons/fi';
import StudentHeaderOptions from './StudentHeaderOptions';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

function StudentHeader({ signoutStudent }: { signoutStudent: () => void }) {
  const context = useContext(DynamicContext);

  const [isShowMobileNav, setIsShowMobileNav] = useState(false);

  return (
    <div
      className={classNames(
        'flex h-[10vh] flex-row items-center justify-between px-2',
        context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
      )}
    >
      <div>
        <Link href="/">
          <div className="logo hover:cursor-pointer">
            <p
              className={classNames(
                'text-[26px] font-bold sm:text-[32px] md:text-[38px]',
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
        <div className="hidden flex-row items-center justify-center gap-3 md:flex">
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
            'absolute top-0 right-0 z-50 h-screen w-full overflow-auto px-3 lg:hidden',
            context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
          )}
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-0 mt-6 flex flex-row items-center justify-between md:mx-10">
            <div className="logo hover:cursor-pointer">
              <Link href="/">
                <p
                  className={classNames(
                    'text-[26px] font-bold sm:text-[32px] md:text-[38px]',
                    {
                      'text-white': context?.isDarkMode,
                    }
                  )}
                >
                  <span className={'text-primaryYellow'}>I</span>
                  nterns
                </p>
              </Link>
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
            <div className="mb-10 mt-[-20px] flex flex-col items-center justify-center gap-3 md:hidden">
              <Image
                src={context?.user.userPhotoUrl || internsLogo}
                width={80}
                height={80}
                style={{ borderRadius: '100%', border: '2px solid #F2C94C' }}
              />
              <p
                className={classNames('text-lg font-medium', {
                  'text-white': context?.isDarkMode,
                })}
              >
                {context?.user.userName}
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
