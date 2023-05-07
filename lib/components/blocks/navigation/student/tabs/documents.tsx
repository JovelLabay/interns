import React, { useContext, useState } from 'react';

import axios from 'axios';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlineFileWord, AiOutlineSave } from 'react-icons/ai';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';

import { DynamicContext } from '@redux/context';
import { docUploaderSubmittion } from '@utils/uploaderFunction';

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
    payloadSubmission: {},
  });
  const [subModal, setSubModal] = useState(false);
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
  }, []);

  return (
    <div className="lg:mx-30 flex flex-col gap-5 md:mx-20">
      <div className="text-center md:px-10">
        <p className="text-sm font-light italic text-red-500">
          *Note: Please upload all the documents in Docx format only.
        </p>
        <p className="text-sm font-light italic text-red-500">
          *Upload all the documents that are required to be uploaded for
          verification and eligibility to proceed with the practicum.
        </p>
      </div>

      <div className="text-secondaryWhite">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold">Required Documents</h2>
          <button
            className={classNames('rounded bg-primaryYellow p-2 text-white')}
            title="Refresh"
            onClick={() => {
              getDocument(state.collegeId, state.userProfileId);

              successfulNotify('Refreshed');
            }}
          >
            <BiRefresh size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {documentList.required.map((item) => (
            <section
              key={item.id}
              className="min-h-[70px] rounded bg-customBorder p-2"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="">{item.documentName}</h4>
                <button
                  className={classNames(
                    'rounded bg-primaryYellow p-2 text-white'
                  )}
                  title="Save"
                  onClick={updateDocument}
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
                          setDocumentList((prev) => ({
                            ...prev,
                            payloadSubmission: {
                              ['id']: documentList.submitted.find(
                                (item2) =>
                                  item2.student_user_profile_id ===
                                    state.userProfileId &&
                                  item2.submitted_document_name ===
                                    item.documentName
                              )?.id,
                              ['student_user_profile_id']: state.userProfileId,
                              ['submitted_document_name']: item.documentName,
                              ['submitted_document']: uploadImagePayload,
                            },
                          }));

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
          submitted: res.data.submittedDocuments || [],
        }));

        postUpdateDocument(res.data.responsePayload, id);
      })
      .catch((err) => {
        console.log(err);
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
      .then(() => null)
      .catch((err) => {
        console.log(err);
      });
  }

  function updateDocument() {
    axios
      .put(`/api/data/studentDocument`, {
        data: JSON.stringify(documentList.payloadSubmission),
        Headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        successfulNotify('Document File Updated!');

        setDocumentList((prev) => ({ ...prev, payloadSubmission: {} }));
        getDocument(state.collegeId, state.userProfileId);
      })
      .catch(() => {
        warningNotify('Document File Update Failed!');
        setTimeout(() => {
          warningNotify('Please upload first the file');
        }, 2000);
      });
  }
}

export default Documents;
