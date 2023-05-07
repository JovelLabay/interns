// REACT
import React, { useState } from 'react';

// NEXT
import Image from 'next/image';

// INTERNS LOGO
import internsLogo from '../../../../../public/logo/interns_logo.png';

// TOAST
import { ToastContainer } from 'react-toastify';

// ICONS
import { DynamicContext } from '@redux/context';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

// COMPONENTS

function StudentHeader() {
  const context = React.useContext(DynamicContext);

  const router = useRouter();

  const [isShowMobileNav, setIsShowMobileNav] = useState(false);

  const mobileNavhandler = () => {
    setIsShowMobileNav(!isShowMobileNav);
  };

  return (
    <>
      <div className="flex h-[10vh] flex-row items-center justify-between bg-white px-2">
        <p className="text-[22px] font-bold sm:text-[26px] lg:text-[36px] xl:text-[44px]">
          <span className="text-primaryYellow">I</span>
          nterns
        </p>

        <div className="flex flex-row items-center justify-center gap-10">
          <div className="hidden flex-row items-center justify-center gap-3 md:flex">
            <Image
              src={context?.userData.image || internsLogo}
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
            <p className="font-medium">{context?.userData.name || 'No Data'}</p>
          </div>

          <div className="hidden flex-row items-center justify-center gap-3 md:flex">
            <button
              className="buttonIcon"
              title="Logout"
              onClick={studentLogoutHandler}
            >
              <BiLogOut />
            </button>
          </div>

          <button
            className="md:hidden"
            title="Open Menu"
            onClick={mobileNavhandler}
          >
            <GiHamburgerMenu size={25} />
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {isShowMobileNav && (
        <motion.div
          className="absolute top-0 right-0 z-50 w-full bg-white px-3 shadow-md lg:hidden"
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mt-6 flex flex-row items-center justify-between">
            <div className="logo hover:cursor-pointer">
              <p className="text-[28px] font-bold md:text-[38px] lg:text-[48px]">
                {!isShowMobileNav && <span className={'text-white'}>I</span>}
                {isShowMobileNav && (
                  <span className="text-primaryYellow">I</span>
                )}
                nterns
              </p>
            </div>
            <button onClick={mobileNavhandler} title="closeMenu">
              <GrClose size={25} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <Image
              src={context?.userData.image || internsLogo}
              width={80}
              height={80}
              style={{ borderRadius: '100%' }}
            />
            <p className="font-medium">{context?.userData.name || 'No Data'}</p>
            <p className="font-medium">
              {context?.userData.email || 'No Data'}
            </p>
          </div>
          <div className="mt-10 mb-7 flex items-center justify-center gap-3">
            <button
              className="flex w-[120px] items-center justify-center rounded bg-primaryYellow py-2 font-semibold duration-300 hover:scale-105"
              onClick={studentLogoutHandler}
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}

      {/* TOAST */}
      <ToastContainer />
    </>
  );

  function studentLogoutHandler() {
    document.cookie =
      'authStudentCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    router.push('/user/student/auth');
  }
}

export default StudentHeader;
