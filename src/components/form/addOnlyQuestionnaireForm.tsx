// REACT
import React, { useContext, useEffect, useState } from 'react';

// HOOK
import { DynamicContext } from '@/src/contexts/context';

// EXTERNAL
import { Listbox } from '@headlessui/react';
import classNames from 'classnames';
import { notify } from '../common/toast';

// STATIC DATA
import { data } from 'Data';

// ICONS
import { FiChevronDown } from 'react-icons/fi';

function AddOnlyQuestionnaireForm({
  typeOfCustomField,
  setTypeOfCustomField,
  freshQuestionnaires,
}: {
  typeOfCustomField: string;
  setTypeOfCustomField: React.Dispatch<React.SetStateAction<string>>;
  freshQuestionnaires: AddFreshQuestionnaire;
}) {
  const context = useContext(DynamicContext);
  const [itemsChoice, setItemsChoice] = useState('');

  const { setAddFreshQuestionnaire, addFreshQuestionnaire } =
    freshQuestionnaires;

  useEffect(() => {
    setAddFreshQuestionnaire((prev) => {
      return {
        ...prev,
        mutltipleChoice: [] as string[],
      };
    });
  }, [addFreshQuestionnaire.labelType]);

  return (
    <div className="mb-5">
      <div className="flex flex-row justify-center items-center gap-3">
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-teriaryWhite': context?.isDarkMode,
            })}
          >
            Question Title
          </label>
          <input
            className={classNames(
              'w-full py-2 px-3 rounded border-2 bg-mainBgWhite outline-none border-primaryYellow',
              {
                'bg-secondaryBgBlack text-white': context?.isDarkMode,
              }
            )}
            type="text"
            placeholder="Questionnaire Title"
            value={addFreshQuestionnaire.labelName}
            onChange={(e) => {
              setAddFreshQuestionnaire((prev) => {
                return {
                  ...prev,
                  labelName: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-teriaryWhite': context?.isDarkMode,
            })}
          >
            Question Field Name
          </label>
          <input
            className={classNames(
              'w-full py-2 px-3 rounded border-2 bg-mainBgWhite outline-none border-primaryYellow',
              {
                'bg-secondaryBgBlack text-white': context?.isDarkMode,
              }
            )}
            type="text"
            placeholder="Questionnaire Field Name"
            value={addFreshQuestionnaire.labelId}
            onChange={(e) => {
              setAddFreshQuestionnaire((prev) => {
                return {
                  ...prev,
                  labelId: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label
            className={classNames('text-secondaryWhite font-medium', {
              'text-teriaryWhite': context?.isDarkMode,
            })}
          >
            Question Type
          </label>
          <Listbox
            value={typeOfCustomField}
            onChange={(value: string) => {
              setTypeOfCustomField(value);
              setAddFreshQuestionnaire((prev) => {
                return {
                  ...prev,
                  labelType: value,
                };
              });
            }}
          >
            {({ open }: { open: boolean }) => (
              <div className="relative">
                <Listbox.Button
                  className={classNames(
                    'bg-mainBgWhite outline-none px-2 py-1 rounded border-2 border-primaryYellow w-[180px] flex justify-between',
                    {
                      'bg-secondaryBgBlack text-white': context?.isDarkMode,
                    }
                  )}
                >
                  {typeOfCustomField}
                  <FiChevronDown
                    size={30}
                    className={classNames('duration-300 text-secondaryWhite', {
                      'rotate-180': open,
                    })}
                  />
                </Listbox.Button>
                <Listbox.Options
                  className={classNames(
                    'absolute bg-white rounded-md p-2 w-full shadow-md hover:cursor-pointer max-h-[150px] z-30 overflow-auto',
                    {
                      'bg-secondaryBgBlack text-white': context?.isDarkMode,
                    }
                  )}
                >
                  {data.company.questionnaireType.map((questionType) => (
                    <Listbox.Option
                      className="py-1"
                      key={questionType.id}
                      value={questionType.name}
                      hidden={questionType.id === 101}
                    >
                      {questionType.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>
      </div>
      {/* OPTIONS */}
      {typeOfCustomField === 'Multiple Choice' ||
      typeOfCustomField === 'True or False' ? (
        <div className="mt-3 mx-5 border-b-[3px]">
          <div className="flex justify-start items-center gap-5">
            {addFreshQuestionnaire.labelType === 'True or False' &&
            addFreshQuestionnaire.mutltipleChoice.length === 2 ? null : (
              <button
                className="rounded bg-yellow-400 py-2 mb-2 px-3 mt-2 text-white w-[300px]"
                onClick={() => {
                  {
                    addFreshQuestionnaire.mutltipleChoice.length >= 4
                      ? notify("You can't add more that 4 choices")
                      : setAddFreshQuestionnaire((prev) => {
                          return {
                            ...prev,
                            mutltipleChoice: [
                              ...prev.mutltipleChoice,
                              itemsChoice,
                            ],
                          };
                        });
                  }

                  setItemsChoice('');
                }}
              >
                Add More Choices
              </button>
            )}

            <input
              className={classNames(
                'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
                {
                  'bg-secondaryBgBlack text-white': context?.isDarkMode,
                }
              )}
              type="text"
              placeholder="Enter Choice"
              value={itemsChoice}
              onChange={(e) => setItemsChoice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            {addFreshQuestionnaire.mutltipleChoice.map((choice, index) => (
              <label
                className={classNames(
                  'text-secondaryWhite font-medium max-w-[700px] text-left',
                  {
                    'text-white': context?.isDarkMode,
                  }
                )}
                key={index}
              >
                {`${index + 1}. ${choice}`}
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AddOnlyQuestionnaireForm;
