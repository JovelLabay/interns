import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';

import internsLogo from '@/assets/logo/interns_logo.png';
import Link from 'next/link';
import { AiTwotoneMail } from 'react-icons/ai';
import { BsBrowserChrome, BsPersonFill } from 'react-icons/bs';
import CompanyDetail from '@component/interface/modal/student/companyDetail';
import { MdDescription } from 'react-icons/md';
import { Disclosure, Tab } from '@headlessui/react';
import classNames from 'classnames';
import { data } from 'Data';
import { DynamicContext } from '@redux/context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentAppliedCompanies } from '@validator/forms';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import { useRouter } from 'next/router';

function SompanyList() {
  const context = useContext(DynamicContext);
  const router = useRouter();

  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [studentAppliedCompanyList, setStudentAppliedCompanyList] = useState<
    FormStudentAppliedCompaniesResponse[]
  >([]);
  const [companyId, setCompanyId] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [states, setStates] = useState({
    disabledAppliedCompany: '',
    appliedCompanies: false,
    isFormOpen: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormStudentAppliedCompanies>({
    mode: 'onSubmit',
    resolver: yupResolver(StudentAppliedCompanies),
  });

  useEffect(() => {
    const parsedStudentData = JSON.parse(context?.studentData || '{}');

    setStates((prev) => ({
      ...prev,
      disabledAppliedCompany: parsedStudentData.student_status,
    }));

    getCompanyLists();
    getStudentAppliedCompanies(parsedStudentData.student_user_id);
  }, []);

  return (
    <div>
      <Tab.Group>
        <Tab.List className="my-2 flex justify-between rounded bg-mainBgWhite py-2">
          {data.studentCompanies.map((item, index) => (
            <Tab
              key={index}
              disabled={
                item.id !== 1 || states.disabledAppliedCompany === 'APPLYING'
                  ? false
                  : true
              }
              className={({ selected }) =>
                classNames(
                  'mx-2 flex w-full flex-row items-center justify-center gap-5 text-sm',
                  selected
                    ? 'rounded-md bg-primaryYellow py-2'
                    : 'rounded-md bg-mainBgWhite py-2',
                  item.id !== 1 || states.disabledAppliedCompany === 'APPLYING'
                    ? ''
                    : 'opacity-50'
                )
              }
            >
              {item.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="text-secondaryWhite">
            <Disclosure>
              {() => (
                <div className="my-2">
                  <Disclosure.Button
                    onClick={() =>
                      setStates((prev) => ({
                        ...prev,
                        isFormOpen: !prev.isFormOpen,
                      }))
                    }
                    className={classNames(
                      'flex w-full items-center justify-between bg-primaryYellowHover px-4 py-4 text-left',
                      states.isFormOpen ? 'rounded-t-md' : 'rounded-md'
                    )}
                  >
                    Post Company you Applied
                    <AiOutlineEdit
                      className={`h-5 w-5 text-secondaryWhite duration-300`}
                    />
                  </Disclosure.Button>
                  {states.isFormOpen && (
                    <div className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
                      <form
                        className="flex w-full flex-col items-start gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();

                          const parsedStudentData = JSON.parse(
                            context?.studentData || '{}'
                          );

                          handleSubmit((data) => {
                            postAppliedCompany(
                              data,
                              parsedStudentData.student_user_id
                            );
                          })();
                        }}
                      >
                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="Job Title"
                            className="text-secondaryWhite"
                          >
                            Company Name{' '}
                            <span className="text-xs text-red-500">*</span>
                          </label>
                          <input
                            className={classNames(
                              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                              {
                                'border-red-500 bg-red-100 placeholder:text-white':
                                  errors.company_name?.message,
                              }
                            )}
                            type="text"
                            placeholder="Company Name"
                            {...register('company_name')}
                          />
                          {errors.company_name?.message && (
                            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                              {errors.company_name?.message}
                            </p>
                          )}
                        </div>

                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="Job Title"
                            className="text-secondaryWhite"
                          >
                            Date Applied{' '}
                            <span className="text-xs text-red-500">*</span>
                          </label>
                          <input
                            className={classNames(
                              'w-[50vh] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                              {
                                'border-red-500 bg-red-100 placeholder:text-white':
                                  errors.date_applied?.message,
                              }
                            )}
                            type="date"
                            placeholder="Date Applied"
                            {...register('date_applied')}
                          />
                          {errors.company_name?.message && (
                            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                              {errors.company_name?.message}
                            </p>
                          )}
                        </div>

                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="Job Title"
                            className="text-secondaryWhite"
                          >
                            Direct Supervisor{' '}
                            <span className="text-xs text-red-500">*</span>
                          </label>
                          <input
                            className={classNames(
                              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                              {
                                'border-red-500 bg-red-100 placeholder:text-white':
                                  errors.direct_supervisor?.message,
                              }
                            )}
                            type="text"
                            placeholder="Direct Supervisor"
                            {...register('direct_supervisor')}
                          />
                          {errors.direct_supervisor?.message && (
                            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                              {errors.direct_supervisor?.message}
                            </p>
                          )}
                        </div>

                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="Job Title"
                            className="text-secondaryWhite"
                          >
                            Contact Number{' '}
                            <span className="text-xs text-red-500">*</span>
                          </label>
                          <input
                            className={classNames(
                              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                              {
                                'border-red-500 bg-red-100 placeholder:text-white':
                                  errors.contact_number?.message,
                              }
                            )}
                            type="text"
                            placeholder="Direct Supervisor"
                            {...register('contact_number')}
                          />
                          {errors.contact_number?.message && (
                            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                              {errors.contact_number?.message}
                            </p>
                          )}
                        </div>

                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="email"
                            className="text-secondaryWhite"
                          >
                            Company Address
                          </label>
                          <textarea
                            className={classNames(
                              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                            )}
                            placeholder="Position Description"
                            {...register('company_address')}
                          />
                        </div>

                        <div className="flex w-full items-center justify-center gap-2">
                          <input
                            className="w-full cursor-pointer rounded bg-primaryYellow py-2 text-xs"
                            value={
                              states.appliedCompanies
                                ? 'Posting the Company you applied for...'
                                : 'Post Company you applied'
                            }
                            type="submit"
                          />
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </Disclosure>

            <div className="flex flex-col gap-2">
              {studentAppliedCompanyList.map((item, index) => (
                <section key={index} className="rounded bg-contastWhite p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">{item.company_name}</h3>
                    <span className="flex items-center justify-end gap-2 text-xs">
                      <p>{new Date(item.createdAt).toLocaleString()}</p>
                      <button
                        title="Delete"
                        className="rounded-sm bg-red-400 p-1"
                        onClick={() =>
                          deleteAppliedCompany(item.id, item.student_User_Id)
                        }
                      >
                        <AiOutlineDelete className="text-white" size={15} />
                      </button>
                    </span>
                  </div>
                  <h5>Person: {item.direct_supervisor}</h5>
                  <h5>Contact Number: {item.contact_number}</h5>
                  <h5>
                    Company Address:{' '}
                    <Link href={router.asPath} passHref>
                      <a
                        className="text-sm text-blue-500 underline"
                        onClick={(e) =>
                          handleLinkClick(e, item.company_address)
                        }
                      >
                        {item.company_address}
                      </a>
                    </Link>
                  </h5>
                </section>
              ))}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="flex flex-col gap-2 text-secondaryWhite">
              {companyList.map((companyDetail, index) => (
                <section key={index} className="rounded bg-customBorder p-2">
                  <div className="flex items-center justify-start gap-2 pb-2">
                    <Image
                      width={50}
                      height={50}
                      src={companyDetail.company_image || internsLogo}
                      alt="company logo"
                      className="rounded-full"
                    />
                    <div className="w-full">
                      <h4>{companyDetail.company_name}</h4>
                      <p className="text-ellipsis text-xs italic">
                        {companyDetail.company_address}
                      </p>
                    </div>
                  </div>
                  {/* OTHER DETAILS */}
                  <div className="flex flex-col gap-2 border-t-2 border-t-primaryYellow px-2 pt-2">
                    {companyDetail.company_email !== '' && (
                      <>
                        <p className="flex items-center gap-2 font-bold">
                          <AiTwotoneMail className="text-red-500" size={25} />
                          Company Email:
                        </p>
                        <Link
                          href={`mailto:${companyDetail.company_email}`}
                          passHref
                        >
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                          >
                            Email Company
                          </a>
                        </Link>
                      </>
                    )}

                    {companyDetail.company_website !== '' && (
                      <>
                        <p className="flex items-center gap-2 font-bold">
                          <BsBrowserChrome
                            className="text-blue-500"
                            size={25}
                          />
                          Company Website:
                        </p>
                        <Link href={companyDetail.company_website} passHref>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                          >
                            Visit Company Website
                          </a>
                        </Link>
                      </>
                    )}

                    <p className="flex items-center gap-2 font-bold">
                      <BsPersonFill className="text-green-500" size={25} />
                      Contact Person:
                    </p>
                    <p className="text-xs">
                      {companyDetail.comapny_contact_person}
                    </p>

                    {companyDetail.company_description !== '' && (
                      <>
                        <p className="flex items-center gap-2 font-bold">
                          <MdDescription className="text-pink-500" size={25} />
                          Company Description:
                        </p>
                        <p className="text-xs">
                          {companyDetail.company_description}
                        </p>
                      </>
                    )}

                    <button
                      className="mt-2 rounded bg-contastWhite py-2"
                      onClick={() => {
                        setIsOpen(true);

                        setCompanyId(companyDetail.id);
                      }}
                    >
                      See more
                    </button>
                  </div>
                </section>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* MODAL */}
      {companyId !== -1 && (
        <CompanyDetail
          modal={isOpen}
          setIsOpen={setIsOpen}
          companyId={companyId}
          setCompanyId={setCompanyId}
        />
      )}
    </div>
  );

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    address: string
  ) {
    const searchQuery = address;
    const encodedQuery = encodeURIComponent(searchQuery);
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    window.open(googleUrl, '_blank');
  }

  function getCompanyLists() {
    axios
      .get('/api/data/company')
      .then((res) => {
        setCompanyList(res.data.responsePayload);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getStudentAppliedCompanies(studentId: number) {
    axios
      .get(`/api/data/appliedCompany?studentId=${studentId}`)
      .then((res) => {
        setStudentAppliedCompanyList(res.data.responsePayload);
      })
      .catch(() => {
        errorNotify('Something went wrong, please try again later.');
      });
  }

  function deleteAppliedCompany(id: number, studentId: number) {
    axios
      .delete(`/api/data/appliedCompany?id=${id}`)
      .then(() => {
        successfulNotify(
          "You've successfully deleted the company you applied."
        );

        getStudentAppliedCompanies(studentId);
      })
      .catch(() => {
        errorNotify('Something went wrong, please try again later.');
      });
  }

  function postAppliedCompany(
    data: FormStudentAppliedCompanies,
    studentId: number
  ) {
    setStates((prev) => ({ ...prev, appliedCompanies: true }));

    axios
      .post(
        `/api/data/appliedCompany?studentId=${studentId}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        successfulNotify("You've successfully posted the company you applied.");

        reset();
        setStates((prev) => ({
          ...prev,
          isFormOpen: false,
          appliedCompanies: true,
        }));
        getStudentAppliedCompanies(studentId);
      })
      .catch(() => {
        errorNotify('Something went wrong, please try again later.');

        setStates((prev) => ({
          ...prev,
          isFormOpen: false,
          appliedCompanies: true,
        }));
      });
  }
}

export default SompanyList;
