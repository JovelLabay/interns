// NEXT
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// COMPONENTS
import SecondayStaticFooter from 'lib/components/blocks/staticPage/SecondayStaticFooter';
import SplashLoading from '@/src/components/common/SplashLoading';

// EXTERNAL LIBRARY
import { Listbox } from '@headlessui/react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

// ICONS
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';

// STATIC DATA
import { data } from 'Data';

// FORM HANDLERS
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompanyRegistration } from '@/src/validator/LogSignValidator';

// FIREBASE MODULES AND CONFIGURATIONS
import { saveCompanyRegistration } from '@/src/functions/firebaseDatabase';
import {
  database,
  emailPassAuth,
  storgae,
} from '@/src/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { onValue, ref as databaseRef } from 'firebase/database';

// TOASTIFY
import { ToastContainer } from 'react-toastify';
import { notify } from '@/src/components/common/toast';

function Setup() {
  const router = useRouter();

  // STATES
  const [companyDates, setCompanyDates] = useState({
    days: data.days[0].name,
    months: data.months[0].name,
    years: data.years[0].name,
    typeOfCompany: 'Select',
    locationOfCompany: 'Select',
    companyLogoUrl: '',
    companyEmail: '',
  });
  const [companyPohotos, setcompanyPohotos] = useState<string[]>([]);
  const [companyDocuments, setCompanyDocuments] = useState<string[]>([]);
  const [locations, setLocations] = useState({});
  const [companyTypes, setCompanyTypes] = useState({});
  const [progression, setProgression] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const locationLists: [string, { location: string }][] =
    Object.entries(locations) || [];
  const companyTypeLists: [string, { type: string }][] =
    Object.entries(companyTypes) || [];

  const uploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObject: any = e.target.files?.[0];

    const photoUrl =
      e.target.name === 'companyPhotos'
        ? 'images/company/photos/'
        : e.target.name === 'companyDocuments'
        ? 'documents/company/companyDocuments/'
        : 'images/company/logo/';

    const storgaeRef = ref(storgae, photoUrl + uuidv4());
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
          switch (e.target.name) {
            case 'companyPhotos':
              setcompanyPohotos((prev) => [...prev, downloadURL]);
              break;
            case 'companyLogo':
              setCompanyDates((prev) => {
                return { ...prev, companyLogoUrl: downloadURL };
              });
              break;
            case 'companyDocuments':
              setCompanyDocuments((prev) => [...prev, downloadURL]);
              break;
            default:
              null;
              break;
          }
        });
      }
    );
  };

  const { register, handleSubmit, formState } =
    useForm<CompanyRegistrationInterface>({
      resolver: yupResolver(CompanyRegistration),
    });

  const companyRegistrationSubmit = (data: CompanyRegistrationInterface) => {
    if (
      (companyDates.days === 'DD' ||
        companyDates.months === 'MM' ||
        companyDates.years === 'YYYY' ||
        companyDates.typeOfCompany === 'Select' ||
        companyDates.locationOfCompany === 'Select',
      companyDates.companyLogoUrl === '' ||
        companyPohotos.length < 4 ||
        companyDates.companyEmail === '')
    ) {
      notify('Please fill all the fields');
    } else {
      saveCompanyRegistration(
        companyDates.days,
        companyDates.months,
        companyDates.years,
        companyDates.typeOfCompany,
        companyDates.locationOfCompany,
        data.companyName,
        data.companyMission,
        data.companyVison,
        data.companyDescription,
        emailPassAuth?.currentUser?.uid as string,
        companyDates.companyLogoUrl,
        companyPohotos,
        companyDates.companyEmail,
        companyDocuments
      )
        .then((res) => {
          updateProfile(emailPassAuth.currentUser as User, {
            displayName: res.responseData,
          })
            .then(() => router.push('/views/user/company/dashboard'))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const db = database;
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/company/auth');
      }

      if (
        user?.displayName?.length === 28 &&
        (user?.providerData[0].providerId === 'facebook.com' ||
          user?.providerData[0].providerId === 'google.com')
      ) {
        router.push('/views/user/company/dashboard');
      }

      if (
        user?.displayName?.length !== 28 &&
        (user?.providerData[0].providerId === 'facebook.com' ||
          user?.providerData[0].providerId === 'google.com')
      ) {
        setIsLoading(false);
        setCompanyDates((prev) => {
          return {
            ...prev,
            companyEmail: user?.email as string,
          };
        });
      }
    });

    // GET LOCATIONS
    const currentLocations = databaseRef(db, 'school/locations');
    onValue(currentLocations, (snapshot) => {
      const data = snapshot.val();
      setLocations(data);
    });

    // GET COMPANY TYPES
    const currentCompanyTypes = databaseRef(db, 'school/companyTypes');
    onValue(currentCompanyTypes, (snapshot) => {
      const data = snapshot.val();
      setCompanyTypes(data);
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
        <title>Interns | Company Setup</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hidden min-h-[80vh] lg:block">
        <header className="flex h-[70px] items-center bg-primaryYellow">
          <div className="dynamic-main-container flex w-screen justify-around">
            <p className="mt-2 text-lg font-bold">Company Account Setup</p>
            <div className="flex flex-row items-center justify-center gap-10">
              <button
                onClick={handleSubmit(companyRegistrationSubmit)}
                className="rounded border-2 border-mainBgWhite py-2 px-10 font-medium text-mainBgWhite transition duration-300 hover:bg-mainBgWhite hover:text-secondaryBgBlack"
              >
                Save
              </button>
            </div>
          </div>
        </header>

        <main className="dynamic-main-container py-5 xl:px-[250px] 2xl:px-[300px]">
          <div className="my-4 flex flex-col items-center justify-center">
            {companyDates.companyLogoUrl === '' ? (
              <label className="rounded-full border-2 border-dashed border-primaryYellow bg-mainBgWhite p-10 text-secondaryWhite hover:cursor-pointer">
                <AiOutlineCloudUpload size={40} />
                <input
                  className="imageUpload"
                  type="file"
                  title="imageUpload"
                  accept="image/*"
                  name="companyLogo"
                  onChange={(e) => uploadProfileImage(e)}
                />
              </label>
            ) : (
              <Image
                src={companyDates.companyLogoUrl}
                width={130}
                height={130}
                style={{
                  borderRadius: 100,
                }}
              />
            )}

            <p className="inputlabel mt-5">Company Logo</p>
          </div>
          <div className="grid grid-cols-2 gap-y-8 gap-x-20 ">
            <div className="flex flex-col">
              <label htmlFor="" className="inputlabel">
                Company Name
              </label>
              <input
                {...register('companyName')}
                type="text"
                placeholder="Name of the company"
                title="CompanyName"
                className="inputBox"
              />
              {formState.errors.companyName && (
                <p>{formState.errors.companyName.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="inputlabel">
                Company Mission
              </label>
              <textarea
                {...register('companyMission')}
                placeholder="Mission of your Company"
                title="CompanyName"
                className="inputBox"
              />
              {formState.errors.companyMission && (
                <p>{formState.errors.companyMission.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="inputlabel">
                Company Vision
              </label>
              <textarea
                {...register('companyVison')}
                placeholder="Vision of your Company"
                title="CompanyName"
                className="inputBox"
              />
              {formState.errors.companyVison && (
                <p>{formState.errors.companyVison.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className={classNames('inputlabel')}>
                Description of the Company{' '}
                <span
                // className={classNames(
                //   'text-mainBgWhite px-2 rounded-full font-light',
                //   {
                //     'bg-red-500': descriptionLength <= 100,
                //   },
                //   {
                //     'bg-green-500': descriptionLength >= 100,
                //   },
                //   {
                //     hidden: descriptionLength == 0,
                //   }
                // )}
                >
                  0
                </span>
              </label>
              <textarea
                {...register('companyDescription')}
                placeholder="Write sort description of your company"
                title="CompanyName"
                className="inputBox"
              />
              {formState.errors.companyDescription && (
                <p>{formState.errors.companyDescription.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="inputlabel">
                Type of Company
              </label>
              <Listbox
                value={companyDates.typeOfCompany}
                onChange={(value) =>
                  setCompanyDates((prev) => {
                    return { ...prev, typeOfCompany: value };
                  })
                }
              >
                {({ open }: { open: boolean }) => (
                  <div className="relative">
                    <Listbox.Button className="flex w-full justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none ">
                      {companyDates.typeOfCompany}
                      <FiChevronDown
                        size={30}
                        className={classNames(
                          'text-secondaryWhite duration-300',
                          {
                            'rotate-180': open,
                          }
                        )}
                      />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-30 max-h-[150px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                      {companyTypeLists.map((person, key) => (
                        <Listbox.Option
                          className="py-1"
                          key={key}
                          value={person[1].type}
                        >
                          {person[1].type}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </Listbox>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="inputlabel">
                Location of the Company
              </label>
              <Listbox
                value={companyDates.locationOfCompany}
                onChange={(value) =>
                  setCompanyDates((prev) => {
                    return { ...prev, locationOfCompany: value };
                  })
                }
              >
                {({ open }: { open: boolean }) => (
                  <div className="relative">
                    <Listbox.Button className="flex w-full justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none">
                      {companyDates.locationOfCompany}
                      <FiChevronDown
                        size={30}
                        className={classNames(
                          'text-secondaryWhite duration-300',
                          {
                            'rotate-180': open,
                          }
                        )}
                      />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-30 max-h-[150px] w-full overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                      {locationLists.map((person, key) => (
                        <Listbox.Option
                          className="py-1"
                          key={key}
                          value={person[1].location}
                        >
                          {person[1].location}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </Listbox>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="inputlabel">
                Date Founded:
              </label>
              <section className="flex items-center justify-between">
                <Listbox
                  value={companyDates.days}
                  onChange={(value) =>
                    setCompanyDates((prev) => {
                      return { ...prev, days: value };
                    })
                  }
                >
                  {({ open }: { open: boolean }) => (
                    <div className="relative">
                      <Listbox.Button className="flex w-[100px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none">
                        {companyDates.days}
                        <FiChevronDown
                          size={30}
                          className={classNames(
                            'text-secondaryWhite duration-300',
                            {
                              'rotate-180': open,
                            }
                          )}
                        />
                      </Listbox.Button>
                      <Listbox.Options className="absolute max-h-[150px] w-[100px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                        {data.days.map((person) => (
                          <Listbox.Option
                            className="py-1"
                            key={person.id}
                            value={person.name}
                            hidden={person.id === 101}
                          >
                            {person.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
                <Listbox
                  value={companyDates.months}
                  onChange={(value) =>
                    setCompanyDates((prev) => {
                      return { ...prev, months: value };
                    })
                  }
                >
                  {({ open }: { open: boolean }) => (
                    <div className="relative">
                      <Listbox.Button className="flex w-[100px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none ">
                        {companyDates.months}
                        <FiChevronDown
                          size={30}
                          className={classNames(
                            'text-secondaryWhite duration-300',
                            {
                              'rotate-180': open,
                            }
                          )}
                        />
                      </Listbox.Button>
                      <Listbox.Options className="absolute max-h-[150px] w-[100px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                        {data.months.map((person) => (
                          <Listbox.Option
                            className="py-1"
                            key={person.id}
                            value={person.name}
                            hidden={person.id === 101}
                          >
                            {person.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
                <Listbox
                  value={companyDates.years}
                  onChange={(value) =>
                    setCompanyDates((prev) => {
                      return { ...prev, years: value };
                    })
                  }
                >
                  {({ open }: { open: boolean }) => (
                    <div className="relative">
                      <Listbox.Button className="flex w-[150px] justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-3 outline-none ">
                        {companyDates.years}
                        <FiChevronDown
                          size={30}
                          className={classNames(
                            'text-secondaryWhite duration-300',
                            {
                              'rotate-180': open,
                            }
                          )}
                        />
                      </Listbox.Button>
                      <Listbox.Options className="absolute max-h-[150px] w-[150px] overflow-auto rounded-md bg-white p-2 shadow-md hover:cursor-pointer">
                        {data.years.map((person) => (
                          <Listbox.Option
                            className="py-1"
                            key={person.id}
                            value={person.name}
                            hidden={person.id === 101}
                          >
                            {person.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </section>
            </div>
            <div className="flex flex-col">
              {/* PHOTOS */}
              <p>{progression}</p>
              <label htmlFor="" className="inputlabel">
                Photos of the Company
              </label>
              <p className="mb-2 text-[14px] font-thin italic text-teriaryWhite">
                *Reuploading or changing of photos can only be done in account
                settings.
              </p>
              <p className="mb-2 text-[12px] font-thin italic text-teriaryWhite">
                *Pls note uploading of photos will take one at a time. This is
                due to the subscrition of the cloud database of the software..
              </p>
              <div className="flex flex-wrap gap-3">
                {companyPohotos.map((photoUrl, index) => {
                  return (
                    <Image
                      key={index}
                      src={photoUrl}
                      width={130}
                      height={130}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  );
                })}
                {companyPohotos.length >= 4 ? null : (
                  <label className="rounded-md border-2 border-dashed border-primaryYellow bg-mainBgWhite p-10 text-secondaryWhite hover:cursor-pointer">
                    <AiOutlineCloudUpload size={40} />
                    <input
                      className="imageUpload"
                      type="file"
                      title="imageUpload"
                      accept="image/*"
                      name="companyPhotos"
                      onChange={(e) => uploadProfileImage(e)}
                    />
                  </label>
                )}
              </div>
              {/* DOCUMENTS */}
              <label htmlFor="" className="inputlabel mt-8">
                Company Documents
              </label>
              <p className="mb-2 text-[14px] font-thin italic text-teriaryWhite">
                *Reuploading or changing of documents can only be done in
                account settings. Company documents remains private and
                confidential. This is part of the terms and conditions of the
                software.
              </p>
              <p className="mb-2 text-[12px] font-thin italic text-teriaryWhite">
                *Pls note uploading of documents will take one at a time. This
                is due to the subscrition of the cloud database of the
                software..
              </p>
              <div>
                <label className="h-[40px] w-[130px] rounded border-2 border-dashed bg-mainBgWhite hover:cursor-pointer">
                  Document
                  <input
                    className="imageUpload"
                    type="file"
                    title="imageUpload"
                    accept="application/pdf"
                    name="companyDocuments"
                    onChange={(e) => uploadProfileImage(e)}
                  />
                </label>
                {companyDocuments.map((docUrl, index) => (
                  <div key={index}>
                    <a href={docUrl} target="_blank" rel="noopener noreferrer">
                      document
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* TOAST */}
      <ToastContainer />
    </div>
  );
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
