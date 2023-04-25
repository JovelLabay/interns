import React, { Fragment } from 'react';
import { Transition, Dialog, Switch } from '@headlessui/react';
import classNames from 'classnames';
import { HiOutlineDocumentText, HiOutlinePhoto } from 'react-icons/all';
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Image from 'next/image';
import internsLogo from '@/assets/logo/interns_logo.png';

function EditStudent({
  modal,
  toggleEditStudent,
  objectEditStudent,
}: {
  modal: boolean;
  toggleEditStudent(): void;
  objectEditStudent: string;
}) {
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleEditStudent();
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
          <div className="flex min-h-full items-center justify-end p-4">
            <Transition.Child
              as={Fragment}
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <Dialog.Panel className="w-[40vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-end text-secondaryWhite">
                  <button
                    onClick={() => {
                      toggleEditStudent();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="h-[85vh] overflow-auto py-2 pr-2 text-secondaryWhite">
                  <h3 className={'font-medium'}>Submitted Documents</h3>
                  <div className="flex flex-row justify-start gap-2 overflow-auto pb-2">
                    <button
                      className={classNames(
                        'rounded bg-blue-500 p-2 text-white'
                      )}
                      title="sdfs"
                    >
                      <HiOutlineDocumentText size={20} />
                    </button>
                    <button
                      className={classNames(
                        'rounded bg-green-500 p-2 text-white'
                      )}
                      title="sdfs"
                    >
                      <HiOutlineDocumentText size={20} />
                    </button>
                  </div>

                  <form className="mt-2 flex flex-col gap-3">
                    <h3 className={'font-medium'}>Student Details</h3>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        First Name{' '}
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Middle Name
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Last Name{' '}
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Email Address{' '}
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Account Status
                        <br />
                        <span className={'text-xs italic text-red-500'}>
                          *This is the activation switch for the Plan of Study
                        </span>
                      </label>
                      <Switch
                        checked={true}
                        onChange={() => null}
                        className={`${
                          true ? 'bg-primaryYellow' : 'bg-primaryYellowHover'
                        }
          rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            true ? 'translate-x-9' : 'translate-x-0'
                          }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>

                    <h3 className={'font-medium'}>Student Profile Details</h3>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Profile Image
                      </label>
                      <div className="flex w-full justify-center">
                        <Image
                          width={70}
                          height={70}
                          alt="profileImage"
                          className="rounded-full"
                          src={internsLogo}
                        />
                      </div>
                      <label className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                        <HiOutlinePhoto
                          size={30}
                          className="mr-5 text-secondaryWhite"
                        />
                        <span>Upload Image</span>
                        <input
                          className="imageUpload"
                          type="file"
                          accept="image/png, image/jpeg"
                          title="profileImage"
                          name="profileImage"
                        />
                      </label>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Self Introduction
                      </label>
                      <textarea
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        placeholder="Self Introduction"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Address
                      </label>
                      <textarea
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        placeholder="Address"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Date of Birth
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="date"
                        placeholder="Date of Birth"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Sex
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="Sex"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Student Status
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="Student Status"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Student Verification
                      </label>
                      <p
                        className={classNames(
                          'rounded-full bg-green-200 py-2 px-3 text-secondaryWhite'
                          // item.is_active ? 'bg-green-200' : 'bg-red-200'
                        )}
                      >
                        Active
                      </p>
                    </div>

                    <h3 className={'font-medium'}>College Details</h3>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        College Logo
                      </label>
                      <div className="flex w-full justify-center">
                        <Image
                          width={70}
                          height={70}
                          alt="profileImage"
                          className="rounded-full"
                          src={internsLogo}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        College Department Name
                      </label>
                      <input
                        className={classNames(
                          'w-full cursor-not-allowed rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none'
                        )}
                        type="text"
                        disabled
                        placeholder="College Department Name"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Program Name
                      </label>
                      <input
                        className={classNames(
                          'w-full cursor-not-allowed rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none'
                        )}
                        type="text"
                        disabled
                        placeholder="Program Name"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        College Coordinator
                      </label>
                      <input
                        className={classNames(
                          'w-full cursor-not-allowed rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none'
                        )}
                        type="text"
                        disabled
                        placeholder="College Coordinator"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        College Description
                      </label>
                      <textarea
                        className={classNames(
                          'w-full cursor-not-allowed rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none'
                        )}
                        disabled
                        placeholder="College Description"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Abbreviated Program Name
                      </label>
                      <input
                        className={classNames(
                          'w-full cursor-not-allowed rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none'
                        )}
                        type="text"
                        disabled
                        placeholder="Abbreviated Program Name"
                      />
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditStudent;
