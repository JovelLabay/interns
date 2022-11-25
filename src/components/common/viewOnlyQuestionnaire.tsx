import {
  CompanyUserDetailsContext,
  DynamicContext,
} from '@/src/contexts/context';
import classNames from 'classnames';
import React, { useContext } from 'react';

function ViewOnlyQuestionnaire() {
  const context = useContext(DynamicContext);
  const context2 = useContext(CompanyUserDetailsContext);

  const questionList = Object.entries(
    context2?.companyUserObject.companyQuestionnaire || []
  );

  return (
    <div className="flex flex-col gap-5 mx-2 h-[620px] overflow-auto">
      {questionList.map((item, index) => {
        const ques: FormListQuestionnaireInterface = item[1];
        return (
          <div
            className={classNames(
              'flex flex-col justify-center items-start gap-2 bg-yellowBg w-full rounded py-2 px-3',
              {
                'bg-secondaryBgBlack': context?.isDarkMode,
              }
            )}
            key={index}
          >
            <label
              className={classNames('text-secondaryWhite font-medium text-lg', {
                'text-teriaryWhite': context?.isDarkMode,
              })}
            >
              Question Field Name
            </label>
            <p
              className={classNames('text-secondaryWhite italic', {
                'text-teriaryWhite': context?.isDarkMode,
              })}
            >
              {ques.labelName}
            </p>
            <label
              className={classNames('text-secondaryWhite font-medium text-lg', {
                'text-teriaryWhite': context?.isDarkMode,
              })}
            >
              Question Type
            </label>
            <p
              className={classNames('text-secondaryWhite italic', {
                'text-teriaryWhite': context?.isDarkMode,
              })}
            >
              {ques.labelType}
            </p>

            {ques.labelType === 'Multiple Choice' ||
            ques.labelType === 'True or False' ? (
              <div className="flex flex-col">
                {ques.mutltipleChoice.map((item2, index2) => {
                  return (
                    <p
                      className={classNames(
                        'text-secondaryWhite font-thin max-w-[700px] text-left italic',
                        {
                          'text-white': context?.isDarkMode,
                        }
                      )}
                      key={index2}
                    >
                      {`${index2 + 1}. ${item2}`}
                    </p>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default ViewOnlyQuestionnaire;
