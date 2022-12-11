import React from 'react';

function BreadCrumbs({
  activeBreadCrumbs,
  setActiveBreadcrumb,
}: {
  activeBreadCrumbs: {
    collegeName: string;
    collegeId: string;
    action: string;
  };
  setActiveBreadcrumb: React.Dispatch<
    React.SetStateAction<{
      collegeName: string;
      collegeId: string;
      action: string;
    }>
  >;
}) {
  return (
    <div className="my-5 mx-10 flex justify-between items-center">
      <div className="flex flex-row gap-3">
        <button
          onClick={() =>
            setActiveBreadcrumb({
              collegeName: '',
              collegeId: '',
              action: '',
            })
          }
        >
          College
        </button>
        <p>/</p>
        <p>{activeBreadCrumbs.collegeName}</p>
      </div>
      {activeBreadCrumbs.collegeId && (
        <p className="tracking-[1rem]">CONTROLS</p>
      )}
    </div>
  );
}

export default BreadCrumbs;
