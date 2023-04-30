// REACT
import React from 'react';

// NEXT
import Image from 'next/image';

// INTERNS LOGO
import internsLogo from '../../../../../public/logo/interns_logo.png';

// TOAST
import { ToastContainer } from 'react-toastify';

// ICONS
import { useRouter } from 'next/router';
import { DynamicContext } from '@redux/context';

// COMPONENTS

function StudentHeader() {
  const context = React.useContext(DynamicContext);

  const router = useRouter();
  return (
    <>
      <div className="flex h-[10vh] flex-row items-center justify-between bg-white px-2">
        <p className="text-[22px] font-bold sm:text-[26px] lg:text-[36px] xl:text-[44px]">
          <span className="text-primaryYellow">I</span>
          nterns
        </p>

        <div className="flex flex-row items-center justify-center gap-3">
          <Image
            src={context?.userData.image || internsLogo}
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
          <p className="hidden font-medium md:block">
            {context?.userData.name || 'No Data'}
          </p>
        </div>
      </div>

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
