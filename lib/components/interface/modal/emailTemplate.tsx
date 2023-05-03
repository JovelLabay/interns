import {
  errorNotify,
  successfulNotify,
  warningNotify,
} from '@component/interface/toast/toast';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailTemplateForm } from '@validator/forms';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';

function EmailTemplate({
  modal,
  editEmailTemplateToggle,
}: {
  modal: boolean;
  editEmailTemplateToggle: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormEmailTemplate>({
    mode: 'onSubmit',
    resolver: yupResolver(EmailTemplateForm),
  });

  const [isClose, setIsClose] = useState(false);
  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
  });

  const [emailTemplate, setEmailTemplate] = useState<
    FormEmailTemplateResponse[]
  >([]);
  const [emailTemplateId, setEmailTemplateId] = useState(-1);

  useEffect(() => {
    getEmailTemplate();
  }, []);

  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden xl:block"
        onClose={() => {
          editEmailTemplateToggle();

          setEmailTemplateId(-1);
          setIsClose(false);
          reset();
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
                    className={classNames('rounded bg-primaryYellow p-2')}
                    title="Refresh"
                    onClick={() => {
                      setEmailTemplateId(-1);
                      getEmailTemplate();

                      successfulNotify('Refreshed Successfully');
                      reset();
                    }}
                  >
                    <BiRefresh size={20} />
                  </button>

                  <button
                    onClick={() => {
                      editEmailTemplateToggle();

                      setEmailTemplateId(-1);
                      setIsClose(false);
                      reset();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="h-[85vh] overflow-auto py-2 pr-2 text-secondaryWhite">
                  <Disclosure>
                    {({ open }) => (
                      <div className="my-2">
                        <Disclosure.Button
                          onClick={() => setIsClose(!isClose)}
                          className={classNames(
                            'flex w-full justify-between bg-yellowBg px-4 py-4 text-left',
                            open ? 'rounded-t-md' : 'rounded-md',
                            emailTemplateId === -1
                              ? ''
                              : 'cursor-not-allowed opacity-50'
                          )}
                          disabled={emailTemplateId !== -1}
                        >
                          <span className="font-semibold text-secondaryWhite">
                            Email Template Form
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

                                handleSubmit((data) => postEmail(data))();
                              }}
                            >
                              <div className="flex w-full flex-col items-start gap-2">
                                <label
                                  htmlFor="email"
                                  className="text-secondaryWhite"
                                >
                                  Template Name{' '}
                                  <span className="text-xs text-red-500">
                                    *
                                  </span>
                                </label>
                                <input
                                  className={classNames(
                                    'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                                    {
                                      'border-red-500 bg-red-100 placeholder:text-white':
                                        errors.email_template_name?.message,
                                    }
                                  )}
                                  type="text"
                                  placeholder="Template Name"
                                  {...register('email_template_name')}
                                />
                                {errors.email_template_name?.message && (
                                  <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                                    {errors.email_template_name?.message}
                                  </p>
                                )}
                              </div>
                              <div className="flex w-full flex-col items-start gap-2">
                                <label
                                  htmlFor="email"
                                  className="text-secondaryWhite"
                                >
                                  Subject{' '}
                                  <span className="text-xs text-red-500">
                                    *
                                  </span>
                                </label>
                                <input
                                  className={classNames(
                                    'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                                    {
                                      'border-red-500 bg-red-100 placeholder:text-white':
                                        errors.email_template_subject?.message,
                                    }
                                  )}
                                  type="text"
                                  placeholder="Email Subject"
                                  {...register('email_template_subject')}
                                />
                                {errors.email_template_subject?.message && (
                                  <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                                    {errors.email_template_subject?.message}
                                  </p>
                                )}
                              </div>
                              <div className="flex w-full flex-col items-start gap-2">
                                <label
                                  htmlFor="email"
                                  className="text-secondaryWhite"
                                >
                                  Body{' '}
                                  <span className="text-xs text-red-500">
                                    *
                                  </span>
                                </label>
                                <textarea
                                  className={classNames(
                                    'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                                    {
                                      'border-red-500 bg-red-100 placeholder:text-white':
                                        errors.email_template_body?.message,
                                    }
                                  )}
                                  placeholder="Email Body"
                                  {...register('email_template_body')}
                                />
                                {errors.email_template_body?.message && (
                                  <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                                    {errors.email_template_body?.message}
                                  </p>
                                )}
                              </div>

                              <input
                                className="w-full cursor-pointer rounded bg-primaryYellow py-2 px-10"
                                value={
                                  state.isCreating
                                    ? 'Creating New College...'
                                    : 'Create Template'
                                }
                                type="submit"
                              />
                            </form>
                          </div>
                        )}
                      </div>
                    )}
                  </Disclosure>

                  <div className="my-2 flex items-center justify-between">
                    <h3 className={' font-medium'}>Email Templates</h3>

                    {emailTemplateId !== -1 && (
                      <button
                        onClick={() => {
                          setEmailTemplateId(-1);
                          setIsClose(false);
                          reset();
                        }}
                        className="w-[100px] rounded border-2 border-primaryYellow py-1 text-sm"
                      >
                        back
                      </button>
                    )}
                  </div>
                  {emailTemplateId === -1 ? (
                    <div className=" flex flex-col justify-start gap-2">
                      {emailTemplate.map((item, index) => (
                        <section
                          className="flex w-full items-center justify-between rounded bg-customBorder p-2"
                          key={index}
                        >
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              setEmailTemplateId(item.id);
                              setIsClose(false);

                              setValue(
                                'email_template_name',
                                item.email_template_name
                              );
                              setValue(
                                'email_template_subject',
                                item.email_template_subject
                              );
                              setValue(
                                'email_template_body',
                                item.email_template_body
                              );
                            }}
                          >
                            {item.email_template_name}
                          </span>

                          <button
                            className={classNames(' rounded bg-red-400 p-2')}
                            title="Delete Email Template"
                            onClick={() => deleteEmail(item.id)}
                          >
                            <AiOutlineDelete
                              size={25}
                              className="text-mainBgWhite"
                            />
                          </button>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <div className="my-5 flex flex-col justify-start gap-2">
                      <form
                        className="flex w-full flex-col items-start gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();

                          handleSubmit((data) =>
                            updateEmail(data, emailTemplateId)
                          )();
                        }}
                      >
                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="email"
                            className="text-secondaryWhite"
                          >
                            Template Name{' '}
                            <span className="text-xs text-red-500">*</span>
                          </label>
                          <input
                            className={classNames(
                              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                              {
                                'border-red-500 bg-red-100 placeholder:text-white':
                                  errors.email_template_name?.message,
                              }
                            )}
                            type="text"
                            placeholder="Template Name"
                            {...register('email_template_name')}
                          />
                          {errors.email_template_name?.message && (
                            <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                              {errors.email_template_name?.message}
                            </p>
                          )}
                        </div>
                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="email"
                            className="text-secondaryWhite"
                          >
                            Subject{' '}
                            <span className="text-xs text-red-500">*</span>
                          </label>
                          <input
                            className={classNames(
                              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                              {
                                'border-red-500 bg-red-100 placeholder:text-white':
                                  errors.email_template_subject?.message,
                              }
                            )}
                            type="text"
                            placeholder="Email Subject"
                            {...register('email_template_subject')}
                          />
                          {errors.email_template_subject?.message && (
                            <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                              {errors.email_template_subject?.message}
                            </p>
                          )}
                        </div>
                        <div className="flex w-full flex-col items-start gap-2">
                          <label
                            htmlFor="email"
                            className="text-secondaryWhite"
                          >
                            Body <span className="text-xs text-red-500">*</span>
                          </label>
                          <textarea
                            className={classNames(
                              'w-full rounded-md border-2 border-primaryYellow bg-mainBgWhite py-2 px-1 focus:outline-none',
                              {
                                'border-red-500 bg-red-100 placeholder:text-white':
                                  errors.email_template_body?.message,
                              }
                            )}
                            placeholder="Email Body"
                            {...register('email_template_body')}
                          />
                          {errors.email_template_body?.message && (
                            <p className="w-full text-ellipsis rounded bg-red-100 p-2 text-xs text-red-500">
                              {errors.email_template_body?.message}
                            </p>
                          )}
                        </div>

                        <input
                          className="w-full cursor-pointer rounded bg-primaryYellow py-2 px-10"
                          value={
                            state.isCreating
                              ? 'Updating Template...'
                              : 'Update Template'
                          }
                          type="submit"
                        />
                      </form>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

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

  function postEmail(data: FormEmailTemplate) {
    setState((prev) => ({ ...prev, isCreating: true }));

    axios
      .post('/api/data/templatedEmail', {
        data: JSON.stringify(data),
        Headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.message === 'DUPLIDATE_EMAIL_TEMPLATE') {
          warningNotify('Duplicate of email template');

          setState((prev) => ({ ...prev, isCreating: false }));
        } else {
          successfulNotify('Email Template Created!');
          reset();

          getEmailTemplate();
          setState((prev) => ({ ...prev, isCreating: false }));
          setIsClose(false);
        }
      })
      .catch(() => {
        errorNotify('Something went wrong!');

        setState((prev) => ({ ...prev, isCreating: false }));
      });
  }

  function updateEmail(data: FormEmailTemplate, id: number) {
    setState((prev) => ({ ...prev, isCreating: true }));

    axios
      .put(`/api/data/templatedEmail?id=${id}`, {
        data: JSON.stringify(data),
        Headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        successfulNotify('Email Template Updated!');

        setState((prev) => ({ ...prev, isCreating: false }));
        getEmailTemplate();
        setEmailTemplateId(-1);
      })
      .catch((err) => {
        errorNotify('Something went wrong!');

        setState((prev) => ({ ...prev, isCreating: false }));
        console.error(err);
      });
  }

  function deleteEmail(id: number) {
    axios
      .delete(`/api/data/templatedEmail?id=${id}`)
      .then(() => {
        successfulNotify('Email Template Deleted!');
        getEmailTemplate();
      })
      .catch((err) => {
        errorNotify('Something went wrong!');
        console.error(err);
      });
  }
}

export default EmailTemplate;
