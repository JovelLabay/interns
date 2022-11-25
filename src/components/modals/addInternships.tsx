// REACT
import React, { Fragment, useContext, useEffect, useState } from 'react';

// UI
import { Dialog, Transition } from '@headlessui/react';

// STATE MANAGEMENT
import {
  CompanyUserDetailsContext,
  DynamicContext,
} from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// COMPONENTS OR LAYOUT
import AddEditInternshipForm from '@/src/components/form/addEditInternshipForm';
import ViewOnlyQuestionnaire from '../common/viewOnlyQuestionnaire';

// TOAST
import { errorNotify, successfulNotify } from '../common/toast';

// FIREBASE FUNCTION
import { addInternshipProgram } from '@/src/functions/firebaseFirestore';
import { CompanyCategory } from '@/src/functions/firebaseDatabase';

function AddInternships({
  addRemoveModal,
  addModalToggle,
}: {
  addRemoveModal: boolean;
  addModalToggle: () => void;
}) {
  const context = useContext(DynamicContext);
  const context2 = useContext(CompanyUserDetailsContext);

  const [paginatedInternships, setPaginatedInternships] = useState(1);
  const [categories, setCategories] = useState<[string, any][]>();

  const [jobList, setJobList] = useState({
    jobRes: '',
    jobQua: '',
  });

  const [isOpen, setIsOpen] = useState({
    jobResponsibility: false,
    jobQualification: false,
  });

  const [addInternshipForm, setAddInternshipForm] = useState({
    jobTitle: '',
    jobDescription: '',
    jobEnvironment: false,
    allowance: false,
    allowanceAmount: '',
    jobCategory: 'Select Job Category',
    jobResponsibilities: [],
    jobQualifications: [],
    isResponsiveHr: false,
    isHiredImmediately: false,
    isUrgent: false,
  });

  useEffect(() => {
    const abort = new CompanyCategory()
      .getCategoryLists()
      .then((data) => {
        const values = Object.entries(data) || [];
        setCategories(values);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      abort;
    };
  }, []);

  return (
    <>
      <Transition appear show={addRemoveModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={addModalToggle}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    'w-[900px] bg-white h-[700px] p-3 rounded-md',
                    { 'bg-mainBgBlack': context?.isDarkMode }
                  )}
                >
                  <div className="flex flex-row justify-between items-center">
                    <button
                      onClick={() => {
                        {
                          paginatedInternships === 1
                            ? addModalToggle()
                            : paginatedInternships === 2
                            ? setPaginatedInternships(1)
                            : null;
                        }
                      }}
                      className={classNames(
                        'border-2 rounded border-primaryYellow py-1 w-[100px]',
                        {
                          'text-white': context?.isDarkMode,
                        }
                      )}
                    >
                      {paginatedInternships === 1
                        ? 'Cancel'
                        : paginatedInternships === 2
                        ? 'Back'
                        : ''}
                    </button>
                    <div>
                      <p
                        className={classNames('', {
                          'text-white': context?.isDarkMode,
                        })}
                      >
                        Page {paginatedInternships} of 2
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        {
                          paginatedInternships === 1
                            ? setPaginatedInternships(2)
                            : paginatedInternships === 2
                            ? saveInternship()
                            : null;
                        }
                      }}
                      className={classNames(
                        'rounded bg-primaryYellow py-1 w-[100px]'
                      )}
                    >
                      {paginatedInternships === 1
                        ? 'Next'
                        : paginatedInternships === 2
                        ? 'Save'
                        : ''}
                    </button>
                  </div>
                  <div className="mt-4 h-[620px] overflow-y-auto">
                    {/* ADD INTERNSHIP FORM */}
                    {paginatedInternships === 1 ? (
                      <AddEditInternshipForm
                        addInternshipForm={addInternshipForm}
                        setAddInternshipForm={setAddInternshipForm}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        jobList={jobList}
                        setJobList={setJobList}
                        category={categories}
                      />
                    ) : (
                      <ViewOnlyQuestionnaire />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );

  // SAVE INTERNSHIP PROGRAM
  function saveInternship() {
    const {
      jobTitle,
      jobDescription,
      jobEnvironment,
      allowance,
      allowanceAmount,
      jobCategory,
      jobResponsibilities,
      jobQualifications,
      isResponsiveHr,
      isHiredImmediately,
      isUrgent,
    } = addInternshipForm;
    if (
      addInternshipForm.jobTitle !== '' &&
      addInternshipForm.jobDescription !== '' &&
      addInternshipForm.jobResponsibilities.length !== 0 &&
      addInternshipForm.jobQualifications.length !== 0 &&
      addInternshipForm.jobCategory !== 'Select Job Category'
    ) {
      addInternshipProgram(
        jobTitle,
        jobDescription,
        jobEnvironment,
        allowance,
        allowanceAmount,
        jobCategory,
        jobResponsibilities,
        jobQualifications,
        isResponsiveHr,
        isHiredImmediately,
        isUrgent,
        context?.user.userEmail,
        context?.user.userPhotoUrl,
        context?.user.userName,
        context?.user.userId
      )
        .then(() => {
          successfulNotify('Internship Program Added');
          setAddInternshipForm({
            jobTitle: '',
            jobDescription: '',
            jobEnvironment: false,
            allowance: false,
            allowanceAmount: '',
            jobCategory: 'Select Job Category',
            jobResponsibilities: [],
            jobQualifications: [],
            isResponsiveHr: false,
            isHiredImmediately: false,
            isUrgent: false,
          });
          addModalToggle();
          setPaginatedInternships(1);
        })
        .catch((err) => errorNotify(err || "Couldn't Post Internship Program"));
    } else {
      errorNotify('Please fill all the fields');
    }
  }
}

export default AddInternships;
