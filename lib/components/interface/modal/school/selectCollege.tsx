import { errorNotify } from '@component/interface/toast/toast';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';

function SelectCollege({
  modal,
  toggleSelectCollege,
  toggleSelectSchoolYearSemestre,
  setActive,
}: {
  modal: boolean;
  toggleSelectCollege: () => void;
  toggleSelectSchoolYearSemestre(): void;
  setActive: React.Dispatch<
    React.SetStateAction<{
      schoolYear: string;
      schoolSemestre: string;
      collegeDepartment: string;
      objectData: string;
      objectData2nd: string;
    }>
  >;
}) {
  const [listCollege, setListCollege] = useState<ReturnCollegeProgram[]>([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });

  useEffect(() => {
    getCollegeList();
  }, [pagination.skip]);

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleSelectCollege();
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
                      toggleSelectCollege();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="my-2 flex h-[40vh] flex-col items-center justify-start gap-2 overflow-auto">
                  {listCollege.length <= 0 ? (
                    <tr className="h-full">
                      <td
                        colSpan={8}
                        className="py-5 text-center text-secondaryWhite"
                      >
                        No Data Found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {listCollege.map((college) => (
                        <button
                          key={college.id}
                          className="flex w-full flex-col justify-center gap-1 rounded bg-primaryYellow p-3 font-semibold text-secondaryWhite"
                          onClick={() => {
                            setActive((prev) => ({
                              ...prev,
                              collegeDepartment:
                                college.college_department_name,
                              objectData2nd: JSON.stringify(college),
                            }));

                            toggleSelectCollege();
                            toggleSelectSchoolYearSemestre();
                          }}
                        >
                          <span>{college.college_department_name}</span>
                          <span className="text-sm font-light">
                            {college.complete_program_name}
                          </span>
                          <span className="text-xs font-light italic">
                            {college.college_coordinator}
                          </span>
                        </button>
                      ))}
                    </>
                  )}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

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
}

export default SelectCollege;
