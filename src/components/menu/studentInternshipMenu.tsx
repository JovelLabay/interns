import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import Link from 'next/link';
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { database, store } from '@/src/firebase/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import {
  collection,
  onSnapshot,

} from 'firebase/firestore';

import { BsArrowRightCircle, BsFilter } from 'react-icons/bs';
import {
  AiOutlineCheckCircle,
  AiOutlineHeart,
  AiOutlineReload,
} from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { MdAttachMoney } from 'react-icons/md';
import { data } from 'Data';

function StudentIntenshipMenu() {
  const context = useContext(DynamicContext);
  const [isOpen, setIsOpen] = useState(false);
  const [companyUserObject, setCompanyUserObject] = useState({
    jobCategories: [],
    jobListing: [],
  });
  const [active, setActive] = useState({
    internshipCategory: {
      name: 'null',
      id: 'null',
    },
    isMobileModalOpen: false,
    jobDetails: {
      jobId: '',
      selectedIndex: 0,
      companyName: '',
      jobTitle: '',
      isWithAllowance: false,
      isEnvironment: false,
      companyDescription: '',
      jobDescription: '',
      jobLocation: '',
      jobResponsibilities: [] as string[],
      jobQualifications: [] as string[],
      companyId: '',
    },
  });
  const [filter, setFilter] = useState(data.listFilter[0].filterName);

  useEffect(() => {
    const db = database;

    // GET JOB CATEGORIES
    const internshipReference = ref(db, 'school/categories');
    onValue(internshipReference, (snapshot) => {
      const data = snapshot.val() === null ? {} : snapshot.val();
      setCompanyUserObject((prev) => {
        return {
          ...prev,
          jobCategories: data,
        };
      });
    });
  }, []);

  useEffect(() => {
    const theCollegeName = active.internshipCategory.name
      .toLowerCase()
      .replace(/\s/g, '_');

    const abort = onSnapshot(collection(store, theCollegeName), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setCompanyUserObject((prev: any) => {
        return {
          ...prev,
          jobListing: data,
        };
      });
    });

    setIsOpen(!isOpen);

    return () => {
      abort();
    };
  }, [active.internshipCategory]);

  const jobCategoryLists: [string, { categoryName: string }][] = Object.entries(
    companyUserObject.jobCategories || []
  );

  // FILTER
  const lala = useMemo(() => {
    return companyUserObject.jobListing
      .filter((item: any) => {
        if (filter === 'All') {
          return item;
        } else if (filter === 'With Allowance') {
          return item.allowance === true;
        } else if (filter === 'Environemnt | On-site') {
          return item.jobEnvironment === true;
        } else if (filter === 'Urgent') {
          return item.isUrgent === true;
        }
      })
      .map((item) => {
        return item;
      });
  }, [filter, active.internshipCategory.id, companyUserObject.jobListing]);

  return (
    <>
      {/* OPTIONS */}
      <div
        className={classNames(
          'flex gap-5 items-center h-[8vh] px-2 m-2 md:m-3 rounded-md overflow-auto',
          context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
        )}
      >
        {jobCategoryLists.map((category, index) => {
          return (
            <button
              key={index}
              className={classNames(
                'bg-primaryYellow rounded-full text-sm px-5 py-1 md:text-md md:py-2',
                active.internshipCategory.id === category[0] && 'bg-yellowBg'
              )}
              onClick={() =>
                setActive({
                  ...active,
                  internshipCategory: {
                    id: category[0],
                    name: category[1].categoryName,
                  },
                })
              }
            >
              {category[1].categoryName}
            </button>
          );
        })}
      </div>

      {/* LISTS */}
      {active.internshipCategory.name !== 'null' &&
      active.internshipCategory.id !== 'null' &&
      companyUserObject.jobListing.length !== 0 ? (
        <section className="px-2 my-2 md:mx-5 lg:mx-28 grid grid-cols-2 gap-4">
          <div
            className={classNames(
              'col-span-2 md:col-span-1 flex flex-col gap-3 md:h-[67vh] md:overflow-auto',
              context?.isDarkMode ? 'details-white' : 'details-black'
            )}
          >
            {/* SORT */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="pt-1 flex justify-start items-center gap-1 text-sm text-placeholderColor">
                  <p>Sort by</p>
                  <span className="text-blue-500">{filter}</span>
                  <span>
                    <BsFilter size={20} />
                  </span>
                </div>

                <div className="mr-2 font-thin text-sm text-placeholderColor">
                  {lala.length} {lala.length === 1 ? 'Program' : 'Programs'}
                </div>
              </div>

              <div className="flex justify-start items-center gap-3 text-xs w-full overflow-auto">
                {data.listFilter.map(({ filterName, id }) => (
                  <button
                    onClick={() => setFilter(filterName)}
                    key={id}
                    className={classNames(
                      ' py-1 px-3 rounded-full font-medium',
                      filter === filterName
                        ? 'bg-customBorder'
                        : 'bg-placeholderColor'
                    )}
                  >
                    {filterName}
                  </button>
                ))}
              </div>
            </div>

            {/* LIST */}
            {lala.map((job: InternshipObjectInterface, index: number) => {
              return (
                <div
                  onClick={() => {
                    document.title = `Interns | ${active.internshipCategory.name}`;

                    setActive({
                      ...active,
                      isMobileModalOpen: true,
                      jobDetails: {
                        jobId: job.id,
                        selectedIndex: index + 1,
                        companyName: job.companyShortDetails.userName,
                        jobTitle: job.jobTitle,
                        isWithAllowance: job.allowance,
                        isEnvironment: job.jobEnvironment,
                        companyDescription: job.companyDescription,
                        jobDescription: job.jobDescription,
                        jobLocation: job.jobLocation,
                        jobResponsibilities: job.jobResponsibilities,
                        jobQualifications: job.jobQualifications,
                        companyId: job.companyShortDetails.userId,
                      },
                    });
                  }}
                  key={index}
                  className={classNames(
                    'relative p-5 rounded-md flex flex-col gap-1 cursor-pointer md:mr-2',
                    context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white',
                    {
                      'border-2 border-primaryYellow duration-200':
                        active.jobDetails.selectedIndex === index + 1,
                    }
                  )}
                >
                  <h1
                    className={classNames(
                      'font-bold',
                      context?.isDarkMode ? 'text-white' : 'text-black'
                    )}
                  >
                    {job.jobTitle}
                  </h1>
                  <h3
                    className={classNames(
                      'font-medium',
                      context?.isDarkMode
                        ? 'text-teriaryWhite'
                        : 'text-secondaryWhite'
                    )}
                  >
                    {job.companyShortDetails.userName}
                  </h3>
                  <p
                    className={classNames(
                      'font-light italic flex items-center gap-1',
                      context?.isDarkMode
                        ? 'text-teriaryWhite'
                        : 'text-secondaryWhite'
                    )}
                  >
                    <IoLocationOutline size={23} color="red" />
                    <span className="truncate">{job.jobLocation}</span>
                  </p>
                  {job.allowance && (
                    <div className="absolute top-5 right-5 p-2 bg-primaryYellow rounded-full shadow-sm">
                      <MdAttachMoney size={25} color="white" />
                    </div>
                  )}
                  {/* HR DETAILS */}
                  <div className="flex justify-start items-center gap-3">
                    {job.isUrgent && (
                      <p
                        className={classNames(
                          'font-light flex items-center gap-1 text-sm',
                          context?.isDarkMode
                            ? 'text-teriaryWhite'
                            : 'text-secondaryWhite'
                        )}
                      >
                        <BsArrowRightCircle size={20} color="violet" />
                        <span>Urgent Hiring</span>
                      </p>
                    )}
                    {job.isResponsiveHr && (
                      <p
                        className={classNames(
                          'font-light flex items-center gap-1 text-sm',
                          context?.isDarkMode
                            ? 'text-teriaryWhite'
                            : 'text-secondaryWhite'
                        )}
                      >
                        <AiOutlineReload size={20} color="skyBlue" />
                        <span>Responsive Employeer</span>
                      </p>
                    )}
                    {job.isHiredImmediately && (
                      <p
                        className={classNames(
                          'font-light flex items-center gap-1 text-sm',
                          context?.isDarkMode
                            ? 'text-teriaryWhite'
                            : 'text-secondaryWhite'
                        )}
                      >
                        <AiOutlineCheckCircle size={20} color="green" />
                        <span>Easy Apply</span>
                      </p>
                    )}
                  </div>
                  {/* JOB DESCRIPTION */}
                  <p
                    className={classNames(
                      'font-light flex items-center gap-1 truncate',
                      context?.isDarkMode
                        ? 'text-teriaryWhite'
                        : 'text-secondaryWhite'
                    )}
                  >
                    {job.jobDescription}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className={classNames(
              'hidden md:block rounded md:h-[67vh] overflow-auto',
              context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white',
              context?.isDarkMode ? 'details-white' : 'details-black'
            )}
          >
            <InternShipDetailsComponentOnly
              active={active}
              setActive={setActive}
            />
          </div>
        </section>
      ) : (
        <div className="h-[50vh] flex justify-center items-center">
          <h4
            className={classNames(
              'text-center',
              context?.isDarkMode ? 'text-white' : ' text-secondaryBgBlack'
            )}
          >
            Select your preferred job category or No available internship
            programs
          </h4>
        </div>
      )}
      {/* FOR MOBILE ONLY */}
      {active.isMobileModalOpen && (
        <div
          className={classNames(
            'fixed top-0 left-0 w-full h-full block md:hidden z-50 overflow-auto',
            context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
          )}
        >
          <InternShipDetailsComponentOnly
            active={active}
            setActive={setActive}
          />
        </div>
      )}
    </>
  );
}

function InternShipDetailsComponentOnly({
  active,
  setActive,
}: {
  active: {
    internshipCategory: {
      name: string;
      id: string;
    };
    isMobileModalOpen: boolean;
    jobDetails: {
      jobId: string;
      selectedIndex: number;
      companyName: string;
      jobTitle: string;
      isWithAllowance: boolean;
      isEnvironment: boolean;
      companyDescription: string;
      jobDescription: string;
      jobLocation: string;
      jobResponsibilities: string[];
      jobQualifications: string[];
      companyId: string;
    };
  };
  setActive: React.Dispatch<
    React.SetStateAction<{
      internshipCategory: {
        name: string;
        id: string;
      };
      isMobileModalOpen: boolean;
      jobDetails: {
        jobId: string;
        selectedIndex: number;
        companyName: string;
        jobTitle: string;
        isWithAllowance: boolean;
        isEnvironment: boolean;
        companyDescription: string;
        jobDescription: string;
        jobLocation: string;
        jobResponsibilities: string[];
        jobQualifications: string[];
        companyId: string;
      };
    }>
  >;
}) {
  const context = useContext(DynamicContext);

  return (
    <>
      <button
        className="block md:hidden fixed top-3 left-3 rounded-full px-4 py-2 bg-primaryYellow hover:bg-primaryYellowHover text-secondaryWhite font-medium shadow-lg"
        onClick={() =>
          setActive({
            ...active,
            isMobileModalOpen: false,
            jobDetails: {
              jobId: '',
              selectedIndex: 0,
              companyName: '',
              jobTitle: '',
              isWithAllowance: false,
              isEnvironment: false,
              companyDescription: '',
              jobDescription: '',
              jobLocation: '',
              jobResponsibilities: [],
              jobQualifications: [],
              companyId: '',
            },
          })
        }
      >
        Close
      </button>
      {active.jobDetails.selectedIndex !== 0 ? (
        <>
          {/* HEADER */}
          <section className="mx-4 pt-4 pb-6 flex flex-col gap-3 mt-0 md:mt-5 border-b-2">
            <h1
              className={classNames(
                'font-bold mt-16 md:mt-0 text-[40px]',
                context?.isDarkMode ? 'text-white' : 'text-black'
              )}
            >
              {active.jobDetails.jobTitle}
            </h1>
            <h1 className={classNames('font-medium text-[20px] text-blue-500')}>
              {active.jobDetails.companyName}
            </h1>
            <h1
              className={classNames(
                'font-medium text-[20px]',
                context?.isDarkMode
                  ? 'text-teriaryWhite'
                  : 'text-secondaryWhite'
              )}
            >
              <span>
                {active.jobDetails.isWithAllowance
                  ? 'With Allowance'
                  : 'No Allowance'}
              </span>{' '}
              ● {''}
              <span>{active.jobDetails.isEnvironment ? 'On-site' : 'WFH'}</span>
            </h1>

            <div className="flex justify-start items-center gap-4">
              <Link
                // href={`${active.internshipCategory.name
                //   .toLowerCase()
                //   .replace(/\s/g, '_')}/${active.jobDetails.jobId}-${
                //   active.jobDetails.companyId
                // }`}
                // href={`internships/${active.internshipCategory.name
                //   .toLowerCase()
                //   .replace(/\s/g, '_')}?jobId=${
                //   active.jobDetails.jobId
                // }&companyId=${active.jobDetails.companyId}`}
                href={`${data.internshipsRoute}${active.internshipCategory.name
                  .toLowerCase()
                  .replace(/\s/g, '_')}?jobId=${
                  active.jobDetails.jobId
                }&companyId=${active.jobDetails.companyId}`}
              >
                <a className="rounded bg-primaryYellow text-secondaryWhite font-semibold px-8 py-3">
                  Apply
                </a>
              </Link>
              <button className="bg-yellowBg p-2 rounded">
                <AiOutlineHeart color="#585858" size={30} />
              </button>
            </div>
          </section>
          {/* BODY */}
          <section
            className={classNames(
              'mx-4 py-4 flex flex-col gap-4',
              context?.isDarkMode ? 'text-teriaryWhite' : 'text-secondaryWhite'
            )}
          >
            <div>
              <h2 className="font-medium">Company Description</h2>
              <p className="font-light">
                {active.jobDetails.companyDescription}
              </p>
            </div>
            <div>
              <h2 className="font-medium">Job Description</h2>
              <p className="font-light">{active.jobDetails.jobDescription}</p>
            </div>
            <div>
              <h2 className="font-medium">Job Qualifications:</h2>
              <ul>
                {active.jobDetails.jobQualifications.map((item, index) => {
                  return (
                    <li key={index} className="list-disc ml-10">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className="font-medium">Job Responsibilities:</h2>
              <ul>
                {active.jobDetails.jobResponsibilities.map((item, index) => {
                  return (
                    <li key={index} className="list-disc ml-10">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}

export default StudentIntenshipMenu;
