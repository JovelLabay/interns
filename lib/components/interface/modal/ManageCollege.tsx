import { ToastContainer } from 'react-toastify';

import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, Listbox, Tab, Transition } from '@headlessui/react';
import classNames from 'classnames';
import {
  AiOutlineCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlusCircle,
  AiOutlineSave,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { data } from 'Data';
import Image from 'next/image';
import internsLogo from '@/assets/logo/interns_logo.png';
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';
import { splitUnderScore } from '@utils/commonFunction';
import { BiReset } from 'react-icons/bi';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCollegeValidator } from '@validator/forms';
import { imageUploader } from '@utils/uploaderFunction';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component//interface/toast/toast';
import axios from 'axios';

import { CSVLink } from 'react-csv';

function ManageCollege({
  addRemoveModal,
  addModalToggle,
}: {
  addRemoveModal: boolean;
  addModalToggle: () => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
  } = useForm<FormCollegeProgram>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateCollegeValidator),
  });

  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
  });

  return (
    <Transition appear show={addRemoveModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          addModalToggle();
          clearState();
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
              <Dialog.Panel className="w-[65vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => {
                      addModalToggle();

                      clearState();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-4">
                  <Tab.Group>
                    <Tab.List className="flex justify-between rounded bg-mainBgWhite py-2">
                      {data.schoolDashBoardHeaderManageCollege.map(
                        (item, index) => (
                          <Tab
                            key={index}
                            className={({ selected }) =>
                              classNames(
                                'mx-2 flex w-full flex-row items-center justify-center gap-5',
                                selected
                                  ? 'rounded-md bg-primaryYellow py-2'
                                  : 'rounded-md bg-mainBgWhite py-2'
                              )
                            }
                            onClick={clearState}
                          >
                            {item.id === 1 ? (
                              <AiOutlinePlusCircle size={20} />
                            ) : (
                              <AiOutlineUnorderedList size={20} />
                            )}
                            {item.name}
                          </Tab>
                        )
                      )}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      {/* ADD USERS */}
                      <Tab.Panel>
                        <AddCollegeComponentTab
                          handleSubmit={handleSubmit}
                          register={register}
                          errors={errors}
                          setValue={setValue}
                          state={state}
                          setState={setState}
                          watch={watch}
                          createNewCollege={createNewCollege}
                        />
                      </Tab.Panel>

                      {/* LIST OF USERS */}
                      <Tab.Panel>
                        <ListsCollegeComponentTab
                          handleSubmit={handleSubmit}
                          register={register}
                          errors={errors}
                          setValue={setValue}
                          state={state}
                          setState={setState}
                          watch={watch}
                          clearErrors={clearErrors}
                          reset={reset}
                        />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>

          {/* TOAST CONTAINER */}
          <ToastContainer />
        </div>
      </Dialog>
    </Transition>
  );

  function createNewCollege(data: FormCollegeProgram) {
    toogleCreatingState(true);

    const payload = JSON.stringify(data);

    axios
      .post('/api/data/collegeProgram', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toogleCreatingState(false);
        successfulNotify('New College Created!');
        addModalToggle();
        clearState();
      })
      .catch((err) => {
        toogleCreatingState(false);
        errorNotify(
          splitUnderScore(
            err.response.data.error.meta.target ?? 'Something went wrong!'
          )
        );
        console.error(err);
      });
  }

  function toogleCreatingState(state: boolean) {
    setState((prev) => {
      return {
        ...prev,
        isCreating: state,
      };
    });
  }

  function clearState() {
    reset();
    clearErrors();

    setState((prev) => {
      return {
        ...prev,
        isCreating: false,
        uploadingImage: false,
      };
    });
  }
}

