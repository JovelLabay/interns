import { errorNotify } from '@component/interface/toast/toast';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function CompanyDetail({
  modal,
  setIsOpen,
  companyId,
  setCompanyId,
}: {
  modal: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  companyId: number;
  setCompanyId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [companyJob, setCompanyJob] = useState<CompanyJob[]>([]);
  const [companyJobIndex, setCompanyJobIndex] = useState(-1);

  useEffect(() => {
    getCompanyJob(companyId);
  }, [companyId]);

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setIsOpen(false);
          setCompanyId(-1);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex  min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setCompanyId(-1);
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="h-[85vh] overflow-auto">
                  {companyJob.map((job, index) => (
                    <Disclosure key={job.id}>
                      {() => (
                        <div className="my-2">
                          <Disclosure.Button
                            onClick={() => setCompanyJobIndex(index)}
                            className={classNames(
                              'flex w-full justify-between bg-primaryYellowHover px-4 py-4 text-left',
                              companyJobIndex === index
                                ? 'rounded-t-md'
                                : 'rounded-md'
                            )}
                          >
                            <span className="text-sm font-semibold text-secondaryWhite">
                              {`(${index + 1}) `}
                              {job.job_title}
                            </span>
                            <FiChevronDown
                              className={`${
                                companyJobIndex === index
                                  ? 'rotate-180 transform'
                                  : ''
                              } h-5 w-5 text-primaryYellow duration-300`}
                            />
                          </Disclosure.Button>
                          {companyJobIndex === index && (
                            <div className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
                              <div className="flex w-full flex-col items-start gap-2">
                                <div className="flex w-full flex-col items-start gap-2">
                                  <label
                                    htmlFor="Job Title"
                                    className="text-secondaryWhite"
                                  >
                                    Job Title
                                  </label>
                                  <p
                                    className={classNames(
                                      'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                    )}
                                  >
                                    {companyJob[index].job_title}
                                  </p>
                                </div>

                                {companyJob[index].job_description !== '' && (
                                  <div className="flex w-full flex-col items-start gap-2">
                                    <label
                                      htmlFor="email"
                                      className="text-secondaryWhite"
                                    >
                                      Job Description
                                    </label>
                                    <p
                                      className={classNames(
                                        'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                      )}
                                    >
                                      {companyJob[index].job_description}
                                    </p>
                                  </div>
                                )}

                                <div className="flex w-full flex-col items-start gap-2">
                                  <label
                                    htmlFor="email"
                                    className="text-secondaryWhite"
                                  >
                                    Job Requirements
                                  </label>

                                  {(function () {
                                    const requirements =
                                      companyJob[index].job_requirements.split(
                                        '|'
                                      );
                                    return (
                                      <ul className="list-disc">
                                        {requirements.map(
                                          (required, index2) => (
                                            <li
                                              key={index2}
                                              className={'ml-5 text-left'}
                                            >
                                              {required}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function getCompanyJob(companyId: number) {
    axios
      .get(`/api/data/companyJob?companyId=${companyId}`)
      .then((res) => {
        setCompanyJob(res.data.responsePayload);
      })
      .catch(() => {
        errorNotify("Sorry, we can't get the company job listing!");
      });
  }
}

export default CompanyDetail;
