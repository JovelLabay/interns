import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { data } from 'Data';
import React from 'react';
import CompaniesContainer from '../menuContainer/school/companiesContainer';
import ProfessionsContainer from '../menuContainer/school/professionsContainer';
import StudentListContainer from '../menuContainer/school/studentListContainer';
import TypeOfCompanyContainer from '../menuContainer/school/typeOfCompanyContainer';

function SchoolDashboardContainer() {
  return (
    <div className="px-2">
      <Tab.Group>
        {/* TABS */}
        <Tab.List className="h-[7vh] my-2 bg-white rounded flex justify-start items-center gap-10 px-10">
          {data.admin.tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    'text-secondaryWhite font-medium outline-none',
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
        <Tab.Panels className="h-[78vh]">
          <Tab.Panel>
            <StudentListContainer />
          </Tab.Panel>
          <Tab.Panel>
            <CompaniesContainer />
          </Tab.Panel>
          <Tab.Panel>
            <TypeOfCompanyContainer />
          </Tab.Panel>
          <Tab.Panel>
            <ProfessionsContainer />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default SchoolDashboardContainer;
