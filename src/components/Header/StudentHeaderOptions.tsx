import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import { data } from 'Data';
import React, { useContext } from 'react';
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai';
import { BiExit, BiMoon } from 'react-icons/bi';
import { BsBookmarkDash, BsSun } from 'react-icons/bs';
import { MdOutlineDarkMode } from 'react-icons/md';

function StudentHeaderOptions({
  theClass,
  darkModeHandler,
  signoutStudent,
}: {
  theClass?: string;
  darkModeHandler: () => void;
  signoutStudent: () => void;
}) {
  const context = useContext(DynamicContext);

  return (
    <div className={theClass}>
      <ul className="flex flex-col lg:flex-row gap-7 md:gap-14 lg:gap-5 mx-10 md:mx-20 lg:mx-0">
        {data.navigationLinks.map((link) => {
          return (
            <li
              key={link.id}
              className="flex items-center hover:cursor-pointer "
              onClick={() => linkHandler(link.id)}
            >
              {link.id === 1 ? (
                <BsBookmarkDash
                  className="p-2 bg-primaryYellow rounded-md"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              ) : link.id === 2 ? (
                <AiOutlineSetting
                  className="p-2 bg-primaryYellow rounded-md"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              ) : link.id === 3 ? (
                <AiOutlineMessage
                  className="p-2 bg-primaryYellow rounded-md"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              ) : link.id === 4 ? (
                <>
                  {context?.isDarkMode ? (
                    <BsSun
                      className="p-2 bg-primaryYellow rounded-md"
                      size={38}
                      color={context?.isDarkMode ? ' #fff' : ' #000'}
                    />
                  ) : (
                    <BiMoon
                      className="p-2 bg-primaryYellow rounded-md"
                      size={38}
                      color={context?.isDarkMode ? ' #fff' : ' #000'}
                    />
                  )}
                </>
              ) : (
                <BiExit
                  className="p-2 bg-primaryYellow rounded-md"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              )}

              <span
                className={classNames(
                  'block lg:hidden ml-9 md:ml-8',
                  context?.isDarkMode ? ' text-white' : ' text-black'
                )}
              >
                {link.id === 4 ? (
                  <>{context?.isDarkMode ? <>Light Mode</> : <>Dark Mode</>}</>
                ) : (
                  link.name
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  function linkHandler(id: number) {
    {
      id === 1
        ? null
        : id === 2
        ? null
        : id === 3
        ? null
        : id === 4
        ? darkModeHandler()
        : signoutStudent();
    }
  }
}

export default StudentHeaderOptions;
