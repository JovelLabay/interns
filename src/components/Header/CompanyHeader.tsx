// REACT
import React, { useContext } from 'react';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// NEXT
import Image from 'next/image';
import Link from 'next/link';

// ICONS
import { BiMoon, BiSun, BiLogOut } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';

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
            src={context?.user?.userPhotoUrl || internsLogo}
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
          <p
            className={classNames('font-medium', {
              'text-white': context?.isDarkMode,
            })}
          >
            {context?.user?.userEmail}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <button className="buttonIcon">
            <IoSettingsOutline color={context?.isDarkMode ? '#fff' : '#000'} />
          </button>
          <button className="buttonIcon" onClick={darkModeHandler}>
            {context?.isDarkMode ? (
              <BiSun size={20} color="#fff" />
            ) : (
              <BiMoon size={17} />
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
