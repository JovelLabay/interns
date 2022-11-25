// REACT
import React, { Fragment, useState } from 'react';

// FIREABSE
import { addStudents } from '@/src/functions/firebaseFirestore';

// SHCHEMA VALIDATOR
import { AddStudent } from '@/src/validator/LogSignValidator';
import { yupResolver } from '@hookform/resolvers/yup';

// UI
import { Dialog, Switch, Transition } from '@headlessui/react';

// USEFORM
import { useForm } from 'react-hook-form';

// OTHERS
import uniqid from 'uniqid';
import { BeatLoader } from 'react-spinners';

// TOAST
import { notify } from '@/src/components/common/toast';
import { ToastContainer } from 'react-toastify';

function AddStudents({
  isOpen,
  addStudentToggle,
  addStudentsTitle,
}: {
  isOpen: boolean;
  addStudentToggle: (name: string) => void;
  addStudentsTitle: string;
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
      uniqid(undefined, `${data.firstName}-@interns.com`),
      addStudentsTitle,
      enabled
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
        addStudentToggle('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => addStudentToggle('')}
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
                <Dialog.Panel className="w-[600px] min-h-[300px] transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-row justify-between items-center">
                    <button
                      className="rounded border-2 border-primaryYellow w-[100px] py-2"
                      onClick={() => addStudentToggle('')}
                    >
                      Cancel
                    </button>
                    <p>Student to {addStudentsTitle}</p>
                    <button
                      className="rounded bg-primaryYellow w-[100px] py-2 flex justify-around items-center gap-2"
                      onClick={handleSubmit(handleSubmitGenerateStudentHandler)}
                    >
                      {loading.addStudentLoading ? (
                        <BeatLoader color="#fff" size={5} />
                      ) : (
                        'Generate'
                      )}
                    </button>
                  </div>
                  <div className="mt-2 flex flex-col mx-10 py-5 gap-3">
                    <label htmlFor="name">First Name</label>
                    <input
                      type="text"
                      placeholder="Student First Name..."
                      className="border-2 border-primaryYellow bg-mainBgWhite rounded p-2 outline-none"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                    <label htmlFor="name">Middle Name</label>
                    <input
                      type="text"
                      placeholder="Student Last Name..."
                      className="border-2 border-primaryYellow bg-mainBgWhite rounded p-2 outline-none"
                      {...register('middleName')}
                    />
                    {errors.middleName && (
                      <p className="text-red-500 text-sm">
                        {errors.middleName.message}
                      </p>
                    )}
                    <label htmlFor="name">Last Name</label>
                    <input
                      type="text"
                      placeholder="Student Last Name..."
                      className="border-2 border-primaryYellow bg-mainBgWhite rounded p-2 outline-none"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
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
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
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

          {/* TOAST */}
          <ToastContainer />
        </Dialog>
      </Transition>
    </>
  );
}

export default AddStudents;
