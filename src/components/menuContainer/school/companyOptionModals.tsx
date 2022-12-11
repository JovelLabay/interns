// REACT
import React, { Fragment } from 'react';

// FIREBASE CONFIG
import { domain } from '@/src/firebase/firebaseConfig';

// FIREBASE FUNCTION
import {
  approveCompanyApplication,
  dismissCompanyApplication,
  pendingCompanyApplication,
} from '@/src/functions/firebaseDatabase';

// UI
import { Dialog, Transition } from '@headlessui/react';

// ICONS
import { AiOutlineClose } from 'react-icons/ai';

// TOAST
import { ToastContainer } from 'react-toastify';
import { notify } from '../../common/toast';

// USERFORM
import { useForm } from 'react-hook-form';

// SCHEMA VALIDATOR
import { yupResolver } from '@hookform/resolvers/yup';
import { SendEmailValidator } from '@/src/validator/SendEmailMessageValidator';
import SendEmailMessage from '@/src/components/emailMessage/sendEmailMessage';

function CompanyOptionModals({
  isOpen,
  action,
  isOptionToggle,
  uuid,
  companyEmail,
  companyName,
}: {
  isOpen: boolean;
  action: string;
  isOptionToggle: (action: string) => void;
  uuid: string;
  companyEmail: string;
  companyName: string;
}) {
  const { handleSubmit, register, formState, setValue } =
    useForm<SendEmailInterface>({
      resolver: yupResolver(SendEmailValidator),
    });

  const clearValues = () => {
    setValue('subject', '');
    setValue('greetings', '');
    setValue('introduction', '');
    setValue('bodyMessage', '');
    setValue('closing', '');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => isOptionToggle('')}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-row justify-between items-center">
                  <p className="font-semibold text-lg">
                    {action === 'Accept'
                      ? 'Accept Company'
                      : action === 'Dismiss'
                      ? 'Reject Company'
                      : 'Pending Company'}
                  </p>
                  <button
                    onClick={() => isOptionToggle('')}
                    className="rounded bg-primaryYellow p-2"
                  >
                    <AiOutlineClose color="#fff" size={20} />
                  </button>
                </div>
                <div className="my-5 mx-5">
                  {action === 'Accept' ? (
                    <SendEmailMessage
                      register={register}
                      formState={formState}
                      labelState={
                        'This is an email to confirm that you have accpeted the company.'
                      }
                    />
                  ) : action === 'Dismiss' ? (
                    <SendEmailMessage
                      register={register}
                      formState={formState}
                      labelState={
                        'This is an email to confirm that you have rejected the company.'
                      }
                    />
                  ) : (
                    <SendEmailMessage
                      register={register}
                      formState={formState}
                      labelState={
                        'This is an email to confirm that you have pending the company.'
                      }
                    />
                  )}
                </div>
                <div className="mt-5 flex items-center justify-center gap-4">
                  <button
                    onClick={() => isOptionToggle('')}
                    className="border-2 rounded border-primaryYellow px-3 py-2 text-secondaryWhite font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (action === 'Accept') {
                        handleSubmit((data) => {
                          acceptCompany(uuid, data);
                        })();
                      } else if (action === 'Dismiss') {
                        handleSubmit((data) => {
                          dismissCompany(uuid, data);
                        })();
                      } else {
                        handleSubmit((data) => {
                          pendingCompany(uuid, data);
                        })();
                      }
                    }}
                    className="rounded bg-primaryYellow px-3 py-2 text-secondaryWhite font-medium"
                  >
                    {action === 'Accept'
                      ? 'Accept'
                      : action === 'Dismiss'
                      ? 'Reject'
                      : 'Pending'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

        {/* TOAST CONTAINER */}
        <ToastContainer />
      </Dialog>
    </Transition>
  );

  // DISMISS COMPANY
  function dismissCompany(uuid: string, data: SendEmailInterface) {
    dismissCompanyApplication(uuid)
      .then((res) => {
        notify(res || 'Company Rejected');
        fetch(`${domain}/email/${companyEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyEmail,
            subject: data.subject,
            message: `
              <p>${data.greetings} ${companyName},</p>

              <p>${data.introduction}</p>
              
              <p>${data.bodyMessage}</p>

              <p>${data.closing}, Interns Team</p>
              `,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            isOptionToggle('');
            clearValues();
            notify(data.message);
          });
      })
      .catch((err) => console.error(err));
  }

  // ACCEPT COMPANY
  function acceptCompany(uuid: string, data: SendEmailInterface) {
    approveCompanyApplication(uuid)
      .then((res) => {
        notify(res || 'Company Accepted');
        fetch(`${domain}/email/${companyEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyEmail,
            subject: data.subject,
            message: `
              <h3>${data.greetings} ${companyName},</h3>

              <p>${data.introduction}</p>
              
              <p>${data.bodyMessage}</p>

              <h5>${data.closing}, Interns Team</h5>
              `,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            isOptionToggle('');
            clearValues();
            notify(data.message);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.error(err));
  }

  // PENDING COMPANY
  function pendingCompany(uuid: string, data: SendEmailInterface) {
    pendingCompanyApplication(uuid)
      .then((res) => {
        notify(res || 'Company Pending');
        fetch(`${domain}/email/${companyEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyEmail,
            subject: data.subject,
            message: `
              <p>${data.greetings} ${companyName},</p>

              <p>${data.introduction}</p>
              
              <p>${data.bodyMessage}</p>

              <p>${data.closing}, Interns Team</p>
              `,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            isOptionToggle('');
            clearValues();
            notify(data.message);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.error(err));
  }
}

export default CompanyOptionModals;
