import SchoolYearModal from '@component/interface/modal/school/schoolYearModal';
import React, { useState } from 'react';
import { AiOutlineConsoleSql, AiOutlinePlusCircle } from 'react-icons/ai';

function SchoolYearSemestreContainer() {
  const [modal, setModal] = useState({
    addSchoolyearModal: false,
  });
  const [selectionState, setSelectionState] = useState({
    schoolYear: -1,
    semestre: -1,
  });
  return (
    <div className="mx-28 bg-white p-3">
      <div className="flex items-center justify-between rounded-md bg-yellowBg p-2">
        <p className="font-bold text-secondaryWhite">
          Manage School Year | Semestre
        </p>
        <button
          className="rounded bg-primaryYellow p-2"
          title="Add School Year"
          onClick={toggleSchoolYearModal}
        >
          <AiOutlinePlusCircle size={20} />
        </button>
      </div>
      <div className="grid h-[70vh] grid-cols-4">
        <div className="border-r-2 p-2">sds</div>
        {selectionState.schoolYear !== -1 && (
          <div className="border-r-2 p-2">sdfsdf</div>
        )}
        {selectionState.semestre !== -1 && (
          <div className="col-span-2 p-2">sdfsdf</div>
        )}
      </div>

      {/* MODEL */}
      <SchoolYearModal
        modal={modal.addSchoolyearModal}
        toggleSchoolYearModal={toggleSchoolYearModal}
      />
    </div>
  );

  function toggleSchoolYearModal() {
    setModal((prev) => ({
      ...prev,
      addSchoolyearModal: !prev.addSchoolyearModal,
    }));
  }
}

export default SchoolYearSemestreContainer;
