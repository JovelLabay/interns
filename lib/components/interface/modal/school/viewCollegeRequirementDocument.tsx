import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

function ViewCollegeRequirementDocument({
  subModal,
  toggleViewRequirementDocument,
  docxFile,
}: {
  subModal: boolean;
  toggleViewRequirementDocument(url?: string): void;
  docxFile: string;
}) {
  return (
    <Transition appear show={subModal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 block"
        onClose={() => {
          toggleViewRequirementDocument('');
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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[100vw] rounded-md bg-white p-3  xl:w-[55vw]">
                <div className="flex flex-row items-center justify-end text-secondaryWhite">
                  <button
                    onClick={() => {
                      toggleViewRequirementDocument('');
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className="h-[85vh] overflow-auto py-2 pr-2 text-secondaryWhite">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                      docxFile
                    )}`}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ViewCollegeRequirementDocument;
