import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { AiOutlineFileWord } from 'react-icons/ai';
import { docUploader } from '@utils/uploaderFunction';
import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';

function AddCollegeRequirementDocument({
  modal,
  toggleRequirementDocument,
  reset,
  handleSubmit,
  errors,
  register,
  setValue,
  collegeObject,
  postRequirementDocument,
  isCreating,
}: {
  modal: boolean;
  toggleRequirementDocument: () => void;
  reset: UseFormReset<FormCollegeDepartmentRequirementDocument>;
  handleSubmit: UseFormHandleSubmit<FormCollegeDepartmentRequirementDocument>;
  errors: Partial<
    FieldErrorsImpl<DeepRequired<FormCollegeDepartmentRequirementDocument>>
  >;
  register: UseFormRegister<FormCollegeDepartmentRequirementDocument>;
  setValue: UseFormSetValue<FormCollegeDepartmentRequirementDocument>;
  collegeObject: {
    departmentName: string;
    programName: string;
  };
  postRequirementDocument(data: FormCollegeDepartmentRequirementDocument): void;
  isCreating: boolean;
}) {
  const [state, setState] = React.useState({
    uploadingImage: false,
  });

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleRequirementDocument();
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
                <div className="flex flex-row items-center justify-between">
                  <button
                    onClick={() => {
                      toggleRequirementDocument();
                      reset();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>

                  <p className="flex flex-col items-end text-sm font-bold text-secondaryWhite">
                    {collegeObject.departmentName}
                    <span className="text-xs font-light italic">
                      {collegeObject.programName}
                    </span>
                  </p>
                </div>

                <form
                  className="flex flex-col items-center justify-center gap-5 pt-5"
                  onSubmit={(e) => {
                    e.preventDefault();

                    handleSubmit((data) => postRequirementDocument(data))();
                  }}
                >
                  <p className="text-center text-sm italic text-red-500">
                    *Adding the same file name that was deleted before will
                    bring back the deleted document file.
                  </p>
                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Document Name{' '}
                      <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.nameOfDocument?.message,
                        }
                      )}
                      type="text"
                      placeholder="Document Name"
                      {...register('nameOfDocument')}
                    />
                    {errors.nameOfDocument?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.nameOfDocument?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-center gap-2">
                    <label htmlFor="email" className=" text-secondaryWhite">
                      Profile Image
                    </label>

                    <label className="flex w-[300px] cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                      <AiOutlineFileWord
                        size={30}
                        className="mr-5 text-secondaryWhite"
                      />
                      <span>Upload Document File</span>
                      <input
                        className="imageUpload"
                        type="file"
                        accept=".doc,.docx"
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

                          const uploadImagePayload = await docUploader(
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
                            setValue('bucketUrlOfDocument', uploadImagePayload);
                            successfulNotify('Document File Uploaded!');
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
                        Uploading Document File...
                      </p>
                    )}
                  </div>

                  <input
                    className="cursor-pointer rounded bg-primaryYellow py-2 px-10"
                    value={
                      isCreating ? 'Creating new Document' : 'Create Document'
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
}

export default AddCollegeRequirementDocument;
