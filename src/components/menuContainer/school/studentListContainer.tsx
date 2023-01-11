// REACT
import React, { Fragment, useState } from 'react';

// ICONS
import { BiCategoryAlt, BiFilter } from 'react-icons/bi';

// COMPONENTS OR LAYOUTS
import AddStudents from '@/src/components/modals/addStudents';
import StudentListingContainer from '@/src/components/blocks/studentListingContainer';
// UI
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
  AiOutlinePrinter,
} from 'react-icons/ai';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { ToastContainer } from 'react-toastify';

function StudentListContainer({
  listingOfColleges,
}: {
  listingOfColleges: [string, CollegeListInterface][];
}) {
  const [isOpen, setIsOpen] = useState({
    addStudents: false,
    addStudentsTitle: '',
    isSearch: '',
    isEdit: '',
    searchInput: '',
    studentNumber: 0,
    collegeId: '',
    index: -1,
    collegeName: '',
    id: '',
    collegeCourses: [] as string[],
    studentCourse: 'Select Department',
    studentStatus: false,
  });

  return (
    <div className="flex flex-col gap-3">
      {/* COLLEGES NAME */}
      <div className="flex h-[7vh] w-full items-center gap-5 overflow-x-auto rounded bg-white px-10">
        {listingOfColleges.map((college, index) => (
          <button
            key={index}
            className={classNames(
              'rounded-full py-1 px-3',
              isOpen.index === index ? 'bg-yellowBg' : ' bg-primaryYellow',
              isOpen.index === index ? 'text-secondaryWhite' : ' text-white'
            )}
            onClick={() =>
              setIsOpen((prev) => {
                return {
                  ...prev,
                  index: index,
                  collegeName: college[1].collegeName,
                  id: college[0],
                  collegeCourses: college[1].courses || [],
                };
              })
            }
          >
            {college[1].collegeName}
          </button>
        ))}
      </div>

      {/* COLLGE LISTS OF STUDENTS */}
      <div className="rounded bg-white lg:mx-14 2xl:mx-28">
        <section className="flex h-[13vh] w-full flex-col justify-center gap-2 rounded-t-md border-b-2  px-5">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <button
                disabled={isOpen.id === '' ? true : false}
                className={classNames('buttonIcon', {
                  'cursor-not-allowed opacity-50': isOpen.id === '',
                })}
                onClick={() => setIsOpen({ ...isOpen, addStudents: true })}
              >
                <AiOutlinePlusCircle size={20} />
              </button>
              <button
                className={classNames('buttonIcon', {
                  'cursor-not-allowed opacity-50': isOpen.id === '',
                })}
              >
                <AiOutlineDelete size={20} />
              </button>
              <button
                className={classNames('buttonIcon', {
                  'cursor-not-allowed opacity-50': isOpen.id === '',
                })}
              >
                <AiOutlineEdit size={20} />
              </button>
              <button
                className={classNames('buttonIcon', {
                  'cursor-not-allowed opacity-50': isOpen.id === '',
                })}
              >
                <AiOutlinePrinter size={20} />
              </button>
              <button
                className={classNames('buttonIcon', {
                  'cursor-not-allowed opacity-50': isOpen.id === '',
                })}
              >
                <HiOutlineInformationCircle />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search Student Name..."
              className="w-[300px] rounded-md bg-mainBgWhite px-2 py-3 text-sm font-light outline-none"
            />
          </div>

          {/* SORT */}
          <div className="flex items-center justify-between">
            <section className="flex items-center gap-2">
              <p className="flex w-[250px] items-center gap-2 rounded-md border-2 border-customBorder py-1 px-4">
                <BiFilter size={25} /> Filter
              </p>
              {/* MENU BUTTON */}
              <Popover className="relative">
                {() => (
                  <>
                    <Popover.Button
                      className={classNames(
                        'flex items-center gap-2 rounded-md border-2 border-customBorder py-1 px-4 outline-none focus:bg-contastWhite',
                        {
                          'cursor-not-allowed opacity-50': isOpen.id === '',
                        }
                      )}
                      disabled={isOpen.id === '' ? true : false}
                    >
                      <BiCategoryAlt /> Options
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
                      <Popover.Panel className="absolute left-0 z-10 text-left">
                        <div className="flex w-[400px] flex-col items-start overflow-hidden rounded-lg bg-white p-4 text-left text-secondaryWhite shadow-lg ring-1 ring-black ring-opacity-5">
                          <button>Active Accounts</button>
                          <button>sdfsdf</button>
                          <button>sdfsdfsxcvxv dpeorpqo</button>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </section>
            <p className="font-thin text-secondaryWhite">xxdctyee</p>
          </div>
        </section>

        <section className="h-[58vh] overflow-y-auto px-4 pt-2">
          {isOpen.collegeName !== '' ? (
            <StudentListingContainer isOpen={isOpen} />
          ) : (
            <p className="my-20 text-center">Select College</p>
          )}
        </section>
      </div>

      {/* ADD STUDENTS */}
      <AddStudents isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* TOAST */}
      <ToastContainer />
    </div>
  );
}

export default StudentListContainer;
