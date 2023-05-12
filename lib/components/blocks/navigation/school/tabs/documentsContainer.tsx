import internsLogo from '@/assets/logo/interns_logo.png';
import AddCollegeRequirementDocument from '@component/interface/modal/school/addCollegeRequirementDocument';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { imageUploader } from '@utils/uploaderFunction';
import { CreateCollegeDepartmentRequirementDocumentForm } from '@validator/forms';
import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileWord,
  AiOutlinePlusCircle,
  AiOutlineSave,
} from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import ViewCollegeRequirementDocument from '@component/interface/modal/school/viewCollegeRequirementDocument';
import { DynamicContext } from '@redux/context';

function DocumentsContainer() {
  const context = useContext(DynamicContext);
  const [listCollege, setListCollege] = React.useState<ReturnCollegeProgram[]>(
    []
  );
  const [listDocuments, setListDocuments] = useState<
    {
      bucketUrlOfDocument: string;
      createdAt: string;
      documentName: string;
      id: number;
    }[]
  >([]);
  const [stateCollege, setStateCollege] = useState({
    collegeIndex: -1,
    collegeDepartmentObject: {
      id: 0,
      collegeProfileImage: '',
      collegeDepartmentName: '',
      collegeProgramName: '',
    },
  });
  const [documentEdit, setDocumentEdit] = useState({
    index: -1,
  });
  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
  });
  const [modal, setModal] = useState({
    createRequirementDocument: false,
    viewRequirementDocument: false,
    documentUrl: '',
  });
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormCollegeDepartmentRequirementDocument>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateCollegeDepartmentRequirementDocumentForm),
  });

  useEffect(() => {
    getCollegeList();
  }, [pagination.skip]);

  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <div className="flex items-center justify-center gap-3 text-secondaryWhite">
          <p className={'font-bold'}>Manage Department Documents</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          {stateCollege.collegeIndex !== -1 && (
            <button
              className={classNames(
                'rounded bg-primaryYellow p-2',
                context?.userData.levelOfUser === 'STAFF' &&
                  'cursor-not-allowed opacity-50'
              )}
              disabled={context?.userData.levelOfUser === 'STAFF'}
              title="Add Template"
              onClick={() => {
                toggleRequirementDocument();
              }}
            >
              <AiOutlinePlusCircle size={20} />
            </button>
          )}

          <button
            className={classNames('rounded bg-primaryYellow p-2')}
            title="Refresh"
            onClick={() => {
              setListDocuments([]);

              getCollegeList();

              successfulNotify('Refreshed Successfully');
              setStateCollege((prev) => ({
                ...prev,
                collegeIndex: -1,
              }));
            }}
          >
            <BiRefresh size={20} />
          </button>
        </div>
      </div>

      <div className="grid h-[70vh] w-full grid-cols-3 overflow-auto">
        <div className="flex h-full flex-col items-center justify-start gap-2 overflow-auto p-2">
          {listCollege.map((college, index) => (
            <button
              key={college.id}
              className={classNames(
                'flex w-full items-center justify-start gap-4 rounded  p-3 text-left font-semibold text-secondaryWhite duration-300',
                stateCollege.collegeIndex === index + 1
                  ? 'bg-customBorder'
                  : 'bg-mainBgWhite'
              )}
              onClick={() => {
                setStateCollege((prev) => ({
                  ...prev,
                  collegeIndex: index + 1,
                  collegeDepartmentObject: {
                    ...prev.collegeDepartmentObject,
                    id: college.id,
                    collegeDepartmentName: college.college_department_name,
                    collegeProfileImage: college.college_department_image,
                    collegeProgramName: college.complete_program_name,
                  },
                }));

                getRequirementDocument(college.id);
              }}
            >
              <Image
                width={50}
                height={50}
                alt="profileImage"
                className="rounded-full"
                src={college.college_department_image || internsLogo}
              />
              <span className="flex flex-col items-start justify-center">
                <span>{college.college_department_name}</span>
                <span className="text-sm font-light">
                  {college.complete_program_name}
                </span>
                <span className="text-xs font-light italic">
                  {college.college_coordinator}
                </span>
              </span>
            </button>
          ))}
        </div>
        {stateCollege.collegeIndex !== -1 && (
          <div className="col-span-2 h-full overflow-auto p-2">
            <table className="w-full text-center text-sm">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th
                    scope="col"
                    className="min-w-[380px] max-w-[380px] px-6 py-3"
                  >
                    Document Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    File
                  </th>
                  <th
                    scope="col"
                    className="min-w-[200px] max-w-[380px] px-6 py-3"
                  >
                    Date Creation
                  </th>
                  <th
                    scope="col"
                    className="sticky right-0 bg-gray-100 px-6 py-3"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listDocuments.map((document, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {documentEdit.index === document.id ? (
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
                      ) : (
                        document.documentName
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {documentEdit.index === document.id ? (
                        <>
                          <label className="flex w-[200px] cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                            <AiOutlineFileWord
                              size={30}
                              className="mr-5 text-secondaryWhite"
                            />
                            <span className="w-[50%] truncate">
                              {watch().bucketUrlOfDocument || 'Document File'}
                            </span>
                            <input
                              className="imageUpload"
                              type="file"
                              accept=".doc,.docx"
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
                                  setValue(
                                    'bucketUrlOfDocument',
                                    uploadImagePayload
                                  );
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
                        <>
                          {document.bucketUrlOfDocument === '' ||
                          document.bucketUrlOfDocument === null ? (
                            'No Template'
                          ) : (
                            <button
                              className="text-blue-500 underline"
                              onClick={() =>
                                toggleViewRequirementDocument(
                                  document.bucketUrlOfDocument
                                )
                              }
                            >
                              View Template
                            </button>
                          )}
                        </>
                      )}
                    </td>
                    <td> {new Date(document.createdAt).toLocaleString()}</td>
                    <td className="sticky right-0 flex items-center justify-center gap-3 bg-white px-2 py-4">
                      {documentEdit.index === document.id ? (
                        <>
                          <button
                            className="cursor-pointer rounded bg-primaryYellow p-2"
                            title="Save Template"
                            onClick={() => {
                              putRequirementDocument(document.id, {
                                nameOfDocument: watch().nameOfDocument,
                                bucketUrlOfDocument:
                                  watch().bucketUrlOfDocument,
                              });
                            }}
                          >
                            <AiOutlineSave
                              size={25}
                              className="text-mainBgWhite"
                            />
                          </button>
                          <button
                            className="cursor-pointer rounded border-2 border-primaryYellow p-2"
                            title="Cancel Edit"
                            onClick={() => {
                              setDocumentEdit((prev) => ({
                                ...prev,
                                index: -1,
                              }));

                              reset();
                            }}
                          >
                            <AiOutlineCloseCircle
                              size={25}
                              className="text-secondaryWhite"
                            />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={classNames(
                              'rounded bg-orange-400 p-2',
                              context?.userData.levelOfUser === 'STAFF' &&
                                'cursor-not-allowed opacity-50'
                            )}
                            disabled={
                              context?.userData.levelOfUser === 'STAFF'
                                ? true
                                : false
                            }
                            title="Edut Template"
                            onClick={() => {
                              setDocumentEdit((prev) => ({
                                ...prev,
                                index: document.id,
                              }));

                              setValue('nameOfDocument', document.documentName);
                              setValue(
                                'bucketUrlOfDocument',
                                document.bucketUrlOfDocument
                              );
                            }}
                          >
                            <AiOutlineEdit
                              size={25}
                              className="text-mainBgWhite"
                            />
                          </button>
                          <button
                            className={classNames(
                              'rounded bg-red-400 p-2',
                              context?.userData.levelOfUser === 'STAFF' &&
                                'cursor-not-allowed opacity-50',
                              context?.userData.levelOfUser ===
                                'ADMINISTRATOR' &&
                                'cursor-not-allowed opacity-50'
                            )}
                            title="Delete Template"
                            onClick={() => {
                              deleteRequirementDocument(document.id);
                            }}
                            disabled={
                              context?.userData.levelOfUser === 'STAFF'
                                ? true
                                : context?.userData.levelOfUser ===
                                  'ADMINISTRATOR'
                                ? true
                                : false
                            }
                          >
                            <AiOutlineDelete
                              size={25}
                              className="text-mainBgWhite"
                            />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-3">
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
          </p>
          <button
            className={classNames(
              'w-[100px] rounded border-2 border-primaryYellow p-1',
              {
                'cursor-not-allowed opacity-50':
                  pagination.payloadLength !== 20,
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
        <div className="col-span-2 flex items-center justify-end">
          {stateCollege.collegeDepartmentObject.collegeDepartmentName !==
            '' && (
            <p className="rounded-full bg-green-500 py-1 px-3 text-sm font-light text-white">
              {stateCollege.collegeDepartmentObject.collegeDepartmentName}
            </p>
          )}
        </div>
      </div>

      {/*  MODALS*/}
      <AddCollegeRequirementDocument
        modal={modal.createRequirementDocument}
        toggleRequirementDocument={toggleRequirementDocument}
        reset={reset}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        setValue={setValue}
        collegeObject={{
          departmentName:
            stateCollege.collegeDepartmentObject.collegeDepartmentName,
          programName: stateCollege.collegeDepartmentObject.collegeProgramName,
        }}
        postRequirementDocument={postRequirementDocument}
        isCreating={state.isCreating}
      />

      <ViewCollegeRequirementDocument
        subModal={modal.viewRequirementDocument}
        toggleViewRequirementDocument={toggleViewRequirementDocument}
        docxFile={modal.documentUrl}
      />
    </div>
  );

  function toggleRequirementDocument() {
    setModal((prev) => ({
      ...prev,
      createRequirementDocument: !prev.createRequirementDocument,
    }));
  }

  function toggleViewRequirementDocument(url?: string) {
    setModal((prev: any) => {
      return {
        ...prev,
        documentUrl: url,
        viewRequirementDocument: !prev.viewRequirementDocument,
      };
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

  function postRequirementDocument(
    data: FormCollegeDepartmentRequirementDocument
  ) {
    setState((prev) => ({ ...prev, isCreating: true }));

    axios
      .post(
        `/api/data/requirementDocument?collegeDepartmentId=${stateCollege.collegeDepartmentObject.id}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res.data.message === 'DOCUMENT_ALREADY_EXIST') {
          warningNotify('Document already exist.');

          setState((prev) => ({ ...prev, isCreating: false }));
        } else {
          successfulNotify('Successfully added a requirement document.');

          reset();
          toggleRequirementDocument();
          getRequirementDocument(stateCollege.collegeDepartmentObject.id);
          setState((prev) => ({ ...prev, isCreating: false }));
        }
      })
      .catch((error) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(error);
      });
  }

  function getRequirementDocument(id: number) {
    axios
      .get(`/api/data/requirementDocument?collegeDepartmentId=${id}`)
      .then((res) => {
        setListDocuments(res.data.documentsPayload);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteRequirementDocument(id: number) {
    axios
      .delete(`/api/data/requirementDocument?id=${id}`)
      .then(() => {
        successfulNotify('Successfully deleted a requirement document.');

        getRequirementDocument(stateCollege.collegeDepartmentObject.id);
      })
      .catch((error) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(error);
      });
  }

  function putRequirementDocument(id: number, data: any) {
    axios
      .put(
        `/api/data/requirementDocument?collegeDepartmentId=${stateCollege.collegeDepartmentObject.id}&id=${id}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        successfulNotify('Successfully added a requirement document.');

        reset();
        getRequirementDocument(stateCollege.collegeDepartmentObject.id);
        setDocumentEdit((prev) => ({ ...prev, index: -1 }));
      })
      .catch(() => {
        errorNotify("Something's wrong. Please try again later.");
      });
  }
}

export default DocumentsContainer;
