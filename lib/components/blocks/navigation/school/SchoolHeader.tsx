// REACT
import React, { useState, useEffect } from 'react';

// NEXT
import Image from 'next/image';

// INTERNS LOGO
import internsLogo from '../../../../../public/logo/interns_logo.png';

// TOAST
import { ToastContainer } from 'react-toastify';

// UI
import { Popover } from '@headlessui/react';

// ICONS
import { BiLogOut } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiCurrentLocation } from 'react-icons/bi';
import { AiOutlineAppstore, AiOutlineUserAdd } from 'react-icons/ai';
import { BsBuilding } from 'react-icons/bs';

// COMPONENTS
import ManageUsers from '@component/interface/modal/ManageUsers';

// FIREBASE CONFIG
import { database, emailPassAuth } from '@/src/firebase/firebaseConfig';

// FIREBASE
import { ref, onValue } from 'firebase/database';

// NEXT
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import AddCollege from '../../../../../src/components/modals/AddCollege';
import ManageCollege from '@component/interface/modal/ManageCollege';
import { MdOutlineSchool } from 'react-icons/md';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

function SchoolHeader({
  userName,
  userEmail,
  userPhotoUrl,
}: {
  userName: string | undefined;
  userEmail: string | undefined;
  userPhotoUrl: string | undefined;
}) {
  const router = useRouter();

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
              src={userPhotoUrl || internsLogo}
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
            <p className="font-medium">{userName || 'No Data'}</p>
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
    null;
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
