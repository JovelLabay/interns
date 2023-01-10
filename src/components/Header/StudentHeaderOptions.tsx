import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import { data } from 'Data';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai';
import { BiExit, BiMoon } from 'react-icons/bi';
import { BsBookmarkDash, BsSun } from 'react-icons/bs';
import {
  MdAccountCircle,
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
} from 'react-icons/md';

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
  const router = useRouter();

  const paths = router.pathname.split('/');

  return (
    <div className={theClass}>
      <ul className="mx-10 mb-10 flex flex-col gap-7 md:mx-20 md:mb-0 md:gap-14 lg:mx-0 lg:flex-row lg:gap-5">
        {data.navigationLinks.map((link) => {
          return (
            <li
              title={link.name}
              key={link.id}
              className="flex items-center hover:cursor-pointer"
              onClick={() => {
                link.path !== paths[paths.length - 1]
                  ? linkHandler(link.id, link.slug, context?.user.userId)
                  : null;
              }}
            >
              {link.id === 1 ? (
                <BsBookmarkDash
                  className="rounded-md bg-primaryYellow p-2"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              ) : link.id === 2 ? (
                <MdOutlineAccountCircle
                  className="rounded-md bg-primaryYellow p-2"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              ) : link.id === 3 ? (
                <AiOutlineMessage
                  className="rounded-md bg-primaryYellow p-2"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              ) : link.id === 4 ? (
                <>
                  {context?.isDarkMode ? (
                    <BsSun
                      className="rounded-md bg-primaryYellow p-2"
                      size={38}
                      color={context?.isDarkMode ? ' #fff' : ' #000'}
                    />
                  ) : (
                    <BiMoon
                      className="rounded-md bg-primaryYellow p-2"
                      size={38}
                      color={context?.isDarkMode ? ' #fff' : ' #000'}
                    />
                  )}
                </>
              ) : (
                <BiExit
                  className="rounded-md bg-primaryYellow p-2"
                  size={38}
                  color={context?.isDarkMode ? ' #fff' : ' #000'}
                />
              )}

              <span
                className={classNames(
                  'ml-9 block md:ml-8 lg:hidden',
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

  function linkHandler(id: number, slug: string, e?: string) {
    {
      id === 1
        ? router.push(`${slug}/sdfsdf`)
        : id === 2
        ? router.push(`${slug}/${e}`)
        : id === 3
        ? null
        : id === 4
        ? darkModeHandler()
        : signoutStudent();
    }
  }
}

export default StudentHeaderOptions;
