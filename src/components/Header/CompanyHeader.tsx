import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';

import { BiMoon, BiSun, BiLogOut } from 'react-icons/bi';

// import internslogo
import internsLogo from '../../../public/logo/interns_logo.png';

function CompanyHeader({ signout }: { signout: () => void }) {
  const context = useContext(DynamicContext);

  // HANDLER FOR THE DARKMODE TOGGLE
  const darkModeHandler = () => {
    context?.setIsDarkMode(!context?.isDarkMode);
    localStorage.setItem(
      'darkModeCompany',
      JSON.stringify(!context?.isDarkMode)
    );
  };

  return (
    <div
      className={classNames(
        'border-b-[3px] border-white flex flex-row justify-between items-center h-[10vh] px-2',
        {
          'border-secondaryBgBlack': context?.isDarkMode,
        }
      )}
    >
      <div>
        <Link href="/">
          <div className="logo hover:cursor-pointer">
            <p
              className={classNames('text-[38px] font-bold', {
                'text-white': context?.isDarkMode,
              })}
            >
              <span className={'text-primaryYellow'}>I</span>
              nterns
            </p>
          </div>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex flex-row items-center justify-center gap-3">
          <Image
            src={internsLogo}
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
          <p
            className={classNames('font-medium', {
              'text-white': context?.isDarkMode,
            })}
          >
            eluvent.admin@gmail.com
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <button className="buttonIcon" onClick={darkModeHandler}>
            {context?.isDarkMode ? (
              <BiSun size={20} color="#fff" />
            ) : (
              <BiMoon size={20} />
            )}
          </button>
          <button onClick={signout} className="buttonIcon">
            <BiLogOut color={context?.isDarkMode ? '#fff' : '#000'} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyHeader;
