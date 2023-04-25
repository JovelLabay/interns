// REACT
import React, { useState } from 'react';

// NEXT
import Image from 'next/image';
import { useRouter } from 'next/router';

// INTERNS LOGO
import internsLogo from '../../../../../public/logo/interns_logo.png';

// TOAST
import { ToastContainer } from 'react-toastify';

// ICONS
import { BiLogOut } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

// COMPONENTS
import ManageUsers from '@component/interface/modal/ManageUsers';
import ManageCollege from '@component/interface/modal/ManageCollege';

import { DynamicContext } from 'lib/context/context';

function SchoolHeader() {
  const router = useRouter();
  const context = React.useContext(DynamicContext);

  const [addRemoveModal, setAddRemoveModal] = useState({
    manageUser: false,
    manageCollege: false,
  });

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
              src={context?.userData.image || internsLogo}
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
            <p className="font-medium">{context?.userData.name || 'No Data'}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            {/* MANAGE USERS */}
            <button
              className="buttonIcon"
              onClick={addModalToggleManageUser}
              title="Manage Users"
            >
              <FiUsers />
            </button>

            {/* MANAGE COLLEGE */}
            <button
              className="buttonIcon"
              onClick={addModalToggleManageCollege}
              title="Manage College"
            >
              <HiOutlineOfficeBuilding />
            </button>

            {/* LOGOUT */}
            <button
              className="buttonIcon"
              onClick={schoolAdminLogoutHandler}
              title="Logout"
            >
              <BiLogOut />
            </button>
          </div>
        </div>

        {/* MODALS */}
        <ManageUsers
          addRemoveModal={addRemoveModal.manageUser}
          addModalToggle={addModalToggleManageUser}
        />

        <ManageCollege
          addRemoveModal={addRemoveModal.manageCollege}
          addModalToggle={addModalToggleManageCollege}
        />
      </div>

      {/* TOAST */}
      <ToastContainer />
    </>
  );

  function schoolAdminLogoutHandler() {
    document.cookie =
      'authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    router.push('/user/school/auth');
  }

  function addModalToggleManageUser() {
    setAddRemoveModal((prev) => {
      return { ...prev, manageUser: !prev.manageUser };
    });
  }

  function addModalToggleManageCollege() {
    setAddRemoveModal((prev) => {
      return { ...prev, manageCollege: !prev.manageCollege };
    });
  }
}

export default SchoolHeader;
