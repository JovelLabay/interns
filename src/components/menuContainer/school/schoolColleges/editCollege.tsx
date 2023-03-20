import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

function EditCollege({
  modals,
  setModals,
  editCollegeDetails,
}: {
  modals: { deleteCollege: boolean; editCollege: boolean };
  setModals: React.Dispatch<
    React.SetStateAction<{
      deleteCollege: boolean;
      editCollege: boolean;
    }>
  >;
  editCollegeDetails: {
    name: string;
    id: string;
    courses: string[] | never;
  };
}) {
  return (
    <Transition appear show={modals.editCollege} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModals({ ...modals, editCollege: false })}
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
              <Dialog.Panel className="min-h-[300px] w-[600px] transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-row items-center justify-between">
                  <button
                    className="w-[100px] rounded border-2 border-primaryYellow py-2"
                    onClick={() => setModals({ ...modals, editCollege: false })}
                  >
                    Cancel
                  </button>
                  <p>Edit College</p>
                  <button className="w-[100px] rounded bg-primaryYellow py-2">
                    Done
                  </button>
                </div>
                <div className="mx-10 mt-2 flex flex-col gap-3 py-5">
                  <label htmlFor="name">College Name</label>
                  <input
                    type="text"
                    placeholder="College Name"
                    className="w-full rounded border-2 border-primaryYellow bg-mainBgWhite p-2 outline-none"
                    value={editCollegeDetails.name}
                  />
                  <label htmlFor="name">College ID</label>
                  <input
                    type="text"
                    placeholder="College ID"
                    className="w-full rounded border-2 border-primaryYellow bg-mainBgWhite p-2 outline-none"
                  />
                  <label htmlFor="name">College Courses</label>
                  <ul className="list-disc">
                    {editCollegeDetails.courses.map((course, index) => {
                      return (
                        <li
                          className="flex flex-row items-center justify-between gap-3"
                          key={index}
                        >
                          {JSON.stringify(course)}wwerwer
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditCollege;
