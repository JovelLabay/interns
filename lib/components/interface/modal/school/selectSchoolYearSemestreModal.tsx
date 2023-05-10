import { Dialog, Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function SelectSchoolYearSemestreModal({
  modal,
  toggleSelectSchoolYearSemestre,
  toggleSelectCollege,
  schoolYearSemestreList,
  active,
  setActive,
}: {
  modal: boolean;
  toggleSelectSchoolYearSemestre: () => void;
  toggleSelectCollege: () => void;
  schoolYearSemestreList: SelectSchoolYearSemestre[];
  active: {
    schoolYear: string;
    schoolSemestre: string;
    collegeDepartment: string;
    objectDataSchoolYear: string;
    objectDataSchoolSemestre: string;
    ObjectDataCollegeDepartment: string;
  };
  setActive: React.Dispatch<
    React.SetStateAction<{
      schoolYear: string;
      schoolSemestre: string;
      collegeDepartment: string;
      objectDataSchoolYear: string;
      objectDataSchoolSemestre: string;
      ObjectDataCollegeDepartment: string;
    }>
  >;
}) {
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleSelectSchoolYearSemestre();
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
              <Dialog.Panel className="w-[40vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => {
                      toggleSelectSchoolYearSemestre();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-start gap-2 text-xs font-light italic">
                  <p>{active.schoolYear}</p>
                  <p>{active.schoolYear !== '' && '/'}</p>
                  <p>{active.schoolSemestre}</p>
                  <p>{active.schoolSemestre !== '' && '/'}</p>
                  <p>{active.collegeDepartment}</p>
                </div>
                <div className="mt-2 h-[50vh] overflow-auto">
                  {schoolYearSemestreList.length === 0 ? (
                    <h3 className="my-10 font-medium text-secondaryWhite">
                      There must be an existing School Year/Semester
                    </h3>
                  ) : (
                    <>
                      {schoolYearSemestreList.map((schoolYearData) => {
                        return (
                          <Disclosure key={schoolYearData.id}>
                            {({ open }) => (
                              <div className="my-2">
                                <Disclosure.Button
                                  disabled={
                                    schoolYearData.School_Semester.length === 0
                                  }
                                  className={classNames(
                                    'flex w-full justify-between bg-yellowBg px-4 py-4 text-left',
                                    open ? 'rounded-t-md' : 'rounded-md',
                                    schoolYearData.School_Semester.length === 0
                                      ? 'cursor-not-allowed opacity-50'
                                      : ''
                                  )}
                                >
                                  <span className="font-semibold text-secondaryWhite">
                                    School Year :{' '}
                                    {schoolYearData.school_year_name}{' '}
                                    {!schoolYearData.is_active
                                      ? '(Inactive)'
                                      : schoolYearData.School_Semester
                                          .length === 0
                                      ? '(No Semester)'
                                      : ''}
                                  </span>
                                  <FiChevronDown
                                    className={`${
                                      open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-primaryYellow duration-300`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
                                  {schoolYearData.School_Semester.map(
                                    (schoolSemestre) => (
                                      <button
                                        key={schoolSemestre.id}
                                        className={classNames(
                                          'w-full text-left',
                                          {
                                            'cursor-not-allowed opacity-50':
                                              !schoolSemestre.is_active,
                                          }
                                        )}
                                        disabled={!schoolSemestre.is_active}
                                        onClick={() => {
                                          setActive((prev) => ({
                                            ...prev,
                                            schoolYear:
                                              schoolYearData.school_year_name,
                                            schoolSemestre:
                                              schoolSemestre.school_semester_name,
                                            objectDataSchoolYear:
                                              JSON.stringify(schoolYearData),
                                            objectDataSchoolSemestre:
                                              JSON.stringify(schoolSemestre),
                                          }));

                                          toggleSelectCollege();
                                        }}
                                      >
                                        Semester:{' '}
                                        {schoolSemestre.school_semester_name}{' '}
                                        {schoolSemestre.is_active
                                          ? ''
                                          : '(Inactive)'}
                                      </button>
                                    )
                                  )}
                                </Disclosure.Panel>
                              </div>
                            )}
                          </Disclosure>
                        );
                      })}
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SelectSchoolYearSemestreModal;
