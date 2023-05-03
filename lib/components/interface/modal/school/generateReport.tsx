import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { data } from '../../../../../Data';

function GenerateReport({
  modal,
  toggleGenerateReport,
}: {
  modal: boolean;
  toggleGenerateReport: () => void;
}) {
  return (
    <Transition appear show={modal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10 hidden lg:block"
        onClose={() => {
          toggleGenerateReport();
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[50vw] rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => {
                      toggleGenerateReport();
                    }}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>

                <div className={'mt-2 grid grid-cols-3 gap-3'}>
                  {data.admin.reports.map((report) => (
                    <button
                      key={report.id}
                      className={
                        'flex h-[100px] items-center justify-center rounded bg-primaryYellowHover text-sm font-semibold text-secondaryWhite duration-300 hover:bg-primaryYellow'
                      }
                    >
                      {report.name}
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default GenerateReport;
