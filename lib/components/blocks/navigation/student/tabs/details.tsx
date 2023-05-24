import React, { Fragment, useContext, useEffect, useState } from 'react';
import { DynamicContext } from '@redux/context';
import classNames from 'classnames';
import { splitUnderScore } from '@utils/commonFunction';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Popover, Transition } from '@headlessui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RecommendationLetterForm } from '@validator/forms';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import internsLogo from '@/assets/logo/interns_logo.png';
import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import Image from 'next/image';

function Details() {
  const context = useContext(DynamicContext);

  const [state, setState] = useState({
    isUpdating: false,
  });
  const [status, setStatus] = useState({
    studentStatus: '',
    eligibiligyStatus: false,
    collegeName: '',
    collegeLogo: '',
    collegeProgram: '',
    collegeCoordinator: '',
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RecommendationLetter>({
    mode: 'onSubmit',
    resolver: yupResolver(RecommendationLetterForm),
  });

  useEffect(() => {
    const parsedStudentData = JSON.parse(context?.studentData || '{}');
    const college = parsedStudentData.College_Department;

    setStatus({
      studentStatus: parsedStudentData?.student_status,
      eligibiligyStatus: parsedStudentData?.isEligible,
      collegeName: college.college_department_name,
      collegeLogo: college.college_department_image || internsLogo,
      collegeProgram: college.complete_program_name,
      collegeCoordinator: college.college_coordinator,
    });
  }, []);

  return (
    <div>
      <h2
        className={classNames(
          'rounded-md py-2 text-center text-white',
          status.studentStatus === 'INCOMPLETE'
            ? 'bg-red-500'
            : status.studentStatus === 'COMPLETE'
            ? 'bg-pink-500'
            : status.studentStatus === 'APPLYING'
            ? 'bg-yellow-500'
            : status.studentStatus === 'APPLIED'
            ? 'bg-blue-500'
            : status.studentStatus === 'FINISHED'
            ? 'bg-green-500'
            : 'bg-gray-500'
        )}
      >
        <span className="font-medium">Your Status: </span>
        <span className="font-thin">
          {splitUnderScore(status.studentStatus)}
        </span>
      </h2>
      <div
        className={classNames(
          'md:mx-15 relative my-5 flex min-h-[200px] flex-col items-center justify-center gap-5 rounded-md p-3 sm:mx-10 lg:mx-20 xl:mx-32',
          status.eligibiligyStatus ? 'bg-green-200' : 'bg-red-200'
        )}
      >
        {status.eligibiligyStatus ? (
          <AiFillCheckCircle size={50} className="text-green-500" />
        ) : (
          <AiFillCloseCircle size={50} className="text-red-500" />
        )}
        <h1
          className={classNames(
            'font-bold',
            status.eligibiligyStatus ? 'text-green-500' : 'text-red-500'
          )}
        >
          {status.eligibiligyStatus ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
        </h1>
        <p className="text-center text-xs italic">
          {status.eligibiligyStatus
            ? 'You can now proceed with the self service enrollment and look for possible companies.'
            : 'You are not eligible to proceed with the self service enrollment. Please contact your school for more information.'}
        </p>

        {status.eligibiligyStatus && (
          <p className="rounded bg-green-500 p-2 text-center text-xs text-white">
            Request of Recommendaton Letter is now open for your account.
          </p>
        )}

        {/* POPOVER */}
        <Popover className="absolute top-3 left-1">
          {() => (
            <>
              <Popover.Button
                className={classNames(
                  'outline-none',
                  status.eligibiligyStatus
                    ? ''
                    : 'cursor-not-allowed opacity-30'
                )}
                disabled={status.eligibiligyStatus ? false : true}
              >
                <BsThreeDotsVertical size={20} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 z-20 w-[300px] rounded-md bg-white p-3 shadow-md md:w-[400px]">
                  <p className="mb-2 text-sm font-light italic text-red-500">
                    *Request for Recommendation Letter
                  </p>
                  <form
                    className="flex flex-col gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();

                      handleSubmit((data) => {
                        sendEmail(data);
                      })();
                    }}
                  >
                    <div className="flex flex-col items-start gap-2">
                      <label
                        htmlFor="email"
                        className="font-medium text-secondaryWhite"
                      >
                        Company Name
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="Company Name"
                        {...register('companyName')}
                      />
                      {errors.companyName?.message && (
                        <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                          {errors.companyName?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label
                        htmlFor="email"
                        className="font-medium text-secondaryWhite"
                      >
                        Supervisor Name
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                        )}
                        type="text"
                        placeholder="Supervisor Name"
                        {...register('directSupervisor')}
                      />
                      {errors.directSupervisor?.message && (
                        <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                          {errors.directSupervisor?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label
                        htmlFor="email"
                        className="font-medium text-secondaryWhite"
                      >
                        Company Address
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <textarea
                        className={classNames(
                          'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                          {
                            'border-red-500 bg-red-100 placeholder:text-white':
                              errors.companyAddress?.message,
                          }
                        )}
                        {...register('companyAddress')}
                        placeholder="Company Address"
                      />
                      {errors.companyAddress?.message && (
                        <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                          {errors.companyAddress?.message}
                        </p>
                      )}
                    </div>

                    <input
                      className={classNames(
                        'w-full rounded-md bg-primaryYellow py-2 px-1'
                      )}
                      type="submit"
                      value={state.isUpdating ? 'Requesting...' : 'Request'}
                    />
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>

      <div className="min-h-[200px] rounded-md bg-primaryYellowHover p-3 text-secondaryWhite">
        <div className="mb-3 flex flex-col items-center justify-center">
          <Image
            src={status.collegeLogo}
            width={60}
            height={60}
            alt="Logo"
            className="rounded-full"
          />
          <h3 className="text-ellipsis font-bold">{status.collegeName}</h3>
        </div>

        <div className="flex flex-col items-start justify-center gap-3 text-sm">
          <p className="font-bold">
            College Program:
            <br />
            <span className="font-light">{status.collegeProgram}</span>
          </p>
          <p className="font-bold">
            Department Coordinator:
            <br />
            <span className="font-light">{status.collegeCoordinator}</span>
          </p>
        </div>
      </div>
    </div>
  );

  function sendEmail(data: RecommendationLetter) {
    setState((prev) => ({ ...prev, isUpdating: true }));
    const currentTime = new Date().getTime();
    const emailForPracticum = JSON.parse(context?.studentData || '{}');

    const emailPayload = JSON.stringify({
      subject: 'Recommendation Letter',
      message: '',
      email: emailForPracticum.College_Department.practicum_coordinator_email,
      time: currentTime,
      lastName: emailForPracticum.College_Department.college_coordinator,
      type: 'RECOMMENDATION_EMAIL',

      companyName: data.companyName,
      directSupervisor: data.directSupervisor,
      companyAddress: data.companyAddress,
      studentName: context?.userData.name,
      studentEmail: context?.userData.email,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/notification/email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: emailPayload,
    };

    axios
      .request(config)
      .then(() => {
        const studentData = JSON.parse(context?.studentData || '{}');

        axios
          .post(
            `/api/data/recommendation?studentId=${studentData.student_user_id}`,
            JSON.stringify(data),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(() => {
            setState((prev) => ({ ...prev, isUpdating: false }));
            reset();

            successfulNotify('Email has been sent');
          })
          .catch(() => {
            setState((prev) => ({ ...prev, isUpdating: false }));

            errorNotify('Something went wrong!');
          });
      })
      .catch(() => {
        setState((prev) => ({ ...prev, isUpdating: false }));

        errorNotify('Something went wrong!');
      });
  }
}

export default Details;
