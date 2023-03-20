// REACT
import React, { Fragment, useState } from 'react';

// FIREABSE
import { addStudents } from '@/src/functions/firebaseFirestore';

// SHCHEMA VALIDATOR
import { AddStudent } from '@/src/validator/LogSignValidator';
import { yupResolver } from '@hookform/resolvers/yup';

// UI
import { Dialog, Listbox, Switch, Transition } from '@headlessui/react';

// USEFORM
import { useForm } from 'react-hook-form';

// OTHERS
import uniqid from 'uniqid';
import { BeatLoader } from 'react-spinners';

// TOAST
import { notify } from '@/src/components/common/toast';
import { ToastContainer } from 'react-toastify';
import { FiChevronDown } from 'react-icons/fi';
import classNames from 'classnames';

function AddStudents({
  isOpen,
  setIsOpen,
}: {
  isOpen: {
    addStudents: boolean;
    addStudentsTitle: string;
    isSearch: string;
    isEdit: string;
    searchInput: string;
    studentNumber: number;
    collegeId: string;
    index: number;
    collegeName: string;
    id: string;
    collegeCourses: string[];
    studentCourse: string;
    studentStatus: boolean;
    collegePassCode: string;
  };
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      addStudents: boolean;
      addStudentsTitle: string;
      isSearch: string;
      isEdit: string;
      searchInput: string;
      studentNumber: number;
      collegeId: string;
      index: number;
      collegeName: string;
      id: string;
      collegeCourses: string[];
      studentCourse: string;
      studentStatus: boolean;
      collegePassCode: string;
    }>
  >;
}) {
  const [loading, setLoading] = useState({
    addStudentLoading: false,
  });
  const [enabled, setEnabled] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddStudentInterface>({
    resolver: yupResolver(AddStudent),
  });

  const handleSubmitGenerateStudentHandler = (data: AddStudentInterface) => {
    setLoading((prev) => ({ ...prev, addStudentLoading: true }));
    addStudents(
      data.firstName,
      data.middleName,
      data.lastName,
      uniqid(undefined, `_${data.firstName}_@interns.com`),
      isOpen.collegeName,
      enabled,
      isOpen.id,
      isOpen.studentCourse
    )
      .then(() => {
        notify('success, Student Added Successfully');
        setLoading((prev) => ({
          ...prev,
          addStudentLoading: false,
        }));
        reset({
          firstName: '',
          middleName: '',
          lastName: '',
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Transition appear show={isOpen.addStudents} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen({ ...isOpen, addStudents: false })}
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="min-h-[300px] w-[600px] transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-row items-center justify-between">
                    <button
                      className="w-[100px] rounded border-2 border-primaryYellow py-2"
                      onClick={() =>
                        setIsOpen({ ...isOpen, addStudents: false })
                      }
                    >
                      Cancel
                    </button>
                    <p>Student to {isOpen.collegeName}</p>
                    <button
                      className="flex w-[100px] items-center justify-around gap-2 rounded bg-primaryYellow py-2"
                      onClick={handleSubmit(handleSubmitGenerateStudentHandler)}
                    >
                      {loading.addStudentLoading ? (
                        <BeatLoader color="#fff" size={5} />
                      ) : (
                        'Generate'
                      )}
                    </button>
                  </div>
                  <div className="mx-10 mt-2 flex flex-col gap-3 py-5">
                    <label htmlFor="name">College Department</label>
                    <Listbox
                      value={isOpen.studentCourse}
                      onChange={(value) =>
                        setIsOpen({ ...isOpen, studentCourse: value })
                      }
                    >
                      {({ open }: { open: boolean }) => (
                        <div className="relative">
                          <Listbox.Button className="flex w-full justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none">
                            <>{isOpen.studentCourse}</>
                            <FiChevronDown
                              size={30}
                              className={classNames(
                                'text-secondaryWhite duration-300',
                                {
                                  'rotate-180': open,
                                }
                              )}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-50 max-h-[200px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                            {isOpen.collegeCourses.map((person, index) => (
                              <Listbox.Option
                                className="py-1"
                                key={index}
                                value={person}
                              >
                                {person}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>

                    <label htmlFor="name">First Name</label>
                    <input
                      type="text"
                      placeholder="Student First Name..."
                      className="rounded border-2 border-primaryYellow bg-mainBgWhite p-2 outline-none"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                    <label htmlFor="name">Middle Name</label>
                    <input
                      type="text"
                      placeholder="Student Last Name..."
                      className="rounded border-2 border-primaryYellow bg-mainBgWhite p-2 outline-none"
                      {...register('middleName')}
                    />
                    {errors.middleName && (
                      <p className="text-sm text-red-500">
                        {errors.middleName.message}
                      </p>
                    )}
                    <label htmlFor="name">Last Name</label>
                    <input
                      type="text"
                      placeholder="Student Last Name..."
                      className="rounded border-2 border-primaryYellow bg-mainBgWhite p-2 outline-none"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                    <label htmlFor="name">Activate Student Status</label>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${
                        enabled ? 'bg-primaryYellow' : 'bg-mainBgWhite'
                      }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          enabled ? 'translate-x-9' : 'translate-x-0'
                        }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddStudents;
