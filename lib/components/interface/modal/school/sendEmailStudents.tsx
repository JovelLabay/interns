import {
  errorNotify,
  successfulNotify,
} from '@component/interface/toast/toast';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { BiRefresh } from 'react-icons/bi';

function SendEmailStudents({
  modal,
  toggleSendEmail,
  data,
  setSendEmail,
}: {
  modal: boolean;
  toggleSendEmail: () => void;
  data: {
    emailAddress: string;
    lastName: string;
  };
  setSendEmail: React.Dispatch<
    React.SetStateAction<{
      lastName: string;
      emailAddress: string;
    }>
  >;
}) {
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState({
    name: '',
    objectData: {} as FormEmailTemplateResponse,
  });
  const [emailTemplate, setEmailTemplate] = useState<
    FormEmailTemplateResponse[]
  >([]);
  const [state, setState] = useState({
    isUpdating: false,
    uploadingImage: false,
  });

  useEffect(() => {
    getEmailTemplate();
  }, []);

  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleSendEmail();

          setSendEmail({
            emailAddress: '',
            lastName: '',
          });

          setSelectedEmailTemplate({
            name: '',
            objectData: {} as FormEmailTemplateResponse,
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
                <div className="flex flex-row items-center justify-between">
                  <button
                    className="buttonIcon"
                    onClick={() => {
                      successfulNotify('Refreshed Successfully');

                      getEmailTemplate();
                    }}
                    title="Refresh Email Templates"
                  >
                    <BiRefresh />
                  </button>
                  <button
                    onClick={() => {
                      toggleSendEmail();

                      setSendEmail({
                        emailAddress: '',
                        lastName: '',
                      });

                      setSelectedEmailTemplate({
                        name: '',
                        objectData: {} as FormEmailTemplateResponse,
                      });
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="relative my-2 h-[85vh] overflow-auto pr-2 text-secondaryWhite">
                  {emailTemplate.map((template) => (
                    <section
                      key={template.id}
                      className={classNames(
                        'mb-2 cursor-pointer rounded-md py-4 px-2 font-bold',
                        selectedEmailTemplate.name ===
                          template.email_template_name
                          ? 'bg-primaryYellow'
                          : 'bg-yellowBg'
                      )}
                      onClick={() => {
                        setSelectedEmailTemplate({
                          name: template.email_template_name,
                          objectData: template,
                        });
                      }}
                    >
                      {template.email_template_name}
                    </section>
                  ))}
                  <button
                    className={classNames(
                      'absolute bottom-2 w-full rounded-md bg-primaryYellow py-2 px-1',
                      selectedEmailTemplate.name === ''
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    )}
                    onClick={sendEmail}
                    disabled={selectedEmailTemplate.name === '' ? true : false}
                  >
                    {state.isUpdating ? 'Sending Email' : 'Send Email'}
                  </button>
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

  function sendEmail() {
    setState((prev) => ({ ...prev, isUpdating: true }));

    const currentTime = new Date().getTime();

    const emailPayload = JSON.stringify({
      subject: selectedEmailTemplate.objectData.email_template_subject,
      message: selectedEmailTemplate.objectData.email_template_body,
      email: data.emailAddress,
      time: currentTime,
      lastName: data.lastName,
      type: 'OTHERS',
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

        setSendEmail({
          emailAddress: '',
          lastName: '',
        });

        setSelectedEmailTemplate({
          name: '',
          objectData: {} as FormEmailTemplateResponse,
        });
        setState((prev) => ({ ...prev, isUpdating: false }));
      })
      .catch((error) => {
        console.error(error);
        errorNotify('Something went wrong!');

        setState((prev) => ({ ...prev, isUpdating: false }));
      });
  }
}

export default SendEmailStudents;