function AddCollegeComponentTab({
  handleSubmit,
  register,
  errors,
  setValue,
  state,
  setState,
  watch,
  createNewCollege,
}: {
  handleSubmit: UseFormHandleSubmit<FormCollegeProgram>;
  register: UseFormRegister<FormCollegeProgram>;
  errors: FieldErrors<FormCollegeProgram>;
  setValue: UseFormSetValue<FormCollegeProgram>;
  state: {
    isCreating: boolean;
    uploadingImage: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      isCreating: boolean;
      uploadingImage: boolean;
    }>
  >;
  watch: UseFormWatch<FormCollegeProgram>;
  createNewCollege(data: FormCollegeProgram): void;
}) {
  return (
    <div className="h-[70vh] overflow-auto">
      <form
        className="flex flex-col items-center justify-center gap-5 pt-5"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit((data) => createNewCollege(data))();
        }}
      >
        <Image
          width={70}
          height={70}
          alt="profileImage"
          className="rounded-full"
          src={watch().collegeLogo ?? internsLogo}
        />

        <div className="flex flex-col items-start justify-center gap-2">
          <label htmlFor="email" className=" text-secondaryWhite">
            College Logo
          </label>
          <label className="flex w-[300px] cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
            <AiOutlineCloudUpload
              size={30}
              className="mr-5 text-secondaryWhite"
            />
            <span>College Logo</span>
            <input
              className="imageUpload"
              type="file"
              accept="image/png, image/jpeg"
              title="profileImage"
              name="profileImage"
              onChange={async (e) => {
                if (!e.target.files || e.target.files.length === 0) return;

                setState((prev) => {
                  return {
                    ...prev,
                    uploadingImage: true,
                  };
                });
                const imageFile = e.target.files[0] as File;

                const uploadImagePayload = await imageUploader(imageFile);

                if (uploadImagePayload === 'The resource already exists') {
                  errorNotify(uploadImagePayload);
                  setState((prev) => {
                    return {
                      ...prev,
                      uploadingImage: false,
                    };
                  });
                  return;
                } else {
                  setValue('collegeLogo', uploadImagePayload);
                  successfulNotify('Image Uploaded!');
                  setState((prev) => {
                    return {
                      ...prev,
                      uploadingImage: false,
                    };
                  });
                }
              }}
            />
          </label>

          {state.uploadingImage && (
            <p className="w-[300px] text-ellipsis rounded bg-green-100 p-2 text-xs">
              Uploading Image...
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            Department Name <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.departmentName?.message,
              }
            )}
            type="text"
            placeholder="Department Name"
            {...register('departmentName')}
          />
          {errors.departmentName?.message && (
            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
              {errors.departmentName?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            Department Description
          </label>
          <textarea
            className={classNames(
              'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
            )}
            placeholder="Department Description"
            {...register('departmentDescription')}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            Coordinator <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
            )}
            type="text"
            placeholder="Coordinator"
            {...register('coordinator')}
          />
          {errors.coordinator?.message && (
            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
              {errors.coordinator?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            Program Name <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.programName?.message,
              }
            )}
            type="text"
            placeholder="Department Name"
            {...register('programName')}
          />
          {errors.programName?.message && (
            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
              {errors.programName?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            Abbreviated Program Name{' '}
            <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.abbreaviatedProgramName?.message,
              }
            )}
            type="text"
            placeholder="Department Name"
            {...register('abbreaviatedProgramName')}
          />
          {errors.abbreaviatedProgramName?.message && (
            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
              {errors.abbreaviatedProgramName?.message}
            </p>
          )}
        </div>

        <input
          className="cursor-pointer rounded bg-primaryYellow py-2 px-10"
          value={
            state.isCreating ? 'Creating New College...' : 'Create College'
          }
          type="submit"
        />
      </form>
    </div>
  );
}

