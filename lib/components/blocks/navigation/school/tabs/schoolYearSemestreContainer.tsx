import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component//interface/toast/toast';
import SchoolSemestreModal from '@component/interface/modal/school/schoolSemestreModal';
import SchoolYearModal from '@component/interface/modal/school/schoolYearModal';
import { Menu, Switch } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateSchoolSemestre, CreateSchoolYear } from '@validator/forms';
import { data } from 'Data';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState, useMemo } from 'react';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from 'react-hook-form';
import {
  AiOutlineClear,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

function SchoolYearSemestreContainer() {
  const [modal, setModal] = useState({
    addSchoolyearModal: false,
    addSchoolSemestre: false,
  });
  const [selectionState, setSelectionState] = useState({
    year: -1,
    schoolYear: -1,
    schoolSemestre: -1,
    schoolYearInformation: false,
    schoolSemestreInformation: false,
  });
  const [listSchoolYear, setListSchoolYear] = useState<ReturnFormSchoolYear[]>(
    []
  );
  const [listSchoolSemestre, setListSchoolSemestre] = useState<
    ReturnFormSchoolSemestre[]
  >([]);
  const [viewSchoolSemestreInfo, setViewSchoolSemestreInfo] = useState('');
  const [searchState, setSearchState] = useState({
    isOpen: false,
    searchInput: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
    resetField,
  } = useForm<ReturnFormSchoolYear>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateSchoolYear),
  });

  useEffect(() => {
    getSchoolYear();
  }, []);

  const tableData = useMemo(() => {
    return listSchoolYear.filter((item) => {
      const regex = new RegExp(
        searchState.searchInput.toLocaleLowerCase(),
        'gi'
      );
      return item.school_year_name.toLocaleLowerCase().match(regex);
    });
  }, [searchState.searchInput, listSchoolYear]);

  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <p className="font-bold text-secondaryWhite">
          Manage School Year | Semestre
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            className="rounded bg-primaryYellow p-2"
            title="Refresh"
            onClick={() => {
              setSelectionState({
                year: -1,
                schoolYear: -1,
                schoolSemestre: -1,
                schoolYearInformation: false,
                schoolSemestreInformation: false,
              });

              getSchoolYear();
              setListSchoolSemestre([]);
              reset();
              successfulNotify('Refreshed Successfully');
            }}
          >
            <BiRefresh size={20} />
          </button>
          <button
            className="rounded bg-primaryYellow p-2"
            title="Add School Year"
            onClick={toggleSchoolYearModal}
          >
            <AiOutlinePlusCircle size={20} />
          </button>
          <div className="flex items-center justify-center gap-1">
            <input
              className={classNames(
                'w-[250px] rounded-md border-2 border-primaryYellow bg-mainBgWhite p-2 text-sm focus:outline-none'
              )}
              type="text"
              placeholder="Search School Year..."
              value={searchState.searchInput}
              onChange={(e) =>
                setSearchState((prev) => ({
                  ...prev,
                  searchInput: e.target.value,
                }))
              }
            />
            <button
              className="rounded bg-red-500 p-2 text-white"
              title="Clear"
              onClick={() =>
                setSearchState((prev) => ({
                  ...prev,
                  searchInput: '',
                }))
              }
            >
              <AiOutlineClear size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-4 text-secondaryWhite">
        {/* SCHOOL YEAR */}
        <div
          className={classNames(
            'flex h-[70vh] flex-col gap-1 overflow-auto p-2'
          )}
        >
          {tableData.map((item) => {
            return (
              <section
                key={item.id}
                className={classNames(
                  'relative flex cursor-pointer items-center justify-between rounded-md py-1 px-2 duration-300 hover:bg-mainBgWhite',
                  {
                    'bg-mainBgWhite': selectionState.schoolYear === item.id,
                  }
                )}
              >
                <p
                  className="flex w-[90%] flex-col"
                  onClick={() => getSchoolYear(item.id)}
                >
                  <span
                    className={classNames(
                      'h-2 w-2 rounded-full',
                      item.is_active ? 'bg-green-500' : 'bg-red-500'
                    )}
                  />
                  <span>{item.school_year_name}</span>
                  <span className="mt-2 text-xs font-light italic">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </p>
                <Menu>
                  {selectionState.schoolYear === item.id &&
                    selectionState.schoolYearInformation === true && (
                      <Menu.Button>
                        <BsThreeDotsVertical size={18} />
                      </Menu.Button>
                    )}

                  <Menu.Items
                    className={classNames(
                      'absolute top-10 right-0 z-10 flex flex-col items-end justify-center gap-1 rounded-md bg-white p-3 shadow-lg'
                    )}
                  >
                    {data.admin.schoolYearSemestre.schoolYear.map((option) => (
                      <Menu.Item
                        as="button"
                        key={option.id}
                        className={classNames(
                          'ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black',
                          option.id === 1 &&
                            listSchoolSemestre.length >= 3 &&
                            'cursor-not-allowed opacity-50',
                          option.id === 1 &&
                            !item.is_active &&
                            'cursor-not-allowed opacity-50',
                          option.id === 2 &&
                            listSchoolSemestre.length > 0 &&
                            'cursor-not-allowed opacity-50',
                          option.id === 2 &&
                            item.is_active &&
                            'cursor-not-allowed opacity-50'
                        )}
                        onClick={() => {
                          option.id === 1
                            ? toggleSchoolSemestreModal(item.id)
                            : deleteSchoolYear(item.id);
                        }}
                        disabled={
                          !item.is_active && option.id === 1
                            ? true
                            : option.id === 1 && listSchoolSemestre.length >= 3
                            ? true
                            : option.id === 2 && listSchoolSemestre.length > 0
                            ? true
                            : option.id === 2 && item.is_active
                        }
                      >
                        {option.name}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </section>
            );
          })}
        </div>

        {/* SCHOOL SEMESTRE */}
        <div
          className={classNames(
            'flex h-[70vh] flex-col gap-1 overflow-auto p-2'
          )}
        >
          {listSchoolSemestre.map((item) => {
            return (
              <section
                key={item.id}
                className={classNames(
                  'relative flex cursor-pointer items-center justify-between rounded-md py-1 px-2 duration-300 hover:bg-mainBgWhite',
                  {
                    'bg-mainBgWhite': selectionState.schoolSemestre === item.id,
                  }
                )}
              >
                <p
                  className="flex w-[90%] flex-col"
                  onClick={() => {
                    informationForSchoolSemestre(item.id);
                    setViewSchoolSemestreInfo(
                      JSON.stringify({
                        ...item,
                        lenghtOfSemestre: listSchoolSemestre.length,
                      })
                    );
                  }}
                >
                  <span
                    className={classNames(
                      'h-2 w-2 rounded-full',
                      item.is_active ? 'bg-green-500' : 'bg-red-500'
                    )}
                  />
                  <span>{item.school_semester_name}</span>
                  <span className="mt-2 text-xs font-light italic">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </p>

                <button
                  className={classNames(
                    '',
                    item.is_active && 'cursor-not-allowed opacity-50'
                  )}
                  title="Delete Semestre"
                  disabled={item.is_active ? true : false}
                  onClick={() =>
                    deleteSchoolSemestre(item.school_year_id, item.id)
                  }
                >
                  <AiOutlineDelete size={20} />
                </button>
              </section>
            );
          })}
        </div>

        <div className="relative col-span-2 h-[70vh] overflow-auto p-2">
          {selectionState.schoolYear >= 1 &&
          selectionState.schoolYearInformation === true ? (
            <SchoolYear
              watch={watch}
              setSelectionState={setSelectionState}
              handleSubmit={handleSubmit}
              errors={errors}
              register={register}
              setValue={setValue}
              reset={reset}
              listSchoolSemestre={listSchoolSemestre}
              getSchoolYear={getSchoolYear}
            />
          ) : selectionState.schoolSemestre >= 1 &&
            selectionState.schoolSemestreInformation === true ? (
            <SchoolSemestre
              setSelectionState={setSelectionState}
              viewSchoolSemestreInfo={viewSchoolSemestreInfo}
              getSchoolYear={getSchoolYear}
            />
          ) : null}
        </div>
      </div>

      {/* MODAL */}
      <SchoolYearModal
        modal={modal.addSchoolyearModal}
        toggleSchoolYearModal={toggleSchoolYearModal}
        getSchoolYear={getSchoolYear}
      />

      <SchoolSemestreModal
        modal={modal.addSchoolSemestre}
        toggleSchoolYearModal={toggleSchoolSemestreModal}
        year={selectionState.year}
        getSchoolYear={getSchoolYear}
      />
    </div>
  );

  // HANDLERS
  function toggleSchoolYearModal() {
    setModal((prev) => ({
      ...prev,
      addSchoolyearModal: !prev.addSchoolyearModal,
    }));
  }

  function toggleSchoolSemestreModal(id?: number) {
    setModal((prev) => ({
      ...prev,
      addSchoolSemestre: !prev.addSchoolSemestre,
    }));

    if (id) {
      setSelectionState((prev) => ({
        ...prev,
        year: id,
      }));
    }
  }

  function informationForSchoolSemestre(schoolSemestreId?: number) {
    if (schoolSemestreId) {
      setSelectionState((prev) => ({
        ...prev,
        schoolYearInformation: false,
        schoolSemestreInformation: true,
        schoolSemestre: schoolSemestreId,
      }));
    }
  }

  function getSchoolYear(schoolYearId?: number) {
    axios
      .get(`/api/data/schoolYear${schoolYearId ? `?id=${schoolYearId}` : ''}`)
      .then((res) => {
        if (schoolYearId) {
          setSelectionState((prev) => ({
            ...prev,
            schoolYearInformation: true,
            schoolYear: schoolYearId,
            schoolSemestreInformation: false,
            schoolSemestre: -1,
          }));
          setListSchoolSemestre(res.data.responsePayload[0].School_Semester);

          const {
            end_date,
            start_date,
            school_year_name,
            school_year_description,
            is_active,
            id,
          } = res.data.responsePayload[0] as any;

          setValue('end_date', end_date);
          setValue('start_date', start_date);
          setValue('school_year_name', school_year_name);
          setValue('school_year_description', school_year_description);
          setValue('is_active', is_active);
          setValue('id', id);
        } else {
          setListSchoolYear(res.data.responsePayload);
        }
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }

  function deleteSchoolYear(schoolYearId?: number) {
    axios
      .delete(`/api/data/schoolYear?id=${schoolYearId}`)
      .then(() => {
        successfulNotify('Successfully deleted school year');
        getSchoolYear();

        setSelectionState({
          year: -1,
          schoolYear: -1,
          schoolSemestre: -1,
          schoolYearInformation: false,
          schoolSemestreInformation: false,
        });

        setListSchoolSemestre([]);
        reset();
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }

  function deleteSchoolSemestre(
    schoolYearId: number,
    schoolSemestreId?: number
  ) {
    axios
      .delete(`/api/data/schoolSemestre?id=${schoolSemestreId}`)
      .then(() => {
        successfulNotify('Successfully deleted school Semestre');
        setSelectionState({
          year: -1,
          schoolYear: -1,
          schoolSemestre: -1,
          schoolYearInformation: false,
          schoolSemestreInformation: false,
        });

        getSchoolYear(schoolYearId);

        reset();
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }
}

function SchoolYear({
  watch,
  setSelectionState,
  handleSubmit,
  errors,
  register,
  setValue,
  reset,
  listSchoolSemestre,
  getSchoolYear,
}: {
  watch: UseFormWatch<ReturnFormSchoolYear>;
  setSelectionState: React.Dispatch<
    React.SetStateAction<{
      year: number;
      schoolYear: number;
      schoolSemestre: number;
      schoolYearInformation: boolean;
      schoolSemestreInformation: boolean;
    }>
  >;
  handleSubmit: UseFormHandleSubmit<ReturnFormSchoolYear>;
  errors: FieldErrors<ReturnFormSchoolYear>;
  register: UseFormRegister<ReturnFormSchoolYear>;
  setValue: UseFormSetValue<ReturnFormSchoolYear>;
  reset: UseFormReset<ReturnFormSchoolYear>;
  listSchoolSemestre: ReturnFormSchoolSemestre[];
  getSchoolYear(schoolYearId?: number): void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div className="rounded-md bg-contastWhite p-3">
      <div className=" flex items-center justify-between">
        <h2 className="my-3 w-[80%] overflow-hidden text-clip text-left font-semibold">
          {watch().school_year_name || 'Enter School Name'}
        </h2>
        <button
          className="rounded bg-primaryYellow p-2"
          title="Close"
          onClick={() => {
            setSelectionState((prev) => ({
              ...prev,
              schoolYear: -1,
              schoolYearInformation: false,
            }));

            reset();
          }}
        >
          <AiOutlineCloseCircle size={23} />
        </button>
      </div>

      <p className="text-sm font-light italic">
        Semestre availability :{' '}
        <span className="font-bold">{`${listSchoolSemestre.length} of 3`}</span>
      </p>

      <form
        className="my-5 flex flex-col gap-3 overflow-auto"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit(() => updateSchoolYear(watch().id))();
        }}
      >
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="text-secondaryWhite">
              School Year Start Date
            </label>
            <input
              className={classNames(
                'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none',
                {
                  'border-red-500 bg-red-100 placeholder:text-white':
                    errors.end_date?.message,
                }
              )}
              type="date"
              disabled
              placeholder="School Year End Date"
              {...register('end_date')}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-secondaryWhite">
              School Year End Date
            </label>
            <input
              className={classNames(
                'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none',
                {
                  'border-red-500 bg-red-100 placeholder:text-white':
                    errors.end_date?.message,
                }
              )}
              type="date"
              disabled
              placeholder="School Year End Date"
              {...register('end_date')}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Year Code
          </label>
          <input
            className={classNames(
              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.school_year_name?.message,
              }
            )}
            type="text"
            disabled
            placeholder="School Year Code"
            {...register('school_year_name')}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Year Description
          </label>
          <textarea
            className={classNames(
              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
            )}
            placeholder="School Year Description"
            {...register('school_year_description')}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Year Passcode <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.school_year_code?.message,
              }
            )}
            type="password"
            placeholder="School Year Passcode"
            {...register('school_year_code')}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Year Status{' '}
            <span
              className={classNames(
                'ml-2 rounded-full py-1 px-3 text-white',
                watch().is_active ? 'bg-green-500' : 'bg-red-500'
              )}
            >
              {watch().is_active ? 'Open' : 'Close'}
            </span>
          </label>
          <Switch
            checked={watch().is_active}
            onChange={() => {
              setValue('is_active', !watch().is_active);
            }}
            className={`${
              watch().is_active ? 'bg-primaryYellow' : 'bg-primaryYellowHover'
            }
          rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                watch().is_active ? 'translate-x-9' : 'translate-x-0'
              }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>

        <input
          className="cursor-pointer rounded bg-primaryYellow py-2"
          value={isUpdating ? 'Updating...' : 'Update School Year Status'}
          type="submit"
        />
      </form>
    </div>
  );

  function updateSchoolYear(schoolYearId?: number) {
    setIsUpdating(true);
    const payload = JSON.stringify({
      is_active: watch().is_active,
      school_year_code: watch().school_year_code,
      school_year_description: watch().school_year_description,
    });

    axios
      .put(`/api/data/schoolYear?id=${schoolYearId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        // CHECK PASSWORD
        if (res.data.message === 'INCORRECT_PASSCODE') {
          warningNotify('Incorrect Passcode');
          setIsUpdating(false);

          // CHECK IF SCHOOL YEAR IS ACTIVE
        } else if (
          res.data.message ===
          'CANNOT_ACTIVATE_SCHOOL_YEAR_ANOTHER_SCHOOL_YEAR_IS_ACTIVE'
        ) {
          warningNotify(
            'Cannot Activate School Year. Another School Year is Active'
          );
          setValue('school_year_code', '');
          setIsUpdating(false);

          // CHECK IF HAS ACTIVE SEMESTRE
        } else if (
          res.data.message ===
          'CANNOT_INACTIVATE_SCHOOL_YEAR_SCHOOL_SEMESTER_IS_NOT_EMPTY'
        ) {
          warningNotify(
            'Cannot Inactivate School Year. School Semestre is not Empty'
          );
          setValue('school_year_code', '');
          setIsUpdating(false);

          // SUCCESS
        } else {
          successfulNotify('Successfully updated school year');
          setValue('school_year_code', '');
          setIsUpdating(false);
        }

        getSchoolYear();
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }
}

function SchoolSemestre({
  setSelectionState,
  viewSchoolSemestreInfo,
  getSchoolYear,
}: {
  setSelectionState: React.Dispatch<
    React.SetStateAction<{
      year: number;
      schoolYear: number;
      schoolSemestre: number;
      schoolYearInformation: boolean;
      schoolSemestreInformation: boolean;
    }>
  >;
  viewSchoolSemestreInfo: string;
  getSchoolYear(schoolYearId?: number): void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
    resetField,
  } = useForm<FormSchoolSemestre>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateSchoolSemestre),
  });

  useEffect(() => {
    const {
      id,
      school_semester_name,
      school_semester_description,
      is_active,
      school_year_id,
    } = JSON.parse(viewSchoolSemestreInfo) as ReturnFormSchoolSemestre;

    setValue('school_semester_name', school_semester_name);
    setValue('school_semester_description', school_semester_description);
    setValue('school_year_id', school_year_id);
    setValue('is_active', is_active);
  }, [viewSchoolSemestreInfo]);

  return (
    <div className="h-full rounded-md bg-contastWhite p-3">
      <div className=" flex items-center justify-between">
        <h2 className="my-3 w-[80%] overflow-hidden text-clip text-left font-semibold">
          {watch().school_semester_name || 'Enter Semestre Name'}
        </h2>
        <button
          className="rounded bg-primaryYellow p-2"
          title="Close"
          onClick={() => {
            setSelectionState((prev) => ({
              ...prev,
              schoolSemestre: -1,
              schoolSemestreInformation: false,
            }));

            reset();
          }}
        >
          <AiOutlineCloseCircle size={23} />
        </button>
      </div>

      <form
        className="my-5 flex flex-col gap-3 overflow-auto"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit((data) => updateSchoolSemestre(data))();
        }}
      >
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Semestre Name
          </label>
          <input
            className={classNames(
              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.school_semester_name?.message,
              }
            )}
            type="text"
            disabled
            placeholder="School Semestre Name"
            {...register('school_semester_name')}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Semestre Description
          </label>
          <textarea
            className={classNames(
              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
            )}
            placeholder="School Semestre Description"
            {...register('school_semester_description')}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Semestre Code <span className="text-xs text-red-500">*</span>
          </label>
          <input
            className={classNames(
              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1  focus:outline-none',
              {
                'border-red-500 bg-red-100 placeholder:text-white':
                  errors.school_semester_code?.message,
              }
            )}
            type="password"
            placeholder="School Semestre Code"
            {...register('school_semester_code')}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-secondaryWhite">
            School Semestre Status{' '}
            <span
              className={classNames(
                'ml-2 rounded-full py-1 px-3 text-white',
                watch().is_active ? 'bg-green-500' : 'bg-red-500'
              )}
            >
              {watch().is_active ? 'Open' : 'Close'}
            </span>
          </label>
          <Switch
            checked={watch().is_active ?? false}
            onChange={() => {
              setValue('is_active', !watch().is_active);
            }}
            className={`${
              watch().is_active ? 'bg-primaryYellow' : 'bg-primaryYellowHover'
            }
          rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                watch().is_active ? 'translate-x-9' : 'translate-x-0'
              }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>

        <input
          className="cursor-pointer rounded bg-primaryYellow py-2"
          value={isUpdating ? 'Updating...' : 'Upate School Semestre Status'}
          type="submit"
        />
      </form>
    </div>
  );

  function updateSchoolSemestre(data: FormSchoolSemestre) {
    setIsUpdating(true);
    const id = JSON.parse(viewSchoolSemestreInfo)
      .id as ReturnFormSchoolSemestre;

    axios
      .put(
        `/api/data/schoolSemestre?id=${id}&schoolYearId=${data.school_year_id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res.data.message === 'Password is incorrect') {
          warningNotify('School Semestre Code is Incorrect');
          setIsUpdating(false);
        } else if (
          res.data.message ===
          'You Cannot Activate this School Semestre. An Active School Semestre is still Present'
        ) {
          warningNotify(
            'Not Allowed to Activate School Semestre. An Active School Semestre is still Present'
          );
          setIsUpdating(false);
        } else {
          successfulNotify('Successfully updated school semestre');
          setValue('school_semester_code', '');

          getSchoolYear(watch().school_year_id);
          setIsUpdating(false);
        }
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }
}

export default SchoolYearSemestreContainer;
