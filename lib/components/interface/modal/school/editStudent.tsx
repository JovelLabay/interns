import React, { useEffect, useState, useContext } from 'react';

import Image from 'next/image';

import internsLogo from '@/assets/logo/interns_logo.png';
import { EditStudentForm } from '@validator/forms';
import { splitUnderScore } from '@utils/commonFunction';
import { imageUploader } from '@utils/uploaderFunction';

import axios from 'axios';
import classNames from 'classnames';
import { Transition, Dialog, Switch, Listbox } from '@headlessui/react';
import { Student_Status } from '@prisma/client';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiChevronDown } from 'react-icons/fi';
import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import { BiRefresh } from 'react-icons/bi';
import { DynamicContext } from '@redux/context';
import Link from 'next/link';
import { useRouter } from 'next/router';

const studentStatus = Object.entries(Student_Status);

function EditStudent({
  modal,
  toggleEditStudent,
  objectEditStudent,
  getStudentList,
}: {
  modal: boolean;
  toggleEditStudent(): void;
  objectEditStudent: string;
  getStudentList(): void;
}) {
  const context = useContext(DynamicContext);
  const router = useRouter();

  const [state, setState] = useState({
    isUpdating: false,
    uploadingImage: false,
  });
  const [emailTemplate, setEmailTemplate] = useState<
    FormEmailTemplateResponse[]
  >([]);
  const [listRecommendationLetter, setListRecommendationLetter] = useState([]);
  const [studentAppliedCompanyList, setStudentAppliedCompanyList] = useState<
    FormStudentAppliedCompaniesResponse[]
  >([]);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState({
    name: '',
    objectData: {} as FormEmailTemplateResponse,
  });
  const { handleSubmit, register, setValue, watch, reset } =
    useForm<FormEditStudent>({
      mode: 'onSubmit',
      resolver: yupResolver(EditStudentForm),
    });

  useEffect(() => {
    if (objectEditStudent) {
      const {
        email,
        first_name,
        last_name,
        middle_name,
        is_active,
        is_eligible,
        Student_User_Profile,
        Student_Recommendation,
        Student_Applying_Companies,
      } = JSON.parse(objectEditStudent);

      setValue('firstName', first_name);
      setValue('lastName', last_name);
      setValue('middleName', middle_name);
      setValue('emailAddress', email);
      setValue('accountStatus', is_active);
      setValue('eligibility', is_eligible);

      setValue(
        'profileImage',
        Student_User_Profile.student_profile_image || ''
      );
      setValue(
        'selfIntroduction',
        Student_User_Profile.self_introduction || ''
      );
      setValue('address', Student_User_Profile.address || '');
      setValue('birthDate', Student_User_Profile.date_of_birth || '');
      setValue('sex', Student_User_Profile.sex || '');
      setValue('studentStatus', Student_User_Profile.student_status || '');
      setValue('phoneNumber', Student_User_Profile.phone_number || '');

      setListRecommendationLetter(Student_Recommendation);
      setStudentAppliedCompanyList(Student_Applying_Companies);
    }
  }, [objectEditStudent]);

  useEffect(() => {
    getEmailTemplate();
  }, []);

  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden xl:block"
        onClose={() => {
          toggleEditStudent();

          setSelectedEmailTemplate({
            name: '',
            objectData: {
              email_template_name: '',
              email_template_subject: '',
              email_template_body: '',
              id: 0,
            },
          });
        }}
      >
        <Transition.Child
          as={React.Fragment}
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
          <div className="flex min-h-full items-center justify-end p-4">
            <Transition.Child
              as={React.Fragment}
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <Dialog.Panel className="w-[35vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-between text-secondaryWhite">
                  <button
                    onClick={() => {
                      toggleEditStudent();

                      setSelectedEmailTemplate({
                        name: '',
                        objectData: {
                          email_template_name: '',
                          email_template_subject: '',
                          email_template_body: '',
                          id: 0,
                        },
                      });
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="my-2 h-[85vh] overflow-auto pr-2 text-secondaryWhite">
                  <h3 className={'font-medium'}>History of Applied Company</h3>
                  <div className="my-2 mr-2 flex max-h-[300px] flex-col gap-2 overflow-auto">
                    {studentAppliedCompanyList.map((item, index) => (
                      <section
                        key={index}
                        className=" rounded bg-contastWhite p-3"
                      >
                        <h3 className="font-medium">{item.company_name}</h3>
                        <h5>Person: {item.direct_supervisor}</h5>
                        <h5>Contact Number: {item.contact_number}</h5>
                        <h5>
                          Company Address:{' '}
                          <Link href={router.asPath} passHref>
                            <a
                              className="text-sm text-blue-500 underline"
                              onClick={(e) =>
                                handleLinkClick(e, item.company_address)
                              }
                            >
                              {item.company_address}
                            </a>
                          </Link>
                        </h5>
                      </section>
                    ))}
                  </div>

                  <h3 className={'font-medium'}>
                    History of Request for Recommendation Letter
                  </h3>
                  <div className="mt-2 mr-2 flex max-h-[300px] flex-col gap-2 overflow-auto">
                    {listRecommendationLetter.map(
                      (
                        letter: {
                          company_address: string;
                          company_name: string;
                          supervisor_name: string;
                        },
                        index
                      ) => {
                        const address = letter.company_address
                          .split(' ')
                          .join('+');

                        return (
                          <section
                            key={index}
                            className="flex flex-col gap-1 rounded bg-yellowBg p-2 text-xs"
                          >
                            <h4 className="font-bold">
                              Company Name: {letter.company_name}
                            </h4>
                            <p>Direct Supervisor: {letter.supervisor_name}</p>
                            <Link href={router.asPath} passHref>
                              <a
                                className="text-blue-500 underline"
                                onClick={(e) => handleLinkClick(e, address)}
                              >
                                Company Address: {letter.company_address}
                              </a>
                            </Link>
                          </section>
                        );
                      }
                    )}
                  </div>

                  <form
                    className="mt-2 flex flex-col gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();

                      handleSubmit((data) =>
                        updateStudentUserStudentProfile(data)
                      )();
                    }}
                  >
                    <h3 className={'font-medium'}>Student Details</h3>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        First Name{' '}
                        <span className="text-xs text-red-500">*</span>
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
                      <label htmlFor="email" className="text-secondaryWhite">
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
                      <label htmlFor="email" className="text-secondaryWhite">
                        Last Name{' '}
                        <span className="text-xs text-red-500">*</span>
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
                      <label htmlFor="email" className="text-secondaryWhite">
                        Email Address{' '}
                        <span className="text-xs text-red-500">*</span>
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
                      <label htmlFor="email" className="text-secondaryWhite">
                        Account Status
                        <br />
                        <span className={'text-xs italic text-red-500'}>
                          *Toggle for if you want the student cannot login to
                          the system for any reasons.
                        </span>
                      </label>
                      <Switch
                        checked={watch().accountStatus}
                        onChange={() => {
                          setValue('accountStatus', !watch().accountStatus);
                        }}
                        className={`${
                          watch().accountStatus
                            ? 'bg-primaryYellow'
                            : 'bg-primaryYellowHover'
                        }
          rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            watch().accountStatus
                              ? 'translate-x-9'
                              : 'translate-x-0'
                          }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Student Eligibility
                      </label>
                      <span className={'text-xs italic text-red-500'}>
                        *Toggle for student if it is eligible to continue
                        practicums.
                      </span>
                      <Switch
                        checked={watch().eligibility}
                        onChange={() => {
                          setValue('eligibility', !watch().eligibility);
                        }}
                        className={classNames(
                          watch().eligibility
                            ? 'bg-primaryYellow'
                            : 'bg-primaryYellowHover',
                          'rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                        )}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            watch().eligibility
                              ? 'translate-x-9'
                              : 'translate-x-0'
                          }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>

                      <div className="flex w-full items-center justify-between gap-3">
                        <Listbox
                          disabled={emailTemplate.length === 0}
                          value={
                            selectedEmailTemplate.name === ''
                              ? 'Select Template'
                              : selectedEmailTemplate.name
                          }
                          onChange={(data: any) => {
                            setSelectedEmailTemplate({
                              name: data.email_template_name,
                              objectData: { ...data },
                            });
                          }}
                        >
                          {({ open }: { open: boolean }) => (
                            <div className="relative">
                              <Listbox.Button
                                className={classNames(
                                  'flex w-[17vw] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none',
                                  emailTemplate.length === 0 &&
                                    'cursor-not-allowed opacity-50'
                                )}
                              >
                                {selectedEmailTemplate.name === ''
                                  ? 'Select Template'
                                  : selectedEmailTemplate.name}
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
                              <Listbox.Options className="absolute z-30 max-h-[100px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                                {emailTemplate.map((person, index) => (
                                  <Listbox.Option
                                    className="py-1"
                                    key={index}
                                    value={person}
                                  >
                                    {person.email_template_name}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          )}
                        </Listbox>

                        <button
                          onClick={(e) => {
                            e.preventDefault();

                            setSelectedEmailTemplate({
                              name: '',
                              objectData: {
                                email_template_name: '',
                                email_template_subject: '',
                                email_template_body: '',
                                id: 0,
                              },
                            });
                          }}
                          className="rounded bg-red-400 py-[10px] px-2 text-sm text-white"
                        >
                          Clear Selected Template
                        </button>
                        <button
                          className="buttonIcon"
                          onClick={(e) => {
                            e.preventDefault();

                            successfulNotify('Refreshed Successfully');

                            getEmailTemplate();
                          }}
                          title="Refresh Email Templates"
                        >
                          <BiRefresh />
                        </button>
                      </div>
                    </div>

                    <h3 className={'font-medium'}>Student Profile Details</h3>
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor="email" className="text-secondaryWhite">
                        Profile Image
                      </label>
                      <div className="flex w-full justify-center">
                        <Image
                          width={100}
                          height={100}
                          alt="profileImage"
                          className="rounded-full"
                          src={
                            watch().profileImage === ''
                              ? internsLogo
                              : watch().profileImage
                          }
                        />
                      </div>
                      <label className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
                        <AiOutlineFileImage
                          size={30}
                          className="mr-5 text-secondaryWhite"
                        />
                        <span>Upload Image</span>
                        <input
                          className="imageUpload"
                          type="file"
                          accept="image/png, image/jpeg"
                          title="profileImage"
                          name="profileImage"
                          onChange={async (e) => {
                            if (!e.target.files || e.target.files.length === 0)
                              return;

                            setState((prev) => {
                              return {
                                ...prev,
                                uploadingImage: true,
                              };
                            });
                            const imageFile = e.target.files[0] as File;

                            const uploadImagePayload = await imageUploader(
                              imageFile
                            );

                            if (
                              uploadImagePayload ===
                              'The resource already exists'
                            ) {
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
                      <label htmlFor="email" className="text-secondaryWhite">
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
                                'flex w-[17vw] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                              )}
                            >
                              {watch().studentStatus === 'NOT_STARTED'
                                ? 'NOT STARTED'
                                : watch().studentStatus}
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
                            <Listbox.Options className="absolute z-30 max-h-[100px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                              {studentStatus
                                .filter(
                                  (person) =>
                                    person[1] !== 'NOT_STARTED' &&
                                    person[1] !== 'APPLYING' &&
                                    person[1] !== 'APPLIED'
                                )
                                .map((person, index) => (
                                  <Listbox.Option
                                    className="py-1"
                                    key={index}
                                    value={person[1]}
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
                      <label htmlFor="email" className="text-secondaryWhite">
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
                                'flex w-[17vw] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                              )}
                            >
                              {watch().sex === '' ? 'NOT SET' : watch().sex}
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
                      <label htmlFor="email" className="text-secondaryWhite">
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
                      <label htmlFor="email" className="text-secondaryWhite">
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
                      <label htmlFor="email" className="text-secondaryWhite">
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
                      <label htmlFor="email" className="text-secondaryWhite">
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
                        'w-full rounded-md bg-primaryYellow py-2 px-1',
                        context?.userData.levelOfUser === 'STAFF'
                          ? 'cursor-not-allowed opacity-50'
                          : 'cursor-pointer'
                      )}
                      type="submit"
                      disabled={context?.userData.levelOfUser === 'STAFF'}
                      value={
                        state.isUpdating
                          ? 'Updating Student...'
                          : 'Update Student'
                      }
                    />
                  </form>

                  <div className="mt-2 w-full rounded bg-yellowBg p-1 text-center">
                    <h2 className="text-2xl font-bold text-secondaryWhite opacity-30">
                      {selectedEmailTemplate.name === ''
                        ? 'Will Not Send'
                        : 'Will Send Email'}
                    </h2>
                    <span className="text-xs text-red-500">
                      {
                        '*A selected email template will be sent to the student.'
                      }
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    address: string
  ) {
    const searchQuery = address;
    const encodedQuery = encodeURIComponent(searchQuery);
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    window.open(googleUrl, '_blank');
  }

  function getEmailTemplate() {
    axios
      .get('/api/data/templatedEmail')
      .then((res) => {
        setEmailTemplate(res.data.responsePayload);
      })
      .catch((err) => {
        errorNotify('Something went wrong!');
        console.error(err);
      });
  }

  function updateStudentUserStudentProfile(data: FormEditStudent) {
    if (objectEditStudent) {
      setState((prev) => ({ ...prev, isUpdating: true }));

      const { id } = JSON.parse(objectEditStudent);

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
          getStudentList();
          successfulNotify('Updated Successfully');

          toggleEditStudent();
          reset();
          setState((prev) => ({ ...prev, isUpdating: false }));
          setSelectedEmailTemplate({
            name: '',
            objectData: {
              email_template_name: '',
              email_template_subject: '',
              email_template_body: '',
              id: 0,
            },
          });

          if (selectedEmailTemplate.name !== '') {
            // SEND EMAIL
            const currentTime = new Date().getTime();

            const emailPayload = JSON.stringify({
              subject: selectedEmailTemplate.objectData.email_template_subject,
              message: selectedEmailTemplate.objectData.email_template_body,
              email: data.emailAddress,
              time: currentTime,
              lastName: data.lastName,
              type: 'ELIGIBILITY_EMAIL',
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
                successfulNotify('Email has been sent');
              })
              .catch((error) => {
                console.error(error);
                errorNotify('Something went wrong!');
              });
          }
        })
        .catch(() => {
          errorNotify('Something Went Wrong');

          setState((prev) => ({ ...prev, isUpdating: false }));
          setSelectedEmailTemplate({
            name: '',
            objectData: {
              email_template_name: '',
              email_template_subject: '',
              email_template_body: '',
              id: 0,
            },
          });
        });
    }
  }
}

export default EditStudent;
