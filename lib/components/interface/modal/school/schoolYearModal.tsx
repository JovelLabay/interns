import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function SchoolYearModal({
  modal,
  toggleSchoolYearModal,
}: {
  modal: boolean;
  toggleSchoolYearModal: () => void;
}) {
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => toggleSchoolYearModal()}
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

        <div className="fixed inset-0">
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
              <Dialog.Panel className="w-[30vw] rounded-md bg-white p-3">
                <div className="mb-3 flex flex-row items-center justify-between">
                  <p>Export Data to CSV</p>
                  <button
                    className="rounded bg-primaryYellow p-2"
                    title="Close"
                    onClick={() => toggleSchoolYearModal()}
                  >
                    <AiOutlineCloseCircle size={20} />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-5">
                  <p className="px-10 text-sm font-thin italic text-secondaryWhite">
                    *This will export all the data that were softly deleted.
                    Once extported, It will hardly be deleted in the Database to
                    fill new data. A CSV fill will be exported containing all
                    the hardly deleted data.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SchoolYearModal;
