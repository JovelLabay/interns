import React, { Fragment, useContext, useState } from 'react';

import axios from 'axios';
import classNames from 'classnames';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { BiRefresh } from 'react-icons/bi';
import {
  AiOutlineFileWord,
  AiOutlineInfoCircle,
  AiOutlineSave,
} from 'react-icons/ai';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';

import { DynamicContext } from '@redux/context';
import { docUploaderSubmittion } from '@utils/uploaderFunction';
import { FadeLoader } from 'react-spinners';

function Documents() {
  const context = useContext(DynamicContext);
  const [state, setState] = useState({
    eligibility: false,
    collegeId: -1,
    userProfileId: -1,
  });
  const [uploadingImage, setUploadingImage] = useState({
    loading: false,
    index: -1,
  });
  const [documentList, setDocumentList] = useState({
    required: [] as RequiredDoc[],
    submitted: [] as Submitted[],
  });
  const [subModal, setSubModal] = useState(false);
  const [getSubmittedDocuments, setGetSubmittedDocuments] = useState(true);
  const [docUrl, setDocUrl] = useState('');
  const docxFile = docUrl;

  React.useEffect(() => {
    const studentData: {
      isEligible: boolean;
      college_Department_Id: number;
      id: number;
    } = context?.studentData && JSON.parse(context?.studentData);

    setState((prev) => ({
      ...prev,
      eligibility: studentData.isEligible,
      collegeId: studentData.college_Department_Id,
      userProfileId: studentData.id,
    }));

    getDocument(studentData.college_Department_Id, studentData.id);

    if (getSubmittedDocuments) {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  return (
    <div className="lg:mx-30 flex flex-col gap-5 md:mx-20">
      <div className="text-secondaryWhite">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Required Documents</h3>
          <div className="flex items-center justify-center gap-2">
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button
                    className={classNames(
                      'rounded bg-green-500 p-2 text-white'
                    )}
                  >
                    <AiOutlineInfoCircle size={20} />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 w-[300px] rounded-md bg-white p-2 shadow-md">
                      <div className="text-center md:px-5">
                        <p className="text-sm font-light italic text-red-500">
                          *Note: Please upload all the documents in Docx format
                          only.
                        </p>
                        <br />
                        <p className="text-sm font-light italic text-red-500">
                          *Upload all the documents that are required to be
                          uploaded for verification and eligibility to proceed
                          with the practicum.
                        </p>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <button
              className={classNames('rounded bg-primaryYellow p-2')}
              title="Refresh"
              onClick={() => {
                getDocument(state.collegeId, state.userProfileId);

                setGetSubmittedDocuments(true);
              }}
            >
              <BiRefresh size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {getSubmittedDocuments && (
            <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50  backdrop-opacity-50 backdrop-filter">
              <FadeLoader color="#E9D636" />
            </div>
          )}
          {documentList.required.map((item, index) => (
            <section
              key={item.id}
              className="min-h-[70px] rounded bg-customBorder p-2"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="">{item.documentName}</h4>
                <button
                  className={classNames('rounded bg-primaryYellow p-2')}
                  title="Save"
                  onClick={() => updateDocument(documentList.submitted[index])}
                >
                  <AiOutlineSave size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="flex items-center justify-center">
                  {item.bucketUrlOfDocument ? (
                    <button
                      onClick={() => {
                        setSubModal(true);
                        setDocUrl(item.bucketUrlOfDocument);
                      }}
                      className="text-blue-500 underline"
                    >
                      View Template
                    </button>
                  ) : (
                    'No Template'
                  )}
                </div>

                <div className="flex items-center justify-center">
                  {documentList.submitted.find(
                    (item2) =>
                      item2.submitted_document_name === item.documentName &&
                      item2.submitted_document !== null
                  )?.submitted_document ? (
                    <button
                      onClick={() => {
                        setSubModal(true);

                        const lala: any = documentList.submitted.find(
                          (item2) =>
                            item2.submitted_document_name ===
                              item.documentName &&
                            item2.submitted_document !== null
                        );

                        setDocUrl(lala.submitted_document);
                      }}
                      className="text-blue-500 underline"
                    >
                      View my Document
                    </button>
                  ) : (
                    'No Document'
                  )}
                </div>
                <div>
                  {uploadingImage && uploadingImage.index === item.id && (
                    <p className="mb-2 text-ellipsis rounded bg-green-100 p-2 text-center text-xs">
                      Uploading Docx...
                    </p>
                  )}
                  <label className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-primaryYellow bg-mainBgWhite focus:outline-none">
                    <AiOutlineFileWord
                      size={25}
                      className="text-secondaryWhite"
                    />
                    <span className="w-[50%] truncate text-center text-sm">
                      {'Upload Docx'}
                    </span>
                    <input
                      className="imageUpload"
                      type="file"
                      accept=".doc,.docx"
                      title="csvUpload"
                      name="csvUpload"
                      onChange={async (e) => {
                        if (!e.target.files || e.target.files.length === 0)
                          return;

                        setUploadingImage({
                          loading: true,
                          index: item.id,
                        });
                        const imageFile = e.target.files[0] as File;

                        const uploadImagePayload = await docUploaderSubmittion(
                          imageFile
                        );

                        if (
                          uploadImagePayload === 'The resource already exists'
                        ) {
                          errorNotify(uploadImagePayload);
                          setUploadingImage({
                            loading: false,
                            index: -1,
                          });

                          return;
                        } else {
                          const submittedCopy = [...documentList.submitted];

                          submittedCopy[index] = {
                            ...submittedCopy[index],
                            submitted_document: uploadImagePayload,
                          };

                          setDocumentList({
                            required: documentList.required,
                            submitted: submittedCopy,
                          });

                          successfulNotify('Document File Uploaded!');
                          setUploadingImage({
                            loading: false,
                            index: -1,
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* SUB MODAL */}
      <Transition appear show={subModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10 block"
          onClose={() => {
            setSubModal(false);
            setDocUrl('');
          }}
        >
          <Transition.Child
            as={React.Fragment}
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
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[100vw] rounded-md bg-white p-3  xl:w-[55vw]">
                  <div className="flex flex-row items-center justify-end text-secondaryWhite">
                    <button
                      onClick={() => {
                        setSubModal(false);
                        setDocUrl('');
                      }}
                      className="w-[100px] rounded border-2 border-primaryYellow py-1"
                    >
                      Close
                    </button>
                  </div>

                  <div className="h-[85vh] overflow-auto py-2 pr-2 text-secondaryWhite">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        docxFile
                      )}`}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );

  function getDocument(collegeId: number, id: number) {
    axios
      .get(
        `/api/data/studentDocument?collegeId=${collegeId}&studentUserProfileId=${id}`
      )
      .then((res) => {
        setDocumentList((prev) => ({
          ...prev,
          required: res.data.responsePayload || [],
        }));

        postUpdateDocument(res.data.responsePayload, id);
      })
      .catch(() => {
        errorNotify('Error getting required documents');
      });
  }

  function postUpdateDocument(data: any, studentUserProfileId: number) {
    axios
      .post(
        `/api/data/studentDocument?studentUserProfileId=${studentUserProfileId}`,
        {
          data: JSON.stringify(data),
          Headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setDocumentList((prev) => ({
          ...prev,
          submitted: res.data.responsePayload || [],
        }));

        setGetSubmittedDocuments(false);
      })
      .catch(() => {
        errorNotify('Error getting your submitted documents');

        setGetSubmittedDocuments(false);
      });
  }

  function updateDocument(submitted: Submitted) {
    warningNotify('Document File Updating...');

    axios
      .put(`/api/data/studentDocument`, {
        data: JSON.stringify(submitted),
        Headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        successfulNotify('Document File Updated!');

        getDocument(state.collegeId, state.userProfileId);
      })
      .catch(() => {
        warningNotify('Document File Update Failed!');
      });
  }
}

export default Documents;
