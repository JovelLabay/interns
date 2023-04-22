import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineClear,
  AiOutlineConsoleSql,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineMenu,
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import Papa from 'papaparse';
import classNames from 'classnames';
import SelectSchoolYearSemestreModal from '@component/interface/modal/school/selectSchoolYearSemestreModal';
import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import {
  AdStudent,
  AddStudentBulk,
} from '@component/interface/modal/school/addStudent';
import SelectCollege from '@component/interface/modal/school/selectCollege';

function StudentContainer() {
  const [modal, setModal] = useState({
    selectSchoolYearSemestre: false,
    selectCollege: false,
    addStudentBulk: false,
    addStudent: false,
  });

  const [active, setActive] = useState({
    schoolYear: '',
    schoolSemestre: '',
    collegeDepartment: '',
    objectData: '',
    objectData2nd: '',
  });

  const [schoolYearSemestreList, setSchoolYearSemestreList] = useState<
    SelectSchoolYearSemestre[]
  >([]);
  const [ltudentList, setStudentList] = useState<any[]>([]);

  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });

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
          {active.schoolYear && (
            <p
              className={classNames(
                'rounded-full bg-green-500 px-3 py-1 text-xs font-light text-white'
              )}
            >
              {active.schoolYear} / {active.schoolSemestre} /{' '}
              {active.collegeDepartment}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            className={classNames('rounded bg-primaryYellow p-2')}
            title="Select School Year/Semestre"
            onClick={() => toggleSelectSchoolYearSemestre()}
          >
            <AiOutlineMenu size={20} />
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
            title="Add Students"
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
            title="Bulk Import Students"
            onClick={() => toggleAddStudentBulk()}
          >
            <AiOutlineUsergroupAdd size={20} />
          </button>

          <div className={classNames('flex items-center justify-center gap-1')}>
            <input
              className={classNames(
                'w-[250px] rounded-md border-2 border-primaryYellow bg-mainBgWhite p-2 text-sm focus:outline-none',
                {
                  'cursor-not-allowed opacity-50': active.schoolYear === '',
                }
              )}
              type="text"
              disabled={active.schoolYear === ''}
              placeholder="Search Student..."
            />
            <button
              className={classNames('rounded bg-red-500 p-2 text-white', {
                'cursor-not-allowed opacity-50':
                  active.schoolYear === '' || active.schoolSemestre === '',
              })}
              title="Clear All"
              disabled={active.schoolYear === ''}
              onClick={() => {
                setActive({
                  schoolYear: '',
                  schoolSemestre: '',
                  collegeDepartment: '',
                  objectData: '',
                  objectData2nd: '',
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

      <>
        <div className="h-[70vh] w-full overflow-auto">
          <table className="w-full text-center text-sm">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th
                  scope="col"
                  className="min-w-[250px] max-w-[380px] px-6 py-3"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="min-w-[250px] max-w-[380px] px-6 py-3"
                >
                  Email Address
                </th>
                <th
                  scope="col"
                  className="min-w-[250px] max-w-[400px] px-6 py-3"
                >
                  Department
                </th>
                <th scope="col" className="min-w-[130px] px-6 py-3">
                  Account Active
                </th>
                <th scope="col" className="min-w-[130px] px-6 py-3">
                  Requirement Status
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
              {ltudentList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
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
                  <td>
                    <span
                      className={classNames(
                        'rounded-full py-2 px-3 text-white',
                        item.is_active ? 'bg-green-500' : 'bg-red-500'
                      )}
                    >
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>sdfsd</td>
                  <td
                    className={classNames('sticky right-0 bg-white px-2 py-4')}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="cursor-pointer rounded bg-red-400 p-2"
                        title="Delete User"
                      >
                        <AiOutlineDelete
                          size={25}
                          className="text-mainBgWhite"
                        />
                      </button>
                      <button
                        className="cursor-pointer rounded bg-orange-400 p-2"
                        title="Delete User"
                      >
                        <AiOutlineEdit size={25} className="text-mainBgWhite" />
                      </button>
                      <button
                        className="cursor-pointer rounded bg-blue-400 p-2"
                        title="Delete User"
                      >
                        <AiOutlineEye size={25} className="text-mainBgWhite" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </>

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

      <AdStudent modal={modal.addStudent} toggleAddStudent={toggleAddStudent} />

      <AddStudentBulk
        modal={modal.addStudentBulk}
        toggleAddStudentBulk={toggleAddStudentBulk}
        object={{
          dataObject: active.objectData,
          dataObject2nd: active.objectData2nd,
        }}
      />

      {/* TOAST */}
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
      url: `/api/data/student?skip=${pagination.skip}&objectData=${active.objectData}&objectData2nd=${active.objectData2nd}`,
    };

    axios
      .request(config)
      .then((response) => {
        setStudentList(response.data.responsePayload);

        const length = response.data.responsePayloadLength;

        setPagination((prev) => ({ ...prev, payloadLength: length }));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default StudentContainer;
