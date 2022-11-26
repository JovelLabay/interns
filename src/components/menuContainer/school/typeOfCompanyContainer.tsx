import React from 'react';

function TypeOfCompanyContainer() {
  return (
    <div className="flex flex-col gap-2 h-[80vh] overflow-auto">
      <div className="flex justify-center text-placeholderColor italic font-light my-5">
        <p>
          *These are the lists of all type of companies avaibale when new
          company applies ang register to choose from.
        </p>
      </div>
      <div className="mx-28 bg-white rounded p-3 grid grid-cols-1">
        <p>typeOfCompany</p>
        <p>typeOfCompany</p>
        <p>typeOfCompany</p>
      </div>
    </div>
  );
}

export default TypeOfCompanyContainer;
