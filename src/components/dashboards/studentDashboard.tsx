import { DynamicContext } from '@/src/contexts/context';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { data } from 'Data';
import Head from 'next/head';
import React, { Fragment, useContext, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import StudentCompanyMenu from '../menu/studentCompanyMenu';
import StudentIntenshipMenu from '../menu/studentInternshipMenu';

function StudentDashboard() {
  const context = useContext(DynamicContext);

  const [selectedMenu, setSelectedMenu] = useState({
    programsCompany: 1,
    internshipCategory: 0,
  });

  return (
    <div>
      <Head>
        <title>Interns | Student Home</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta
          name="theme-color"
          content={context?.isDarkMode ? '#212130' : '#fff'}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-[88vh] overflow-auto md:overflow-hidden">
        {/* PROGRAMS AND COMPANIES */}
        <div
          className={classNames(
            'm-2 flex h-[8vh] flex-row items-center gap-5 rounded-md px-2 py-7 md:m-3',
            context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
          )}
        >
          {/* MENU BUTTON */}
          <Popover className="relative">
            {() => (
              <>
                <Popover.Button className="outline-none">
                  <BsThreeDotsVertical
                    color={context?.isDarkMode ? '#D3D3D3' : '#585858'}
                    size={20}
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-0 z-10 w-[200px] text-left">
                    <div className="text- overflow-hidden rounded-lg text-left shadow-lg ring-1 ring-black ring-opacity-5">
                      <div
                        className={classNames(
                          'flex flex-col items-start gap-2 p-5',
                          context?.isDarkMode
                            ? 'bg-mainBgBlack text-teriaryWhite'
                            : 'bg-white text-secondaryWhite'
                        )}
                      >
                        <button>Your Details</button>
                        <button>Your Job</button>
                        <button>Saved Companies</button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          {/* MENUS */}
          {data.dashboardMenu.map((item) => {
            return (
              <button
                key={item.id}
                className={classNames(
                  'md:text-md border-b-[3px] pb-1 text-base font-medium',
                  context?.isDarkMode
                    ? 'text-teriaryWhite '
                    : 'text-secondaryWhite',
                  selectedMenu.programsCompany === item.id
                    ? 'border-primaryYellow'
                    : context?.isDarkMode
                    ? 'border-secondaryBgBlack'
                    : 'border-white'
                )}
                onClick={() =>
                  setSelectedMenu({ ...selectedMenu, programsCompany: item.id })
                }
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* JOB CATEGORY || CAMPANY LIST */}
        {selectedMenu.programsCompany === 1 ? (
          <StudentIntenshipMenu />
        ) : (
          <StudentCompanyMenu />
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
