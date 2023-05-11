import { Dialog, Transition } from '@headlessui/react';
import { imageUploader } from '@utils/uploaderFunction';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import internsLogo from '@/assets/logo/interns_logo.png';
import { AiOutlineFileImage } from 'react-icons/ai';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';
import axios from 'axios';

function AddCompany({
  modal,
  toggleAddCompany,
  register,
  handleSubmit,
  setValue,
  reset,
  errors,
  watch,
  getCompanyLists,
}: {
  modal: boolean;
  toggleAddCompany: () => void;
  register: UseFormRegister<Company>;
  handleSubmit: UseFormHandleSubmit<Company>;
  setValue: UseFormSetValue<Company>;
  reset: UseFormReset<Company>;
  errors: FieldErrors<Company>;
  watch: UseFormWatch<Company>;
  getCompanyLists: () => void;
}) {
  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
  });

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleAddCompany();
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
              <Dialog.Panel className="w-[40vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => {
                      toggleAddCompany();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <form
                  className="flex h-[70vh] flex-col items-center justify-start gap-5 overflow-auto pt-5"
                  onSubmit={(e) => {
                    e.preventDefault();

                    handleSubmit((data) => {
                      postCompany(data);
                    })();
                  }}
                >
                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Name{' '}
                      <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.company_name?.message,
                        }
                      )}
                      type="text"
                      placeholder="Company Name"
                      {...register('company_name')}
                    />
                    {errors.company_name?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.company_name?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Description
                    </label>
                    <textarea
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      placeholder="Company Description"
                      {...register('company_description')}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center gap-2">
                    <label htmlFor="email" className=" text-secondaryWhite">
                      Company Image
                    </label>

                    <label className="flex w-[300px] cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                      <AiOutlineFileImage
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
                          if (!e.target.files || e.target.files.length === 0)
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
                            uploadImagePayload === 'The resource already exists'
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
                            setValue('company_image', uploadImagePayload);
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
                      Company Address
                    </label>
                    <textarea
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      placeholder="Company Address"
                      {...register('company_address')}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Website
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="url"
                      placeholder="Company Website"
                      {...register('company_website')}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Email
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="email"
                      placeholder="Company Email"
                      {...register('company_email')}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Contact Person{' '}
                      <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.comapny_contact_person?.message,
                        }
                      )}
                      type="text"
                      placeholder="Document Name"
                      {...register('comapny_contact_person')}
                    />
                    {errors.comapny_contact_person?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.comapny_contact_person?.message}
                      </p>
                    )}
                  </div>

                  <input
                    className="cursor-pointer rounded bg-primaryYellow py-2 px-10"
                    value={
                      state.isCreating ? 'Adding New Company...' : 'Add Company'
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

  function postCompany(data: Company) {
    setState((prev) => ({ ...prev, isCreating: true }));

    axios
      .post('/api/data/company', {
        Headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      })

      .then((res) => {
        if (res.data.message === 'COMPANY_NAME_EXIST') {
          warningNotify('Company Name Already Exist!');

          setState((prev) => ({ ...prev, isCreating: false }));
        } else {
          setState((prev) => ({ ...prev, isCreating: false }));
          successfulNotify('New Company Added!');

          toggleAddCompany();
          reset();
          getCompanyLists();
        }
      })
      .catch((err) => {
        console.error(err);
        setState((prev) => ({ ...prev, isCreating: false }));
        errorNotify("Something went wrong! Couldn't add new company");
      });
  }
}

export default AddCompany;
