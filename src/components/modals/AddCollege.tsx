// REACT
import React, { Fragment } from 'react';

// UI
import { Dialog, Transition } from '@headlessui/react';

// COMPONENT
import AddCollegeForm from '../form/addCollegeForm';
import AddCompanyTypeForm from '../form/addCompanyTypeForm';
import AddJobCategoryForm from '../form/addJobCategoryForm';
import AddListCompanyLocation from '../form/addListCompanyLocation';

function AddCollege({
  addRemoveModal,
  toggleManageModals,
  currentLocations,
  companyTypes,
}: {
  addRemoveModal: {
    manageJobCategory: boolean;
    manageCompanyType: boolean;
    manageCollege: boolean;
    locationOfCompany: boolean;
  };
  toggleManageModals: (name?: string) => void;
  currentLocations: object;
  companyTypes: object;
}) {
  return (
    <Transition
      appear
      show={
        addRemoveModal.manageCollege ||
        addRemoveModal.manageCompanyType ||
        addRemoveModal.manageJobCategory ||
        addRemoveModal.locationOfCompany
      }
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => toggleManageModals('')}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-auto w-[500px] overflow-auto rounded-md bg-white p-3">
                <div className="flex flex-row items-center justify-start">
                  <button
                    onClick={() => toggleManageModals('')}
                    className="w-[100px] rounded border-2 border-primaryYellow py-1"
                  >
                    Close
                  </button>
                </div>
                <div className="my-4 mx-10">
                  {addRemoveModal.manageCollege ? (
                    <AddCollegeForm toggleManageModals={toggleManageModals} />
                  ) : addRemoveModal.manageCompanyType ? (
                    <AddCompanyTypeForm companyTypes={companyTypes} />
                  ) : addRemoveModal.manageJobCategory ? (
                    <AddJobCategoryForm />
                  ) : addRemoveModal.locationOfCompany ? (
                    <AddListCompanyLocation
                      currentLocations={currentLocations}
                    />
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AddCollege;
