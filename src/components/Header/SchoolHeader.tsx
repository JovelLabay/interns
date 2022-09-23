import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import internsLogo from '../../../public/logo/interns_logo.png';
import { ToastContainer } from 'react-toastify';

import { Popover } from '@headlessui/react';

import { BiMoon, BiSun, BiLogOut } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { IoSettingsOutline, IoPersonAddOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle, AiOutlineUnorderedList } from 'react-icons/ai';
import { GrUserSettings } from 'react-icons/gr';
import AddUsers from '../modals/addUsers';

import { database, emailPassAuth } from '@/src/firebase/firebaseConfig';
import { getDatabase, ref, child, get, onValue } from 'firebase/database';
import { notify } from '../common/toast';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

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
  });

  const [addRemoveModal, setAddRemoveModal] = useState({
    manageUser: false,
  });
  const addModalToggle = () => {
    setAddRemoveModal((prev) => {
      return { ...prev, manageUser: !prev.manageUser };
    });
  };

  const schoolAdminLogoutHandler = () => {
    signOut(emailPassAuth)
      .then(() => {
        router.push('/views/user/school/auth');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        return { ...prev, currentNumber: data };
      });
    });
  }, []);

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
                  <button className="school-header-buttons">
                    <GrUserSettings size={20} /> {'Manage Admin Info'}
                  </button>
                  <button className="school-header-buttons">
                    <AiOutlinePlusCircle size={20} /> {'Add College/Department'}
                  </button>
                  <button className="school-header-buttons">
                    <AiOutlinePlusCircle size={20} /> {'Add Categories'}
                  </button>
                  <button className="school-header-buttons">
                    <AiOutlineUnorderedList size={20} /> {'View Users'}
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
      </div>

      {/* TOAST CONTAINER */}
      <ToastContainer />
    </>
  );
}

export default SchoolHeader;