function ListsCollegeComponentTab({
  handleSubmit,
  register,
  errors,
  setValue,
  state,
  setState,
  watch,
  clearErrors,
  reset,
}: {
  handleSubmit: UseFormHandleSubmit<FormCollegeProgram>;
  register: UseFormRegister<FormCollegeProgram>;
  errors: FieldErrors<FormCollegeProgram>;
  setValue: UseFormSetValue<FormCollegeProgram>;
  state: {
    isCreating: boolean;
    uploadingImage: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      isCreating: boolean;
      uploadingImage: boolean;
    }>
  >;
  watch: UseFormWatch<FormCollegeProgram>;
  clearErrors: UseFormClearErrors<FormCollegeProgram>;
  reset: UseFormReset<FormCollegeProgram>;
}) {
  const csvRef: any = useRef(null);

  const [listCollege, setListCollege] = useState<ReturnCollegeProgram[]>([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });
  const [isEdit, setIsEdit] = useState(-1);
  const [exportModal, setExportModal] = useState({
    isOpen: false,
    exportedData: [] as ExportedFormCollegeProgram[],
    filename: '',
  });

  useEffect(() => {
    getCollegeList();
  }, [pagination.skip]);

  const filterCollegeList = useMemo(() => {
    return listCollege
      .filter((user) => {
        return user;
      })
      .map((user) => {
        return user;
      });
  }, [listCollege]);

  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <button
          className="w-[200px] rounded bg-green-500 py-2 text-white"
          onClick={() => {
            setExportModal({ ...exportModal, isOpen: true });
            getAllDeleted();
          }}
        >
          Export Deleted
        </button>
        <input
          placeholder="Search College..."
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite p-2 focus:outline-none'
          )}
        />
      </div>
      <div className="my-2 h-[60vh] flex-col gap-3 overflow-auto">
        <table className="w-full text-center text-sm ">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th scope="col" className="px-3 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                College Logo
              </th>
              <th scope="col" className="min-w-[380px] max-w-[380px] px-6 py-3">
                Department Name
              </th>
              <th scope="col" className="min-w-[380px] max-w-[380px] px-6 py-3">
                Department Description
              </th>
              <th scope="col" className="min-w-[380px] max-w-[380px] px-6 py-3">
                Department Coordinatior
              </th>
              <th scope="col" className="min-w-[380px] max-w-[380px] px-6 py-3">
                Program Name
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Abbreviated Program Name
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Date Creation
              </th>
              <th className="sticky right-0 bg-gray-100 px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterCollegeList.length <= 0 ? (
              <tr className="h-full">
                <td
                  colSpan={8}
                  className="py-5 text-center text-secondaryWhite"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              <>
                {filterCollegeList.map((data, index) => (
                  <tr
                    className={classNames(
                      'h-full border-b duration-300 hover:cursor-pointer',
                      isEdit === data.id ? 'bg-yellowBg' : 'bg-white'
                    )}
                    key={index}
                  >
                    <td className="whitespace-nowrap font-normal">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-normal">
                      {isEdit === data.id ? (
                        <>
                          <label className="flex w-[200px] cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                            <AiOutlineCloudUpload
                              size={30}
                              className="mr-5 text-secondaryWhite"
                            />
                            <span className="w-[50%] truncate">
                              {watch().collegeLogo || 'College Logo'}
                            </span>
                            <input
                              className="imageUpload"
                              type="file"
                              accept="image/png, image/jpeg"
                              title="profileImage"
                              name="profileImage"
                              onChange={async (e) => {
                                if (
                                  !e.target.files ||
                                  e.target.files.length === 0
                                )
                                  return;

                                setState((prev) => {
                                  return {
                                    ...prev,
                                    uploadingImage: true,
                                  };
                                });
                                const imageFile = e.target.files[0] as File;

                                const uploadImagePayload = await imageUploader(
                                  imageFile
                                );

                                if (
                                  uploadImagePayload ===
                                  'The resource already exists'
                                ) {
                                  errorNotify(uploadImagePayload);
                                  setState((prev) => {
                                    return {
                                      ...prev,
                                      uploadingImage: false,
                                    };
                                  });
                                  return;
                                } else {
                                  setValue('collegeLogo', uploadImagePayload);
                                  successfulNotify('Image Uploaded!');
                                  setState((prev) => {
                                    return {
                                      ...prev,
                                      uploadingImage: false,
                                    };
                                  });
                                }
                              }}
                            />
                          </label>
                          {state.uploadingImage && (
                            <p className="mt-1 text-ellipsis rounded bg-green-100 p-2 text-xs">
                              Uploading Image...
                            </p>
                          )}
                        </>
                      ) : (
                        <Image
                          width={50}
                          height={50}
                          alt="profileImage"
                          className="rounded-full"
                          src={data.college_department_image || internsLogo}
                        />
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-normal">
                      {isEdit === data.id ? (
                        <input
                          className={classNames(
                            'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                            {
                              'border-red-500 bg-red-100 placeholder:text-white':
                                errors.departmentName?.message,
                            }
                          )}
                          type="text"
                          placeholder="Department Name"
                          {...register('departmentName')}
                        />
                      ) : (
                        data.college_department_name
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-normal">
                      {isEdit === data.id ? (
                        <input
                          className={classNames(
                            'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                          )}
                          type="text"
                          placeholder="Department Description"
                          {...register('departmentDescription')}
                        />
                      ) : (
                        data.college_department_description
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-normal">
                      {isEdit === data.id ? (
                        <input
                          className={classNames(
                            'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                            {
                              'border-red-500 bg-red-100 placeholder:text-white':
                                errors.coordinator?.message,
                            }
                          )}
                          type="text"
                          placeholder="Coordinator"
                          {...register('coordinator')}
                        />
                      ) : (
                        data.college_coordinator
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-normal">
                      {isEdit === data.id ? (
                        <input
                          className={classNames(
                            'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                            {
                              'border-red-500 bg-red-100 placeholder:text-white':
                                errors.programName?.message,
                            }
                          )}
                          type="text"
                          placeholder="Program Name"
                          {...register('programName')}
                        />
                      ) : (
                        data.complete_program_name
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-normal">
                      {isEdit === data.id ? (
                        <input
                          className={classNames(
                            'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                            {
                              'border-red-500 bg-red-100 placeholder:text-white':
                                errors.abbreaviatedProgramName?.message,
                            }
                          )}
                          type="text"
                          placeholder="Abbreviated Program Name"
                          {...register('abbreaviatedProgramName')}
                        />
                      ) : (
                        data.abbreviated_program_name
                      )}
                    </td>
                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                    <td
                      className={classNames(
                        'sticky right-0 px-2 py-4',
                        isEdit === data.id ? 'bg-yellowBg' : 'bg-white'
                      )}
                    >
                      {isEdit === data.id ? (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            className="cursor-pointer rounded bg-primaryYellow p-2"
                            title="Save"
                            onClick={() => {
                              handleSubmit((data) => updateCollegeData(data))();
                            }}
                          >
                            <AiOutlineSave
                              size={25}
                              className="text-secondaryBgBlack"
                            />
                          </button>
                          <button
                            className="cursor-pointer rounded border-2 border-primaryYellow p-2"
                            title="Cancel"
                            onClick={() => {
                              setIsEdit(-1);
                              reset();
                              clearErrors();
                            }}
                          >
                            <AiOutlineCloseCircle
                              size={25}
                              className="text-secondaryBgBlack"
                            />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            className="cursor-pointer rounded bg-orange-400 p-2"
                            title="Edit"
                            onClick={() => {
                              setIsEdit(data.id);

                              setValue(
                                'departmentName',
                                data.college_department_name
                              );
                              setValue(
                                'departmentDescription',
                                data.college_department_description
                              );
                              setValue('coordinator', data.college_coordinator);
                              setValue(
                                'programName',
                                data.complete_program_name
                              );
                              setValue(
                                'abbreaviatedProgramName',
                                data.abbreviated_program_name
                              );
                              setValue(
                                'collegeLogo',
                                data.college_department_image
                              );
                            }}
                          >
                            <AiOutlineEdit
                              size={25}
                              className="text-mainBgWhite"
                            />
                          </button>
                          <button
                            className="cursor-pointer rounded bg-red-500 p-2"
                            title="Delete"
                            onClick={() => deleteCollegeData(data.id)}
                          >
                            <AiOutlineDelete
                              size={25}
                              className="text-mainBgWhite"
                            />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          className={classNames(
            'w-[100px] rounded border-2 border-primaryYellow p-1',
            {
              'cursor-not-allowed opacity-50': pagination.skip <= 0,
            }
          )}
          disabled={pagination.skip <= 0}
          onClick={() => {
            setPagination((prev) => ({
              ...prev,
              skip: prev.skip - 20,
              take: prev.take - 20,
            }));
          }}
        >
          Prev
        </button>
        <p>
          {pagination.skip === 0 ? 1 : pagination.skip} - {pagination.take}
        </p>{' '}
        <button
          className={classNames(
            'w-[100px] rounded border-2 border-primaryYellow p-1',
            {
              'cursor-not-allowed opacity-50': pagination.payloadLength !== 20,
            }
          )}
          disabled={pagination.payloadLength !== 20}
          onClick={() => {
            setPagination((prev) => ({
              ...prev,
              skip: prev.skip + 20,
              take: prev.take + 20,
            }));
          }}
        >
          Next
        </button>
      </div>

      <Transition appear show={exportModal.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 hidden lg:block"
          onClose={() =>
            setExportModal({
              ...exportModal,
              isOpen: false,
              exportedData: [],
              filename: '',
            })
          }
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
                <Dialog.Panel className="w-[30vw] rounded-md bg-white p-3">
                  <div className="mb-3 flex flex-row items-center justify-between">
                    <p>Export Data to CSV</p>
                    <button
                      className="rounded bg-primaryYellow p-2"
                      title="Close"
                      onClick={() =>
                        setExportModal({
                          ...exportModal,
                          isOpen: false,
                          exportedData: [],
                          filename: '',
                        })
                      }
                    >
                      <AiOutlineCloseCircle size={20} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-5">
                    <p className="px-10 text-sm font-thin italic text-secondaryWhite">
                      *This will export all the data that were softly deleted.
                      Once extported, It will hardly be deleted in the Database
                      to fill new data. A CSV fill will be exported containing
                      all the hardly deleted data.
                    </p>

                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="text"
                      placeholder="Filename"
                      value={exportModal.filename}
                      onChange={(e) =>
                        setExportModal((prev) => {
                          return {
                            ...prev,
                            filename: e.target.value,
                          };
                        })
                      }
                    />
                    <button
                      className="w-[150px] rounded bg-primaryYellow p-2"
                      onClick={() => {
                        if (exportModal.filename === '') {
                          warningNotify("Filename can't be empty");
                          return;
                        }

                        csvRef.current.link.click();

                        setExportModal({
                          ...exportModal,
                          isOpen: false,
                          exportedData: [],
                          filename: '',
                        });
                      }}
                    >
                      Export Now
                    </button>

                    <CSVLink
                      headers={[
                        { label: 'ID', key: 'id' },
                        {
                          label: 'College Department Image',
                          key: 'college_department_image',
                        },
                        {
                          label: 'College Department name',
                          key: 'college_department_name',
                        },
                        {
                          label: 'College Department Description',
                          key: 'college_department_description',
                        },
                        { label: 'Coordinator', key: 'college_coordinator' },
                        {
                          label: 'Program Name',
                          key: 'complete_program_name',
                        },
                        {
                          label: 'Abbreviated Program Name',
                          key: 'abbreviated_program_name',
                        },
                        { label: 'Created At', key: 'createdAt' },
                        { label: 'Updated At', key: 'updatedAt' },
                        { label: 'Deleted At', key: 'deletedAt' },
                      ]}
                      filename={`${exportModal.filename}.csv`}
                      data={exportModal.exportedData}
                      ref={csvRef}
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

  function getAllDeleted() {
    axios
      .get('/api/data/collegeProgram?isDeleted=true')
      .then((res) => {
        const data = res.data.responsePayload;

        setExportModal((prev) => {
          return {
            ...prev,
            exportedData: [...data],
          };
        });
      })

      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }

  function getCollegeList() {
    axios
      .get(`/api/data/collegeProgram?skip=${pagination.skip}`)
      .then((res) => {
        setListCollege(res.data.responsePayload);

        const length = res.data.responsePayloadLength;

        setPagination((prev) => ({ ...prev, payloadLength: length }));
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }

  function deleteCollegeData(id: number) {
    axios
      .delete(`/api/data/collegeProgram?id=${id}`)
      .then(() => {
        successfulNotify(`College ${id} Deleted!`);
        getCollegeList();
      })
      .catch((err) => {
        errorNotify('Something went wrong!');
        console.error(err);
      });
  }

  function updateCollegeData(data: FormCollegeProgram) {
    axios
      .put(`/api/data/collegeProgram?id=${isEdit}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        successfulNotify(`College ${isEdit} Updated!`);
        setIsEdit(-1);
        getCollegeList();
      })
      .catch((err) => {
        errorNotify('Something went wrong!');
        console.error(err);
      });
  }
}

export default ManageCollege;
