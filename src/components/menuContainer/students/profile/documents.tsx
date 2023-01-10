import React, { useContext } from 'react';
import classNames from 'classnames';
import { DynamicContext } from '@/src/contexts/context';

function Documents() {
  const context = useContext(DynamicContext);

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
        Documents
      </h3>
      {}
      <div className="flex items-center justify-start gap-3 overflow-x-auto">
        <button className="h-[75px] w-[75px] rounded-full border-2">sdf</button>
      </div>
    </div>
  );
}

export default Documents;
