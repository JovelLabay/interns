// REACT
import React, { useContext } from 'react';

// STATE MANAGEMENT
import { DynamicContext } from '@/src/contexts/context';

// OTHERS
import classNames from 'classnames';

// ICONS
import { AiOutlineEdit, AiOutlineLock } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { IoTimerOutline } from 'react-icons/io5';

function ApplicantsContainer() {
  const context = useContext(DynamicContext);

  return (
    <div>
      <div
        className={classNames(
          'flex justify-around bg-white my-3 rounded py-5',
          {
            'bg-secondaryBgBlack': context?.isDarkMode,
          }
        )}
      >
        <h1
          className={classNames('text-secondaryWhite font-medium', {
            'text-white': context?.isDarkMode,
          })}
        >
          Current Company Internship Programs
        </h1>
        <h1
          className={classNames(
            'text-secondaryWhite font-medium tracking-widest',
            {
              'text-white': context?.isDarkMode,
            }
          )}
        >
          CONTROLS
        </h1>
      </div>
      {/* LIST OF INTERNSHIPS */}
      <div className="h-[65vh] overflow-auto">
        <div
          className={classNames(
            'mb-3 grid grid-cols-3 gap-3 bg-white rounded py-5 px-3 border-2 border-white hover:cursor-pointer hover:border-2 hover:border-primaryYellow',
            {
              'bg-secondaryBgBlack border-secondaryBgBlack ':
                context?.isDarkMode,
            }
          )}
        >
          <div className={classNames('col-span-2 border-r-2', {})}>
            <h1 className="font-bold text-primaryYellow uppercase text-3xl">
              Software Developer
            </h1>
            <p
              className={classNames(
                'text-secondaryWhite font-normal tracking-widest',
                {
                  'text-white': context?.isDarkMode,
                }
              )}
            >
              Program Required: <span>Software Developer</span>
            </p>
            <p
              className={classNames('text-secondaryWhite font-light', {
                'text-white': context?.isDarkMode,
              })}
            >
              Software Developer
            </p>
          </div>
          <div className="flex items-center justify-evenly">
            <button className="p-4 rounded bg-green-500">
              <AiOutlineEdit color="#fff" size={20} />
            </button>
            <button className="p-4 rounded bg-violet-500">
              <IoTimerOutline color="#fff" size={20} />
            </button>
            <button className="p-4 rounded bg-blue-500">
              <AiOutlineLock color="#fff" size={20} />
            </button>
            <button className="p-4 rounded bg-red-500">
              <BiTrashAlt color="#fff" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantsContainer;
