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

const studentStatus = Object.entries(Student_Status);

function Account() {
  const context = React.useContext(DynamicContext);

  const [state, setState] = useState({
    isUpdating: false,
    uploadingImage: false,
  });
  const { handleSubmit, register, setValue, watch, reset } =
    useForm<FormEditStudent>({
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
      setValue('birthDate', studentData.date_of_birth || '');
      setValue('sex', studentData.sex || '');
      setValue('studentStatus', studentData.student_status || '');
      setValue('phoneNumber', studentData.phone_number || '');
    }
  }, []);

  return (
    <form
      className="lg:mx-30 flex flex-col gap-3 md:mx-20"
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit((data) => console.log(data))();
      }}
    >
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-bold text-secondaryWhite">
          Profile Image
        </label>
        <div className="flex w-full justify-center">
          <Image
            width={80}
            height={80}
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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
                  'flex w-full items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                )}
              >
                {watch().studentStatus === 'NOT_SET'
                  ? 'NOT SET'
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
                      person[1] !== 'NOT_SET' &&
                      person[1] !== 'FINISHED'
                  )
                  .map((person, index) => (
                    <Listbox.Option
                      className={classNames(
                        'py-1',
                        watch().studentStatus !== 'COMPLETE' && 'opacity-50'
                      )}
                      key={index}
                      value={person[1]}
                      disabled={watch().studentStatus !== 'COMPLETE'}
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-bold text-secondaryWhite">
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

      <div className="flex flex-col items-start gap-2">
        <label htmlFor="email" className="font-bold text-secondaryWhite">
          Sex
        </label>
        <input
          className={classNames(
            'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
          )}
          type="text"
          placeholder="Sex"
          {...register('sex')}
        />
      </div>

      <input
        className={classNames('w-full rounded-md bg-primaryYellow py-2 px-1')}
        type="submit"
        value={state.isUpdating ? 'Updating Student...' : 'Update Student'}
      />
    </form>
  );
}

export default Account;
