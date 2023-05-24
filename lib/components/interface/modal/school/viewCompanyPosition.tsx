import { warningNotify } from '@component/interface/toast/toast';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function ViewCompanyPosition({
  modal,
  handler,
  company,
  setCompany,
  isClose,
  setIsClose,
  companyJob,
  setCompanyJob,
  companyJobForm,
  postCompanyJob,
  handlerForm,
  state,
  updateCompanyJob,
  deleteCompanyJob,
}: {
  modal: boolean;
  handler: () => void;
  company: {
    companyObject: object;
    companyName: string;
    companyId: number;
    companyJobIndex: number;
  };
  setCompany: React.Dispatch<
    React.SetStateAction<{
      companyObject: object;
      companyName: string;
      companyId: number;
      companyJobIndex: number;
    }>
  >;
  isClose: boolean;
  setIsClose: React.Dispatch<React.SetStateAction<boolean>>;
  companyJob: CompanyJob[];
  setCompanyJob: React.Dispatch<React.SetStateAction<CompanyJob[]>>;
  companyJobForm: {
    job_title: string;
    job_description: string;
    job_requirements: string;
  };
  postCompanyJob(companyId: number): void;
  handlerForm(
    name: string,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
  state: {
    isCreating: boolean;
    uploadingImage: boolean;
    companyJobForm: boolean;
    isEdit: number;
  };
  updateCompanyJob(companyId: number, id: number, data: CompanyJob): void;
  deleteCompanyJob(companyId: number, id: number): void;
}) {
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden xl:block"
        onClose={() => {
          handler();
        }}
      >
        <Transition.Child
          as={React.Fragment}
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
          <div className="flex min-h-full items-center justify-end p-4">
            <Transition.Child
              as={React.Fragment}
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <Dialog.Panel className="w-[35vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-between text-secondaryWhite">
                  <button
                    onClick={() => {
                      handler();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="my-2 h-[85vh] overflow-auto pr-2 text-secondaryWhite">
                  <div className="h-full overflow-auto pr-1">
                    <Disclosure>
                      {({ open }) => (
                        <div className="my-2">
                          <Disclosure.Button
                            onClick={() => {
                              setIsClose(!isClose);
                              setCompany((prev) => ({
                                ...prev,
                                companyJobIndex: -1,
                              }));
                            }}
                            className={classNames(
                              'flex w-full justify-between bg-yellowBg px-4 py-4 text-left',
                              open ? 'rounded-t-md' : 'rounded-md'
                            )}
                          >
                            <span className="font-semibold text-secondaryWhite">
                              Company Internship Listing Form
                            </span>
                            <FiChevronDown
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-primaryYellow duration-300`}
                            />
                          </Disclosure.Button>
                          {isClose && (
                            <div className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
                              <form
                                className="flex w-full flex-col items-start gap-2"
                                onSubmit={(e) => {
                                  e.preventDefault();

                                  if (companyJobForm.job_title === '') {
                                    warningNotify('Job Title is required!');
                                  } else if (
                                    companyJobForm.job_requirements === ''
                                  ) {
                                    warningNotify(
                                      'Job Requirements is required!'
                                    );
                                  } else {
                                    postCompanyJob(company.companyId);
                                  }
                                }}
                              >
                                <div className="flex w-full flex-col items-start gap-2">
                                  <label
                                    htmlFor="email"
                                    className="text-secondaryWhite"
                                  >
                                    Position{' '}
                                    <span className="text-xs text-red-500">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className={classNames(
                                      'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                    )}
                                    type="text"
                                    placeholder="Position"
                                    value={companyJobForm.job_title}
                                    name="job_title"
                                    onChange={(e) =>
                                      handlerForm('job_title', e)
                                    }
                                  />
                                </div>
                                <div className="flex w-full flex-col items-start gap-2">
                                  <label
                                    htmlFor="email"
                                    className="text-secondaryWhite"
                                  >
                                    Position Description
                                  </label>
                                  <textarea
                                    className={classNames(
                                      'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                    )}
                                    placeholder="Position Description"
                                    name="job_description"
                                    value={companyJobForm.job_description}
                                    onChange={(e) =>
                                      handlerForm('job_description', e)
                                    }
                                  />
                                </div>
                                <div className="flex w-full flex-col items-start gap-2">
                                  <label
                                    htmlFor="email"
                                    className="text-secondaryWhite"
                                  >
                                    Position Requirements
                                    <span className="text-xs text-red-500">
                                      *
                                    </span>
                                  </label>
                                  <span className="text-xs font-light italic text-red-500">
                                    {
                                      ' Please use this | as the divider of the requirements.'
                                    }
                                  </span>
                                  <textarea
                                    className={classNames(
                                      'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                    )}
                                    placeholder="Position Requirements"
                                    name="job_requirements"
                                    value={companyJobForm.job_requirements}
                                    onChange={(e) =>
                                      handlerForm('job_requirements', e)
                                    }
                                  />
                                </div>

                                <input
                                  className="w-full cursor-pointer rounded bg-primaryYellow py-2 text-xs"
                                  value={
                                    state.companyJobForm
                                      ? 'Creating New Company Position Listing...'
                                      : 'Create New Company Position Listing'
                                  }
                                  type="submit"
                                />
                              </form>
                            </div>
                          )}
                        </div>
                      )}
                    </Disclosure>

                    {companyJob.map((job, index) => (
                      <Disclosure key={job.id}>
                        {() => (
                          <div className="my-2">
                            <Disclosure.Button
                              onClick={() =>
                                setCompany((prev) => ({
                                  ...prev,
                                  companyJobIndex: index,
                                }))
                              }
                              className={classNames(
                                'flex w-full justify-between bg-primaryYellowHover px-4 py-4 text-left',
                                company.companyJobIndex === index
                                  ? 'rounded-t-md'
                                  : 'rounded-md'
                              )}
                            >
                              <span className="font-semibold text-secondaryWhite">
                                {`(${index + 1}) `}
                                {job.job_title}
                              </span>
                              <FiChevronDown
                                className={`${
                                  company.companyJobIndex === index
                                    ? 'rotate-180 transform'
                                    : ''
                                } h-5 w-5 text-primaryYellow duration-300`}
                              />
                            </Disclosure.Button>
                            {company.companyJobIndex === index && (
                              <div className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
                                <form
                                  className="flex w-full flex-col items-start gap-2"
                                  onSubmit={(e) => {
                                    e.preventDefault();

                                    if (companyJob[index].job_title === '') {
                                      warningNotify('Job Title is required!');
                                    } else if (
                                      companyJob[index].job_requirements === ''
                                    ) {
                                      warningNotify(
                                        'Job Requirements is required!'
                                      );
                                    } else {
                                      updateCompanyJob(
                                        company.companyId,
                                        job.id,
                                        companyJob[index]
                                      );
                                    }
                                  }}
                                >
                                  <div className="flex w-full flex-col items-start gap-2">
                                    <label
                                      htmlFor="Job Title"
                                      className="text-secondaryWhite"
                                    >
                                      Position{' '}
                                      <span className="text-xs text-red-500">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      className={classNames(
                                        'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                      )}
                                      type="text"
                                      placeholder="Position"
                                      value={companyJob[index].job_title}
                                      onChange={(e) => {
                                        const newJob = [...companyJob];
                                        newJob[index].job_title =
                                          e.target.value;
                                        setCompanyJob(newJob);
                                      }}
                                      name="job_title"
                                    />
                                  </div>
                                  <div className="flex w-full flex-col items-start gap-2">
                                    <label
                                      htmlFor="email"
                                      className="text-secondaryWhite"
                                    >
                                      Position Description
                                    </label>
                                    <textarea
                                      className={classNames(
                                        'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                      )}
                                      placeholder="Position Description"
                                      name="job_description"
                                      value={companyJob[index].job_description}
                                      onChange={(e) => {
                                        const newJob = [...companyJob];
                                        newJob[index].job_description =
                                          e.target.value;
                                        setCompanyJob(newJob);
                                      }}
                                    />
                                  </div>
                                  <div className="flex w-full flex-col items-start gap-2">
                                    <label
                                      htmlFor="email"
                                      className="text-secondaryWhite"
                                    >
                                      Position Requirements
                                      <span className="text-xs text-red-500">
                                        *
                                      </span>
                                    </label>
                                    <span className="text-xs font-light italic text-red-500">
                                      {
                                        ' Please use this | as the divider of the requirements.'
                                      }
                                    </span>
                                    <textarea
                                      className={classNames(
                                        'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                      )}
                                      placeholder="Position Requirements"
                                      name="job_requirements"
                                      value={companyJob[index].job_requirements}
                                      onChange={(e) => {
                                        const newJob = [...companyJob];
                                        newJob[index].job_requirements =
                                          e.target.value;
                                        setCompanyJob(newJob);
                                      }}
                                    />
                                  </div>

                                  <div className="flex w-full items-center justify-center gap-2">
                                    <input
                                      className="w-full cursor-pointer rounded bg-primaryYellow py-2 text-xs"
                                      value={
                                        state.companyJobForm
                                          ? 'Updating Company Position Listing...'
                                          : 'Update Company Position Listing'
                                      }
                                      type="submit"
                                    />

                                    <button
                                      className="w-[50%] cursor-pointer rounded bg-red-400 py-2 text-xs text-white"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        deleteCompanyJob(
                                          company.companyId,
                                          companyJob[index].id
                                        );
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ViewCompanyPosition;
