// NEXT
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// COMPONENTS
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';

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
import { storgae, emailPassAuth } from '@/src/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';

// TOASTIFY
import { ToastContainer } from 'react-toastify';
import { notify } from '@/src/components/common/toast';
import SplashLoading from '@/src/components/common/SplashLoading';

function Setup() {
  const router = useRouter();

  // STATES
  const [companyDates, setCompanyDates] = useState({
    days: data.days[0].name,
    months: data.months[0].name,
    years: data.years[0].name,
    typeOfCompany: data.typeOfCompany[0].name,
    locationOfCompany: data.locationOfCompany[0].name,
    companyLogoUrl: '',
    companyEmail: '',
  });
  const [companyPohotos, setcompanyPohotos] = useState<string[]>([]);
  const [progression, setProgression] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNumber, setIsNumber] = useState(false);

  const uploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObject: any = e.target.files?.[0];

    const photoUrl =
      e.target.name === 'companyPhotos'
        ? 'images/companyPhotos/'
        : 'images/CompanyLogos/';

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
          if (e.target.name === 'companyPhotos') {
            setcompanyPohotos((prev) => [...prev, downloadURL]);
          } else {
            setCompanyDates((prev) => {
              return { ...prev, companyLogoUrl: downloadURL };
            });
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
        companyDates.companyEmail
      )
        .then(() => {
          updateProfile(emailPassAuth.currentUser as User, {
            displayName: data.companyName,
            photoURL: companyDates.companyLogoUrl,
          })
            .then(() => router.push('/views/user/company/dashboard'))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/company/auth');
      } else {
        if (
          user?.displayName === null ||
          user?.photoURL === null ||
          user?.email === null
        ) {
          setIsLoading(false);
          setCompanyDates((prev) => {
            return { ...prev, companyEmail: user?.email as string };
          });
        } else {
          router.push('/views/user/company/dashboard');
        }
      }

      // DISABLE THE SETUP IF NO PHONE NUMBER
      if (user?.phoneNumber !== null) {
        setIsNumber(true);
        // alert(
        //   "THIS TYPE OF ACCOUNT IS NOT ALLOWED TO CREATE A COMPANY'S ACCOUNT. PLEASE USE EMAIL AND PASSWORD"
        // );
      }
    });

    return () => {
      authMe();
    };
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  if (isNumber) {
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    document.body.style.userSelect = 'none';
  }

  return (
    <div>
      <Head>
        <title>Interns | Company Auvbnth</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isNumber && (
        <div className="z-50 h-screen w-screen absolute top-0 left-0 flex flex-row justify-center items-center">
          <h1>
            {
              "THIS TYPE OF ACCOUNT IS NOT ALLOWED TO CREATE A COMPANY'S ACCOUNT. PLEASE USE EMAIL AND PASSWORD"
            }
          </h1>
        </div>
      )}

      <main
        style={{
          filter: isNumber ? 'blur(5px)' : 'none',
        }}
      >
        <div className="min-h-[80vh] lg:block hidden">
          <header className="bg-primaryYellow h-[70px] flex items-center">
            <div className="dynamic-main-container flex w-screen justify-around">
              <h1 className="font-bold text-lg mt-2">Company Account Setup</h1>
              <div className="flex flex-row justify-center items-center gap-10">
                <button
                  onClick={handleSubmit(companyRegistrationSubmit)}
                  className="border-mainBgWhite py-2 px-10 rounded border-2 font-medium text-mainBgWhite hover:text-secondaryBgBlack hover:bg-mainBgWhite transition duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          </header>

          <main className="dynamic-main-container xl:px-[250px] 2xl:px-[300px] py-5">
            <div className="flex flex-col items-center justify-center my-4">
              {companyDates.companyLogoUrl === '' ? (
                <label className="text-secondaryWhite border-2 rounded-full p-10 border-primaryYellow border-dashed bg-mainBgWhite hover:cursor-pointer">
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

              <p className="mt-5 inputlabel">Company Logo</p>
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
                      <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-full flex justify-between ">
                        {companyDates.typeOfCompany}
                        <FiChevronDown
                          size={30}
                          className={classNames(
                            'duration-300 text-secondaryWhite',
                            {
                              'rotate-180': open,
                            }
                          )}
                        />
                      </Listbox.Button>
                      <Listbox.Options className="absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] z-30 overflow-auto">
                        {data.typeOfCompany.map((person) => (
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
                      <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-full flex justify-between">
                        {companyDates.locationOfCompany}
                        <FiChevronDown
                          size={30}
                          className={classNames(
                            'duration-300 text-secondaryWhite',
                            {
                              'rotate-180': open,
                            }
                          )}
                        />
                      </Listbox.Button>
                      <Listbox.Options className="absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] z-30 overflow-auto">
                        {data.locationOfCompany.map((person) => (
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
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="inputlabel">
                  Date Founded:
                </label>
                <section className="flex justify-between items-center">
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
                        <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-[100px] flex justify-between">
                          {companyDates.days}
                          <FiChevronDown
                            size={30}
                            className={classNames(
                              'duration-300 text-secondaryWhite',
                              {
                                'rotate-180': open,
                              }
                            )}
                          />
                        </Listbox.Button>
                        <Listbox.Options className="absolute bg-white rounded-md p-2 w-[100px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto">
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
                        <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-[100px] flex justify-between ">
                          {companyDates.months}
                          <FiChevronDown
                            size={30}
                            className={classNames(
                              'duration-300 text-secondaryWhite',
                              {
                                'rotate-180': open,
                              }
                            )}
                          />
                        </Listbox.Button>
                        <Listbox.Options className="absolute bg-white rounded-md p-2 w-[100px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto">
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
                        <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-[150px] flex justify-between ">
                          {companyDates.years}
                          <FiChevronDown
                            size={30}
                            className={classNames(
                              'duration-300 text-secondaryWhite',
                              {
                                'rotate-180': open,
                              }
                            )}
                          />
                        </Listbox.Button>
                        <Listbox.Options className="absolute bg-white rounded-md p-2 w-[150px] shadow-md hover:cursor-pointer max-h-[150px] overflow-auto">
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
                <label htmlFor="" className="inputlabel">
                  Photos of the Company
                </label>
                <p className="mb-2 text-teriaryWhite font-thin italic text-[14px]">
                  *Reuploading or changing of photos can only be done in account
                  settings.
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
                    <label className="text-secondaryWhite border-2 rounded-md p-10 border-primaryYellow border-dashed bg-mainBgWhite hover:cursor-pointer">
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
                  <p>{progression}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* TOAST */}
        <ToastContainer />
      </main>
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
