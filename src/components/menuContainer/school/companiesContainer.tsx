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
    <div className="flex flex-col gap-2 h-[80vh] overflow-auto">
      {values.map((company, index) => {
        return (
          <div
            key={index}
            className="mx-28 bg-white rounded p-3 grid grid-cols-4"
          >
            {/* TITLES */}
            <div className="col-span-3 border-r-2 pr-3">
              <p className="font-bold text-lg text-primaryYellow">
                {company[1].companyName}
              </p>
              <p className="w-full font-semibold text-secondaryWhite">
                Type of Company:{' '}
                <span className="text-placeholderColor font-normal">
                  {company[1].typeOfCompany}
                </span>
              </p>
              <p className="w-full font-semibold text-secondaryWhite">
                Location of the Comapny:{' '}
                <span className="text-placeholderColor font-normal">
                  {company[1].locationOfCompany}
                </span>
              </p>
              <p className="w-full font-semibold text-secondaryWhite">
                Company Application Status:{' '}
                <span className="text-placeholderColor font-normal">
                  {company[1].companyApproval}
                </span>
              </p>
            </div>
            {/* CONTROLS */}
            <div className="flex flex-row items-center justify-evenly">
              <button
                className="bg-green-500 rounded p-3"
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
                className="bg-violet-500 rounded p-3"
                onClick={() => {
                  isViewToggle();
                  setViewCompanyDetails(company[1]);
                }}
              >
                <AiFillEye color="#fff" size={20} />
              </button>
              <button
                className="bg-blue-500 rounded p-3"
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
                className="bg-red-500 rounded p-3"
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
