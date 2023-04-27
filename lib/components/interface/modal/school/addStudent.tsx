import React, { Fragment, useState } from 'react';

import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import { csvUploader } from '@utils/uploaderFunction';

import axios from 'axios';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateStudent } from '@validator/forms';
import { useForm } from 'react-hook-form';
import { AiOutlineFileExcel } from 'react-icons/ai';

function AdStudent({
  modal,
  toggleAddStudent,
  object,
  getStudentList,
}: {
  modal: boolean;
  toggleAddStudent: () => void;
  object: {
    objectDataSchoolYear: string;
    objectDataSchoolSemestre: string;
    ObjectDataCollegeDepartment: string;
  };
  getStudentList: () => void;
}) {
  const [state, setState] = React.useState({
    isCreating: false,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormCreateStudent>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateStudent),
  });

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleAddStudent();
          reset();
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
              <Dialog.Panel className="w-[35vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => {
                      toggleAddStudent();
                      reset();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <form
                  className="flex flex-col items-center justify-center gap-5 pt-5"
                  onSubmit={(e) => {
                    e.preventDefault();

                    handleSubmit((data) => addStudent(data))();
                  }}
                >
                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      First Name <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.firstName?.message,
                        }
                      )}
                      type="text"
                      placeholder="First Name"
                      {...register('firstName')}
                    />
                    {errors.firstName?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.firstName?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Middle Name
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="text"
                      placeholder="Middle Name"
                      {...register('middleName')}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Last Name <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.lastName?.message,
                        }
                      )}
                      type="text"
                      placeholder="Last Name"
                      {...register('lastName')}
                    />
                    {errors.lastName?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.lastName?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Email Address{' '}
                      <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.emailAddress?.message,
                        }
                      )}
                      type="email"
                      placeholder="Email Address"
                      {...register('emailAddress')}
                    />
                    {errors.emailAddress?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.emailAddress?.message}
                      </p>
                    )}
                  </div>

                  <input
                    className="cursor-pointer rounded bg-primaryYellow py-2 px-10"
                    value={
                      state.isCreating
                        ? 'Creating New Student...'
                        : 'Create Student'
                    }
                    type="submit"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function addStudent(data: FormCreateStudent) {
    setState((prev) => {
      return {
        ...prev,
        isUploading: true,
      };
    });

    const config = {
      method: 'post',
      url: `/api/data/student?schoolYear=${object.objectDataSchoolYear}&schoolSemestre=${object.objectDataSchoolSemestre}&collegeDepartment=${object.ObjectDataCollegeDepartment}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then(() => {
        getStudentList();
        reset();
        toggleAddStudent();

        successfulNotify('Student Created Successfully!');

        setState((prev) => {
          return {
            ...prev,
            isUploading: false,
          };
        });
      })
      .catch((error) => {
        console.error(error);

        errorNotify('Something went wrong');

        setState((prev) => {
          return {
            ...prev,
            isUploading: false,
          };
        });
      });

    null;
  }
}

function AddStudentBulk({
  modal,
  toggleAddStudentBulk,
  object,
  getStudentList,
}: {
  modal: boolean;
  toggleAddStudentBulk: () => void;
  object: {
    objectDataSchoolYear: string;
    objectDataSchoolSemestre: string;
    ObjectDataCollegeDepartment: string;
  };
  getStudentList: () => void;
}) {
  const [state, setState] = useState({
    isUploading: false,
  });

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleAddStudentBulk();
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
              <Dialog.Panel className="w-[35vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => {
                      toggleAddStudentBulk();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-2">
                  <>
                    <p className="mx-5 mb-2 text-sm italic text-secondaryWhite">
                      * Importing the same CSV file will overwrite the exisiting
                      student list with its corresponding school year, school
                      semestre and college department.
                    </p>
                    <label className="flex h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                      <AiOutlineFileExcel
                        size={40}
                        className="text-secondaryWhite"
                      />
                      <span className="mt-10 w-[50%] truncate">
                        {'Upload CSV'}
                      </span>
                      <input
                        className="imageUpload"
                        type="file"
                        accept=".csv"
                        title="csvUpload"
                        name="csvUpload"
                        onChange={async (e) => {
                          if (!e.target.files || e.target.files.length === 0)
                            return;

                          setState((prev) => {
                            return {
                              ...prev,
                              isUploading: true,
                            };
                          });
                          const csvFile = e.target.files[0] as File;
                          const uploadCsvPayload = await csvUploader(csvFile);

                          if (
                            uploadCsvPayload ===
                            'The resource already exists. Pls rename the file'
                          ) {
                            errorNotify(uploadCsvPayload);
                            setState((prev) => {
                              return {
                                ...prev,
                                uploadingImage: false,
                              };
                            });
                            return;
                          } else {
                            successfulNotify('CSV Uploaded!');

                            const config = {
                              method: 'post',
                              maxBodyLength: Infinity,
                              url: `/api/data/student?bulkImport=true&schoolYear=${object.objectDataSchoolYear}&schoolSemestre=${object.objectDataSchoolSemestre}&collegeDepartment=${object.ObjectDataCollegeDepartment}`,
                              headers: {
                                'Content-Type': 'text/csv',
                              },
                              data: csvFile,
                            };

                            axios
                              .request(config)
                              .then(() => {
                                setState((prev) => {
                                  return {
                                    ...prev,
                                    isUploading: false,
                                  };
                                });

                                toggleAddStudentBulk();
                                getStudentList();
                              })
                              .catch((error) => {
                                console.log(error);

                                setState((prev) => {
                                  return {
                                    ...prev,
                                    isUploading: false,
                                  };
                                });
                              });
                          }
                        }}
                      />
                    </label>
                    {state.isUploading && (
                      <p className="mt-2 text-ellipsis rounded bg-green-100 p-2 text-xs">
                        Uploading CSV...
                      </p>
                    )}
                  </>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export { AdStudent, AddStudentBulk };
