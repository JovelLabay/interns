import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import React, { useContext } from 'react';

function StudentCompanyMenu() {
  const context = useContext(DynamicContext);

  return (
    <div
      className={classNames(
        'flex flex-row justify-between items-center h-[9vh] px-2 m-2 md:m-3 lg:m-4 rounded-md',
        context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
      )}
    >
      StudentCompanyMenu
    </div>
  );
}

export default StudentCompanyMenu;
