import { errorNotify } from '@component/interface/toast/toast';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailTemplateForm } from '@validator/forms';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const [state, setState] = useState({
    isCreating: false,
    uploadingImage: false,
  });

  const [emailTemplate, setEmailTemplate] = useState<FormEmailTemplate[]>([]);
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
                  <p>df</p>

                  <button
                    onClick={() => {
                      editEmailTemplateToggle();
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
                          className={classNames(
                            'flex w-full justify-between bg-yellowBg px-4 py-4 text-left',
                            open ? 'rounded-t-md' : 'rounded-md'
                          )}
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
                        <Disclosure.Panel className="flex flex-col items-start gap-2 rounded-b-md bg-mainBgWhite px-4 py-2 text-gray-500">
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
                                Body{' '}
                                <span className="text-xs text-red-500">*</span>
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
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>

                  <h3 className={'my-5 text-center font-medium'}>
                    Email Templates
                  </h3>
                  {emailTemplateId === -1 ? (
                    <div className=" flex flex-col justify-start gap-2">
                      {emailTemplate.map((item, index) => (
                        <button key={index}>sdfsd</button>
                      ))}
                    </div>
                  ) : (
                    <div className="my-5 flex flex-col justify-start gap-2">
                      sdfsdf
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
      .get('/api/data/emailTemplate')
      .then((res) => {
        setEmailTemplate(res.data.responsePayload);
      })
      .catch((err) => {
        errorNotify('Something went wrong!');
        console.log(err);
      });
  }

  function postEmail(data: FormEmailTemplate) {
    axios
      .post('/api/data/emailTemplate', {
        data: JSON.stringify(data),
        Headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default EmailTemplate;
