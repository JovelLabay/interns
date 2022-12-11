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
import ExisitingFormSetup from './forms/exisitingFormSetup';
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
        <header className="bg-primaryYellow h-[70px] flex items-center">
          <div className="dynamic-main-container flex w-screen md:justify-around justify-between">
            <p className="font-bold md:text-lg mt-2 text-md">
              Student Account Setup
            </p>
          </div>
        </header>
        <main className="dynamic-main-container xl:px-[250px] 2xl:px-[300px] py-5">
          <div className="w-full h-1 bg-slate-400 rounded-full">
            <div
              style={{
                borderRadius: '100px',
                backgroundColor: '#FFE500',
                height: '0.25rem',
                width: `${progression}%`,
              }}
            />
          </div>
          {/* PROFILE IMAGE */}
          <section>
            {stateOfForm === 1 ? (
              <>
                <div className="flex flex-col items-center justify-center my-4">
                  {!watch().studentImageProfile ? (
                    <label
                      className="text-secondaryWhite border-2 rounded-full p-10 border-primaryYellow border-dashed
             bg-mainBgWhite hover:cursor-pointer"
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
                    <Image
                      src={watch().studentImageProfile}
                      width={130}
                      height={130}
                      style={{
                        borderRadius: 100,
                      }}
                    />
                  )}

                  <p className="mt-5 inputlabel">Profile Photo</p>
                </div>
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

          <section className="flex items-center justify-between my-8">
            <button
              className={classNames('bg-primaryYellow px-8 py-2 rounded', {
                'cursor-not-allowed opacity-50': stateOfForm === 0,
              })}
              disabled={stateOfForm === 0}
              onClick={() => setStateofForm(stateOfForm - 1)}
            >
              <AiOutlineArrowLeft size={25} color="#fff" />
            </button>
            <div>{stateOfForm} of 2</div>
            <button
              className="bg-primaryYellow px-8 py-2 rounded text-white"
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
