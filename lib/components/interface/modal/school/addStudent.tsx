import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import { Dialog, Transition } from '@headlessui/react';
import { csvUploader, imageUploader } from '@utils/uploaderFunction';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function AdStudent({
  modal,
  toggleAddStudent,
}: {
  modal: boolean;
  toggleAddStudent: () => void;
}) {
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleAddStudent();
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
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function AddStudentBulk({
  modal,
  toggleAddStudentBulk,
  object,
}: {
  modal: boolean;
  toggleAddStudentBulk: () => void;
  object: {
    dataObject: string;
    dataObject2nd: string;
  };
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
                    <label className="flex h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                      <AiOutlineCloudUpload
                        size={50}
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
                              url: `/api/data/student?bulkImport=true&objectData=${object.dataObject}&objectData2nd=${object.dataObject2nd}`,
                              headers: {
                                'Content-Type': 'text/csv',
                              },
                              data: csvFile,
                            };

                            axios
                              .request(config)
                              .then((response) => {
                                console.log(response);

                                setState((prev) => {
                                  return {
                                    ...prev,
                                    isUploading: false,
                                  };
                                });

                                toggleAddStudentBulk();
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
