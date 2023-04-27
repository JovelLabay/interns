// REACT
import React, { useState } from 'react';

// UI
import { Tab } from '@headlessui/react';

// OTHERS
import classNames from 'classnames';

// STATIC DATA
import { data } from 'Data';
import StudentContainer from '@component/blocks/navigation/school/tabs/studentContainer';
import DocumentsContainer from '@component/blocks/navigation/school/tabs/documentsContainer';
import CompaniesContainer from '@component/blocks/navigation/school/tabs/companiesContainer';
import Activitylogs from '@component/blocks/navigation/school/tabs/activitylogs';
import SchoolYearSemestreContainer from '@component/blocks/navigation/school/tabs/schoolYearSemestreContainer';

function SchoolDashboardContainer() {
  const [tabSelected, setTabSelected] = React.useState(0);
  const [listOfColleges, setListOfColleges] = useState({});

  return (
    <div className="px-2">
      <Tab.Group onChange={(index) => setTabSelected(index)}>
        {/* TABS */}
        <Tab.List className="my-2 flex h-[7vh] items-center justify-between gap-10 rounded bg-white px-10">
          <div className="flex items-center gap-7">
            {data.admin.tabs.map((tab, index) => {
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
          </div>
        </Tab.List>

        {/* MAIN COMPONENTS */}
        <Tab.Panels>
          <Tab.Panel>
            <SchoolYearSemestreContainer />
          </Tab.Panel>
          <Tab.Panel>
            <StudentContainer />
          </Tab.Panel>
          <Tab.Panel>
            <DocumentsContainer />
          </Tab.Panel>
          <Tab.Panel>
            <CompaniesContainer />
          </Tab.Panel>
          <Tab.Panel>
            <Activitylogs />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default SchoolDashboardContainer;
