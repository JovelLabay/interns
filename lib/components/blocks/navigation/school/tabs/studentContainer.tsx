import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineClear,
  AiOutlineConsoleSql,
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
import { errorNotify } from '@component/interface/toast/toast';
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

  useEffect(() => {
    getSchoolYear();
  }, []);

  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <div className="flex items-center justify-center gap-5 text-secondaryWhite">
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
                'cursor-not-allowed opacity-50': active.schoolYear === '',
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
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Student Code
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Email Address
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Is Active
              </th>
              <th scope="col" className="min-w-[200px] max-w-[380px] px-6 py-3">
                Date Creation
              </th>
              <th scope="col" className="sticky right-0 px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sdfsd</td>
              <td>sdfsd</td>
              <td>sdfsd</td>
              <td>sdfsd</td>
              <td>sdfsd</td>
              <td>sdfsd</td>
              <td className={classNames('sticky right-0 px-2 py-4')}>sdfsdf</td>
            </tr>
          </tbody>
        </table>
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
}

export default StudentContainer;
