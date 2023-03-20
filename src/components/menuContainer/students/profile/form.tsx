import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { DynamicContext } from '@/src/contexts/context';
import { database } from '@/src/firebase/firebaseConfig';
import { onValue, ref } from 'firebase/database';

function Form() {
  const context = useContext(DynamicContext);

  const collegeTemplateForm: any = useMemo(() => {
    let templatedForms;
    const db = database;
    const collegeReference = ref(
      db,
      `school/colleges/${context?.user.collegeId}`
    );
    onValue(collegeReference, (snapshot) => {
      const data = snapshot.val() === null ? {} : snapshot.val();
      templatedForms = data;
    });

    return templatedForms;
  }, []);

  const formTemplates =
    collegeTemplateForm.formTemplates !== undefined
      ? Object.entries(collegeTemplateForm.formTemplates)
      : [];

  console.log(formTemplates);
  return (
    <div
      className={classNames(
        'my-2 flex flex-col gap-2',
        !context?.isDarkMode ? 'text-secondaryBgBlack' : 'text-white'
      )}
    >
      <h3
        className={classNames(
          'rounded py-2 px-2 font-medium',
          context?.isDarkMode ? 'bg-mainBgBlack' : 'bg-customBorder'
        )}
      >
        Templated Forms
      </h3>
      {}
      <div className="flex items-center justify-start gap-3 overflow-x-auto py-2">
        <button className="h-[75px] w-[75px] rounded-full border-2">sdf</button>
      </div>
    </div>
  );
}

export default Form;
