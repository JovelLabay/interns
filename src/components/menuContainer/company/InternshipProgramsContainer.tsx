// REACT
import React, { useContext } from 'react';

// STATE MANAGEMENT
import {
  CompanyUserDetailsContext,
  DynamicContext,
} from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// ICONS
import { AiOutlineEdit, AiOutlineLock } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { IoTimerOutline } from 'react-icons/io5';
import { Disclosure, Transition } from '@headlessui/react';

function InternshipProgramsContainer() {
  const context = useContext(DynamicContext);
  const context2 = useContext(CompanyUserDetailsContext);

  const companyJobTypeCategory: [string, { categoryName: string }][] =
    Object.entries(context2?.companyUserObject.companyCategories || []);

  return (
    <div>
      <div
        className={classNames(
          'flex justify-around bg-white my-3 rounded py-4',
          {
            'bg-secondaryBgBlack': context?.isDarkMode,
          }
        )}
      >
        <p
          className={classNames('text-secondaryWhite font-medium', {
            'text-white': context?.isDarkMode,
          })}
        >
          Current Company Internship Programs
        </p>
        <p
          className={classNames(
            'text-secondaryWhite font-medium tracking-widest',
            {
              'text-white': context?.isDarkMode,
            }
          )}
        >
          CONTROLS
        </p>
      </div>
      {/* FILTER */}
      <div
        className={classNames(
          'flex bg-white my-3 rounded py-3 px-2 gap-3 overflow-x-auto',
          {
            'bg-secondaryBgBlack': context?.isDarkMode,
          }
        )}
      >
        {companyJobTypeCategory.map((item, index) => {
          return (
            <button
              key={index}
              className={classNames('bg-primaryYellow py-1 px-3 rounded-full', {
                'bg-yellowBg':
                  item[1].categoryName === context2?.activeCompanyJobCategory,
              })}
              onClick={() =>
                context2?.setActiveCompanyJobCategory(item[1].categoryName)
              }
            >
              {item[1].categoryName}
            </button>
          );
        })}
      </div>
      {/* LIST OF INTERNSHIPS */}
      <div className="h-[58vh] overflow-auto">
        {context2?.companyUserObject.companyInternships.length ||
        [].length >= 1 ? (
          <>
            {context2?.companyUserObject.companyInternships.map(
              (item: InternshipObjectInterface, index: number) => {
                return (
                  <div
                    key={index}
                    className={classNames(
                      'mb-3 bg-white rounded py-2 px-3 border-2 border-white',
                      {
                        'bg-secondaryBgBlack border-secondaryBgBlack ':
                          context?.isDarkMode,
                      }
                    )}
                  >
                    <Disclosure>
                      <div
                        className={classNames(
                          'grid grid-cols-3 gap-3 w-full mb-3 items-center'
                        )}
                      >
                        <Disclosure.Button className="col-span-2 border-r-2 flex flex-col justify-center items-start">
                          <p className="font-bold text-primaryYellow uppercase text-3xl">
                            {item.jobTitle}
                          </p>
                          <p
                            className={classNames(
                              'text-secondaryWhite font-medium',
                              {
                                'text-white': context?.isDarkMode,
                              }
                            )}
                          >
                            Program Status:{' '}
                            <span className="font-light">
                              {item.applicationStatus}
                            </span>
                          </p>
                          <p
                            className={classNames(
                              'text-secondaryWhite font-medium',
                              {
                                'text-white': context?.isDarkMode,
                              }
                            )}
                          >
                            Job Category:{' '}
                            <span className="font-light">
                              {item.jobCategory}
                            </span>
                          </p>
                        </Disclosure.Button>
                        <div className="flex items-center justify-evenly">
                          <button className="p-4 rounded bg-green-500">
                            <AiOutlineEdit color="#fff" size={20} />
                          </button>
                          <button className="p-4 rounded bg-violet-500">
                            <IoTimerOutline color="#fff" size={20} />
                          </button>
                          <button className="p-4 rounded bg-blue-500">
                            <AiOutlineLock color="#fff" size={20} />
                          </button>
                          <button className="p-4 rounded bg-red-500">
                            <BiTrashAlt color="#fff" size={20} />
                          </button>
                        </div>
                      </div>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="flex flex-col gap-2 border-t-2 ">
                          <div>
                            <p
                              className={classNames(
                                'text-secondaryWhite font-medium mt-3',
                                {
                                  'text-white': context?.isDarkMode,
                                }
                              )}
                            >
                              Job Description
                            </p>
                            <p
                              className={classNames(
                                'text-secondaryWhite font-light',
                                {
                                  'text-white': context?.isDarkMode,
                                }
                              )}
                            >
                              {item.jobDescription}
                            </p>
                          </div>
                          <div className="flex gap-10">
                            <div>
                              <p
                                className={classNames(
                                  'text-secondaryWhite font-medium',
                                  {
                                    'text-white': context?.isDarkMode,
                                  }
                                )}
                              >
                                Job Responsibilities
                              </p>
                              {item.jobResponsibilities.map((jonRes, index) => (
                                <p
                                  key={index}
                                  className={classNames(
                                    'text-secondaryWhite font-light',
                                    {
                                      'text-white': context?.isDarkMode,
                                    }
                                  )}
                                >
                                  {`${index + 1}. `} {jonRes}
                                </p>
                              ))}
                            </div>
                            <div>
                              <p
                                className={classNames(
                                  'text-secondaryWhite font-medium',
                                  {
                                    'text-white': context?.isDarkMode,
                                  }
                                )}
                              >
                                Job Qualifications
                              </p>
                              {item.jobQualifications.map((jobQual, index) => (
                                <p
                                  key={index}
                                  className={classNames(
                                    'text-secondaryWhite font-light',
                                    {
                                      'text-white': context?.isDarkMode,
                                    }
                                  )}
                                >
                                  {`${index + 1}. `}
                                  {jobQual}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div>
                              <p
                                className={classNames(
                                  'text-secondaryWhite font-medium',
                                  {
                                    'text-white': context?.isDarkMode,
                                  }
                                )}
                              >
                                Allowance
                              </p>
                              <p
                                className={classNames(
                                  'text-secondaryWhite font-light',
                                  {
                                    'text-white': context?.isDarkMode,
                                  }
                                )}
                              >
                                {item.allowance ? 'Yes' : 'No'}
                              </p>
                            </div>
                            <div>
                              <p
                                className={classNames(
                                  'text-secondaryWhite font-medium',
                                  {
                                    'text-white': context?.isDarkMode,
                                  }
                                )}
                              >
                                Allowance Amount
                              </p>
                              <p
                                className={classNames(
                                  'text-secondaryWhite font-light',
                                  {
                                    'text-white': context?.isDarkMode,
                                  }
                                )}
                              >
                                {`PHP `}
                                {item.allowanceAmount === ''
                                  ? '0'
                                  : item.allowanceAmount}
                                {`.00 Per Day`}
                              </p>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                );
              }
            )}
          </>
        ) : (
          <>
            {context2?.activeCompanyJobCategory !== 'Unspecified' ? (
              <p
                className={classNames(
                  'text-center my-10 text-secondaryWhite font-light',
                  {
                    'text-white': context?.isDarkMode,
                  }
                )}
              >
                No Internship Programs for {context2?.activeCompanyJobCategory}
              </p>
            ) : (
              <p
                className={classNames(
                  'text-center my-10 text-secondaryWhite font-light',
                  {
                    'text-white': context?.isDarkMode,
                  }
                )}
              >
                Select a Job Category
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default InternshipProgramsContainer;
