import { Dialog, Listbox, Switch, Transition } from '@headlessui/react';
import React, { useState, useEffect, useRef } from 'react';
import { data } from '../../../../../Data';
import classNames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';
import { AiOutlineClear, AiOutlineExport } from 'react-icons/ai';
import { CSVLink } from 'react-csv';

function GenerateReport({
  modal,
  toggleGenerateReport,
}: {
  modal: boolean;
  toggleGenerateReport: () => void;
}) {
  const csvRef: any = useRef(null);

  const [toggle, setToggle] = useState({
    eligibility: false,
    studentStatus: '',
    schoolSemestre: {
      name: '',
      id: -1,
    },
    schoolYear: {
      name: '',
      id: -1,
    },
    college: {
      name: '',
      id: -1,
    },
  });

  const [generateState, setGenerateState] = useState({
    generate: false,
  });
  const [reportList, setReportList] = useState([]);
  const [listCollege, setListCollege] = useState<ReturnCollegeProgram[]>([]);
  const [listSchoolYear, setListSchoolYear] = useState<ReturnFormSchoolYear[]>(
    []
  );
  const [listSchoolSemestre, setListSchoolSemestre] = useState<
    ReturnFormSchoolSemestre[]
  >([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });

  useEffect(() => {
    getCollegeList();
    getSchoolYear();
  }, [pagination.skip]);
  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleGenerateReport();

          clearSelection();
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[80vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-between">
                  <button
                    onClick={() => {
                      toggleGenerateReport();

                      clearSelection();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      title="Export Report"
                      className={classNames(
                        'rounded bg-red-500 p-2 text-white'
                      )}
                      onClick={() => {
                        clearSelection();

                        setReportList([]);
                      }}
                    >
                      <AiOutlineClear size={20} />
                    </button>
                    <button
                      disabled={reportList.length === 0 ? true : false}
                      title="Export Report"
                      className={classNames(
                        'rounded bg-primaryYellow p-2 text-white',
                        reportList.length === 0
                          ? 'cursor-not-allowed opacity-50'
                          : ''
                      )}
                      onClick={() => {
                        csvRef.current.link.click();
                      }}
                    >
                      <AiOutlineExport size={20} />
                    </button>
                  </div>
                </div>
                <div className="my-3 flex items-start justify-start gap-5">
                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>School Year</label>
                    <Listbox
                      value={toggle.schoolYear}
                      onChange={(data: any) => {
                        if (data.School_Semester.length <= 0) {
                          setListSchoolSemestre([]);
                          setToggle((prev) => ({
                            ...prev,
                            schoolSemestre: {
                              id: -1,
                              name: '',
                            },
                          }));
                        } else {
                          setToggle((prev) => ({
                            ...prev,
                            schoolYear: {
                              id: data.id,
                              name: data.school_year_name,
                            },
                          }));
                          setListSchoolSemestre(data.School_Semester);
                        }
                      }}
                    >
                      {({ open }: { open: boolean }) => (
                        <div className="relative">
                          <Listbox.Button
                            className={classNames(
                              'flex w-[200px] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                            )}
                          >
                            {toggle.schoolYear.id === -1
                              ? 'Select Year'
                              : toggle.schoolYear.name}
                            <FiChevronDown
                              size={30}
                              className={classNames(
                                'text-secondaryWhite duration-300',
                                {
                                  'rotate-180': open,
                                }
                              )}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-30 h-[200px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                            {listSchoolYear.map((person, index) => (
                              <Listbox.Option
                                className="py-1"
                                key={index}
                                value={person}
                              >
                                {person.school_year_name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>
                  </div>

                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>
                      School Semester
                    </label>
                    <Listbox
                      disabled={toggle.schoolYear.id !== -1 ? false : true}
                      value={toggle.schoolSemestre.name}
                      onChange={(data: any) => {
                        setToggle((prev) => ({
                          ...prev,
                          schoolSemestre: {
                            name: data.school_semester_name,
                            id: data.id,
                          },
                        }));
                      }}
                    >
                      {({ open }: { open: boolean }) => (
                        <div className="relative">
                          <Listbox.Button
                            className={classNames(
                              'flex w-[200px] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none',
                              toggle.schoolYear.id !== -1 ? '' : 'opacity-50'
                            )}
                          >
                            {toggle.schoolSemestre.id === -1
                              ? 'Select Semestre'
                              : toggle.schoolSemestre.name}
                            <FiChevronDown
                              size={30}
                              className={classNames(
                                'text-secondaryWhite duration-300',
                                {
                                  'rotate-180': open,
                                }
                              )}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-30 h-[200px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                            {listSchoolSemestre.map((person, index) => (
                              <Listbox.Option
                                className="py-1"
                                key={index}
                                value={person}
                              >
                                {person.school_semester_name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>
                  </div>

                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>
                      Student Status
                    </label>
                    <Listbox
                      value={toggle.studentStatus}
                      onChange={(data: any) => {
                        setToggle((prev) => ({
                          ...prev,
                          studentStatus: data.name,
                        }));
                      }}
                    >
                      {({ open }: { open: boolean }) => (
                        <div className="relative">
                          <Listbox.Button
                            className={classNames(
                              'flex w-[200px] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                            )}
                          >
                            {toggle.studentStatus === ''
                              ? 'Select Status'
                              : toggle.studentStatus}
                            <FiChevronDown
                              size={30}
                              className={classNames(
                                'text-secondaryWhite duration-300',
                                {
                                  'rotate-180': open,
                                }
                              )}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-30 h-[200px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                            {data.admin.reports.map((person, index) => (
                              <Listbox.Option
                                className="py-1"
                                key={index}
                                value={person}
                              >
                                {person.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>
                  </div>

                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>
                      College Department
                    </label>
                    <Listbox
                      value={toggle.college.name}
                      onChange={(data: any) => {
                        setToggle((prev) => ({
                          ...prev,
                          college: {
                            name: data.college_department_name,
                            id: data.id,
                          },
                        }));
                      }}
                    >
                      {({ open }: { open: boolean }) => (
                        <div className="relative">
                          <Listbox.Button
                            className={classNames(
                              'flex w-[300px] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                            )}
                          >
                            {toggle.college.name === '' ? (
                              'Select College'
                            ) : (
                              <span className="text-xs">
                                {toggle.college.name}
                              </span>
                            )}

                            <FiChevronDown
                              size={30}
                              className={classNames(
                                'text-secondaryWhite duration-300',
                                {
                                  'rotate-180': open,
                                }
                              )}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-30 h-[200px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                            {listCollege.map((person, index) => (
                              <Listbox.Option
                                className="py-1 text-xs"
                                key={index}
                                value={person}
                              >
                                {person.college_department_name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>
                  </div>

                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>Eligibility</label>
                    <Switch
                      checked={toggle.eligibility}
                      onChange={() => {
                        setToggle((prev) => ({
                          ...prev,
                          eligibility: !prev.eligibility,
                        }));
                      }}
                      className={classNames(
                        toggle.eligibility
                          ? 'bg-primaryYellow'
                          : 'bg-primaryYellowHover',
                        'rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          toggle.eligibility ? 'translate-x-9' : 'translate-x-0'
                        }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                </div>

                <div className="h-[60vh] overflow-auto">
                  <table className="w-full text-center text-sm ">
                    <thead className="bg-gray-100 text-xs uppercase">
                      <tr>
                        <th scope="col" className="px-3 py-3">
                          No.
                        </th>
                        <th
                          scope="col"
                          className="min-w-[380px] max-w-[380px] px-6 py-3"
                        >
                          Student Name
                        </th>
                        <th
                          scope="col"
                          className="min-w-[380px] max-w-[380px] px-6 py-3"
                        >
                          Email Address
                        </th>
                        <th scope="col" className="min-w-[130px] px-6 py-3">
                          Eligibility
                        </th>
                        <th scope="col" className="min-w-[130px] px-6 py-3">
                          Student Status
                        </th>
                        <th scope="col" className="min-w-[130px] px-6 py-3">
                          Phone Number
                        </th>
                        <th scope="col" className="min-w-[130px] px-6 py-3">
                          Sex
                        </th>
                        <th
                          scope="col"
                          className="min-w-[380px] max-w-[380px] px-6 py-3"
                        >
                          Department Coordinator
                        </th>
                        <th
                          scope="col"
                          className="min-w-[200px] max-w-[380px] px-6 py-3"
                        >
                          Abbreviated Program Name
                        </th>
                        <th
                          scope="col"
                          className="min-w-[200px] max-w-[380px] px-6 py-3"
                        >
                          Date Creation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportList.map((report: any) => (
                        <tr key={report.id}>
                          <td>{report.id}</td>
                          <td className="px-2 py-4">
                            {report.first_name} {report.middle_name}{' '}
                            {report.last_name}
                          </td>
                          <td>{report.email}</td>
                          <td>
                            <span
                              className={classNames(
                                'rounded-full py-2 px-3 text-secondaryWhite',
                                report.is_eligible
                                  ? 'bg-green-200'
                                  : 'bg-red-200'
                              )}
                            >
                              {report.is_eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                            </span>
                          </td>
                          <td>
                            <span
                              className={classNames(
                                'rounded-full py-2 px-3 text-white',
                                report.Student_User_Profile.student_status ===
                                  'INCOMPLETE'
                                  ? 'bg-red-500'
                                  : report.Student_User_Profile
                                      .student_status === 'COMPLETE'
                                  ? 'bg-pink-500'
                                  : report.Student_User_Profile
                                      .student_status === 'APPLYING'
                                  ? 'bg-yellow-500'
                                  : report.Student_User_Profile
                                      .student_status === 'APPLIED'
                                  ? 'bg-blue-500'
                                  : report.Student_User_Profile
                                      .student_status === 'FINISHED'
                                  ? 'bg-green-500'
                                  : 'bg-gray-500'
                              )}
                            >
                              {report.Student_User_Profile.student_status
                                .split('_')
                                .join(' ')
                                .slice(0, 1)
                                .toUpperCase()}
                              {report.Student_User_Profile.student_status
                                .slice(1)
                                .split('_')
                                .join(' ')}
                            </span>
                          </td>
                          <td>{report.Student_User_Profile.phone_number}</td>
                          <td>{report.Student_User_Profile.sex}</td>
                          <td>
                            {
                              report.Student_User_Profile.College_Department
                                .college_coordinator
                            }
                          </td>
                          <td>
                            {
                              report.Student_User_Profile.College_Department
                                .abbreviated_program_name
                            }
                          </td>
                          <td>{new Date(report.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-left text-sm">
                      Pagination for the college
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className={classNames(
                          'w-[100px] rounded border-2 border-primaryYellow p-1',
                          {
                            'cursor-not-allowed opacity-50':
                              pagination.skip <= 0,
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
                        {pagination.skip === 0 ? 1 : pagination.skip} -{' '}
                        {pagination.take}
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

                  <button
                    disabled={
                      toggle.schoolYear.id === -1 ||
                      toggle.schoolSemestre.id === -1 ||
                      toggle.college.id === -1
                        ? true
                        : false
                    }
                    className={classNames(
                      'rounded bg-green-500 py-2 px-3 text-white',
                      toggle.schoolYear.id === -1 ||
                        toggle.schoolSemestre.id === -1 ||
                        toggle.college.id === -1
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    )}
                    onClick={() => generateReport()}
                  >
                    {generateState.generate
                      ? 'Generating Report...'
                      : 'Create Report'}
                  </button>
                </div>

                <CSVLink
                  headers={[
                    { label: 'ID', key: 'id' },
                    { label: 'First Name', key: 'first_name' },
                    { label: 'Middle Name', key: 'middle_name' },
                    { label: 'Last Name', key: 'last_name' },
                    { label: 'Email Address', key: 'email' },
                    { label: 'Eligibility', key: 'is_eligible' },
                    {
                      label: 'Student Status',
                      key: 'Student_User_Profile.student_status',
                    },
                    { label: 'Created At', key: 'createdAt' },
                    { label: 'Updated At', key: 'updatedAt' },
                    { label: 'Deleted At', key: 'deletedAt' },
                    {
                      label: 'Complete Address',
                      key: 'Student_User_Profile.address',
                    },
                    {
                      label: 'Birthdate',
                      key: 'Student_User_Profile.date_of_birth',
                    },
                    {
                      label: 'Phone Number',
                      key: 'Student_User_Profile.Phone_number',
                    },
                    {
                      label: 'Self Introduction',
                      key: 'Student_User_Profile.self_introduction',
                    },
                    {
                      label: 'Sex',
                      key: 'Student_User_Profile.sex',
                    },
                    {
                      label: 'Program Name',
                      key: 'Student_User_Profile.College_Department.complete_program_name',
                    },
                    {
                      label: 'Coordinator',
                      key: 'Student_User_Profile.College_Department.college_coordinator',
                    },
                  ]}
                  filename={`${toggle.schoolYear.name}_${
                    toggle.schoolSemestre.name
                  }_${toggle.studentStatus}_${
                    toggle.eligibility ? 'Eligible' : 'Not-Eligible'
                  }.csv`}
                  data={reportList}
                  ref={csvRef}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function generateReport() {
    setGenerateState((prev) => ({ ...prev, generate: true }));
    const stringed = JSON.stringify(toggle);
    warningNotify('Report generating...');

    axios
      .get(`/api/data/reports?queryPayload=${stringed}`)
      .then((res) => {
        successfulNotify('Report generated successfully.');

        setReportList(res.data.studentListPayload);
        setGenerateState((prev) => ({ ...prev, generate: false }));
      })
      .catch(() => {
        errorNotify("Something's wrong. Please try again later.");
        setGenerateState((prev) => ({ ...prev, generate: false }));
      });
  }

  function getSchoolYear() {
    axios
      .get(`/api/data/schoolYear`)
      .then((res) => {
        setListSchoolYear(res.data.responsePayload);
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
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

  function clearSelection() {
    setToggle({
      eligibility: false,
      studentStatus: '',
      schoolSemestre: {
        name: '',
        id: -1,
      },
      schoolYear: {
        name: '',
        id: -1,
      },
      college: {
        name: '',
        id: -1,
      },
    });

    setPagination({
      skip: 0,
      take: 20,
      payloadLength: 0,
    });
  }
}

export default GenerateReport;
