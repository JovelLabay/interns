// REACT
import React, { Fragment, useState } from 'react';

// ICONS
import {
  AiOutlineCheckCircle,
  AiOutlinePlusCircle,
  AiOutlineUnorderedList,
  AiOutlineDelete,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

// TOAST
import { ToastContainer } from 'react-toastify';
import { notify } from '@/src/components/common/toast';

// STATIC DATA
import { data } from 'Data';

// OTHERS
import classNames from 'classnames';

// FIREBASE FUNCTIONS
import {
  addNewUser,
  updateCurrentNumber,
  deleteCurrentNumber,
} from '@/src/functions/firebaseDatabase';

// USEFORM
import { useForm } from 'react-hook-form';

// SCHEMA VALIDATOR
import { SchoolNumberUsers } from '@/src/validator/LogSignValidator';
import { yupResolver } from '@hookform/resolvers/yup';

// UI
import { Listbox } from '@headlessui/react';
import { Tab } from '@headlessui/react';
import { Dialog, Transition } from '@headlessui/react';

// REACT
import { FiChevronDown } from 'react-icons/fi';

function AddUsers({
  addRemoveModal,
  addModalToggle,
  userList,
  userCurrentNumber,
}: {
  addRemoveModal: boolean;
  addModalToggle: () => void;
  userList: object;
  userCurrentNumber: string;
}) {
  // SCHEMA VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolRegistrationInterface>({
    resolver: yupResolver(SchoolNumberUsers),
    defaultValues: {
      number: '+63',
    },
  });

  const values: [string, AddUserInterface][] = Object.entries(userList) || [];

  const [networkProvider, setNetworkProvider] = useState('Select Network');

  const addUserHandler = (data: SchoolRegistrationInterface) => {
    const date = new Date().toLocaleString();

    const isUnique = values.find((value) => value[1].number === data.number);
    if (isUnique) {
      notify('error, Number already exist');
    } else if (networkProvider === 'Select Network') {
      notify('error, Select Network Provider');
    } else {
      addNewUser(data.number, networkProvider, date)
        .then(() => {
          updateCurrentNumber(data.number)
            .then(() => {
              reset({
                number: '+63',
              });
              setNetworkProvider('Select Network'),
                notify('User Number has been updated successfully');
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Transition appear show={addRemoveModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={addModalToggle}>
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
                <Dialog.Panel className="w-[700px] bg-white h-[600px] p-3 rounded-md overflow-auto">
                  <div className="flex flex-row justify-start items-center">
                    <button
                      onClick={addModalToggle}
                      className="border-2 rounded border-primaryYellow py-1 w-[100px]"
                    >
                      Close
                    </button>
                  </div>
                  <div className="mt-4">
                    <Tab.Group>
                      <Tab.List className="flex justify-between bg-mainBgWhite rounded py-2">
                        {data.schoolDashBoardHeaderManageUsers.map(
                          (item, index) => (
                            <Tab
                              key={index}
                              className={({ selected }) =>
                                classNames(
                                  'flex flex-row items-center justify-center gap-5 w-full mx-2',
                                  selected
                                    ? 'bg-primaryYellow py-2 rounded'
                                    : 'bg-mainBgWhite py-2 rounded'
                                )
                              }
                            >
                              {item.id === 1 ? (
                                <AiOutlinePlusCircle size={20} />
                              ) : (
                                <AiOutlineUnorderedList size={20} />
                              )}
                              {item.name}
                            </Tab>
                          )
                        )}
                      </Tab.List>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel className="flex flex-col justify-center items-center my-10 gap-5">
                          <label className="text-secondaryWhite">
                            *Add the number here for OTP during authentication
                            of a new user
                          </label>
                          <input
                            className="bg-mainBgWhite border-2 w-[300px] border-primaryYellow rounded-md py-2 px-1 focus:outline-none"
                            type="text"
                            placeholder="+63 ... .... ..."
                            {...register('number')}
                          />
                          {errors.number && (
                            <p className="text-red-500 text-sm">
                              {errors.number.message}
                            </p>
                          )}
                          <div className="flex flex-col">
                            <label htmlFor="" className="inputlabel">
                              Network Provider
                            </label>
                            <Listbox
                              value={networkProvider}
                              onChange={(value) => setNetworkProvider(value)}
                            >
                              {({ open }: { open: boolean }) => (
                                <div className="relative">
                                  <Listbox.Button className="bg-mainBgWhite outline-none px-2 py-3 rounded-md border-2 border-primaryYellow w-[300px] flex justify-between ">
                                    {networkProvider}
                                    <FiChevronDown
                                      size={30}
                                      className={classNames(
                                        'duration-300 text-secondaryWhite',
                                        {
                                          'rotate-180': open,
                                        }
                                      )}
                                    />
                                  </Listbox.Button>
                                  <Listbox.Options className="absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] z-30 overflow-auto">
                                    {data.networkProvider.map((person) => (
                                      <Listbox.Option
                                        className="py-1"
                                        key={person.id}
                                        value={person.name}
                                        hidden={person.id === 101}
                                      >
                                        {person.name}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </div>
                              )}
                            </Listbox>
                          </div>
                          <button
                            className="bg-primaryYellow rounded py-2 px-3"
                            onClick={handleSubmit(addUserHandler)}
                          >
                            Add User and set New Number
                          </button>
                        </Tab.Panel>
                        <Tab.Panel
                          className={classNames('my-5 h-[428px] overflow-auto')}
                        >
                          {values.map((item, index) => {
                            return (
                              <div
                                className="flex flex-row gap-1 justify-between items-center border-2 border-primaryYellow rounded my-5 h-[100px] px-3"
                                key={index}
                              >
                                <div className="flex flex-col gap-1 items-start justify-center">
                                  <p>
                                    Provider: <span> {item[1].provider}</span>
                                  </p>
                                  <p>
                                    Date Added:{' '}
                                    <span> {item[1].dateAdded}</span>
                                  </p>
                                  <p>
                                    Number: <span> {item[1].number}</span>
                                  </p>
                                </div>
                                <div className="flex flex-row items-center justify-center gap-2">
                                  <button
                                    onClick={() =>
                                      updateCurrentNumber(item[1].number)
                                        .then((res) => console.log(res))
                                        .catch((err) => console.log(err))
                                    }
                                    className={classNames(
                                      'bg-yellow-500 p-2 rounded',
                                      {
                                        'bg-blue-500':
                                          userCurrentNumber === item[1].number,
                                      }
                                    )}
                                  >
                                    {userCurrentNumber === item[1].number ? (
                                      <AiOutlineCheckCircle
                                        size={25}
                                        color="#fff"
                                      />
                                    ) : (
                                      <AiOutlineCloseCircle
                                        size={25}
                                        color="#fff"
                                      />
                                    )}
                                  </button>
                                  <button
                                    className="bg-red-500 p-2 rounded"
                                    onClick={() => {
                                      if (values.length <= 1) {
                                        alert(
                                          'not allowed to delete the last user'
                                        );
                                      } else {
                                        if (
                                          userCurrentNumber !== item[1].number
                                        ) {
                                          deleteCurrentNumber(item[0])
                                            .then((res) => console.log(res))
                                            .catch((err) => console.log(err));
                                        } else {
                                          alert("can't delete current user");
                                        }
                                      }
                                    }}
                                  >
                                    <AiOutlineDelete size={25} color="#fff" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>

            {/* TOAST CONTAINER */}
            <ToastContainer />
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddUsers;
