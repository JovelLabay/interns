// REACT
import React, { useContext } from 'react';

// UI
import { Listbox, Switch } from '@headlessui/react';

// STATE
import { DynamicContext } from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// ICONS
import { FiChevronDown } from 'react-icons/fi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function AddEditInternshipForm({
  addInternshipForm,
  setAddInternshipForm,
  isOpen,
  setIsOpen,
  jobList,
  setJobList,
  category,
}: InternshipProgramInterface) {
  const context = useContext(DynamicContext);

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5 mx-20">
      {/* LEFT */}
      <div className="flex flex-col gap-8">
        {/* JOB TITLE */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            Title of the Job
          </label>
          <input
            value={addInternshipForm.jobTitle}
            onChange={(e) => {
              setAddInternshipForm((prev) => {
                return {
                  ...prev,
                  jobTitle: e.target.value,
                };
              });
            }}
            className={classNames(
              'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
              {
                'bg-secondaryBgBlack text-white': context?.isDarkMode,
              }
            )}
            placeholder="Job Title"
          />
        </div>
        {/* JOB DESCRIPTION */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            Description of the Job
          </label>
          <textarea
            value={addInternshipForm.jobDescription}
            onChange={(e) => {
              setAddInternshipForm((prev) => {
                return {
                  ...prev,
                  jobDescription: e.target.value,
                };
              });
            }}
            className={classNames(
              'w-full py-2 px-3 min-h-[80px]  rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
              {
                'bg-secondaryBgBlack text-white': context?.isDarkMode,
              }
            )}
            placeholder="Job Description"
          />
        </div>
        {/* JOB CATEGORY */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            Category of the Job
          </label>
          <Listbox
            value={addInternshipForm.jobCategory}
            onChange={(value: any) =>
              setAddInternshipForm((prev) => {
                return { ...prev, jobCategory: value[1].categoryName };
              })
            }
          >
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button
                  className={classNames(
                    'bg-mainBgWhite outline-none px-2 py-2 rounded-md border-2 border-primaryYellow w-[335px] flex justify-between',
                    {
                      'bg-secondaryBgBlack text-white': context?.isDarkMode,
                    }
                  )}
                >
                  {addInternshipForm.jobCategory}
                  <FiChevronDown
                    size={30}
                    className={classNames('duration-300 text-secondaryWhite', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options
                  className={classNames(
                    'absolute bg-white rounded-md p-2 w-[335px] shadow-md hover:cursor-pointer max-h-[150px] z-30 overflow-auto',
                    {
                      'bg-secondaryBgBlack text-white': context?.isDarkMode,
                    }
                  )}
                >
                  {category?.map((category, index) => (
                    <Listbox.Option
                      className="py-1"
                      key={index}
                      value={category}
                    >
                      {category[1].categoryName}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>
        {/* JOB RESPONSIBILITY */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            Job Responsibilities
          </label>
          {/* LIST */}
          <ol>
            {addInternshipForm.jobResponsibilities.map((item, index) => {
              return (
                <li
                  className={classNames('text-secondaryWhite text-left', {
                    'text-white': context?.isDarkMode,
                  })}
                  key={index}
                >{`● ${item}`}</li>
              );
            })}
          </ol>
          {/* FORM */}
          {isOpen.jobResponsibility && (
            <>
              <textarea
                className={classNames(
                  'w-full py-2 px-3 min-h-[80px]  rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
                placeholder="Describe the job responsibilities"
                value={jobList.jobRes}
                onChange={(e) =>
                  setJobList((prev) => {
                    return {
                      ...prev,
                      jobRes: e.target.value,
                    };
                  })
                }
              />
              <button
                className="w-full bg-primaryYellow rounded py-3"
                onClick={addListJobRes}
              >
                Add
              </button>
            </>
          )}
          <button
            onClick={jobResponsibilitiesHandler}
            className={classNames(
              'w-full border-2 border-primaryYellow py-3 rounded flex justify-center items-center',
              {
                'border-dashed': !isOpen.jobResponsibility,
              },
              {
                'text-white': context?.isDarkMode,
              }
            )}
          >
            {!isOpen.jobResponsibility ? (
              <AiOutlinePlus
                size={20}
                color={context?.isDarkMode ? '#fff' : '#000'}
              />
            ) : (
              'Close'
            )}
          </button>
        </div>
        {/* JOB QUALIFICATION */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            Job Qualifications
          </label>
          {/* LIST */}
          <ol>
            {addInternshipForm.jobQualifications.map((item, index) => {
              return (
                <li
                  className={classNames('text-secondaryWhite text-left', {
                    'text-white': context?.isDarkMode,
                  })}
                  key={index}
                >{`● ${item}`}</li>
              );
            })}
          </ol>
          {/* FORM */}
          {isOpen.jobQualification && (
            <>
              <textarea
                className={classNames(
                  'w-full py-2 px-3 min-h-[80px]  rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
                placeholder="Describe the job Qualifications"
                value={jobList.jobQua}
                onChange={(e) =>
                  setJobList((prev) => {
                    return {
                      ...prev,
                      jobQua: e.target.value,
                    };
                  })
                }
              />
              <button
                className="w-full bg-primaryYellow rounded py-2"
                onClick={addListJobQua}
              >
                Add
              </button>
            </>
          )}
          <button
            onClick={jobQualificationHandler}
            className={classNames(
              'w-full border-2 border-dashed border-primaryYellow py-3 rounded flex justify-center items-center'
            )}
          >
            {!isOpen.jobQualification ? (
              <AiOutlinePlus
                size={20}
                color={context?.isDarkMode ? '#fff' : '#000'}
              />
            ) : (
              <AiOutlineMinus
                size={20}
                color={context?.isDarkMode ? '#fff' : '#000'}
              />
            )}
          </button>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex flex-col gap-8">
        {/* JOB ENVIRONMENT */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            Job Environment{' '}
            <span>{`(${
              addInternshipForm.jobEnvironment ? 'On-site' : 'WFH'
            })`}</span>
          </label>
          <p
            className={classNames(
              'text-secondaryWhite font-extralight italic text-sm',
              {
                'text-white': context?.isDarkMode,
              }
            )}
          >
            Will be on-site or work from home?
          </p>
          <Switch
            checked={addInternshipForm.jobEnvironment}
            onChange={jobEnvironmentHandler}
            className={`${
              addInternshipForm.jobEnvironment
                ? 'bg-primaryYellow'
                : context?.isDarkMode
                ? 'bg-secondaryBgBlack'
                : 'bg-mainBgWhite'
            }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                addInternshipForm.jobEnvironment
                  ? 'translate-x-9'
                  : 'translate-x-0'
              }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        {/* JOB ALLOWANCE */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            With Allowance{' '}
            <span>{`(${
              addInternshipForm.allowance ? 'With Allowance' : 'No Allowance'
            })`}</span>
          </label>
          <p
            className={classNames(
              'text-secondaryWhite font-extralight italic text-sm text-left',
              {
                'text-white': context?.isDarkMode,
              }
            )}
          >
            Does the company will give allowances? (if yes, please specify) per
            day.
          </p>
          <Switch
            checked={addInternshipForm.allowance}
            onChange={allowanceHandler}
            className={`${
              addInternshipForm.allowance
                ? 'bg-primaryYellow'
                : context?.isDarkMode
                ? 'bg-secondaryBgBlack'
                : 'bg-mainBgWhite'
            }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                addInternshipForm.allowance ? 'translate-x-9' : 'translate-x-0'
              }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          {
            // ADD ALLOWANCE FORM
            addInternshipForm.allowance && (
              <input
                value={addInternshipForm.allowanceAmount}
                onChange={(e) => {
                  setAddInternshipForm((prev) => {
                    return {
                      ...prev,
                      allowanceAmount: e.target.value,
                    };
                  });
                }}
                className={classNames(
                  'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
                  {
                    'bg-secondaryBgBlack text-white': context?.isDarkMode,
                  }
                )}
                placeholder="Allowance Amount"
              />
            )
          }
        </div>
        {/* JOB ADD ONS */}
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-white': context?.isDarkMode,
            })}
            htmlFor="title"
          >
            Job Add-Ons
          </label>
          <div className="flex flex-col justify-start gap-2">
            <p
              className={classNames(
                'text-secondaryWhite font-extralight italic text-sm',
                {
                  'text-white': context?.isDarkMode,
                }
              )}
            >
              Responsive HR
            </p>
            <Switch
              checked={addInternshipForm.isResponsiveHr}
              onChange={hrHandler}
              className={`${
                addInternshipForm.isResponsiveHr
                  ? 'bg-primaryYellow'
                  : context?.isDarkMode
                  ? 'bg-secondaryBgBlack'
                  : 'bg-mainBgWhite'
              }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  addInternshipForm.isResponsiveHr
                    ? 'translate-x-9'
                    : 'translate-x-0'
                }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
          <div className="flex flex-col justify-start gap-2">
            <p
              className={classNames(
                'text-secondaryWhite font-extralight italic text-sm',
                {
                  'text-white': context?.isDarkMode,
                }
              )}
            >
              Fast and get hired by the company
            </p>
            <Switch
              checked={addInternshipForm.isHiredImmediately}
              onChange={getHiredHandler}
              className={`${
                addInternshipForm.isHiredImmediately
                  ? 'bg-primaryYellow'
                  : context?.isDarkMode
                  ? 'bg-secondaryBgBlack'
                  : 'bg-mainBgWhite'
              }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  addInternshipForm.isHiredImmediately
                    ? 'translate-x-9'
                    : 'translate-x-0'
                }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
          <div className="flex flex-col justify-start gap-2">
            <p
              className={classNames(
                'text-secondaryWhite font-extralight italic text-sm',
                {
                  'text-white': context?.isDarkMode,
                }
              )}
            >
              Urgent Hiring
            </p>
            <Switch
              checked={addInternshipForm.isUrgent}
              name="isUrgent"
              onChange={urgentHandler}
              className={`${
                addInternshipForm.isUrgent
                  ? 'bg-primaryYellow'
                  : context?.isDarkMode
                  ? 'bg-secondaryBgBlack'
                  : 'bg-mainBgWhite'
              }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  addInternshipForm.isUrgent ? 'translate-x-9' : 'translate-x-0'
                }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );

  // SWITCH HANDLER
  function allowanceHandler() {
    setAddInternshipForm({
      ...addInternshipForm,
      allowance: !addInternshipForm.allowance,
    });
  }
  function jobEnvironmentHandler() {
    setAddInternshipForm({
      ...addInternshipForm,
      jobEnvironment: !addInternshipForm.jobEnvironment,
    });
  }

  function jobResponsibilitiesHandler() {
    setIsOpen((prev) => {
      return {
        ...prev,
        jobResponsibility: !isOpen.jobResponsibility,
      };
    });
  }

  function urgentHandler() {
    setAddInternshipForm({
      ...addInternshipForm,
      isUrgent: !addInternshipForm.isUrgent,
    });
  }
  function getHiredHandler() {
    setAddInternshipForm({
      ...addInternshipForm,
      isHiredImmediately: !addInternshipForm.isHiredImmediately,
    });
  }
  function hrHandler() {
    setAddInternshipForm({
      ...addInternshipForm,
      isResponsiveHr: !addInternshipForm.isResponsiveHr,
    });
  }

  function jobQualificationHandler() {
    setIsOpen((prev) => {
      return {
        ...prev,
        jobQualification: !isOpen.jobQualification,
      };
    });
  }

  function addListJobRes() {
    if (jobList.jobRes !== '') {
      setAddInternshipForm((prev: any) => {
        return {
          ...prev,
          jobResponsibilities: [
            ...addInternshipForm.jobResponsibilities,
            jobList.jobRes,
          ],
        };
      });
      setJobList((prev) => {
        return {
          ...prev,
          jobRes: '',
        };
      });
    } else {
      // THIS WILL BE CHANGE TO NOTIFY LATER.
      alert('Please fill the field');
    }
  }

  function addListJobQua() {
    if (jobList.jobQua !== '') {
      setAddInternshipForm((prev: any) => {
        return {
          ...prev,
          jobQualifications: [
            ...addInternshipForm.jobQualifications,
            jobList.jobQua,
          ],
        };
      });
      setJobList((prev) => {
        return {
          ...prev,
          jobQua: '',
        };
      });
    } else {
      alert('Please fill the field');
    }
  }
}

// ADD INTERNSHIP PROGRAM
interface InternshipProgramInterface {
  addInternshipForm: {
    jobTitle: string;
    jobDescription: string;
    jobEnvironment: boolean;
    allowance: boolean;
    allowanceAmount: string;
    jobCategory: string;
    jobResponsibilities: never[];
    jobQualifications: never[];
    isResponsiveHr: boolean;
    isHiredImmediately: boolean;
    isUrgent: boolean;
  };
  setAddInternshipForm: React.Dispatch<
    React.SetStateAction<{
      jobTitle: string;
      jobDescription: string;
      jobEnvironment: boolean;
      allowance: boolean;
      allowanceAmount: string;
      jobCategory: string;
      jobResponsibilities: never[];
      jobQualifications: never[];
      isResponsiveHr: boolean;
      isHiredImmediately: boolean;
      isUrgent: boolean;
    }>
  >;
  isOpen: {
    jobResponsibility: boolean;
    jobQualification: boolean;
  };
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      jobResponsibility: boolean;
      jobQualification: boolean;
    }>
  >;
  jobList: {
    jobRes: string;
    jobQua: string;
  };
  setJobList: React.Dispatch<
    React.SetStateAction<{
      jobRes: string;
      jobQua: string;
    }>
  >;
  category: [string, any][] | undefined;
}

export default AddEditInternshipForm;
