import { DynamicContext } from '@/src/contexts/context';
import { emailPassAuth } from '@/src/firebase/firebaseConfig';
import classNames from 'classnames';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { data } from 'Data';
import {
  AiOutlineCloseCircle,
  AiOutlineFileImage,
  AiOutlineSave,
} from 'react-icons/ai';
import Details from './profile/details';
import Form from './profile/form';
import Documents from './profile/documents';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentUpdateObject } from '@/src/validator/studentObjectValidator';

const SccountPreferencesContainer = () => {
  const router = useRouter();
  const context = useContext(DynamicContext);

  const [activeComponent, setActiveComponent] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const auth = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/student/auth');
      }
    });

    return () => {
      auth();
    };
  }, []);

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    studentDetails: {
      firstName: string;
      lastName: string;
      middleName: string;
    };
  }>({
    mode: 'onSubmit',
    resolver: yupResolver(StudentUpdateObject),
  });

  useEffect(() => {
    setValue(
      'studentDetails.firstName',
      context?.watch().studentDetails?.firstName
    );
    setValue(
      'studentDetails.lastName',
      context?.watch().studentDetails?.lastName
    );
    setValue(
      'studentDetails.middleName',
      context?.watch().studentDetails?.middleName
    );
  }, [isUpdate]);

  return (
    <section className="pb-3">
      <div
        className={classNames(
          'mx-3 mt-3 rounded-md lg:mx-0 xl:mx-[250px] 2xl:mx-[300px]',
          context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
        )}
      >
        {/* COVER PHOTO */}
        <div className="relative">
          <Image
            src={context?.watch().studentImageCover}
            width={500}
            height={180}
            layout="responsive"
            className="rounded-t-md"
          />
          <button
            className="theButtons"
            onClick={() => router.push(data.backRoute)}
          >
            Back
          </button>
          <button className="thebuttons2">
            <AiOutlineFileImage /> Edit Cover Photo
          </button>
        </div>

        {/* PROFILE DATA */}
        <div className="mx-2 flex flex-col items-center justify-start gap-3 py-3 md:mx-[50px] md:flex-row md:justify-between lg:mx-[100px]">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <div className="flex items-center justify-center rounded-full border-2">
              <Image
                src={context?.watch().studentImageProfile}
                width={90}
                height={90}
                className="rounded-full "
              />
            </div>
            <div>
              <p
                className={classNames(
                  'text-center text-base font-semibold md:text-start md:text-xl lg:text-2xl',
                  !context?.isDarkMode ? 'text-secondaryBgBlack' : 'text-white'
                )}
              >
                {`${context?.watch().studentDetails?.firstName} ${
                  context?.watch().studentDetails?.middleName
                } ${context?.watch().studentDetails?.lastName}`}
              </p>
              <p
                className={classNames(
                  'text-sm font-light italic lg:text-base',
                  !context?.isDarkMode ? 'text-secondaryBgBlack' : 'text-white'
                )}
              >
                {context?.watch().studentDetails?.collegeName}
              </p>
            </div>
          </div>
          <div className="flex gap-2 md:self-end">
            <button
              className="flex items-center justify-center gap-3 rounded bg-primaryYellow px-3 py-2 font-light"
              onClick={toggleEdit}
            >
              {isUpdate ? <AiOutlineCloseCircle /> : <TbListDetails />}
              {isUpdate ? 'Cancel' : 'Update Details'}
            </button>
            <button
              onClick={() => {
                handleSubmit((data) => console.log(data))();
              }}
              disabled={!isUpdate}
              className={classNames(
                'flex items-center justify-center gap-3 rounded  px-3 py-2 font-light',
                !isUpdate ? 'bg-customBorder' : 'bg-green-400',
                !isUpdate ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              {isUpdate ? (
                <AiOutlineSave color="#fff" />
              ) : (
                <MdOutlineAccountCircle />
              )}
            </button>
          </div>
        </div>

        <p
          className={classNames(
            'my-2 mx-10 pb-2 text-center font-light md:mx-20',
            !context?.isDarkMode ? 'text-secondaryBgBlack' : 'text-white'
          )}
        >
          {context?.watch().selfDescription}
        </p>

        {/* SWITCHES */}
        <div className="mx-3 flex gap-2 border-t-2 py-3 ">
          {data.accountPreferencesTabs.map(({ id, name }) => (
            <button
              className={classNames(
                'md:text-md border-b-[3px] p-2 text-base font-medium',
                context?.isDarkMode
                  ? 'text-teriaryWhite '
                  : 'text-secondaryWhite',
                id === activeComponent
                  ? 'border-primaryYellow'
                  : context?.isDarkMode
                  ? 'border-secondaryBgBlack'
                  : 'border-white'
              )}
              key={id}
              onClick={() => setActiveComponent(id)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div
        className={classNames(
          'mx-3 mt-3 rounded-md p-2 lg:mx-0 xl:mx-[250px] 2xl:mx-[300px]',
          context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
        )}
      >
        {activeComponent === 1 ? (
          // <Details isUpdate={isUpdate} register={register} errors={errors} />
          <h1>dsf</h1>
        ) : activeComponent === 2 ? (
          <Form />
        ) : (
          <Documents />
        )}
      </div>
    </section>
  );

  // HANDLERS
  function toggleEdit() {
    setIsUpdate(!isUpdate);
  }

  function updatStudentData(data: any) {
    alert('sfd');
  }
};

export default SccountPreferencesContainer;
