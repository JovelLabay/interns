// REACT
import React, { Fragment, useContext, useState } from 'react';

// UI
import { Dialog, Transition } from '@headlessui/react';

// INTERNS LOGO
import internsLogo from '../../../public/logo/interns_logo.png';

// NEXT
import Image from 'next/image';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// COMPONENTS OR LAYOUT
import AddEditInternshipForm from '../common/AddEditInternshipForm';

// STATIC DATA
import { data } from 'Data';

function AddInternships({
  addRemoveModal,
  addModalToggle,
}: {
  addRemoveModal: boolean;
  addModalToggle: () => void;
}) {
  const context = useContext(DynamicContext);

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
    jobCategory: data.company.jobCategory[0].name,
    jobResponsibilities: [],
    jobQualifications: [],
    isResponsiveHr: false,
    isHiredImmediately: false,
    isUrgent: false,
  });

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
                      onClick={addModalToggle}
                      className={classNames(
                        'border-2 rounded border-primaryYellow py-1 w-[100px]',
                        {
                          'text-white': context?.isDarkMode,
                        }
                      )}
                    >
                      Cancel
                    </button>
                    <Image
                      src={internsLogo}
                      width={40}
                      height={40}
                      style={{ borderRadius: '100%' }}
                    />
                    <button
                      onClick={saveInternship}
                      className=" rounded bg-primaryYellow py-1 w-[100px]"
                    >
                      Post
                    </button>
                  </div>
                  <div className="mt-4 h-[620px] overflow-y-auto">
                    {/* ADD INTERNSHIP FORM */}
                    <AddEditInternshipForm
                      addInternshipForm={addInternshipForm}
                      setAddInternshipForm={setAddInternshipForm}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      jobList={jobList}
                      setJobList={setJobList}
                    />
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
    null;
  }
}

export default AddInternships;
