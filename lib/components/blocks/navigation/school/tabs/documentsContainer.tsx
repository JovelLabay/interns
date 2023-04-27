import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import classNames from 'classnames';
import Image from 'next/image';
import internsLogo from '@/assets/logo/interns_logo.png';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCollegeDepartmentRequirementDocumentForm } from '@validator/forms';
import AddCollegeRequirementDocument from '@component/interface/modal/school/addCollegeRequirementDocument';

function DocumentsContainer() {
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
  const [modal, setModal] = useState({
    createRequirementDocument: false,
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
              className={classNames('rounded bg-primaryYellow p-2')}
              title="Add"
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
                  <th scope="col" className="w-[250px] px-6 py-3">
                    Document Name
                  </th>
                  <th scope="col" className="w-[250px] px-6 py-3">
                    File
                  </th>
                  <th scope="col" className="w-[250px] px-6 py-3">
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
                    <td>{document.documentName}</td>
                    <td>
                      {document.bucketUrlOfDocument === '' ||
                      document.bucketUrlOfDocument === null ? (
                        'No File'
                      ) : (
                        <a
                          href={document.bucketUrlOfDocument}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View
                        </a>
                      )}
                    </td>
                    <td> {new Date(document.createdAt).toLocaleString()}</td>
                    <td className="sticky right-0 bg-white px-2 py-4">
                      <button
                        className="cursor-pointer rounded bg-red-400 p-2"
                        title="Delete User"
                        onClick={() => {
                          deleteRequirementDocument(document.id);
                        }}
                      >
                        <AiOutlineDelete
                          size={25}
                          className="text-mainBgWhite"
                        />
                      </button>
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
      />
    </div>
  );

  function toggleRequirementDocument() {
    setModal((prev) => ({
      ...prev,
      createRequirementDocument: !prev.createRequirementDocument,
    }));
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
      .then(() => {
        successfulNotify('Successfully added a requirement document.');

        reset();
        toggleRequirementDocument();
        getRequirementDocument(stateCollege.collegeDepartmentObject.id);
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
}

export default DocumentsContainer;
