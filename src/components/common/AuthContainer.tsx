// REACT
import React from 'react';

// NEXT
import Image from 'next/image';

// COMPONENTS OR LAYOUTS
import { PartyAuth } from '@/src/functions/firebasetEmailPassAuth';

// ICONS
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import ms_Logo from '../../../public/icons/ms_logo.png';

function AuthContainer() {
  return (
    <div className="bg-white p-5 rounded-md w-[400px]">
      <h2 className="text-center text-[28px] mb-5">
        <span className="font-bold">Company |</span>
        {' Sign up'}
      </h2>
      <div className="grid grid-cols-1 gap-3">
        <p className="italic font-thin text-teriaryWhite mb-5">
          <span className="font-bold text-red-500">Note : </span>
          Do not use the same email addresses on different providers. This will
          cause to overwrite current registration on interns database.
        </p>
        <button
          className="bg-customBorder rounded-md py-2 w-full border-2 flex flex-row justify-center items-center gap-3 font-medium text-secondaryWhite border-customBorder"
          onClick={() =>
            PartyAuth.googleAuthentication().then((res) => console.log(res))
          }
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
        <button
          className="bg-blue-500 rounded-md py-2 w-full border-2 flex flex-row justify-center items-center gap-3 font-medium text-white border-blue-500"
          onClick={() =>
            PartyAuth.facebookAuthentication().then((res) => console.log(res))
          }
        >
          <BsFacebook size={20} />
          Continue with Facebook
        </button>
        <button className="bg-white rounded-md py-2 w-full border-2 flex flex-row justify-center items-center gap-3 font-medium text-secondaryWhite border-placeholderColor">
          <Image src={ms_Logo} width={20} height={20} />
          Microsoft | Coming Soon
        </button>
      </div>
    </div>
  );
}

export default AuthContainer;
