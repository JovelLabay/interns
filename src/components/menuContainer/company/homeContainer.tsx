// REACT
import React, { useContext } from 'react';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

function HomeContainer() {
  const context = useContext(DynamicContext);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <p
          className={classNames('text-center my-5 font-medium', {
            'text-white': context?.isDarkMode,
          })}
        >
          Student Overview List
        </p>
        <div className="h-[69vh] overflow-auto">
          <div
            className={classNames('mb-3 bg-white h-[150px] rounded', {
              'bg-secondaryBgBlack': context?.isDarkMode,
            })}
          ></div>
        </div>
      </div>
      <div>
        <p
          className={classNames('text-center my-5 font-medium', {
            'text-white': context?.isDarkMode,
          })}
        >
          Student Information
        </p>
        <div
          className={classNames('bg-white h-[69vh] p-5 overflow-auto rounded', {
            'bg-secondaryBgBlack': context?.isDarkMode,
          })}
        >
          sfdsdf
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
