// REACT
import React, { useContext, useState } from 'react';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// USEFORM
import { notify } from '../common/toast';

function QuestionnaireOptions({
  editedQuestionnaires,
  id,
  isEditQuestionnaire,
  question,
}: {
  editedQuestionnaires: FormEditedQuestionnaireInterface;
  id: number;
  isEditQuestionnaire: number;
  question: FormListQuestionnaireInterface;
}) {
  const context = useContext(DynamicContext);

  const [addMoreOptions, setAddMoreOptions] = useState('');

  const { editQuestionnaire, setEditQuestionnaire } = editedQuestionnaires;

  return (
    <div className="w-full">
      {isEditQuestionnaire === id ? (
        <div className="flex items-center gap-5 mb-3">
          {editQuestionnaire.labelType === 'True or False' &&
          editQuestionnaire.mutltipleChoice.length === 2 ? null : (
            <button
              className="rounded bg-yellow-400 py-2 mb-2 px-3 mt-2 text-white w-[300px]"
              onClick={() => {
                editQuestionnaire.mutltipleChoice.length >= 4
                  ? notify("You can't add more than 4 options")
                  : setEditQuestionnaire((prev) => {
                      return {
                        ...prev,
                        mutltipleChoice: [
                          ...prev.mutltipleChoice,
                          addMoreOptions,
                        ],
                      };
                    });

                setAddMoreOptions('');
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
            value={addMoreOptions}
            onChange={(e) => setAddMoreOptions(e.target.value)}
          />
        </div>
      ) : null}

      <div className="flex flex-col justify-start items-start gap-2">
        {isEditQuestionnaire !== id ? (
          <ul className="list-decimal">
            {question.mutltipleChoice.map((choice, index) => (
              <li
                key={index}
                className={classNames(
                  'text-secondaryWhite font-medium max-w-[700px] text-left',
                  {
                    'text-white': context?.isDarkMode,
                  }
                )}
              >
                {index + 1}
                {'. '}
                {choice}
              </li>
            ))}
          </ul>
        ) : (
          <>
            {editQuestionnaire.mutltipleChoice.map((choice, index) => (
              <div
                key={index}
                className="flex justify-start items-center gap-5"
              >
                <button
                  className="bg-red-400 py-2 px-3 rounded text-white"
                  onClick={() => {
                    setEditQuestionnaire((prev) => {
                      return {
                        ...prev,
                        mutltipleChoice: prev.mutltipleChoice.filter(
                          (_, i) => i !== index
                        ),
                      };
                    });
                  }}
                >
                  Remove
                </button>
                <label
                  className={classNames(
                    'text-secondaryWhite font-medium max-w-[700px] text-left',
                    {
                      'text-white': context?.isDarkMode,
                    }
                  )}
                >
                  {`${index + 1}. ${choice}`}
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionnaireOptions;
