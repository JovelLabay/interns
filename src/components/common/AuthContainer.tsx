// REACT
import React from 'react';

// ICONS
import { FcGoogle } from 'react-icons/fc';

function AuthContainer({
  companyAuth,
  isLogin,
}: {
  companyAuth: JSX.Element;
  isLogin: boolean;
}) {
  return (
    <div className="bg-white p-5 rounded-md">
      <h2 className="text-center text-[28px]">
        <span className="font-bold">Company |</span>
        {isLogin ? ' Log in' : ' Sign up'}
      </h2>
      {companyAuth}
      <div>
        <div className="flex flex-row my-4">
          <div className="w-full border-b mx-3 mb-[10px]" />
          <p className="text-secondaryWhite font-medium">or</p>
          <div className="w-full border-b mx-3 mb-[10px]" />
        </div>
        <button
          className="bg-white rounded-md py-2 w-full border-2 flex flex-row justify-center items-center gap-3 font-semibold text-secondaryWhite hover:bg-customBorder border-customBorder duration-150"
          onClick={() => alert("Sorry, this feature isn't available yet")}
        >
          <FcGoogle size={20} />
          {isLogin ? 'Log in with Google' : 'Sign up with Google'}
        </button>
      </div>
    </div>
  );
}

export default AuthContainer;
