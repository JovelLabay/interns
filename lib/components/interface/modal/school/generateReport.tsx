import { Dialog, Listbox, Switch, Transition } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import { data } from '../../../../../Data';
import classNames from 'classnames';
import { FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import { errorNotify } from '@component/interface/toast/toast';

function GenerateReport({
  modal,
  toggleGenerateReport,
}: {
  modal: boolean;
  toggleGenerateReport: () => void;
}) {
  const [toggle, setToggle] = useState({
    eligibility: false,
    studentStatus: '',
  });

  const [listCollege, setListCollege] = useState<ReturnCollegeProgram[]>([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 20,
    payloadLength: 0,
  });

  useEffect(() => {
    getCollegeList();
  }, [pagination.skip]);
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
              <Dialog.Panel className="w-[60vw] rounded-md bg-white p-3">
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
                <div className="my-3 flex items-start justify-start gap-5">
                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>Eligibility</label>
                    <Switch
                      checked={toggle.eligibility}
                      onChange={() => {
                        null;
                      }}
                      className={classNames(
                        toggle.eligibility
                          ? 'bg-primaryYellow'
                          : 'bg-primaryYellowHover',
                        'rounded-m relative inline-flex h-[38px] w-[74px] shrink-0 rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          toggle.eligibility ? 'translate-x-9' : 'translate-x-0'
                        }
            rounded-m pointer-events-none inline-block h-[34px] w-[34px] transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>

                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>
                      Student Status
                    </label>
                    <Listbox
                      value={'asdasd'}
                      onChange={(data: any) => {
                        null;
                      }}
                    >
                      {({ open }: { open: boolean }) => (
                        <div className="relative">
                          <Listbox.Button
                            className={classNames(
                              'flex w-[200px] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                            )}
                          >
                            asdasd
                            <FiChevronDown
                              size={30}
                              className={classNames(
                                'text-secondaryWhite duration-300',
                                {
                                  'rotate-180': open,
                                }
                              )}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-30 max-h-[100px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                            {data.admin.reports.map((person, index) => (
                              <Listbox.Option
                                className="py-1"
                                key={index}
                                value={person}
                              >
                                {person.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>
                  </div>

                  <div className="flex flex-col items-start justify-end gap-1">
                    <label className={'text-left text-sm'}>
                      College Department
                    </label>
                    <Listbox
                      value={'asdasd'}
                      onChange={(data: any) => {
                        null;
                      }}
                    >
                      {({ open }: { open: boolean }) => (
                        <div className="relative">
                          <Listbox.Button
                            className={classNames(
                              'flex w-[200px] items-center justify-between rounded-md border-2 border-primaryYellow bg-mainBgWhite px-2 py-2 outline-none'
                            )}
                          >
                            asdasd
                            <FiChevronDown
                              size={30}
                              className={classNames(
                                'text-secondaryWhite duration-300',
                                {
                                  'rotate-180': open,
                                }
                              )}
                            />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-30 max-h-[100px] w-full overflow-auto rounded-md bg-white p-2 text-left shadow-md hover:cursor-pointer">
                            {listCollege.map((person, index) => (
                              <Listbox.Option
                                className="py-1"
                                key={index}
                                value={person}
                              >
                                {person.college_department_name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      )}
                    </Listbox>
                  </div>
                </div>

                <div className="h-[60vh] overflow-auto">
                  <table className="w-full text-center text-sm ">
                    <thead className="bg-gray-100 text-xs uppercase">
                      <tr>
                        <th scope="col" className="px-3 py-3">
                          No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          College Logo
                        </th>
                        <th
                          scope="col"
                          className="min-w-[380px] max-w-[380px] px-6 py-3"
                        >
                          Department Name
                        </th>
                        <th
                          scope="col"
                          className="min-w-[380px] max-w-[380px] px-6 py-3"
                        >
                          Department Description
                        </th>
                        <th
                          scope="col"
                          className="min-w-[380px] max-w-[380px] px-6 py-3"
                        >
                          Department Coordinatior
                        </th>
                        <th
                          scope="col"
                          className="min-w-[380px] max-w-[380px] px-6 py-3"
                        >
                          Program Name
                        </th>
                        <th
                          scope="col"
                          className="min-w-[200px] max-w-[380px] px-6 py-3"
                        >
                          Abbreviated Program Name
                        </th>
                        <th
                          scope="col"
                          className="min-w-[200px] max-w-[380px] px-6 py-3"
                        >
                          Date Creation
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function getCollegeList() {
    axios
      .get(`/api/data/collegeProgram?skip=${pagination.skip}`)
      .then((res) => {
        setListCollege(res.data.responsePayload);

        const length = res.data.responsePayloadLength;

        setPagination((prev) => ({ ...prev, payloadLength: length }));
      })
      .catch((err) => {
        errorNotify("Something's wrong. Please try again later.");
        console.error(err);
      });
  }
}

export default GenerateReport;
