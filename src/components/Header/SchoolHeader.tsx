// REACT
import React, { useState, useEffect } from 'react';

// NEXT
import Image from 'next/image';
import Link from 'next/link';

// INTERNS LOGO
import internsLogo from '../../../public/logo/interns_logo.png';

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
import AddUsers from '../modals/addUsers';

// FIREBASE CONFIG
import { database, emailPassAuth } from '@/src/firebase/firebaseConfig';

// FIREBASE
import { ref, onValue } from 'firebase/database';

// NEXT
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import AddCollege from '../modals/AddCollege';

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

  const [userList, setUserList] = useState({
    numbers: {},
    currentNumber: '',
    currentLocations: {},
  });

  const [addRemoveModal, setAddRemoveModal] = useState({
    manageUser: false,
    manageCollege: false,
    manageJobCategory: false,
    manageCompanyType: false,
    locationOfCompany: false,
  });

  useEffect(() => {
    const db = database;

    const usersNumberList = ref(db, 'companyUsers/numbers');
    onValue(usersNumberList, (snapshot) => {
      const data = snapshot.val();
      setUserList((prev) => {
        return { ...prev, numbers: data };
      });
    });

    const userCurrentNumber = ref(db, 'companyUsers/currentNumber');
    onValue(userCurrentNumber, (snapshot) => {
      const data = snapshot.val();
      setUserList((prev) => {
        return { ...prev, currentNumber: data.number };
      });
    });

    const currentLocations = ref(db, 'school/locations');
    onValue(currentLocations, (snapshot) => {
      const data = snapshot.val();
      setUserList((prev) => {
        return { ...prev, currentLocations: data };
      });
    });
  }, []);

  const {
    manageJobCategory,
    manageCompanyType,
    manageCollege,
    locationOfCompany,
  } = addRemoveModal;

  return (
    <>
      <div className="bg-white flex flex-row justify-between items-center h-[10vh] px-2">
        <div>
          <Link href="/">
            <div className="logo hover:cursor-pointer">
              <p className="text-[38px] font-bold">
                <span className="text-primaryYellow">I</span>
                nterns
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-row items-center justify-center gap-3">
            <Image
              src={userPhotoUrl || internsLogo}
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
            <p className="font-medium">
              {userName !== 'No Data Found' ? userName : userEmail}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            {/* SETTINGS */}
            <Popover className="relative">
              <Popover.Button className="buttonIcon">
                <IoSettingsOutline />
              </Popover.Button>

              <Popover.Panel className="absolute z-10 w-[300px] right-0">
                <div className="flex flex-col gap-4 shadow-md bg-white rounded mt-2 p-3">
                  <button
                    name="manageCategory"
                    className="school-header-buttons"
                    onClick={(e: any) => toggleManageModals(e.target.name)}
                  >
                    <AiOutlineAppstore size={20} /> {'Job Categories'}
                  </button>
                  <button
                    name="manageCompany"
                    className="school-header-buttons"
                    onClick={(e: any) => toggleManageModals(e.target.name)}
                  >
                    <BsBuilding size={20} /> {'Company Type'}
                  </button>
                  <button
                    name="manageCollege"
                    className="school-header-buttons"
                    onClick={(e: any) => toggleManageModals(e.target.name)}
                  >
                    <AiOutlineUserAdd size={20} /> {'Add College'}
                  </button>
                  <button
                    name="manageLocation"
                    className="school-header-buttons"
                    onClick={(e: any) => toggleManageModals(e.target.name)}
                  >
                    <BiCurrentLocation size={20} /> {'Location of Company'}
                  </button>
                </div>
              </Popover.Panel>
            </Popover>

            {/* MANAGE USERS */}
            <button className="buttonIcon" onClick={addModalToggle}>
              <FiUsers />
            </button>

            {/* LOGOUT */}
            <button className="buttonIcon" onClick={schoolAdminLogoutHandler}>
              <BiLogOut />
            </button>
          </div>
        </div>

        {/* MODALS */}
        <AddUsers
          addRemoveModal={addRemoveModal.manageUser}
          addModalToggle={addModalToggle}
          userList={userList.numbers}
          userCurrentNumber={userList.currentNumber}
        />

        <AddCollege
          addRemoveModal={{
            manageJobCategory,
            manageCompanyType,
            manageCollege,
            locationOfCompany,
          }}
          toggleManageModals={toggleManageModals}
          currentLocations={userList.currentLocations}
        />
      </div>

      {/* TOAST CONTAINER */}
      <ToastContainer />
    </>
  );

  function schoolAdminLogoutHandler() {
    signOut(emailPassAuth)
      .then(() => {
        router.push('/views/user/school/auth');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addModalToggle() {
    setAddRemoveModal((prev) => {
      return { ...prev, manageUser: !prev.manageUser };
    });
  }

  function toggleManageModals(name?: string) {
    if (name === 'manageCategory') {
      setAddRemoveModal((prev) => {
        return { ...prev, manageJobCategory: !prev.manageJobCategory };
      });
    } else if (name === 'manageCompany') {
      setAddRemoveModal((prev) => {
        return { ...prev, manageCompanyType: !prev.manageCompanyType };
      });
    } else if (name === 'manageCollege') {
      setAddRemoveModal((prev) => {
        return { ...prev, manageCollege: !prev.manageCollege };
      });
    } else if (name === 'manageLocation') {
      setAddRemoveModal((prev) => {
        return { ...prev, locationOfCompany: !prev.locationOfCompany };
      });
    } else if (name === '') {
      setAddRemoveModal((prev) => {
        return {
          ...prev,
          manageCollege: false,
          manageJobCategory: false,
          manageCompanyType: false,
          locationOfCompany: false,
        };
      });
    }
  }
}

export default SchoolHeader;
