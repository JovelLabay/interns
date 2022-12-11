// REACT
import React, { useState, useEffect } from 'react';

// UI
import { Tab } from '@headlessui/react';

// OTHERS
import classNames from 'classnames';

// STATIC DATA
import { data } from 'Data';

// COMPONENTS
import CompaniesContainer from '../menuContainer/school/companiesContainer';
import ProfessionsContainer from '../menuContainer/school/professionsContainer';
import StudentListContainer from '../menuContainer/school/studentListContainer';
import TemplatedFormContainer from '../menuContainer/school/templatedFormContainer';

// FIREBASE
import { database } from '@/src/firebase/firebaseConfig';

// FIREBASE
import { onValue, ref } from 'firebase/database';

function SchoolDashboardContainer() {
  const [tabSelected, setTabSelected] = useState(0);

  const [listOfColleges, setListOfColleges] = useState({});

  const listingOfColleges: [string, CollegeListInterface][] =
    Object.entries(listOfColleges);

  useEffect(() => {
    // LIST OF COLLEGES
    const db = database;
    const collegeReference = ref(db, 'school/colleges');
    onValue(collegeReference, (snapshot) => {
      const data = snapshot.val() === null ? {} : snapshot.val();
      setListOfColleges(data);
    });
  }, []);

  return (
    <div className="px-2">
      <Tab.Group onChange={(index) => setTabSelected(index)}>
        {/* TABS */}
        <Tab.List className="h-[7vh] my-2 bg-white rounded flex justify-between items-center gap-10 px-10">
          <div className="flex items-center gap-7">
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
          </div>

          {/* COMPANY TAB ONLY */}
          {tabSelected === 1 ? (
            <p className="tracking-[1rem] font-bold text-secondaryWhite xl:mr-[10rem]">
              CONTROLS
            </p>
          ) : null}
        </Tab.List>
        {/* MAIN COMPONENTS */}
        <Tab.Panels>
          <Tab.Panel>
            <StudentListContainer listingOfColleges={listingOfColleges} />
          </Tab.Panel>
          <Tab.Panel>
            <CompaniesContainer />
          </Tab.Panel>
          <Tab.Panel>
            <TemplatedFormContainer listingOfColleges={listingOfColleges} />
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
