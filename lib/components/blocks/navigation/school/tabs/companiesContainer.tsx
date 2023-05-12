import AddCompany from '@component/interface/modal/school/addCompany';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';
import { Disclosure } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DynamicContext } from '@redux/context';
import { imageUploader } from '@utils/uploaderFunction';
import { CompanyForm } from '@validator/forms';
import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineDelete,
  AiOutlineFileImage,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';
import internsLogo from '@/assets/logo/interns_logo.png';

function CompaniesContainer() {
  const context = useContext(DynamicContext);

  const [isClose, setIsClose] = useState(false);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [companyJob, setCompanyJob] = useState<CompanyJob[]>([]);
  const [companyJobIndex, setCompanyJobIndex] = useState(-1);
  const [companyJobForm, setCompanyJobForm] = useState({
    job_title: '',
    job_description: '',
    job_requirements: '',
  });
  const [company, setCompany] = useState({
    companyObject: {},
    companyName: '',
    companyId: -1,
  });
  const [modal, setModal] = useState({
    addCompany: false,
  });
  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
    companyJobForm: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<Company>({
    mode: 'onSubmit',
    resolver: yupResolver(CompanyForm),
  });

  const companyFilter = useMemo(() => {
    return companyList.filter((companyDetail) => {
      const regex = new RegExp(company.companyName.toLocaleLowerCase(), 'gi');

      return companyDetail.company_name.match(regex);
    });
  }, [company.companyName, companyList]);

  useEffect(() => {
    getCompanyLists();
  }, []);

  return (
    <div className="mx-28 flex h-[80vh] flex-col gap-2 rounded bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <div className="flex items-center justify-center gap-3 text-secondaryWhite">
          <p className={'font-bold'}>Manage Companies</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <input
            className={classNames(
              'w-[250px] rounded-md border-2 border-primaryYellow bg-mainBgWhite p-2 text-sm focus:outline-none'
            )}
            type="text"
            placeholder="Search Company Name..."
            value={company.companyName}
            onChange={(e) =>
              setCompany((prev) => ({ ...prev, companyName: e.target.value }))
            }
          />
          <button
            className={classNames(
              'rounded bg-primaryYellow p-2',
              context?.userData.levelOfUser === 'STAFF' &&
                'cursor-not-allowed opacity-50'
            )}
            disabled={context?.userData.levelOfUser === 'STAFF'}
            title="Add Company"
            onClick={() => toggleAddCompany()}
          >
            <AiOutlinePlusCircle size={20} />
          </button>
          <button
            className={classNames('rounded bg-primaryYellow p-2')}
            title="Refresh"
            onClick={() => {
              getCompanyLists();

              successfulNotify('Refreshed');
              reset();
              setCompany({ companyName: '', companyId: -1, companyObject: {} });
              setIsClose(false);
            }}
          >
            <BiRefresh size={20} />
          </button>
        </div>
      </div>

      <div className="grid h-[70vh] w-full grid-cols-3 overflow-auto text-secondaryWhite">
        <div className="flex h-full flex-col items-center justify-start gap-2 overflow-auto p-2">
          {companyFilter.map((companyData: Company) => (
            <section
              key={companyData.id}
              className={classNames(
                'flex w-full items-start justify-between gap-1 rounded-md p-2',
                companyData.id === company.companyId
                  ? 'bg-customBorder'
                  : 'bg-mainBgWhite'
              )}
            >
              <button
                className="flex w-full flex-col items-start justify-start gap-1"
                onClick={() => {
                  setCompany((prev) => ({
                    ...prev,
                    companyId: companyData.id,
                  }));
                  setCompanyJobIndex(-1);

                  setValue('company_name', companyData.company_name);
                  setValue(
                    'company_description',
                    companyData.company_description
                  );
                  setValue('company_address', companyData.company_address);
                  setValue('company_website', companyData.company_website);
                  setValue('company_email', companyData.company_email);
                  setValue(
                    'comapny_contact_person',
                    companyData.comapny_contact_person
                  );
                  setValue('company_image', companyData.company_image || '');

                  getCompanyJob(companyData.id);
                }}
              >
                <h3 className="font-bold">{companyData.company_name}</h3>
                <p className="text-left text-sm italic">
                  {companyData.comapny_contact_person}
                </p>
                <p className="text-xs font-light italic">
                  {new Date(companyData.createdAt).toLocaleString()}
                </p>
              </button>

              <button
                className={classNames(
                  ' rounded bg-red-400 p-2',
                  context?.userData.levelOfUser === 'STAFF' &&
                    'cursor-not-allowed opacity-50'
                )}
                title="Delete Company"
                disabled={context?.userData.levelOfUser === 'STAFF'}
                onClick={() => deleteCompany(companyData.id)}
              >
                <AiOutlineDelete size={22} className="text-mainBgWhite" />
              </button>
            </section>
          ))}
        </div>
        <div className="col-span-2 grid h-full grid-cols-2 gap-2 overflow-hidden p-2">
          {company.companyId !== -1 && (
            <>
              <div className="h-full overflow-auto pr-1">
                <h3 className="rounded-sm bg-yellowBg p-2 font-semibold">
                  Company Details
                </h3>

                <form
                  className="flex flex-col items-center justify-start gap-5 pt-5"
                  onSubmit={(e) => {
                    e.preventDefault();

                    handleSubmit((data) => {
                      updateCompany(company.companyId, data);
                    })();
                  }}
                >
                  <Image
                    width={70}
                    height={70}
                    src={watch().company_image || internsLogo}
                    className="rounded-full"
                  />

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Name{' '}
                      <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.company_name?.message,
                        }
                      )}
                      type="text"
                      placeholder="Company Name"
                      {...register('company_name')}
                    />
                    {errors.company_name?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.company_name?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Description
                    </label>
                    <textarea
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      placeholder="Company Description"
                      {...register('company_description')}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center gap-2">
                    <label htmlFor="email" className=" text-secondaryWhite">
                      Company Image
                    </label>

                    <label className="flex w-[300px] cursor-pointer items-center justify-center rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none">
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
                            uploadImagePayload === 'The resource already exists'
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
                            setValue('company_image', uploadImagePayload);
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
                      <p className="w-[300px] text-ellipsis rounded bg-green-100 p-2 text-xs">
                        Uploading Image...
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Address
                    </label>
                    <textarea
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      placeholder="Company Address"
                      {...register('company_address')}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Website
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="url"
                      placeholder="Company Website"
                      {...register('company_website')}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Email
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="email"
                      placeholder="Company Email"
                      {...register('company_email')}
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email" className="text-secondaryWhite">
                      Company Contact Person{' '}
                      <span className="text-xs text-red-500">*</span>
                    </label>
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                        {
                          'border-red-500 bg-red-100 placeholder:text-white':
                            errors.comapny_contact_person?.message,
                        }
                      )}
                      type="text"
                      placeholder="Contact Person Name"
                      {...register('comapny_contact_person')}
                    />
                    {errors.comapny_contact_person?.message && (
                      <p className="w-[300px] text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                        {errors.comapny_contact_person?.message}
                      </p>
                    )}
                  </div>

                  <input
                    disabled={
                      context?.userData.levelOfUser === 'STAFF'
                        ? true
                        : context?.userData.levelOfUser === 'ADMINISTRATOR'
                        ? true
                        : false
                    }
                    className={classNames(
                      'cursor-pointer rounded bg-primaryYellow py-2 px-10',
                      context?.userData.levelOfUser === 'STAFF' &&
                        'cursor-not-allowed opacity-50',
                      context?.userData.levelOfUser === 'ADMINISTRATOR' &&
                        'cursor-not-allowed opacity-50'
                    )}
                    value={
                      state.isCreating
                        ? 'Updating Company...'
                        : 'Update Company'
                    }
                    type="submit"
                  />
                </form>
              </div>
              <div className="h-full overflow-auto pr-1">
                <Disclosure>
                  {({ open }) => (
                    <div className="my-2">
                      <Disclosure.Button
                        onClick={() => {
                          setIsClose(!isClose);
                          setCompanyJobIndex(-1);
                        }}
                        className={classNames(
                          'flex w-full justify-between bg-yellowBg px-4 py-4 text-left',
                          open ? 'rounded-t-md' : 'rounded-md'
                        )}
                      >
                        <span className="font-semibold text-secondaryWhite">
                          Company Internship Listing Form
                        </span>
                        <FiChevronDown
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-primaryYellow duration-300`}
                        />
                      </Disclosure.Button>
                      {isClose && (
                        <div className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
                          <form
                            className="flex w-full flex-col items-start gap-2"
                            onSubmit={(e) => {
                              e.preventDefault();

                              if (companyJobForm.job_title === '') {
                                warningNotify('Job Title is required!');
                              } else if (
                                companyJobForm.job_requirements === ''
                              ) {
                                warningNotify('Job Requirements is required!');
                              } else {
                                postCompanyJob(company.companyId);
                              }
                            }}
                          >
                            <div className="flex w-full flex-col items-start gap-2">
                              <label
                                htmlFor="email"
                                className="text-secondaryWhite"
                              >
                                Position{' '}
                                <span className="text-xs text-red-500">*</span>
                              </label>
                              <input
                                className={classNames(
                                  'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                )}
                                type="text"
                                placeholder="Position"
                                value={companyJobForm.job_title}
                                name="job_title"
                                onChange={(e) => handlerForm('job_title', e)}
                              />
                            </div>
                            <div className="flex w-full flex-col items-start gap-2">
                              <label
                                htmlFor="email"
                                className="text-secondaryWhite"
                              >
                                Position Description
                              </label>
                              <textarea
                                className={classNames(
                                  'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                )}
                                placeholder="Position Description"
                                name="job_description"
                                value={companyJobForm.job_description}
                                onChange={(e) =>
                                  handlerForm('job_description', e)
                                }
                              />
                            </div>
                            <div className="flex w-full flex-col items-start gap-2">
                              <label
                                htmlFor="email"
                                className="text-secondaryWhite"
                              >
                                Position Requirements
                                <span className="text-xs text-red-500">*</span>
                              </label>
                              <span className="text-xs font-light italic text-red-500">
                                {
                                  ' Please use this | as the divider of the requirements.'
                                }
                              </span>
                              <textarea
                                className={classNames(
                                  'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                )}
                                placeholder="Position Requirements"
                                name="job_requirements"
                                value={companyJobForm.job_requirements}
                                onChange={(e) =>
                                  handlerForm('job_requirements', e)
                                }
                              />
                            </div>

                            <input
                              className="w-full cursor-pointer rounded bg-primaryYellow py-2 text-xs"
                              value={
                                state.companyJobForm
                                  ? 'Creating New Company Position Listing...'
                                  : 'Create New Company Position Listing'
                              }
                              type="submit"
                            />
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </Disclosure>

                {companyJob.map((job, index) => (
                  <Disclosure key={job.id}>
                    {() => (
                      <div className="my-2">
                        <Disclosure.Button
                          onClick={() => setCompanyJobIndex(index)}
                          className={classNames(
                            'flex w-full justify-between bg-primaryYellowHover px-4 py-4 text-left',
                            companyJobIndex === index
                              ? 'rounded-t-md'
                              : 'rounded-md'
                          )}
                        >
                          <span className="font-semibold text-secondaryWhite">
                            {`(${index + 1}) `}
                            {job.job_title}
                          </span>
                          <FiChevronDown
                            className={`${
                              companyJobIndex === index
                                ? 'rotate-180 transform'
                                : ''
                            } h-5 w-5 text-primaryYellow duration-300`}
                          />
                        </Disclosure.Button>
                        {companyJobIndex === index && (
                          <div className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
                            <form
                              className="flex w-full flex-col items-start gap-2"
                              onSubmit={(e) => {
                                e.preventDefault();

                                if (companyJob[index].job_title === '') {
                                  warningNotify('Job Title is required!');
                                } else if (
                                  companyJob[index].job_requirements === ''
                                ) {
                                  warningNotify(
                                    'Job Requirements is required!'
                                  );
                                } else {
                                  updateCompanyJob(
                                    company.companyId,
                                    job.id,
                                    companyJob[index]
                                  );
                                }
                              }}
                            >
                              <div className="flex w-full flex-col items-start gap-2">
                                <label
                                  htmlFor="Job Title"
                                  className="text-secondaryWhite"
                                >
                                  Position{' '}
                                  <span className="text-xs text-red-500">
                                    *
                                  </span>
                                </label>
                                <input
                                  className={classNames(
                                    'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                  )}
                                  type="text"
                                  placeholder="Position"
                                  value={companyJob[index].job_title}
                                  onChange={(e) => {
                                    const newJob = [...companyJob];
                                    newJob[index].job_title = e.target.value;
                                    setCompanyJob(newJob);
                                  }}
                                  name="job_title"
                                />
                              </div>
                              <div className="flex w-full flex-col items-start gap-2">
                                <label
                                  htmlFor="email"
                                  className="text-secondaryWhite"
                                >
                                  Position Description
                                </label>
                                <textarea
                                  className={classNames(
                                    'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                  )}
                                  placeholder="Position Description"
                                  name="job_description"
                                  value={companyJob[index].job_description}
                                  onChange={(e) => {
                                    const newJob = [...companyJob];
                                    newJob[index].job_description =
                                      e.target.value;
                                    setCompanyJob(newJob);
                                  }}
                                />
                              </div>
                              <div className="flex w-full flex-col items-start gap-2">
                                <label
                                  htmlFor="email"
                                  className="text-secondaryWhite"
                                >
                                  Position Requirements
                                  <span className="text-xs text-red-500">
                                    *
                                  </span>
                                </label>
                                <span className="text-xs font-light italic text-red-500">
                                  {
                                    ' Please use this | as the divider of the requirements.'
                                  }
                                </span>
                                <textarea
                                  className={classNames(
                                    'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                                  )}
                                  placeholder="Position Requirements"
                                  name="job_requirements"
                                  value={companyJob[index].job_requirements}
                                  onChange={(e) => {
                                    const newJob = [...companyJob];
                                    newJob[index].job_requirements =
                                      e.target.value;
                                    setCompanyJob(newJob);
                                  }}
                                />
                              </div>

                              <div className="flex w-full items-center justify-center gap-2">
                                <input
                                  className="w-full cursor-pointer rounded bg-primaryYellow py-2 text-xs"
                                  value={
                                    state.companyJobForm
                                      ? 'Updating Company Position Listing...'
                                      : 'Update Company Position Listing'
                                  }
                                  type="submit"
                                />

                                <button
                                  className="w-[50%] cursor-pointer rounded bg-red-400 py-2 text-xs text-white"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    deleteCompanyJob(
                                      company.companyId,
                                      companyJob[index].id
                                    );
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AddCompany
        modal={modal.addCompany}
        toggleAddCompany={toggleAddCompany}
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        reset={reset}
        errors={errors}
        watch={watch}
        getCompanyLists={getCompanyLists}
      />
    </div>
  );

  function toggleAddCompany() {
    setModal((prev) => ({ ...prev, addCompany: !prev.addCompany }));
    reset();
  }

  function handlerForm(
    name: string,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setCompanyJobForm((prev) => ({ ...prev, [name]: e.target.value }));
  }

  // COMPANY
  function getCompanyLists() {
    axios
      .get('/api/data/company')
      .then((res) => {
        setCompanyList(res.data.responsePayload);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function updateCompany(id: number, data: Company) {
    setState((prev) => ({ ...prev, isCreating: true }));

    axios
      .put(`/api/data/company?id=${id}`, {
        Headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      .then(() => {
        setState((prev) => ({ ...prev, isCreating: false }));

        getCompanyLists();
        successfulNotify('Successfully updated company!');
      })
      .catch(() => {
        setState((prev) => ({ ...prev, isCreating: false }));

        errorNotify('Failed to update company!');
      });
  }

  function deleteCompany(id: number) {
    warningNotify('Deleting company...');

    axios
      .delete(`/api/data/company?id=${id}`)
      .then(() => {
        getCompanyLists();
        successfulNotify('Successfully deleted company!');

        reset();
        setCompany({
          companyName: '',
          companyId: -1,
          companyObject: {},
        });
      })
      .catch(() => {
        errorNotify('Failed to delete company!');
      });
  }

  // COMPANY JOBS
  function postCompanyJob(companyId: number) {
    setState((prev) => ({ ...prev, companyJobForm: true }));

    axios
      .post(`/api/data/companyJob?companyId=${companyId}`, {
        Headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyJobForm),
      })
      .then(() => {
        getCompanyJob(companyId);
        setState((prev) => ({ ...prev, companyJobForm: false }));
        setIsClose(false);

        successfulNotify('Successfully added new company position listing!');
        setCompanyJobForm({
          job_title: '',
          job_description: '',
          job_requirements: '',
        });
      })
      .catch(() => {
        errorNotify('Failed to add new company position listing!');
      });
  }

  function getCompanyJob(companyId: number) {
    axios
      .get(`/api/data/companyJob?companyId=${companyId}`)
      .then((res) => {
        setCompanyJob(res.data.responsePayload);
      })
      .catch((err) => {
        errorNotify("Sorry, we can't get the company position listing!");

        console.error(err);
      });
  }

  function deleteCompanyJob(companyId: number, id: number) {
    warningNotify('Deleting company position listing...');

    axios
      .delete(`/api/data/companyJob?id=${id}`)
      .then(() => {
        successfulNotify('Deleted company position listing!');
        getCompanyJob(companyId);
      })
      .catch((err) => {
        errorNotify("Sorry, we can't delete the company position listing!");
        console.error(err);
      });
  }

  function updateCompanyJob(companyId: number, id: number, data: CompanyJob) {
    setState((prev) => ({ ...prev, companyJobForm: true }));

    axios
      .put(`/api/data/companyJob?id=${id}`, {
        Headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(() => {
        setState((prev) => ({ ...prev, companyJobForm: false }));

        successfulNotify('Updated company position listing!');
        getCompanyJob(companyId);
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, companyJobForm: false }));
        errorNotify("Sorry, we can't update the company position listing!");
        console.error(error);
      });
  }
}

export default CompaniesContainer;
