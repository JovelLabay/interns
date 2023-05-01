import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';
import { DynamicContext } from '@redux/context';
import { docUploader } from '@utils/uploaderFunction';
import axios from 'axios';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { AiOutlineFileExcel, AiOutlineSave } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';

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
          *Upload all the documents to that are required to be uploaded for
          verification and eligibility to proceed with the practicum.
        </p>
      </div>

      <div className="text-secondaryWhite">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold">Required Documents</h2>
          <button
            className={classNames('rounded bg-primaryYellow p-2 text-white')}
            title="Legend"
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
                  title="Legend"
                  onClick={updateDocument}
                >
                  <AiOutlineSave size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="flex items-center justify-center">
                  {item.bucketUrlOfDocument ? (
                    <a
                      href={item.bucketUrlOfDocument}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Template
                    </a>
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
                    <a
                      href={
                        documentList.submitted.find(
                          (item2) =>
                            item2.submitted_document_name ===
                              item.documentName &&
                            item2.submitted_document !== null
                        )?.submitted_document
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View File
                    </a>
                  ) : (
                    'No FIle'
                  )}
                </div>
                <div>
                  {uploadingImage && uploadingImage.index === item.id && (
                    <p className="mb-2 text-ellipsis rounded bg-green-100 p-2 text-xs">
                      Uploading Docx...
                    </p>
                  )}
                  <label className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-primaryYellow bg-mainBgWhite focus:outline-none">
                    <AiOutlineFileExcel
                      size={25}
                      className="text-secondaryWhite"
                    />
                    <span className="w-[50%] truncate text-center text-sm">
                      {'Upload CSV'}
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

                        const uploadImagePayload = await docUploader(imageFile);

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
