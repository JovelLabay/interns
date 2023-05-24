import {
  AddCompany,
  BulkAddCompanies,
} from '@component/interface/modal/school/addCompany';
import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';
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
  AiOutlineCloseCircle,
  AiOutlineSave,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineAppstoreAdd,
} from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import internsLogo from '@/assets/logo/interns_logo.png';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ViewCompanyPosition from '@component/interface/modal/school/viewCompanyPosition';

function CompaniesContainer() {
  const context = useContext(DynamicContext);
  const router = useRouter();

  const [isClose, setIsClose] = useState(false);
  const [isBulkCompany, setIsBulkCompany] = useState(false);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [companyJob, setCompanyJob] = useState<CompanyJob[]>([]);
  const [companyJobForm, setCompanyJobForm] = useState({
    job_title: '',
    job_description: '',
    job_requirements: '',
  });
  const [company, setCompany] = useState({
    companyObject: {},
    companyName: '',
    companyId: -1,
    companyJobIndex: -1,
  });
  const [modal, setModal] = useState({
    addCompany: false,
  });
  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
    companyJobForm: false,
    isEdit: -1,
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
            className={classNames(
              'rounded bg-primaryYellow p-2',
              context?.userData.levelOfUser === 'STAFF' &&
                'cursor-not-allowed opacity-50'
            )}
            disabled={context?.userData.levelOfUser === 'STAFF'}
            title="Add Company Bulk"
            onClick={() => setIsBulkCompany(!isBulkCompany)}
          >
            <AiOutlineAppstoreAdd size={20} />
          </button>
          <button
            className={classNames('rounded bg-primaryYellow p-2')}
            title="Refresh"
            onClick={() => {
              getCompanyLists();

              successfulNotify('Refreshed');
              reset();
              setCompany({
                companyName: '',
                companyId: -1,
                companyObject: {},
                companyJobIndex: -1,
              });
              setIsClose(false);
            }}
          >
            <BiRefresh size={20} />
          </button>
        </div>
      </div>

      <div className="h-[70vh] w-full overflow-auto">
        <table className="w-full text-center text-sm">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Company Logo
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Company Description
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Company address
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Company website
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Company Email
              </th>
              <th scope="col" className="min-w-[250px] max-w-[380px] px-6 py-3">
                Company Contact Person
              </th>
              <th scope="col" className="min-w-[250px] max-w-[400px] px-6 py-3">
                Date Creation
              </th>
              <th
                scope="col"
                className="sticky right-0 min-w-[130px] bg-gray-100 px-6 py-3"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {companyFilter.map((companyData: Company, index: number) => (
              <tr key={index}>
                <td className="whitespace-nowrap font-normal">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {state.isEdit !== companyData.id ? (
                    <Image
                      width={50}
                      height={50}
                      src={companyData.company_image || internsLogo}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-start justify-center gap-2">
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
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {state.isEdit !== companyData.id ? (
                    companyData.company_name
                  ) : (
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
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {state.isEdit !== companyData.id ? (
                    companyData.company_description
                  ) : (
                    <textarea
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      placeholder="Company Description"
                      {...register('company_description')}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {state.isEdit !== companyData.id ? (
                    <Link href={router.asPath} passHref>
                      <a
                        className="text-sm text-blue-500 underline"
                        onClick={(e) =>
                          handleLinkClick(e, companyData.company_address)
                        }
                      >
                        {companyData.company_address}
                      </a>
                    </Link>
                  ) : (
                    <textarea
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      placeholder="Company Address"
                      {...register('company_address')}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {state.isEdit !== companyData.id ? (
                    <Link href={companyData.company_website} passHref>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Visit Company Website
                      </a>
                    </Link>
                  ) : (
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="url"
                      placeholder="Company Website"
                      {...register('company_website')}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {state.isEdit !== companyData.id ? (
                    <Link href={`mailto:${companyData.company_email}`} passHref>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Email Company
                      </a>
                    </Link>
                  ) : (
                    <input
                      className={classNames(
                        'w-[300px] rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none'
                      )}
                      type="email"
                      placeholder="Company Email"
                      {...register('company_email')}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-normal">
                  {state.isEdit !== companyData.id ? (
                    companyData.comapny_contact_person
                  ) : (
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
                  )}
                </td>
                <td> {new Date(companyData.createdAt).toLocaleString()}</td>
                <td className={classNames('sticky right-0 bg-white px-2 py-4')}>
                  {state.isEdit === companyData.id ? (
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="cursor-pointer rounded bg-primaryYellow p-2"
                        title="Save"
                        onClick={() => {
                          handleSubmit((data) => {
                            updateCompany(companyData.id, data);
                          })();
                        }}
                      >
                        <AiOutlineSave
                          size={25}
                          className="text-secondaryBgBlack"
                        />
                      </button>
                      <button
                        className="cursor-pointer rounded border-2 border-primaryYellow p-2"
                        title="Cancel"
                        onClick={() => {
                          setState((prev) => ({
                            ...prev,
                            isEdit: -1,
                          }));
                        }}
                      >
                        <AiOutlineCloseCircle
                          size={25}
                          className="text-secondaryBgBlack"
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="cursor-pointer rounded bg-blue-400 p-2"
                        title="View"
                        onClick={() => {
                          setCompany((prev) => ({
                            ...prev,
                            companyId: companyData.id,
                            companyObject: companyData,
                          }));

                          getCompanyJob(companyData.id);
                        }}
                      >
                        <AiOutlineEye size={25} className="text-white" />
                      </button>
                      <button
                        className={classNames(
                          'cursor-pointer rounded bg-orange-400 p-2',
                          context?.userData.levelOfUser === 'STAFF' &&
                            'cursor-not-allowed opacity-50',
                          context?.userData.levelOfUser === 'ADMINISTRATOR' &&
                            'cursor-not-allowed opacity-50'
                        )}
                        disabled={
                          context?.userData.levelOfUser === 'STAFF'
                            ? true
                            : context?.userData.levelOfUser === 'ADMINISTRATOR'
                            ? true
                            : false
                        }
                        title="Edit"
                        onClick={() => {
                          setState((prev) => ({
                            ...prev,
                            isEdit: companyData.id,
                          }));

                          setValue('company_name', companyData.company_name);
                          setValue(
                            'company_description',
                            companyData.company_description
                          );
                          setValue(
                            'company_address',
                            companyData.company_address
                          );
                          setValue(
                            'company_website',
                            companyData.company_website
                          );
                          setValue('company_email', companyData.company_email);
                          setValue(
                            'comapny_contact_person',
                            companyData.comapny_contact_person
                          );
                          setValue(
                            'company_image',
                            companyData.company_image || ''
                          );
                        }}
                      >
                        <AiOutlineEdit size={25} className="text-white" />
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
                        <AiOutlineDelete size={25} className="text-white" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      <BulkAddCompanies
        modal={isBulkCompany}
        toggleAddCompanyBulk={() => setIsBulkCompany(!isBulkCompany)}
        getCompanyLists={getCompanyLists}
      />

      <ViewCompanyPosition
        modal={company.companyId === -1 ? false : true}
        handler={() =>
          setCompany({
            companyName: '',
            companyId: -1,
            companyObject: {},
            companyJobIndex: -1,
          })
        }
        company={company}
        setCompany={setCompany}
        isClose={isClose}
        setIsClose={setIsClose}
        companyJob={companyJob}
        setCompanyJob={setCompanyJob}
        companyJobForm={companyJobForm}
        postCompanyJob={postCompanyJob}
        handlerForm={handlerForm}
        state={state}
        updateCompanyJob={updateCompanyJob}
        deleteCompanyJob={deleteCompanyJob}
      />
    </div>
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
        setState((prev) => ({ ...prev, isEdit: -1 }));
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
          companyJobIndex: -1,
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
