// REACT
import React, { useContext } from 'react';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// USEFORM
import { UseFormRegister } from 'react-hook-form';

function MultipleChoice({
  register,
  index,
}: {
  register: UseFormRegister<FormListQuestionnaireInterface>;
  index: number;
}) {
  const context = useContext(DynamicContext);

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor="true">Option A</label>

      <input
        className={classNames(
          'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
          {
            'bg-secondaryBgBlack text-white': context?.isDarkMode,
          }
        )}
        type="text"
        placeholder="ID"
        {...register(`questionnaire.${index}.multipleChoice.option1`)}
      />
      <label htmlFor="true">Option B</label>
      <input
        className={classNames(
          'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
          {
            'bg-secondaryBgBlack text-white': context?.isDarkMode,
          }
        )}
        type="text"
        placeholder="ID"
        {...register(`questionnaire.${index}.multipleChoice.option2`)}
      />
      <label htmlFor="true">Option C</label>
      <input
        className={classNames(
          'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
          {
            'bg-secondaryBgBlack text-white': context?.isDarkMode,
          }
        )}
        type="text"
        placeholder="ID"
        {...register(`questionnaire.${index}.multipleChoice.option3`)}
      />
    </div>
  );
}

function TrueOrFalse({
  register,
  index,
}: {
  register: UseFormRegister<FormListQuestionnaireInterface>;
  index: number;
}) {
  const context = useContext(DynamicContext);

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor="true">Option | True</label>
      <input
        className={classNames(
          'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
          {
            'bg-secondaryBgBlack text-white': context?.isDarkMode,
          }
        )}
        type="text"
        placeholder="ID"
        {...register(`questionnaire.${index}.trueOrFalse.option1`)}
      />
      <label htmlFor="true">Option | False</label>

      <input
        className={classNames(
          'w-full py-2 px-3 rounded border-2 bg-mainBgWhite border-primaryYellow outline-none',
          {
            'bg-secondaryBgBlack text-white': context?.isDarkMode,
          }
        )}
        type="text"
        placeholder="ID"
        {...register(`questionnaire.${index}.trueOrFalse.option2`)}
      />
    </div>
  );
}

export { MultipleChoice, TrueOrFalse };
