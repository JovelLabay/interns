// REACT
import React from 'react';

// NEXT
import Link from 'next/link';

// MODULES
import classNames from 'classnames';

// STATIC DATA
import { data } from '../../../Data';

const MenuLinks = ({
  isYellowBg,
  mobileNavhandler,
}: {
  isYellowBg?: boolean;
  mobileNavhandler?: () => void;
}) => {
  return (
    <>
      {data.links.linkMenu.map((link, index) => {
        return (
          <Link href={link.link} key={index}>
            <a
              onClick={mobileNavhandler}
              className={classNames(
                'text-secondaryWhite duration-200 border-b-2 border-b-white lg:hover:border-primaryYellow',
                {
                  'border-b-primaryYellow lg:hover:border-white': isYellowBg,
                }
              )}
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
    if (name === 'Company') {
      localStorage.setItem('cookieInterns', 'company');
    }
    if (name === 'Student') {
      localStorage.setItem('cookieInterns', 'student');
    }
  };

  return (
    <>
      {data.headerButtons.headButtons.map((button, index) => {
        return (
          // <Link key={index} href={button.url}>
          <Link key={index} href={''}>
            <a
              title="Not available yet"
              // onClick={() => cookieHandler(button.name)}
              className={
                index === 0
                  ? isYellowBg
                    ? 'w-[120px] border-2 py-2 font-semibold border-white rounded flex items-center justify-center'
                    : 'w-[120px] py-2 font-semibold bg-primaryYellow rounded flex items-center justify-center hover:cursor-not-allowed'
                  : isYellowBg
                  ? 'w-[120px] py-2 font-semibold bg-white rounded flex items-center justify-center'
                  : 'w-[120px] border-2 py-2 font-semibold border-primaryYellow rounded flex items-center justify-center hover:cursor-not-allowed'
              }
            >
              {button.name}
            </a>
          </Link>
        );
      })}
    </>
  );
};

export { MenuLinks, ButtonLinks };
