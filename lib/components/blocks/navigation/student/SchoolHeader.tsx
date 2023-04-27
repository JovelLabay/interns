// REACT
import React from 'react';

// NEXT
import Image from 'next/image';

// INTERNS LOGO
import internsLogo from '../../../../../public/logo/interns_logo.png';

// TOAST
import { ToastContainer } from 'react-toastify';

// ICONS
import { BiLogOut } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

// COMPONENTS

function StudentHeader() {
  return (
    <>
      <div className="flex h-[10vh] flex-row items-center justify-between bg-white px-2">
        <div>
          <p className="text-[38px] font-bold">
            <span className="text-primaryYellow">I</span>
            nterns
          </p>
        </div>

        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-row items-center justify-center gap-3">
            <Image
              src={internsLogo}
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
            <p className="font-medium">{'No Data'}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            {/* MANAGE USERS */}
            <button className="buttonIcon" title="Manage Users">
              <FiUsers />
            </button>

            {/* MANAGE COLLEGE */}
            <button className="buttonIcon" title="Manage College">
              <HiOutlineOfficeBuilding />
            </button>

            {/* LOGOUT */}
            <button className="buttonIcon" title="Logout">
              <BiLogOut />
            </button>
          </div>
        </div>

        {/* MODALS */}
      </div>

      {/* TOAST */}
      <ToastContainer />
    </>
  );
}

export default StudentHeader;
