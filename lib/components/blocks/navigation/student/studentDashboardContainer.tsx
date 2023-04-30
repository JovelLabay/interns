import { Tab } from '@headlessui/react';
import { data } from 'Data';
import classNames from 'classnames';
import React from 'react';
import Documents from './tabs/documents';
import Account from './tabs/account';

function StudentDashboardContainer() {
  const [modal, setModal] = React.useState();

  return (
    <div className="px-2">
      <Tab.Group>
        {/* TABS */}
        <Tab.List className="my-2 flex h-[7vh] items-center justify-center gap-10 rounded bg-white px-10">
          {data.admin.tabs2.map((tab, index) => {
            return (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    'font-medium text-secondaryWhite outline-none',
                    selected
                      ? 'border-b-[3px] border-primaryYellow'
                      : 'border-b-[3px] border-white'
                  )
                }
              >
                {tab.name}
              </Tab>
            );
          })}
        </Tab.List>

        {/* MAIN COMPONENTS */}
        <Tab.Panels className="h-[80vh] overflow-auto rounded bg-white p-2 sm:mx-10 lg:mx-52 xl:mx-96">
          <Tab.Panel>dfgdfg</Tab.Panel>
          <Tab.Panel>
            <Documents />
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
