import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { DynamicContext } from '@redux/context';
import { imageUploader } from '@utils/uploaderFunction';
import { EditStudentForm } from '@validator/forms';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineFileImage } from 'react-icons/ai';
import Image from 'next/image';
import internsLogo from '@/assets/logo/interns_logo.png';
import classNames from 'classnames';
import { Listbox } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import { splitUnderScore } from '@utils/commonFunction';
import { Student_Status } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';

const studentStatus = Object.entries(Student_Status);

function Account() {
  const router = useRouter();
  const context = React.useContext(DynamicContext);

  const [state, setState] = useState({
    isUpdating: false,
    uploadingImage: false,
  });
  const [status, setStatus] = useState({
    eligibiligyStatus: false,
  });

  const { handleSubmit, register, setValue, watch } = useForm<FormEditStudent>({
    mode: 'onSubmit',
    resolver: yupResolver(EditStudentForm),
  });

  useEffect(() => {
    if (context?.studentData) {
      const studentData = JSON.parse(context?.studentData);

      setValue('firstName', studentData.firstName);
      setValue('lastName', studentData.lastName);
      setValue('middleName', studentData.middleName);
      setValue('emailAddress', studentData.email);

      setValue('profileImage', studentData.student_profile_image || '');
      setValue('selfIntroduction', studentData.self_introduction || '');
      setValue('address', studentData.address || '');
      setValue('birthDate', studentData.date_of_birth || '0000-00-00');
      setValue('sex', studentData.sex || '');
      setValue('studentStatus', studentData.student_status || '');
      setValue('phoneNumber', studentData.phone_number || '');

      setStatus({
        eligibiligyStatus: studentData?.isEligible,
      });
    }
  }, []);

  return (
    <form
      className="lg:mx-30 relative flex flex-col gap-5 md:mx-20"
      onSubmit={(e) => {
        e.preventDefault();

        const studentUserId = JSON.parse(context?.studentData || '{}');
        handleSubmit((data) =>
          updateStudentUserStudentProfile(data, studentUserId.student_user_id)
        )();
      }}
    >
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Profile Image
        </label>
        <div className="flex w-full justify-center">
          <Image
            width={100}
            height={100}
            alt="profileImage"
            className="rounded-full"
            src={
              watch().profileImage === '' ? internsLogo : watch().profileImage
            }
          />
        </div>
        <label className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
          <AiOutlineFileImage size={30} className="mr-5 text-secondaryWhite" />
          <span>Upload Image</span>
          <input
            className="imageUpload"
            type="file"
            accept="image/png, image/jpeg"
            title="profileImage"
            name="profileImage"
            onChange={async (e) => {
              if (!e.target.files || e.target.files.length === 0) return;

              setState((prev) => {
                return {
                  ...prev,
                  uploadingImage: true,
                };
              });
              const imageFile = e.target.files[0] as File;

              const uploadImagePayload = await imageUploader(imageFile);

              if (uploadImagePayload === 'The resource already exists') {
                errorNotify(uploadImagePayload);
                setState((prev) => {
                  return {
                    ...prev,
                    uploadingImage: false,
                  };
                });
                return;
              } else {
                setValue('profileImage', uploadImagePayload);
                context?.setUserData((prev) => ({
                  ...prev,
                  image: uploadImagePayload,
                }));
                successfulNotify('Image Uploaded!');
                setState((prev) => {
                  return {
                    ...prev,
                    uploadingImage: false,
                  };
                });
              }
            }}
          />
        </label>

        {state.uploadingImage && (
          <p className="w-full text-ellipsis rounded bg-green-100 p-2 text-center text-xs">
            Uploading Image...
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Student Status
        </label>
        <Listbox
          value={watch().studentStatus || 'No Data'}
          onChange={(data) => {
            setValue('studentStatus', data);
          }}
        >
          {({ open }: { open: boolean }) => (
            <div className="relative">
              <Listbox.Button
                className={classNames(
                  'flex w-[50vw] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none sm:w-[50vw] lg:w-[35vw] xl:w-[25vw]'
                )}
              >
                {watch().studentStatus === 'NOT_STARTED'
                  ? 'NOT STARTED'
                  : watch().studentStatus}
                <FiChevronDown
                  size={30}
                  className={classNames('text-secondaryWhite duration-300', {
                    'rotate-180': open,
                  })}
                />
              </Listbox.Button>
              <Listbox.Options
                className={classNames(
                  'absolute z-30 max-h-[100px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer'
                )}
              >
                {studentStatus
                  .filter(
                    (person) =>
                      person[1] !== 'INCOMPLETE' &&
                      person[1] !== 'COMPLETE' &&
                      person[1] !== 'NOT_STARTED' &&
                      person[1] !== 'FINISHED'
                  )
                  .map((person, index) => (
                    <Listbox.Option
                      className={classNames(
                        'py-1',
                        (watch().studentStatus !== 'APPLYING' &&
                          watch().studentStatus !== 'APPLIED') ||
                          (status.eligibiligyStatus === false && 'opacity-50')
                      )}
                      key={index}
                      value={person[1]}
                      disabled={
                        (watch().studentStatus !== 'COMPLETE' &&
                          watch().studentStatus !== 'APPLYING' &&
                          watch().studentStatus !== 'APPLIED') ||
                        status.eligibiligyStatus === false
                      }
                    >
                      {splitUnderScore(person[1])}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Sex
        </label>

        <Listbox
          value={watch().sex || 'NOT SET'}
          onChange={(data) => {
            setValue('sex', data);
          }}
        >
          {({ open }: { open: boolean }) => (
            <div className="relative">
              <Listbox.Button
                className={classNames(
                  'flex w-[50vw] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none sm:w-[50vw] lg:w-[35vw] xl:w-[25vw]'
                )}
              >
                {watch().sex === '' ? 'NOT SET' : watch().sex}
                <FiChevronDown
                  size={30}
                  className={classNames('text-secondaryWhite duration-300', {
                    'rotate-180': open,
                  })}
                />
              </Listbox.Button>
              <Listbox.Options
                className={classNames(
                  'absolute z-30 max-h-[100px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer'
                )}
              >
                {['Male', 'Female'].map((person, index) => (
                  <Listbox.Option
                    className={classNames('py-1')}
                    key={index}
                    value={person}
                  >
                    {person}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          First Name <span className="text-xs text-red-500">*</span>
        </label>
        <input
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          type="text"
          placeholder="First Name"
          {...register('firstName')}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Middle Name
        </label>
        <input
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          type="text"
          placeholder="Middle Name"
          {...register('middleName')}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Last Name <span className="text-xs text-red-500">*</span>
        </label>
        <input
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          type="text"
          placeholder="Last Name"
          {...register('lastName')}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Email Address <span className="text-xs text-red-500">*</span>
        </label>
        <input
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 opacity-50 focus:outline-none'
          )}
          type="text"
          placeholder="Email Address"
          disabled
          {...register('emailAddress')}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Self Introduction
        </label>
        <textarea
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          placeholder="Self Introduction"
          {...register('selfIntroduction')}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Address
        </label>
        <textarea
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          placeholder="Address"
          {...register('address')}
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Phone Number
        </label>
        <input
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          type="text"
          placeholder="Phone Number"
          {...register('phoneNumber')}
        />
      </div>

      <div className="mb-12 flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-medium text-secondaryWhite">
          Date of Birth
        </label>
        <input
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          type="date"
          placeholder="Date of Birth"
          {...register('birthDate')}
        />
      </div>

      <input
        className={classNames(
          'fixed bottom-4 left-1/2 w-[90%] -translate-x-1/2 transform rounded-md bg-primaryYellow py-2 shadow-2xl sm:w-[35%]'
        )}
        type="submit"
        value={state.isUpdating ? 'Updating Student...' : 'Update Student'}
      />
    </form>
  );

  function updateStudentUserStudentProfile(data: FormEditStudent, id: number) {
    setState((prev) => ({ ...prev, isUpdating: true }));

    const config = {
      method: 'put',
      url: `/api/data/student?studentUserId=${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    axios
      .request(config)
      .then(() => {
        successfulNotify('Updated Successfully');

        setState((prev) => ({ ...prev, isUpdating: false }));

        successfulNotify('System Will reload in 5 Seconds');
        setTimeout(() => {
          router.reload();
        }, 5000);
      })
      .catch((error) => {
        errorNotify('Something Went Wrong');
        console.log(error);

        setState((prev) => ({ ...prev, isUpdating: false }));
      });
  }
}

export default Account;
