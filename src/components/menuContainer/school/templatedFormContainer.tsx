// REACT
import React, { useMemo, useState } from 'react';

// COMPONENTS
import BreadCrumbs from './breadCrumbs';
import CollegeTemplateForms from './collegeTemplateForms';

// FIREBASE
import { database } from '@/src/firebase/firebaseConfig';

// FIREBASE
import { onValue, ref } from 'firebase/database';
import { ToastContainer } from 'react-toastify';

function TemplatedFormContainer({
  listingOfColleges,
}: {
  listingOfColleges: [string, CollegeListInterface][];
}) {
  const [activeBreadCrumbs, setActiveBreadcrumb] = useState({
    collegeName: '',
    collegeId: '',
    action: '',
  });

  const collegeTemplateForm = useMemo(() => {
    let templatedForms;
    const db = database;
    const collegeReference = ref(
      db,
      `school/colleges/${activeBreadCrumbs.collegeId}`
    );
    onValue(collegeReference, (snapshot) => {
      const data = snapshot.val() === null ? {} : snapshot.val();
      templatedForms = data;
    });

    return templatedForms;
  }, [activeBreadCrumbs]);

  return (
    <div className="flex flex-col gap-2 h-[80vh] overflow-hidden">
      <div className="mx-28 bg-white rounded p-3 min-h-full">
        <BreadCrumbs
          activeBreadCrumbs={activeBreadCrumbs}
          setActiveBreadcrumb={setActiveBreadcrumb}
        />
        <div className="mx-10">
          {activeBreadCrumbs.collegeId !== '' ? (
            <CollegeTemplateForms
              activeBreadCrumbs={activeBreadCrumbs}
              collegeTemplateForm={collegeTemplateForm}
              setActiveBreadcrumb={setActiveBreadcrumb}
            />
          ) : (
            <div className="grid grid-cols-4 gap-5 ">
              {listingOfColleges.map((college, index) => {
                return (
                  <button
                    onClick={() =>
                      setActiveBreadcrumb({
                        collegeName: college[1].collegeName,
                        collegeId: college[0],
                        action: '',
                      })
                    }
                    key={index}
                    className={`py-8 rounded text-white uppercase shadow-xl`}
                    style={{
                      backgroundColor: college[1].collegeColor,
                    }}
                  >
                    {college[1].collegeName}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* TOAST */}
      <ToastContainer />
    </div>
  );
}

export default TemplatedFormContainer;
