import { DynamicContext } from '@/src/contexts/context';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, useContext } from 'react';

function SearchItem({
  addRemoveModal,
  addModalToggle3,
}: {
  addRemoveModal: boolean;
  addModalToggle3: () => void;
}) {
  const context = useContext(DynamicContext);

  return (
    <>
      <Transition appear show={addRemoveModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={addModalToggle3}>
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
                <Dialog.Panel
                  className={classNames(
                    'w-[900px] bg-white h-[700px] p-3 rounded-md',
                    { 'bg-mainBgBlack': context?.isDarkMode }
                  )}
                >
                  sfsdfsdf
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SearchItem;
