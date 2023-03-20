import { errorNotify, successfulNotify } from '@/src/components/common/toast';
import { database } from '@/src/firebase/firebaseConfig';
import { Transition, Dialog } from '@headlessui/react';
import { data } from 'Data';
import { ref, remove } from 'firebase/database';
import React, { Fragment, useState } from 'react';

function DeleteCollege({
  modals,
  setModals,
  collegeDetails,
}: {
  modals: { deleteCollege: boolean; editCollege: boolean };
  setModals: React.Dispatch<
    React.SetStateAction<{
      deleteCollege: boolean;
      editCollege: boolean;
    }>
  >;
  collegeDetails: {
    collegeId: string;
    collegeName: string;
    collegePassCode: string;
  };
}) {
  const [pass, setPass] = useState('');

  return (
    <Transition appear show={modals.deleteCollege} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModals({ ...modals, deleteCollege: false })}
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
              <Dialog.Panel className=" w-[600px] transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex h-full flex-col items-center justify-center gap-7">
                  <h2 className="text-center">
                    {data.labels.deletePromptMessage}
                  </h2>
                  <input
                    type="text"
                    placeholder="Passcode"
                    className="inputBox text-center"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <div className="flex w-full justify-around">
                    <button
                      className="w-[200px] rounded border-2 border-primaryYellow py-3 px-4 text-black"
                      onClick={() =>
                        setModals({ ...modals, deleteCollege: false })
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="w-[200px] rounded bg-primaryYellow py-3 px-4 text-white"
                      onClick={deleteCollege}
                    >
                      Yes
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

  async function deleteCollege() {
    const db = database;

    if (parseInt(pass) === parseInt(collegeDetails.collegePassCode)) {
      try {
        const collegeDbRef = ref(
          db,
          `school/colleges/${collegeDetails.collegeId}`
        );
        await remove(collegeDbRef);

        successfulNotify('College Has Been Droped');
        setModals({ ...modals, deleteCollege: false });
        setPass('');
      } catch (error) {
        console.error(error);
        successfulNotify('There was a problem upon dropping the college');
      }
    } else {
      errorNotify('Incorrect Passcode');
    }
  }
}

export default DeleteCollege;
