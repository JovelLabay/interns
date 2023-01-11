// REACT
import React, { useEffect, useState } from 'react';

// ICONS
import {
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineFieldTime,
} from 'react-icons/ai';

// FIREBASE
import { database } from '@/src/firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';

// COMPONENTS
import ViewApplyCompany from '@/src/components/modals/viewApplyCompany';
import CompanyOptionModals from './companyOptionModals';

function CompaniesContainer() {
  const [companyList, setCompanyList] = useState({});
  const [isOpen, setIsOpen] = useState({
    isView: false,
    isOption: {
      state: false,
      action: '',
    },
    uuid: '',
    companyEmail: '',
    companyName: '',
  });
  const [viewCompanyDetails, setViewCompanyDetails] =
    useState<CompanyListInterface | null>();

  const values: [string, CompanyListInterface][] =
    companyList !== null ? Object.entries(companyList) : [];

  const [sample, setSample] = useState(0); // To be used

  useEffect(() => {
    const db = database;

    // LIST OF COMPANIES
    const companyReference = ref(db, 'companies');
    onValue(companyReference, (snapshot) => {
      const data = snapshot.val();
      setCompanyList(data);
    });
  }, []);

  return (
    <div className="flex h-[80vh] flex-col gap-2 overflow-auto">
      {values.map((company, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-4 rounded bg-white p-3 lg:mx-14 2xl:mx-28"
          >
            {/* TITLES */}
            <div className="col-span-3 border-r-2 pr-3">
              <p className="text-lg font-bold text-primaryYellow">
                {company[1].companyName}
              </p>
              <p className="w-full font-semibold text-secondaryWhite">
                Type of Company:{' '}
                <span className="font-normal text-placeholderColor">
                  {company[1].typeOfCompany}
                </span>
              </p>
              <p className="w-full font-semibold text-secondaryWhite">
                Location of the Comapny:{' '}
                <span className="font-normal text-placeholderColor">
                  {company[1].locationOfCompany}
                </span>
              </p>
              <p className="w-full font-semibold text-secondaryWhite">
                Company Application Status:{' '}
                <span className="font-normal text-placeholderColor">
                  {company[1].companyApproval}
                </span>
              </p>
            </div>
            {/* CONTROLS */}
            <div className="flex flex-row items-center justify-evenly">
              <button
                className="rounded bg-green-500 p-3"
                onClick={() => {
                  isOptionToggle(
                    'Accept',
                    company[0],
                    company[1].companyEmail,
                    company[1].companyName
                  );
                }}
              >
                <AiOutlineCheck color="#fff" size={20} />
              </button>
              <button
                className="rounded bg-violet-500 p-3"
                onClick={() => {
                  isViewToggle();
                  setViewCompanyDetails(company[1]);
                }}
              >
                <AiFillEye color="#fff" size={20} />
              </button>
              <button
                className="rounded bg-blue-500 p-3"
                onClick={() => {
                  isOptionToggle(
                    'Pending',
                    company[0],
                    company[1].companyEmail,
                    company[1].companyName
                  );
                }}
              >
                <AiOutlineFieldTime color="#fff" size={20} />
              </button>
              <button
                className="rounded bg-red-500 p-3"
                onClick={() => {
                  isOptionToggle(
                    'Dismiss',
                    company[0],
                    company[1].companyEmail,
                    company[1].companyName
                  );
                }}
              >
                <AiOutlineClose color="#fff" size={20} />
              </button>
            </div>
          </div>
        );
      })}

      {/* MODALS */}
      <ViewApplyCompany
        isViewToggle={isViewToggle}
        isOpen={isOpen.isView}
        viewCompanyDetails={viewCompanyDetails}
      />
      <CompanyOptionModals
        isOpen={isOpen.isOption.state}
        action={isOpen.isOption.action}
        isOptionToggle={isOptionToggle}
        uuid={isOpen.uuid}
        companyEmail={isOpen.companyEmail}
        companyName={isOpen.companyName}
      />
    </div>
  );

  // MODAL TOGGLES
  function isViewToggle() {
    setIsOpen((prev) => {
      return {
        ...prev,
        isView: !prev.isView,
      };
    });
  }

  function isOptionToggle(
    action: string,
    uuid?: string,
    companyEmail?: string,
    companyName?: string
  ) {
    setIsOpen((prev) => {
      return {
        ...prev,
        isOption: {
          state: !prev.isOption.state,
          action: action,
        },
        uuid: uuid || '',
        companyEmail: companyEmail || '',
        companyName: companyName || '',
      };
    });
  }
}

export default CompaniesContainer;
