import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';

import internsLogo from '../../../public/logo/interns_logo.png';

import Image from 'next/image';

import { DynamicContext } from '@/src/contexts/context';

// STATIC DATA
import { data } from 'Data';
import classNames from 'classnames';

function AddInternships({
  addRemoveModal,
  addModalToggle,
}: {
  addRemoveModal: boolean;
  addModalToggle: () => void;
}) {
  const context = useContext(DynamicContext);

  return (
    <>
      <Transition appear show={addRemoveModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={addModalToggle}>
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
                <Dialog.Panel
                  className={classNames(
                    'w-[700px] bg-white h-[600px] p-3 rounded-md overflow-auto',
                    { 'bg-secondaryBgBlack': context?.isDarkMode }
                  )}
                >
                  <div className="flex flex-row justify-between items-center">
                    <button
                      onClick={addModalToggle}
                      className="border-2 rounded border-primaryYellow py-1 w-[100px]"
                    >
                      Cancel
                    </button>
                    <Image
                      src={internsLogo}
                      width={40}
                      height={40}
                      style={{ borderRadius: '100%' }}
                    />
                    <button
                      onClick={addModalToggle}
                      className=" rounded bg-primaryYellow py-1 w-[100px]"
                    >
                      Post
                    </button>
                  </div>
                  <div className="mt-4">
                    <p>
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddInternships;
