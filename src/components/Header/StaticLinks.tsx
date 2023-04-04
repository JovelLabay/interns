// REACT
import React from 'react';

// NEXT
import Link from 'next/link';

// MODULES
import classNames from 'classnames';

// STATIC DATA
import header from '@data/header.data.json';

const MenuLinks = ({
  isYellowBg,
  mobileNavhandler,
}: {
  isYellowBg?: boolean;
  mobileNavhandler?: () => void;
}) => {
  return (
    <>
      {header.links.map((link, index) => {
        return (
          <Link href={link.link} key={index}>
            <a
              onClick={mobileNavhandler}
              className={classNames({
                'border-b-2 border-primaryYellow text-white duration-300 hover:border-white':
                  isYellowBg,
                'border-b-2 border-white text-mainBgBlack duration-300 hover:border-primaryYellow':
                  !isYellowBg,
              })}
            >
              {link.name}
            </a>
          </Link>
        );
      })}
    </>
  );
};

const ButtonLinks = ({ isYellowBg }: { isYellowBg?: boolean }) => {
  const cookieHandler = (name: string) => {
    if (name === 'Student') {
      localStorage.setItem('cookieInterns', 'student');
    }
  };

  return (
    <>
      {header.headerButtons.map((button, index) => {
        return (
          <Link key={index} href={button.url}>
            <button
              onClick={() => cookieHandler(button.name)}
              className={
                isYellowBg
                  ? 'flex w-[120px] items-center justify-center rounded-full bg-white py-2 font-semibold duration-300 hover:scale-105'
                  : 'flex w-[120px] items-center justify-center rounded-full bg-primaryYellow py-2 font-semibold duration-300 hover:scale-105'
              }
            >
              {button.name}
            </button>
          </Link>
        );
      })}
    </>
  );
};

export { MenuLinks, ButtonLinks };
