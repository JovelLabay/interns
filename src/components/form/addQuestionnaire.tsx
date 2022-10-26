// REACT
import React, { Fragment, useContext, useState } from 'react';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// UI
import { Dialog, Listbox, Transition } from '@headlessui/react';

// OTHERS
import classNames from 'classnames';

// STATIC DATA
import { data } from 'Data';

// USEFORM
import { useFieldArray, useForm } from 'react-hook-form';

// ICONS
import { BiSad } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';

// COMPONENTS
import { MultipleChoice, TrueOrFalse } from './questionnaireOptions';

function AddQuestionnaire({
  addRemoveModal,
  addModalToggle2,
}: {
  addRemoveModal: boolean;
  addModalToggle2: () => void;
}) {
  const context = useContext(DynamicContext);

  const [typeOfCustomField, setTypeOfCustomField] = useState(
    data.company.questionnaireType[0].name
  );

  // FORM ARRAY
  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormListQuestionnaireInterface>({
      defaultValues: {
        questionnaire: [],
      },
      mode: 'onBlur',
    });

  const { fields, append, remove } = useFieldArray({
    name: 'questionnaire',
    control,
  });

  return (
    <>
      <Transition appear show={addRemoveModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={addModalToggle2}>
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
                  <div className="flex flex-row justify-between items-center mb-5">
                    <button
                      onClick={addModalToggle2}
                      className={classNames(
                        'border-2 rounded border-primaryYellow py-1 w-[100px]',
                        {
                          'text-white': context?.isDarkMode,
                        }
                      )}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleSubmit((data) => {
                          console.log(data);
                        })();
                      }}
                      className=" rounded bg-primaryYellow py-1 w-[100px]"
                    >
                      Save
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <button
                      onClick={() => {
                        append({
                          labelName: '',
                          labelId: '',
                          labelType: '',
                          multipleChoice: {
                            option1: '',
                            option2: '',
                            option3: '',
                          },
                          trueOrFalse: {
                            option1: '',
                            option2: '',
                          },
                        });
                      }}
                      className=" rounded bg-primaryYellow py-1 w-[100px] mb-2"
                    >
                      Add More
                    </button>
                    <div className="overflow-auto h-[580px]">
                      {fields.length <= 0 ? (
                        <div
                          className={classNames(
                            'text-secondaryWhite font-medium flex flex-col justify-center items-center',
                            {
                              'text-white': context?.isDarkMode,
                            }
                          )}
                        >
                          <BiSad size={60} />
                          <p className="mt-10">No Questionnaire</p>
                        </div>
                      ) : (
                        fields.map((question, index) => {
                          return (
                            <div key={index} className="mb-8 mx-2">
                              <div className="flex justify-start items-start gap-8 py-4">
                                {/* NAME OF THE FIELD */}
                                <div className="flex flex-col items-start gap-3">
                                  <label
                                    className={classNames(
                                      'text-secondaryWhite font-medium',
                                      {
                                        'text-white': context?.isDarkMode,
                                      }
                                    )}
                                  >
                                    Question
                                  </label>
                                  <textarea
                                    className={classNames(
                                      'w-[300px] py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none] min-h-[80px] outline-none',
                                      {
                                        'bg-secondaryBgBlack text-white':
                                          context?.isDarkMode,
                                      }
                                    )}
                                    placeholder="Label Name"
                                    {...register(
                                      `questionnaire.${index}.labelName`
                                    )}
                                  />
                                </div>
                                {/* ID OF THE FILED */}
                                <div className="flex flex-col items-start gap-3">
                                  <label
                                    className={classNames(
                                      'text-secondaryWhite font-medium',
                                      {
                                        'text-white': context?.isDarkMode,
                                      }
                                    )}
                                  >
                                    Question ID
                                  </label>
                                  <input
                                    className={classNames(
                                      'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
                                      {
                                        'bg-secondaryBgBlack text-white':
                                          context?.isDarkMode,
                                      }
                                    )}
                                    type="text"
                                    placeholder="ID"
                                    {...register(
                                      `questionnaire.${index}.labelId`
                                    )}
                                  />
                                </div>
                                {/* TYPE OF FIELD */}
                                <div className="flex flex-col items-start gap-3">
                                  <label
                                    className={classNames(
                                      'text-secondaryWhite font-medium',
                                      {
                                        'text-white': context?.isDarkMode,
                                      }
                                    )}
                                  >
                                    Question Type
                                  </label>
                                  <Listbox
                                    value={typeOfCustomField}
                                    onChange={(value: string) => {
                                      setTypeOfCustomField(value);
                                      setValue(
                                        `questionnaire.${index}.labelType`,
                                        value
                                      );
                                    }}
                                  >
                                    {({ open }: { open: boolean }) => (
                                      <div className="relative">
                                        <Listbox.Button
                                          className={classNames(
                                            'bg-mainBgWhite outline-none px-2 py-1 rounded border-2 border-primaryYellow w-[180px] flex justify-between',
                                            {
                                              'bg-secondaryBgBlack text-white':
                                                context?.isDarkMode,
                                            }
                                          )}
                                        >
                                          {watch().questionnaire[index]
                                            .labelType === ''
                                            ? 'Select'
                                            : watch().questionnaire[index]
                                                .labelType}
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
                                        <Listbox.Options
                                          className={classNames(
                                            'absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] z-30 overflow-auto',
                                            {
                                              'bg-secondaryBgBlack text-white':
                                                context?.isDarkMode,
                                            }
                                          )}
                                        >
                                          {data.company.questionnaireType.map(
                                            (person) => (
                                              <Listbox.Option
                                                className="py-1"
                                                key={person.id}
                                                value={person.name}
                                                hidden={person.id === 101}
                                              >
                                                {person.name}
                                              </Listbox.Option>
                                            )
                                          )}
                                        </Listbox.Options>
                                      </div>
                                    )}
                                  </Listbox>
                                </div>
                                <button
                                  className="buttonIcon-delete mt-9"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  <BsTrash size={20} color="#fff" />
                                </button>
                              </div>
                              {watch().questionnaire[index].labelType ===
                              'Multiple Choice' ? (
                                <MultipleChoice
                                  register={register}
                                  index={index}
                                />
                              ) : watch().questionnaire[index].labelType ===
                                'True or False' ? (
                                <TrueOrFalse
                                  register={register}
                                  index={index}
                                />
                              ) : null}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddQuestionnaire;
