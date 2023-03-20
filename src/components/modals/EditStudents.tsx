import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

function EditStudents({
  isEdit,
  setIsEdit,
}: {
  isEdit: {
    editStatus: boolean;
    editActiveCollege: string;
    search: string;
  };
  setIsEdit: React.Dispatch<
    React.SetStateAction<{
      editStatus: boolean;
      editActiveCollege: string;
      search: string;
    }>
  >;
}) {
  return (
    <Transition appear show={isEdit.editStatus} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeHandler}>
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
              <Dialog.Panel className="h-auto w-[500px] overflow-auto rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                    onClick={closeHandler}
                  >
                    Close
                  </button>
                </div>
                <div className="my-4 mx-10">dfgdfgdfg</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function closeHandler() {
    setIsEdit((prev) => {
      return {
        ...prev,
        editStatus: false,
      };
    });
  }
}

export default EditStudents;
