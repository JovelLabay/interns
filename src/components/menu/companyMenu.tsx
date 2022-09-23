import { DynamicContext } from '@/src/contexts/context';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { BiMoon, BiSun, BiLogOut } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineContacts } from 'react-icons/ai';
import { BsPeople, BsBuilding, BsPerson } from 'react-icons/bs';
import internsLogo from '../../../public/logo/interns_logo.png';
import Image from 'next/image';

// STATIC DATA
import { data } from 'Data';

function CompanyMenu({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<{
    type: number;
  }>;
  state: {
    id: number;
  };
}) {
  const context = useContext(DynamicContext);

  return (
    <div
      className={classNames(
        'border-r-[3px] border-white h-[90vh] px-2 overflow-auto',
        {
          'border-secondaryBgBlack': context?.isDarkMode,
        }
      )}
    >
      <div>
        <div className="flex flex-col items-center my-5">
          <Image
            src={internsLogo}
            width={90}
            height={90}
            style={{ borderRadius: '100%' }}
          />
          <p
            className={classNames(
              'text-[20px] font-semibold text-secondaryWhite mt-5',
              {
                'text-white': context?.isDarkMode,
              }
            )}
          >
            Eluvent Inc
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-4 mx-2">
            {data.companyDashboardMenu.map((item, index) => {
              return (
                <button
                  onClick={() => dispatch({ type: item.id })}
                  key={index}
                  className={classNames(
                    'bg-primaryYellow flex flex-row items-center text-left py-4 px-2 gap-2 rounded duration-300 text-[14px]',
                    {
                      'text-white': context?.isDarkMode,
                    },
                    {
                      'scale-105': state.id === item.id,
                    }
                  )}
                >
                  {item.id === 1 ? (
                    <AiOutlineHome size={20} />
                  ) : item.id === 2 ? (
                    <BsPeople size={20} />
                  ) : item.id === 3 ? (
                    <BsBuilding size={20} />
                  ) : item.id === 4 ? (
                    <AiOutlineContacts size={20} />
                  ) : item.id === 5 ? (
                    <BsPerson size={20} />
                  ) : null}
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMenu;
