import React, { useContext, useEffect, useMemo, useState } from 'react';

import {
  AiOutlineClear,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { BiCategoryAlt, BiRefresh } from 'react-icons/bi';

import { Student_Status } from '@prisma/client';
import axios from 'axios';
import classNames from 'classnames';

import {
  AdStudent,
  AddStudentBulk,
} from '@component/interface/modal/school/addStudent';
import EditStudent from '@component/interface/modal/school/editStudent';
import GenerateReport from '@component/interface/modal/school/generateReport';
import { InfoLegendStudent } from '@component/interface/modal/school/infoLegend';
import SelectCollege from '@component/interface/modal/school/selectCollege';
import SelectSchoolYearSemestreModal from '@component/interface/modal/school/selectSchoolYearSemestreModal';
import SubmittedDocument from '@component/interface/modal/school/submittedDocument';
import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import { HiOutlineDocumentReport, HiOutlineDocumentText } from 'react-icons/hi';
import { DynamicContext } from '@redux/context';
import SendEmailStudents from '@component/interface/modal/school/sendEmailStudents';

function StudentContainer() {
  const context = useContext(DynamicContext);
  const levelOfUser = Object.entries(Student_Status);

  const [modal, setModal] = React.useState({
    selectSchoolYearSemestre: false,
    selectCollege: false,
    addStudentBulk: false,
    addStudent: false,
    info: false,
    editStudent: false,
    submittedDocument: false,
    generateReport: false,
    sendEmailStudents: false,
  });

  const [active, setActive] = useState({
    schoolYear: '',
    schoolSemestre: '',
    collegeDepartment: '',
    objectDataSchoolYear: '',
    objectDataSchoolSemestre: '',
    ObjectDataCollegeDepartment: '',
  });
  const [objectEditStudent, setObjectEditStudent] = useState('');
  const [schoolYearSemestreList, setSchoolYearSemestreList] = useState<
    SelectSchoolYearSemestre[]
  >([]);
  const [ltudentList, setStudentList] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });
  const [searchState, setSearchState] = useState({
    isOpen: false,
    searchInput: '',
  });
  const [sendEmail, setSendEmail] = useState({
    lastName: '',
    emailAddress: '',
  });

  const filterStudentList = useMemo(() => {
    return ltudentList.filter((item) => {
      const regex = new RegExp(
        searchState.searchInput.toLocaleLowerCase(),
        'gi'
      );

      const first = item.first_name;
      const middle = item.middle_name;
      const last = item.last_name;
      return `${first} ${middle} ${last}`.match(regex);
    });
  }, [ltudentList, searchState.searchInput]);

  useEffect(() => {
    getSchoolYear();
  }, []);

  useEffect(() => {
    if (
      active.schoolYear === '' ||
      active.schoolSemestre === '' ||
      active.collegeDepartment === ''
    )
      return;

    getStudentList();
  }, [pagination.skip, active]);

  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <div className="flex items-center justify-center gap-3 text-secondaryWhite">
          <p className={'font-bold'}>Manage Practicums</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            className={classNames('rounded bg-green-500 p-2 text-white')}
            title="Legend"
            onClick={() => toggleInfo()}
          >
            <AiOutlineInfoCircle size={20} />
          </button>
          <button
            className={classNames(
              'rounded bg-blue-500 p-2 text-white',
              context?.userData.levelOfUser === 'STAFF' &&
                'cursor-not-allowed opacity-50'
            )}
            disabled={context?.userData.levelOfUser === 'STAFF'}
            title="Generate Report"
            onClick={() => toggleGenerateReport()}
          >
            <HiOutlineDocumentReport size={20} />
          </button>
          <button
            className={classNames('rounded bg-primaryYellow p-2')}
            title="Select School Year/Semestre | College/Department"
            onClick={() => toggleSelectSchoolYearSemestre()}
          >
            <BiCategoryAlt size={20} />
          </button>
          <button
            className={classNames('rounded bg-primaryYellow p-2', {
              'cursor-not-allowed opacity-50':
                active.schoolYear === '' ||
                active.schoolSemestre === '' ||
                active.collegeDepartment === '',
            })}
            disabled={
              active.schoolYear === '' ||
              active.schoolSemestre === '' ||
              active.collegeDepartment === ''
            }
            title="Refresh"
            onClick={() => {
              setPagination({
                skip: 0,
                take: 20,
                payloadLength: 0,
              });

              getStudentList();
              successfulNotify('Refreshed Successfully');
            }}
          >
            <BiRefresh size={20} />
          </button>
          <button
            className={classNames('rounded bg-primaryYellow p-2', {
              'cursor-not-allowed opacity-50':
                active.schoolYear === '' ||
                active.schoolSemestre === '' ||
                active.collegeDepartment === '',
            })}
            disabled={
              active.schoolYear === '' ||
              active.schoolSemestre === '' ||
              active.collegeDepartment === ''
            }
            title={`Add Student in ${active.schoolYear} - ${active.schoolSemestre} | ${active.collegeDepartment}`}
            onClick={() => toggleAddStudent()}
          >
            <AiOutlineUserAdd size={20} />
          </button>
          <button
            className={classNames('rounded bg-primaryYellow p-2', {
              'cursor-not-allowed opacity-50':
                active.schoolYear === '' ||
                active.schoolSemestre === '' ||
                active.collegeDepartment === '',
            })}
            disabled={
              active.schoolYear === '' ||
              active.schoolSemestre === '' ||
              active.collegeDepartment === ''
            }
            title={`Bulk Import Students in ${active.schoolYear} - ${active.schoolSemestre} | ${active.collegeDepartment}`}
            onClick={() => toggleAddStudentBulk()}
          >
            <AiOutlineUsergroupAdd size={20} />
          </button>

          <button
            className={classNames(
              'rounded bg-red-500 p-2 text-white',
              {
                'cursor-not-allowed opacity-50':
                  active.schoolYear === '' ||
                  active.schoolSemestre === '' ||
                  active.collegeDepartment === '',
              },
              context?.userData.levelOfUser === 'STAFF' &&
                'cursor-not-allowed opacity-50'
            )}
            disabled={
              active.schoolYear === '' ||
              active.schoolSemestre === '' ||
              active.collegeDepartment === '' ||
              context?.userData.levelOfUser === 'STAFF'
            }
            title={`Delete All Students in ${active.schoolYear} - ${active.schoolSemestre} | ${active.collegeDepartment}`}
            onClick={() => deleteStudents({ deletedAll: 'true' })}
          >
            <AiOutlineDelete size={20} />
          </button>

          <div className={classNames('flex items-center justify-center gap-1')}>
            <input
              className={classNames(
                'w-[250px] rounded-md border-2 border-primaryYellow bg-mainBgWhite p-2 text-sm focus:outline-none',
                {
                  'cursor-not-allowed opacity-50':
                    active.schoolYear === '' ||
                    active.schoolSemestre === '' ||
                    active.collegeDepartment === '',
                }
              )}
              type="text"
              disabled={
                active.schoolYear === '' ||
                active.schoolSemestre === '' ||
                active.collegeDepartment === ''
              }
              placeholder="Search Student Name..."
              value={searchState.searchInput}
              onChange={(e) => {
                setSearchState((prev) => ({
                  ...prev,
                  searchInput: e.target.value,
                }));
              }}
            />
            <button
              className={classNames('rounded bg-red-500 p-2 text-white', {})}
              title="Clear All"
              onClick={() => {
                setActive({
                  schoolYear: '',
                  schoolSemestre: '',
                  collegeDepartment: '',
                  objectDataSchoolYear: '',
                  objectDataSchoolSemestre: '',
                  ObjectDataCollegeDepartment: '',
                });

                setObjectEditStudent('');

                setSearchState({
                  isOpen: false,
                  searchInput: '',
                });

                setStudentList([]);

                setPagination({
                  skip: 0,
                  take: 20,
                  payloadLength: 0,
                });
              }}
            >
              <AiOutlineClear size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[70vh] w-full overflow-auto">
        <table className="w-full text-center text-sm">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="min-w-[130px] px-6 py-3">
                Account Status
              </th>
              <th scope="col" className="min-w-[130px] px-6 py-3">
                Eligibility
              </th>
              <th scope="col" className="min-w-[130px] px-6 py-3">
                Student Status
              </th>
              <th scope="col" className="min-w-[130px] px-6 py-3">
                Times of Request for Recommendation
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Email Address
              </th>
              <th scope="col" className="min-w-[250px] max-w-[400px] px-6 py-3">
                Department
              </th>
              <th scope="col" className="min-w-[250px] max-w-[400px] px-6 py-3">
                Date Creation
              </th>
              <th
                scope="col"
                className="sticky right-0 min-w-[130px] bg-gray-100 px-6 py-3"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filterStudentList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <span
                    className={classNames(
                      'rounded-full py-2 px-3 text-secondaryWhite',
                      item.is_active ? 'bg-green-200' : 'bg-red-200'
                    )}
                  >
                    {item.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td>
                  <span
                    className={classNames(
                      'rounded-full py-2 px-3 text-secondaryWhite',
                      item.is_eligible ? 'bg-green-200' : 'bg-red-200'
                    )}
                  >
                    {item.is_eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                  </span>
                </td>
                <td>
                  <span
                    className={classNames(
                      'rounded-full py-2 px-3 text-white',
                      item.Student_User_Profile.student_status === 'INCOMPLETE'
                        ? 'bg-red-500'
                        : item.Student_User_Profile.student_status ===
                          'COMPLETE'
                        ? 'bg-pink-500'
                        : item.Student_User_Profile.student_status ===
                          'APPLYING'
                        ? 'bg-yellow-500'
                        : item.Student_User_Profile.student_status === 'APPLIED'
                        ? 'bg-blue-500'
                        : item.Student_User_Profile.student_status ===
                          'FINISHED'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    )}
                  >
                    {item.Student_User_Profile.student_status
                      .split('_')
                      .join(' ')
                      .slice(0, 1)
                      .toUpperCase()}
                    {item.Student_User_Profile.student_status
                      .slice(1)
                      .split('_')
                      .join(' ')}
                  </span>
                </td>
                <td>
                  {item.Student_Recommendation.length <= 0
                    ? 'No Request Yet'
                    : `${item.Student_Recommendation.length} Time/s`}
                </td>
                <td>
                  {item.first_name} {item.middle_name} {item.last_name}
                </td>
                <td>{item.email}</td>
                <td>
                  {
                    item.Student_User_Profile.College_Department
                      .college_department_name
                  }
                </td>
                <td> {new Date(item.createdAt).toLocaleString()}</td>
                <td className={classNames('sticky right-0 bg-white px-2 py-4')}>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className={classNames(
                        'rounded bg-red-400 p-2',
                        context?.userData.levelOfUser === 'STAFF'
                          ? 'cursor-not-allowed opacity-50'
                          : context?.userData.levelOfUser === 'ADMINISTRATOR'
                          ? 'cursor-not-allowed opacity-50'
                          : 'cursor-pointer'
                      )}
                      disabled={
                        context?.userData.levelOfUser === 'STAFF'
                          ? true
                          : context?.userData.levelOfUser === 'ADMINISTRATOR'
                          ? true
                          : false
                      }
                      title="Delete Student"
                      onClick={() => deleteStudents({ id: item.id })}
                    >
                      <AiOutlineDelete size={25} className="text-mainBgWhite" />
                    </button>
                    <button
                      className="cursor-pointer rounded bg-orange-400 p-2"
                      title="Edit Students"
                      onClick={() => toggleEditStudent(JSON.stringify(item))}
                    >
                      <AiOutlineEdit size={25} className="text-mainBgWhite" />
                    </button>
                    <button
                      className="cursor-pointer rounded bg-yellow-400 p-2"
                      title="Documents of Students"
                      onClick={() => {
                        toggleSubmittedDoc(JSON.stringify(item));
                      }}
                    >
                      <HiOutlineDocumentText
                        size={25}
                        className="text-mainBgWhite"
                      />
                    </button>
                    <button
                      className={classNames(
                        'rounded bg-violet-400 p-2',
                        context?.userData.levelOfUser === 'STAFF'
                          ? 'cursor-not-allowed opacity-50'
                          : 'cursor-pointer'
                      )}
                      disabled={
                        context?.userData.levelOfUser === 'STAFF' ? true : false
                      }
                      onClick={() => {
                        toggleSendEmail();

                        setSendEmail({
                          emailAddress: item.email,
                          lastName: item.last_name,
                        });
                      }}
                      title="Email Student"
                    >
                      <AiOutlineMail size={25} className="text-mainBgWhite" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p
            className={classNames(
              'rounded-full bg-green-500 px-3 py-1 text-sm font-light text-white'
            )}
          >
            {'/ '}
            {active.schoolYear && (
              <>
                {active.schoolYear} / {active.schoolSemestre} /{' '}
                {active.collegeDepartment}
              </>
            )}
          </p>
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
      </div>

      {/* MODAL */}
      <SelectSchoolYearSemestreModal
        modal={modal.selectSchoolYearSemestre}
        toggleSelectSchoolYearSemestre={toggleSelectSchoolYearSemestre}
        toggleSelectCollege={toggleSelectCollege}
        schoolYearSemestreList={schoolYearSemestreList}
        active={active}
        setActive={setActive}
      />

      <SelectCollege
        modal={modal.selectCollege}
        toggleSelectCollege={toggleSelectCollege}
        toggleSelectSchoolYearSemestre={toggleSelectSchoolYearSemestre}
        setActive={setActive}
      />

      <AdStudent
        modal={modal.addStudent}
        toggleAddStudent={toggleAddStudent}
        object={{
          objectDataSchoolYear: active.objectDataSchoolYear,
          objectDataSchoolSemestre: active.objectDataSchoolYear,
          ObjectDataCollegeDepartment: active.ObjectDataCollegeDepartment,
        }}
        getStudentList={getStudentList}
      />

      <AddStudentBulk
        modal={modal.addStudentBulk}
        toggleAddStudentBulk={toggleAddStudentBulk}
        object={{
          objectDataSchoolYear: active.objectDataSchoolYear,
          objectDataSchoolSemestre: active.objectDataSchoolYear,
          ObjectDataCollegeDepartment: active.ObjectDataCollegeDepartment,
        }}
        getStudentList={getStudentList}
      />

      <InfoLegendStudent
        modal={modal.info}
        toggleInfo={toggleInfo}
        levelOfUser={levelOfUser}
      />

      <EditStudent
        modal={modal.editStudent}
        toggleEditStudent={toggleEditStudent}
        objectEditStudent={objectEditStudent}
        getStudentList={getStudentList}
      />

      <SubmittedDocument
        modal={modal.submittedDocument}
        toggleSubmittedDoc={toggleSubmittedDoc}
        objectEditStudent={objectEditStudent}
      />

      <GenerateReport
        modal={modal.generateReport}
        toggleGenerateReport={toggleGenerateReport}
      />

      <SendEmailStudents
        modal={modal.sendEmailStudents}
        toggleSendEmail={toggleSendEmail}
        data={{
          emailAddress: sendEmail.emailAddress,
          lastName: sendEmail.lastName,
        }}
        setSendEmail={setSendEmail}
      />
    </div>
  );

  // HANDLERS
  function toggleSelectSchoolYearSemestre() {
    setModal((prev) => ({
      ...prev,
      selectSchoolYearSemestre: !prev.selectSchoolYearSemestre,
    }));
  }

  function toggleSelectCollege() {
    setModal((prev) => ({
      ...prev,
      selectCollege: !prev.selectCollege,
    }));
  }

  function toggleAddStudentBulk() {
    setModal((prev) => ({
      ...prev,
      addStudentBulk: !prev.addStudentBulk,
    }));
  }

  function toggleAddStudent() {
    setModal((prev) => ({
      ...prev,
      addStudent: !prev.addStudent,
    }));
  }

  function toggleSendEmail() {
    setModal((prev) => ({
      ...prev,
      sendEmailStudents: !prev.sendEmailStudents,
    }));
  }

  function toggleInfo() {
    setModal((prev) => ({
      ...prev,
      info: !prev.info,
    }));
  }

  function toggleSubmittedDoc(itemStudentData?: string) {
    setModal((prev) => ({
      ...prev,
      submittedDocument: !prev.submittedDocument,
    }));

    if (itemStudentData) {
      setObjectEditStudent(itemStudentData);
    } else {
      setObjectEditStudent('');
    }
  }

  function toggleGenerateReport() {
    setModal((prev) => ({
      ...prev,
      generateReport: !prev.generateReport,
    }));
  }

  function toggleEditStudent(itemStudentData?: string) {
    setModal((prev) => ({
      ...prev,
      editStudent: !prev.editStudent,
    }));

    if (itemStudentData) {
      setObjectEditStudent(itemStudentData);
    } else {
      setObjectEditStudent('');
    }
  }

  function getSchoolYear() {
    axios
      .get('/api/data/schoolYear')
      .then((res) => {
        setSchoolYearSemestreList(res.data.responsePayload);
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }

  function getStudentList() {
    const config = {
      method: 'get',
      url: `/api/data/student?skip=${pagination.skip}&schoolYear=${active.objectDataSchoolYear}&schoolSemestre=${active.objectDataSchoolSemestre}&collegeDepartment=${active.ObjectDataCollegeDepartment}`,
    };

    axios
      .request(config)
      .then((response) => {
        setStudentList(response.data.responsePayload);

        const length = response.data.responsePayloadLength;

        setPagination((prev) => ({ ...prev, payloadLength: length }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteStudents({
    id,
    deletedAll,
  }: {
    id?: number;
    deletedAll?: string;
  }) {
    axios
      .delete(
        `/api/data/student?deleteAll=${deletedAll}&schoolSemestre=${active.objectDataSchoolSemestre}&id=${id}`
      )
      .then(() => {
        getStudentList();

        successfulNotify('Deleted student/s Under this semestre');
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }
}

export default StudentContainer;
