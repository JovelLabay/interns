// REACT
import { data } from 'Data';
import React from 'react';

function SplashLoading() {
  return (
    <div className="h-screen flex flex-col items-center justify-around bg-white">
      <div>
        <p className="text-[54px] font-bold text-black">
          <span className="text-primaryYellow">I</span>
          nterns
        </p>
      </div>
      <div className="text-center">
        <p className="text-teriaryWhite mt-20">{data.others.developers}</p>
      </div>
    </div>
  );
}

export default SplashLoading;
