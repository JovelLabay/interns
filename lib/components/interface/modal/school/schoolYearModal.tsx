import {
  successfulNotify,
  errorNotify,
  warningNotify,
} from '@component//interface/toast/toast';
import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { splitUnderScore } from '@utils/commonFunction';
import { CreateSchoolYear } from '@validator/forms';
import axios from 'axios';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function SchoolYearModal({
  modal,
  toggleSchoolYearModal,
  getSchoolYear,
}: {
  modal: boolean;
  toggleSchoolYearModal: () => void;
  getSchoolYear(schoolYearId?: number): void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
  } = useForm<FormSchoolYear>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateSchoolYear),
  });

  const [state, setState] = useState({
    isSubmitted: false,
  });
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleSchoolYearModal();
          reset();
          clearErrors();
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
                      toggleSchoolYearModal();
                      reset();
                      clearErrors();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="max-h-[50vh] overflow-auto">
                  <form
                    className="flex flex-col items-center justify-center gap-5 pt-5"
                    onSubmit={(e) => {
                      e.preventDefault();

                      handleSubmit((data) => createSchoolYear(data))();
                    }}
                  >
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Start Date{' '}
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                          {
                            'border-red-500 bg-red-100 placeholder:text-white':
                              errors.start_date?.message,
                          }
                        )}
                        type="date"
                        placeholder="Start Date"
                        {...register('start_date')}
                      />
                      {errors.start_date?.message && (
                        <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                          {errors.start_date?.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        End Date <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                          {
                            'border-red-500 bg-red-100 placeholder:text-white':
                              errors.end_date?.message,
                          }
                        )}
                        type="date"
                        placeholder="End Date"
                        {...register('end_date')}
                      />
                      {errors.end_date?.message && (
                        <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                          {errors.end_date?.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        School Year Code{' '}
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                          {
                            'border-red-500 bg-red-100 placeholder:text-white':
                              errors.school_year_name?.message,
                          }
                        )}
                        type="text"
                        placeholder="School Year Code"
                        {...register('school_year_name')}
                      />
                      {errors.school_year_name?.message && (
                        <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                          {errors.school_year_name?.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        School Year Description
                      </label>
                      <textarea
                        className={classNames(
                          'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        placeholder="School Year Description"
                        {...register('school_year_description')}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        School Year Passcode{' '}
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                          {
                            'border-red-500 bg-red-100 placeholder:text-white':
                              errors.school_year_code?.message,
                          }
                        )}
                        type="password"
                        placeholder="School Year Passcode"
                        {...register('school_year_code')}
                      />
                      {errors.school_year_code?.message && (
                        <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                          {errors.school_year_code?.message}
                        </p>
                      )}
                    </div>

                    <input
                      className="cursor-pointer rounded bg-primaryYellow py-2 px-10"
                      value={
                        state.isSubmitted ? 'Creating...' : 'Create School Year'
                      }
                      type="submit"
                    />
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function createSchoolYear(data: FormSchoolYear) {
    setState((prev) => ({ ...prev, isSubmitted: true }));
    const payload = JSON.stringify(data);

    axios
      .post('/api/data/schoolYear', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.message === 'School Year Code Already Exist') {
          warningNotify('School Year Code Already Exist');
          setState((prev) => ({ ...prev, isSubmitted: false }));
        } else {
          successfulNotify('New School Year Created!');
          setState((prev) => ({ ...prev, isSubmitted: false }));
          toggleSchoolYearModal();
          clearErrors();
          reset();
          getSchoolYear();
        }
      })
      .catch((err) => {
        errorNotify(
          splitUnderScore(
            err.response.data.error.meta.target ?? 'Something went wrong!'
          )
        );
        console.error(err);
      });
  }
}

export default SchoolYearModal;
