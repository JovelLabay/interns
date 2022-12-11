import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import Head from 'next/head';
import React, { useContext } from 'react';

function StudentDashboard() {
  const context = useContext(DynamicContext);

  return (
    <div>
      <Head>
        <title>Interns | Student Home</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta
          name="theme-color"
          content={context?.isDarkMode ? '#212130' : '#fff'}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-[88vh] overflow-auto">
        <div
          className={classNames(
            'flex flex-row justify-between items-center h-[10vh] px-2 m-2 md:m-3 lg:m-4 rounded-md',
            context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
          )}
        >
          dfgdf
        </div>
        <div
          className={classNames(
            'flex flex-row justify-between items-center h-[9vh] px-2 m-2 md:m-3 lg:m-4 rounded-md',
            context?.isDarkMode ? 'bg-secondaryBgBlack' : 'bg-white'
          )}
        >
          dfgdf
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
