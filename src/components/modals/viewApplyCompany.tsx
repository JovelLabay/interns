// REACT
import React, { Fragment } from 'react';

// UI
import { Dialog, Transition } from '@headlessui/react';

// NEXT
import Image from 'next/image';

function ViewApplyCompany({
  isViewToggle,
  isOpen,
  viewCompanyDetails,
}: {
  isViewToggle: () => void;
  isOpen: boolean;
  viewCompanyDetails: CompanyListInterface | null | undefined;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={isViewToggle}>
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
              <Dialog.Panel className="w-[900px] bg-white  p-3 rounded-md ">
                <div className="flex flex-row justify-start items-center mb-2">
                  <button
                    onClick={isViewToggle}
                    className="border-2 rounded border-primaryYellow py-1 w-[100px]"
                  >
                    Close
                  </button>
                </div>
                <div className="px-10 h-[600px] overflow-auto">
                  {/* HEADER */}
                  <div className="mt-10 grid grid-cols-3 gap-10 pb-10 border-b-2 border-primaryYellowHover">
                    <div className="flex flex-col justify-center">
                      <Image
                        src={viewCompanyDetails?.companyLogo || ''}
                        width={300}
                        height={300}
                        className="rounded-full m-5"
                      />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center items-start gap-3">
                      <h1 className="text-primaryYellow font-bold text-[40px]">
                        {viewCompanyDetails?.companyName}
                      </h1>
                      <h1 className="text-secondaryWhite font-bold">
                        {'Type of Company: '}{' '}
                        <span className="text-placeholderColor font-normal">
                          {viewCompanyDetails?.typeOfCompany}
                        </span>
                      </h1>
                      <h1 className="text-secondaryWhite font-bold">
                        {'Location of the Company: '}{' '}
                        <span className="text-placeholderColor font-normal">
                          {viewCompanyDetails?.locationOfCompany}
                        </span>
                      </h1>
                    </div>
                  </div>
                  {/* BODY */}
                  <div className="my-10 flex flex-col gap-5">
                    <div>
                      <h1 className="mb-4 font-semibold text-primaryYellow">
                        MISSON
                      </h1>
                      <p className="text-center mx-10 italic tracking-wider text-placeholderColor font-light">
                        {viewCompanyDetails?.companyMission}
                      </p>
                    </div>
                    <div>
                      <h1 className="mb-4 font-semibold text-primaryYellow">
                        VISON
                      </h1>
                      <p className="text-center mx-10 italic tracking-wider text-placeholderColor font-light">
                        {viewCompanyDetails?.companyVison}
                      </p>
                    </div>
                    <div>
                      <h1 className="mb-4 font-semibold text-primaryYellow">
                        COMPANY DESCRIPTION
                      </h1>
                      <p className="text-center mx-10 italic tracking-wider text-placeholderColor font-light">
                        {viewCompanyDetails?.companyDescription}
                      </p>
                    </div>
                  </div>
                  {/* OTHERS */}
                  <div className="mb-10">
                    <div className="mb-5">
                      <h1 className="mb-4 font-semibold text-primaryYellow">
                        DATE FOUNDED
                      </h1>
                      <div className="flex justify-center items-center">
                        <p className="text-center mx-10 italic tracking-wider text-white font-light py-1 px-10 border-2 border-primaryYellow bg-primaryYellowHover rounded-full">
                          {viewCompanyDetails?.dateFounded.DD}
                        </p>
                        <p className="text-center mx-10 italic tracking-wider text-white font-light py-1 px-10 border-2 border-primaryYellow bg-primaryYellowHover rounded-full">
                          {viewCompanyDetails?.dateFounded.MM}
                        </p>
                        <p className="text-center mx-10 italic tracking-wider text-white font-light py-1 px-10 border-2 border-primaryYellow bg-primaryYellowHover rounded-full">
                          {viewCompanyDetails?.dateFounded.YYYY}
                        </p>
                      </div>
                    </div>
                    {/* PHOTOTS */}
                    <div>
                      <h1 className="mb-4 font-semibold text-primaryYellow">
                        COMPANY PHOTOS
                      </h1>
                      <div className="flex justify-center items-center gap-5">
                        {viewCompanyDetails?.companyPhotos.map(
                          (photo, index) => {
                            return (
                              <Image
                                key={index}
                                src={photo}
                                width={170}
                                height={170}
                                className="rounded-xl"
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                    {/* PAPERS */}
                    <div className="my-10">
                      <h1 className="mb-4 font-semibold text-primaryYellow">
                        SUBMITTED COMPANY DOCUMENTS
                      </h1>
                      <button className="border-2 border-dashed border-primaryYellow rounded py-2 px-4">
                        Registration
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ViewApplyCompany;
