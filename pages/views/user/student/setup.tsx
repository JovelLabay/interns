// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// NEXT
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

// ICONS
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCloudUpload,
} from 'react-icons/ai';

import SplashLoading from '@/src/components/common/SplashLoading';
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';

// REACT FORM
import { useForm } from 'react-hook-form';

// COMPONENTS
import ExisitingFormSetup from '../../../../src/components/form/student/exisitingFormSetup';
import DocumentForm from '@/src/components/form/student/documentForm';

// EXTERNAL
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { errorNotify } from '@/src/components/common/toast';
import { ToastContainer } from 'react-toastify';

// FIREBASE
import { studentRegistration } from '@/src/functions/firebaseDatabase2nd';
import {
  database,
  emailPassAuth,
  storgae,
} from '@/src/firebase/firebaseConfig';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { onValue, ref as databaseRef } from 'firebase/database';

function Setup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState({});
  const [stateOfForm, setStateofForm] = useState(1);
  const [progression, setProgression] = useState(0);

  const locationLists: [string, { location: string }][] =
    Object.entries(locations) || [];

  const { register, handleSubmit, setValue, watch } =
    useForm<StudentRegistration>();

  useEffect(() => {
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/student/auth');
      }

      if (
        user?.displayName?.length === 20 &&
        user?.providerData[0].providerId === 'password'
      ) {
        router.push('/views/user/student/dashboard');
      }

      if (
        user?.displayName?.length !== 20 &&
        user?.providerData[0].providerId === 'password'
      ) {
        const db = database;

        // GET LOCATIONS
        const currentLocations = databaseRef(db, 'school/locations');
        onValue(currentLocations, (snapshot) => {
          const data = snapshot.val();
          setLocations(data);
        });

        const studentDetailsLocalStorage = JSON.parse(
          localStorage.getItem('studentDetials') || '{}'
        );
        setValue('firstName', studentDetailsLocalStorage.firstName);
        setValue('middleName', studentDetailsLocalStorage.middleName);
        setValue('lastName', studentDetailsLocalStorage.lastName);
        setValue('collegeName', studentDetailsLocalStorage.college);
        setValue('emailAddress', studentDetailsLocalStorage.email);

        setIsLoading(false);
      }
    });

    return () => {
      authMe();
    };
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div>
      <Head>
        <title>Interns | Student Setup</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-[80vh]">
        <header className="flex h-[70px] items-center bg-primaryYellow">
          <div className="dynamic-main-container flex w-screen justify-between md:justify-around">
            <p className="text-md mt-2 font-bold md:text-lg">
              Student Account Setup
            </p>
            <p></p>
          </div>
        </header>
        <main className="dynamic-main-container py-5 xl:px-[250px] 2xl:px-[300px]">
          {/* PROFILE IMAGE */}
          <section>
            {stateOfForm === 1 ? (
              <>
                <div className="relative my-10 rounded border-2 md:my-5">
                  <Image
                    src={watch().studentImageCover}
                    layout="responsive"
                    width={500}
                    height={180}
                    className="opacity-70"
                  />
                  <label
                    className="absolute bottom-3 right-3  rounded-full border-2 border-dashed border-primaryYellow bg-mainBgWhite p-2
             text-secondaryWhite hover:cursor-pointer md:bottom-5 md:right-5"
                  >
                    <AiOutlineCloudUpload size={20} />
                    <input
                      className="imageUpload"
                      type="file"
                      title="studentCoverImage"
                      accept="image/*"
                      name="studentCoverImage"
                      onChange={uploadProfileImage}
                    />
                  </label>
                  <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
                    {!watch().studentImageProfile ? (
                      <label
                        className="rounded-full border-2 border-dashed border-primaryYellow bg-mainBgWhite p-10
             text-secondaryWhite hover:cursor-pointer"
                      >
                        <AiOutlineCloudUpload size={40} />
                        <input
                          className="imageUpload"
                          type="file"
                          title="studentProfileImage"
                          accept="image/*"
                          name="studentProfileImage"
                          onChange={uploadProfileImage}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-center rounded-full border-2 border-white bg-white">
                        <Image
                          src={watch().studentImageProfile}
                          width={130}
                          height={130}
                          className="rounded-full shadow-md"
                        />
                      </div>
                    )}

                    <p className="mt-2 rounded bg-white py-1 px-3 text-base font-semibold uppercase text-secondaryWhite md:text-xl lg:text-2xl">
                      {watch().firstName} {watch().middleName}{' '}
                      {watch().lastName}
                    </p>
                  </div>
                </div>

                {/* FORMS */}
                <ExisitingFormSetup
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  locationLists={locationLists}
                />
              </>
            ) : stateOfForm === 2 ? (
              <DocumentForm
                uploadProfileImage={uploadProfileImage}
                watch={watch}
              />
            ) : null}
          </section>

          <section className="my-8 flex items-center justify-between">
            <button
              className={classNames('rounded bg-primaryYellow px-8 py-2', {
                'cursor-not-allowed opacity-50': stateOfForm === 1,
              })}
              disabled={stateOfForm === 1}
              onClick={() => setStateofForm(stateOfForm - 1)}
            >
              <AiOutlineArrowLeft size={25} color="#fff" />
            </button>
            <div>{stateOfForm} of 2</div>
            <button
              className="rounded bg-primaryYellow px-8 py-2 text-white"
              onClick={() => {
                if (stateOfForm < 2) {
                  setStateofForm(stateOfForm + 1);
                } else {
                  handleSubmit((data) => {
                    saveRegistration(data);
                  })();
                }
              }}
            >
              {stateOfForm === 2 ? (
                'Save'
              ) : (
                <AiOutlineArrowRight size={25} color="#fff" />
              )}
            </button>
          </section>
        </main>
      </div>

      {/* TOAST */}
      <ToastContainer />

      {progression !== 0 && (
        <div className="fixed top-0 right-0 flex h-full w-full items-center justify-center bg-backDropDark">
          <div className="flex w-[70%] flex-col items-center justify-center gap-4 rounded-md bg-white py-4 md:w-[30%]">
            <div className="h-1 w-[80%] rounded-full bg-slate-400">
              <div
                style={{
                  borderRadius: '100px',
                  backgroundColor: '#FFE500',
                  height: '0.25rem',
                  width: `${progression}%`,
                }}
              />
            </div>
            <p className="ml-2 text-sm  text-slate-400">
              Loading {progression}%
            </p>
          </div>
        </div>
      )}
    </div>
  );

  function uploadProfileImage(e: React.ChangeEvent<HTMLInputElement>) {
    const fileObject: any = e.target.files?.[0];

    const storageLocation =
      e.target.name === 'studentProfileImage'
        ? 'images/student/photos/'
        : 'documents/student/studentDocuments/';

    const storgaeRef = storageRef(storgae, storageLocation + uuidv4());
    const uploadTask = uploadBytesResumable(storgaeRef, fileObject);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgression(Math.floor(progress));
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (e.target.name === 'studentProfileImage') {
            setValue('studentImageProfile', downloadURL);
          }

          if (e.target.name === 'studentCoverImage') {
            setValue('studentImageCover', downloadURL);
          }

          if (e.target.name === 'birthCertificate') {
            setValue('studentDocuments.birthCertificate', downloadURL);
          }

          if (e.target.name === 'curriculumVitae') {
            setValue('studentDocuments.curreculumVitae', downloadURL);
          }

          if (e.target.name === 'schoolId') {
            setValue('studentDocuments.schoolId', downloadURL);
          }

          if (e.target.name === 'applicationLetter') {
            setValue('studentDocuments.applicationLetter', downloadURL);
          }

          setTimeout(() => {
            setProgression(0);
          }, 1000);
        });
      }
    );
  }

  function saveRegistration(data: StudentRegistration) {
    const uniqueId = localStorage.getItem('studentDetials');
    studentRegistration(data, uniqueId)
      .then((res) => {
        updateProfile(emailPassAuth.currentUser as User, {
          displayName: res.responseData,
          photoURL: watch().studentImageProfile,
        })
          .then(() => router.push('/views/user/student/dashboard'))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.error(err);
        errorNotify('There is an issue upon submission');
      });
  }
}

export default Setup;

Setup.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayStaticFooter />
    </>
  );
};
