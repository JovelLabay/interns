import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';

function submittedDocument({
  modal,
  toggleSubmittedDoc,
}: {
  modal: boolean;
  toggleSubmittedDoc: () => void;
}) {
  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden xl:block"
        onClose={() => {
          toggleSubmittedDoc();
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
                <div className="flex flex-row items-center justify-end text-secondaryWhite">
                  <button
                    onClick={() => {
                      toggleSubmittedDoc();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="h-[85vh] overflow-auto py-2 pr-2 text-secondaryWhite">
                  <h3 className={'text-center font-medium'}>
                    Submitted Documents
                  </h3>
                  <div className="flex flex-row justify-center gap-2 overflow-auto pb-2">
                    <button
                      className={classNames(
                        'rounded bg-blue-500 p-2 text-white'
                      )}
                      title="sdfs"
                    >
                      <AiOutlineFilePdf size={20} />
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default submittedDocument;
