// REACT
import React, { Fragment, useEffect, useState, useMemo } from 'react';

// ICONS
import {
  AiOutlineCheckCircle,
  AiOutlinePlusCircle,
  AiOutlineUnorderedList,
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiOutlineCloudUpload,
  AiFillDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

import { Level_Of_User } from '@prisma/client';

// TOAST
import { ToastContainer } from 'react-toastify';
import { errorNotify, successfulNotify } from '@/src/components/common/toast';

// STATIC DATA
import { data } from 'Data';
import pathData from '@data/path.data.json';

// OTHERS
import classNames from 'classnames';

// FIREBASE FUNCTIONS
import {
  addNewUser,
  updateCurrentNumber,
  deleteCurrentNumber,
} from '@/src/functions/firebaseDatabase';

// USEFORM
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from 'react-hook-form';

// SCHEMA VALIDATOR
import { SchoolNumberUsers } from '@/src/validator/LogSignValidator';
import { yupResolver } from '@hookform/resolvers/yup';

import { CreateSchoolAdminValidator, LogSignValidator } from '@validator/forms';

// UI
import { Listbox, Switch } from '@headlessui/react';
import { Tab } from '@headlessui/react';
import { Dialog, Transition } from '@headlessui/react';

// REACT
import { FiChevronDown, FiUsers } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
import axios from 'axios';
import { imageUploader } from '@utils/uploaderFunction';
import Image from 'next/image';
import internsLogo from '@/assets/logo/interns_logo.png';
import { splitUnderScore } from '@utils/commonFunction';
import { BsPerson } from 'react-icons/bs';

const levelOfUser = Object.entries(Level_Of_User);

function AddUsers({
  addRemoveModal,
  addModalToggle,
}: {
  addRemoveModal: boolean;
  addModalToggle: () => void;
}) {
  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
  } = useForm<FormSchoolUserAdmin>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateSchoolAdminValidator),
  });

  const legend = useMemo(() => {
    switch (watch().levelOfUser) {
      case 'SUPER_ADMINISTRATOR':
        return 'Has all the access';
      case 'ADMINISTRATOR':
        return 'Has all the access except for the settings';
      case 'STAFF':
        return 'Modify student lists only';
      case 'NOT_SET':
        return 'No Access';
      default:
        return 'No Selected Type of User';
    }
  }, [watch().levelOfUser]);

  return (
    <>
      <Transition appear show={addRemoveModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
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
                <Dialog.Panel className="h-[600px] w-[700px] overflow-auto rounded-md bg-white p-3">
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
                        {data.schoolDashBoardHeaderManageUsers.map(
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
                              onClick={() => reset()}
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
                          <AddUserComponentTab
                            handleSubmit={handleSubmit}
                            legend={legend}
                            errors={errors}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            createNewUser={createNewUser}
                            state={state}
                            setState={setState}
                            clearErrors={clearErrors}
                          />
                        </Tab.Panel>

                        {/* LIST OF USERS */}
                        <Tab.Panel>
                          <ListsUserComponentTab
                            handleSubmit={handleSubmit}
                            errors={errors}
                            register={register}
                            watch={watch}
                            setValue={setValue}
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
    </>
  );

  function createNewUser(data: FormSchoolUserAdmin) {
    toogleCreatingState(true);

    const payload = JSON.stringify(data);

    axios
      .post('/api/data/adminUser', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toogleCreatingState(false);
        successfulNotify('New Admin User Created!');
        addModalToggle();
        clearState();
      })
      .catch((err) => {
        toogleCreatingState(false);
        errorNotify(
          splitUnderScore(err.response.data.error.meta.target) ??
            'Something went wrong!'
        );
        console.error(err);
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

  function toogleCreatingState(state: boolean) {
    setState((prev) => {
      return {
        ...prev,
        isCreating: state,
      };
    });
  }
}

export default AddUsers;

function AddUserComponentTab({
  handleSubmit,
  legend,
  errors,
  register,
  watch,
  setValue,
  createNewUser,
  state,
  clearErrors,
  setState,
}: {
  handleSubmit: UseFormHandleSubmit<FormSchoolUserAdmin>;
  legend:
    | 'Has all the access'
    | 'Has all the access except for the settings'
    | 'Modify student lists only'
    | 'No Access'
    | 'No Selected Type of User';
  errors: FieldErrors<FormSchoolUserAdmin>;
  register: UseFormRegister<FormSchoolUserAdmin>;
  watch: UseFormWatch<FormSchoolUserAdmin>;
  setValue: UseFormSetValue<FormSchoolUserAdmin>;
  createNewUser(data: FormSchoolUserAdmin): void;
  state: {
    isCreating: boolean;
    uploadingImage: boolean;
  };
  clearErrors: UseFormClearErrors<FormSchoolUserAdmin>;
  setState: React.Dispatch<
    React.SetStateAction<{
      isCreating: boolean;
      uploadingImage: boolean;
    }>
  >;
}) {
  return (
    <div className="h-[460px] overflow-auto">
      <p className="w-full rounded bg-primaryYellowHover p-3">
        <span className="font-medium">Type Of User</span> : {legend}
        {'.'}
      </p>

      <form
        className="flex flex-col items-center justify-center gap-5 pt-5"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit((data) => createNewUser(data))();
        }}
      >
        <Image
          width={70}
          height={70}
          alt="profileImage"
          className="rounded-full"
          src={watch('profileImage') ?? internsLogo}
        />
        <div className="flex flex-col items-start justify-center gap-2">
          <label htmlFor="email" className=" text-secondaryWhite">
            Profile Image
          </label>

          <label className="flex w-[300px] cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
            <AiOutlineCloudUpload
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
                  setValue('profileImage', uploadImagePayload);
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
            Email Address <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.email?.message,
              }
            )}
            type="email"
            placeholder="Email Address"
            {...register('email')}
          />
          {errors.email?.message && (
            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            Password <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.password?.message,
              }
            )}
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password?.message && (
            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
              {errors.password?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            Level of User <span className="text-xs text-red-500">*</span>
          </label>
          <Listbox
            value={watch().levelOfUser || 'No Data'}
            onChange={(data) => {
              clearErrors('levelOfUser');
              setValue('levelOfUser', data);
            }}
          >
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button
                  className={classNames(
                    'outline-none" flex w-[300px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2',
                    {
                      'border-red-500 bg-red-100 placeholder:text-white':
                        errors.levelOfUser?.message,
                    }
                  )}
                >
                  {watch().levelOfUser === undefined
                    ? 'Select Type of User'
                    : splitUnderScore(watch().levelOfUser)}
                  <FiChevronDown
                    size={30}
                    className={classNames('text-secondaryWhite duration-300', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute z-30 max-h-[150px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                  {levelOfUser.map((person, index) => (
                    <Listbox.Option
                      className="py-1"
                      key={index}
                      value={person[1]}
                    >
                      {splitUnderScore(person[1])}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          {errors.levelOfUser?.message && (
            <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
              {errors.levelOfUser?.message}
            </p>
          )}
        </div>

        <input
          className="cursor-pointer rounded bg-primaryYellow py-2 px-10"
          value={state.isCreating ? 'Creating New User...' : 'Create User'}
          type="submit"
        />
      </form>
    </div>
  );
}

function ListsUserComponentTab({
  handleSubmit,
  errors,
  register,
  watch,
  setValue,
  clearErrors,
  reset,
}: {
  handleSubmit: UseFormHandleSubmit<FormSchoolUserAdmin>;
  errors: FieldErrors<FormSchoolUserAdmin>;
  register: UseFormRegister<FormSchoolUserAdmin>;
  watch: UseFormWatch<FormSchoolUserAdmin>;
  setValue: UseFormSetValue<FormSchoolUserAdmin>;
  clearErrors: UseFormClearErrors<FormSchoolUserAdmin>;
  reset: UseFormReset<FormSchoolUserAdmin>;
}) {
  const [listUserAdmin, setListUserAdmin] = useState<ReturnAdminUserPayload[]>(
    []
  );
  const [filterState, setFilterState] = useState({
    search: '',
    isActive: true,
  });
  const [isEdit, setIsEdit] = useState(-1);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });
  const [crudState, setCrudState] = useState({
    isUpdate: false,
    isDelete: false,
  });

  useEffect(() => {
    getAdminUserList();
  }, [pagination.skip]);

  const filterAdminUserList = useMemo(() => {
    return listUserAdmin
      .filter((user) => {
        return user;
      })
      .map((user) => {
        return user;
      });
  }, [listUserAdmin]);

  return (
    <div>
      <div className="my-2">
        <input
          placeholder="Search Admin Name..."
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
            {
              'cursor-not-allowed opacity-50': isEdit !== -1,
            }
          )}
          disabled={isEdit !== -1}
        />
      </div>
      <div className="flex h-[358px] flex-col gap-3 overflow-auto">
        {filterAdminUserList.length === 0 ? (
          <>
            <h1 className="text-secondaryWhite">No Data Found</h1>
          </>
        ) : (
          filterAdminUserList.map(
            ({
              id,
              first_name,
              middle_name,
              last_name,
              email_address,
              isActive,
              level_of_user,
              admin_user_image,
              password,
            }) => (
              <section
                className="relative flex items-start justify-between rounded bg-yellowBg p-3"
                key={id}
              >
                <div className=" flex flex-col items-start gap-3 text-secondaryWhite">
                  {isEdit === id ? (
                    <>
                      <div className="flex flex-col items-start gap-2">
                        <label htmlFor="email" className="text-secondaryWhite">
                          First Name{' '}
                          <span className="text-xs text-red-500">*</span>
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
                          defaultValue={watch().firstName}
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
                          defaultValue={watch().middleName}
                        />
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <label htmlFor="email" className="text-secondaryWhite">
                          Last Name{' '}
                          <span className="text-xs text-red-500">*</span>
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
                          defaultValue={watch().lastName}
                        />
                        {errors.lastName?.message && (
                          <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                            {errors.lastName?.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <label htmlFor="email" className="text-secondaryWhite">
                          Level of User{' '}
                          <span className="text-xs text-red-500">*</span>
                        </label>
                        <Listbox
                          value={watch().levelOfUser || 'No Data'}
                          onChange={(data) => {
                            clearErrors('levelOfUser');
                            setValue('levelOfUser', data);
                          }}
                        >
                          {({ open }: { open: boolean }) => (
                            <div className="relative">
                              <Listbox.Button
                                className={classNames(
                                  'outline-none" flex w-[300px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2',
                                  {
                                    'border-red-500 bg-red-100 placeholder:text-white':
                                      errors.levelOfUser?.message,
                                  }
                                )}
                              >
                                {watch().levelOfUser === undefined
                                  ? 'Select Type of User'
                                  : `${watch()
                                      .levelOfUser.split('_')
                                      .join(' ')
                                      .slice(0, 1)
                                      .toUpperCase()}${watch()
                                      .levelOfUser.slice(1)
                                      .split('_')
                                      .join(' ')}
                        `}
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
                              <Listbox.Options className="absolute z-30 max-h-[150px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                                {levelOfUser.map((person, index) => (
                                  <Listbox.Option
                                    className="py-1"
                                    key={index}
                                    value={person[1]}
                                  >
                                    {splitUnderScore(person[1])}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          )}
                        </Listbox>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <label htmlFor="email" className="text-secondaryWhite">
                          IsActive{' '}
                        </label>
                        <Switch
                          checked={watch().isActive}
                          onChange={() => {
                            setValue('isActive', !watch().isActive);
                          }}
                          className={`${
                            watch().isActive
                              ? 'bg-primaryYellow'
                              : 'bg-primaryYellowHover'
                          }
          rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              watch().isActive
                                ? 'translate-x-9'
                                : 'translate-x-0'
                            }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-start gap-3">
                        <Image
                          width={50}
                          height={50}
                          alt="profileImage"
                          className="rounded-full"
                          src={admin_user_image ?? internsLogo}
                        />
                        <span>{first_name}</span>
                        <span>{middle_name}</span>
                        <span>{last_name}</span>
                      </div>
                      <p>
                        <span className="font-bold">Email Address: </span>
                        <span>{email_address}</span>
                      </p>
                      <p>
                        <span className="font-bold">Level Of User: </span>
                        <span>{splitUnderScore(level_of_user)}</span>
                      </p>
                      <p
                        className={classNames(
                          'absolute right-4 bottom-4 rounded-full px-3 py-1 text-xs text-mainBgWhite drop-shadow-md',
                          {
                            'bg-green-400': isActive === true,
                            'bg-red-400': isActive === false,
                          }
                        )}
                      >
                        {isActive === true ? 'ACTIVE' : 'INACTIVE'}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center gap-3">
                  {isEdit === id ? (
                    <>
                      <button
                        className="w-[100px] cursor-pointer rounded border-2 border-primaryYellow p-2"
                        title="Delete User"
                        onClick={() => {
                          setIsEdit(-1);
                          reset();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-[100px] cursor-pointer rounded bg-primaryYellow p-2"
                        title="Edit User"
                        onClick={handleSubmit(updateAdminUserData)}
                      >
                        {crudState.isUpdate ? 'Updating...' : 'Save'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="cursor-pointer rounded bg-red-400 p-2"
                        title="Delete User"
                        onClick={() => deleteAdminUserData(id)}
                      >
                        <AiOutlineDelete
                          size={25}
                          className="text-mainBgWhite"
                        />
                      </button>
                      <button
                        className="cursor-pointer rounded bg-orange-400 p-2"
                        title="Edit User"
                        onClick={() => {
                          setIsEdit(id);
                          clearErrors();

                          setValue('email', email_address);
                          setValue('firstName', first_name);
                          setValue('middleName', middle_name);
                          setValue('lastName', last_name);
                          setValue('levelOfUser', level_of_user);
                          setValue('password', password);
                          setValue('isActive', isActive);
                        }}
                      >
                        <AiOutlineEdit size={25} className="text-mainBgWhite" />
                      </button>
                      <button
                        className="cursor-pointer rounded bg-blue-400 p-2"
                        title="Reset User Password"
                      >
                        <BiReset size={25} className="text-mainBgWhite" />
                      </button>
                      <button
                        className="cursor-pointer rounded bg-green-400 p-2"
                        title="Reset User Profile Image"
                      >
                        <BsPerson size={25} className="text-mainBgWhite" />
                      </button>
                    </>
                  )}
                </div>
              </section>
            )
          )
        )}
      </div>

      <div className="my-2 flex items-center justify-center gap-3">
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
        </p>
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
          Next {pagination.payloadLength}
        </button>
      </div>
    </div>
  );

  function getAdminUserList() {
    axios
      .get(`/api/data/adminUser?skip=${pagination.skip}`)
      .then((res) => {
        setListUserAdmin(res.data.responsePayload);

        const length = res.data.responsePayloadLength;

        setPagination((prev) => ({ ...prev, payloadLength: length }));
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }

  function updateAdminUserData(data: FormSchoolUserAdmin) {
    setCrudState((prev) => ({ ...prev, isUpdate: true }));

    axios
      .put(`/api/data/adminUser?id=${isEdit}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        successfulNotify(`Admin User ${isEdit} Updated!`);
        setIsEdit(-1);
        getAdminUserList();
        setCrudState((prev) => ({ ...prev, isUpdate: false }));
      })
      .catch((err) => {
        errorNotify('Something went wrong!');
        setCrudState((prev) => ({ ...prev, isUpdate: false }));
        console.error(err);
      });
  }

  function deleteAdminUserData(id: number) {
    axios
      .delete(`/api/data/adminUser?id=${id}`)
      .then(() => {
        successfulNotify(`Admin User ${id} Deleted!`);
        getAdminUserList();
      })
      .catch((err) => {
        errorNotify('Something went wrong!');
        console.error(err);
      });
  }
}
