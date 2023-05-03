import React, { Fragment } from 'react';

import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';

function InfoLegendStudent({
  modal,
  toggleInfo,
  levelOfUser,
}: {
  modal: boolean;
  toggleInfo: () => void;
  levelOfUser: [
    string,
    (
      | 'INCOMPLETE'
      | 'COMPLETE'
      | 'APPLYING'
      | 'APPLIED'
      | 'FINISHED'
      | 'NOT_STARTED'
    )
  ][];
}) {
  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden xl:block"
        onClose={() => {
          toggleInfo();
        }}
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
              <Dialog.Panel className="w-[35vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-between">
                  <button
                    onClick={() => {
                      toggleInfo();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                  <p className="font-medium">Student Statuses</p>
                </div>

                <ol className="mx-5 mt-2 text-left">
                  {levelOfUser
                    .filter((level) => level[1] !== 'NOT_STARTED')
                    .map((level, index) => {
                      const statusName = level[0]
                        .split('_')
                        .join(' ')
                        .slice(0, 1)
                        .toUpperCase();

                      const statusName2 = level[1]
                        .slice(1)
                        .split('_')
                        .join(' ');

                      const fullStatusName = statusName + statusName2;

                      return (
                        <li key={index} className="my-2 text-secondaryWhite">
                          <span
                            className={classNames(
                              'mr-2 inline-block h-3 w-3 rounded-full',
                              index === 0
                                ? 'bg-red-500'
                                : index === 1
                                ? 'bg-pink-500'
                                : index === 2
                                ? 'bg-yellow-500'
                                : index === 3
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                            )}
                          />
                          <span className="font-bold">{fullStatusName}</span>
                          {' - '}
                          {index === 0
                            ? 'Lacking of requirement submissions.'
                            : index === 1
                            ? 'Complete of requirement submissions.'
                            : index === 2
                            ? 'Seeking for internship.'
                            : index === 3
                            ? 'Applied for internship.'
                            : 'Finished internship.'}
                        </li>
                      );
                    })}
                </ol>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function InfoLegendYearSemestre({
  modal,
  toggleInfo,
}: {
  modal: boolean;
  toggleInfo: () => void;
}) {
  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden xl:block"
        onClose={() => {
          toggleInfo();
        }}
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
              <Dialog.Panel className="w-[35vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-between">
                  <button
                    onClick={() => {
                      toggleInfo();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                  <p className="font-medium">School Year & Semestre Statuses</p>
                </div>

                <div>
                  <p className="my-2 text-left text-secondaryWhite">
                    <span
                      className={classNames(
                        'mr-2 inline-block h-3 w-3 rounded-full bg-red-500'
                      )}
                    />
                    <span className="font-bold">{'Inactive'}</span>
                    {' - '}
                    {'Certain actions are restricted.'}
                  </p>
                  <p className="my-2 text-left text-secondaryWhite">
                    <span
                      className={classNames(
                        'mr-2 inline-block h-3 w-3 rounded-full bg-green-500'
                      )}
                    />
                    <span className="font-bold">{'Active'}</span>
                    {' - '}
                    {'Manipulation of the School Year & Semestre.'}
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

export { InfoLegendStudent, InfoLegendYearSemestre };
