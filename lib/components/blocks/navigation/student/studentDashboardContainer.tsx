import React, { useContext, useEffect, useState } from 'react';
import { data } from 'Data';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';

import Account from './tabs/account';
import Documents from './tabs/documents';
import Details from './tabs/details';
import { DynamicContext } from '@redux/context';
import CompanyList from './tabs/companyList';

function StudentDashboardContainer() {
  const context = useContext(DynamicContext);

  const [states, setStates] = useState({
    eligibility: false,
  });

  useEffect(() => {
    const parseContext = JSON.parse(context?.studentData || `{}`);

    setStates((prev) => ({
      ...prev,
      eligibility: parseContext?.isEligible,
    }));
  }, []);

  return (
    <div className="px-2">
      <Tab.Group>
        {/* TABS */}
        <Tab.List className="my-2 flex h-[7vh] w-full items-center justify-start gap-5 overflow-auto rounded bg-white px-5 md:justify-center">
          {data.admin.tabs2.map((tab, index) => {
            return (
              <Tab
                disabled={tab.id === 3 && !states.eligibility}
                key={index}
                className={({ selected }) =>
                  classNames(
                    'font-medium text-secondaryWhite outline-none',
                    selected
                      ? 'border-b-[3px] border-primaryYellow'
                      : 'border-b-[3px] border-white',
                    tab.id === 3 && !states.eligibility && 'opacity-50'
                  )
                }
              >
                {tab.name}
              </Tab>
            );
          })}
        </Tab.List>

        {/* MAIN COMPONENTS */}
        <Tab.Panels className="mx-auto h-[80vh] overflow-auto rounded bg-white p-2 sm:w-[90vw] lg:w-[70vw] xl:w-[50vw]">
          <Tab.Panel>
            <Details />
          </Tab.Panel>
          <Tab.Panel>
            <Documents />
          </Tab.Panel>
          <Tab.Panel>
            <CompanyList />
          </Tab.Panel>
          <Tab.Panel>
            <Account />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default StudentDashboardContainer;
