// REACT
import { data } from 'Data';
import React from 'react';

function SplashLoading() {
  if (typeof window !== 'undefined') {
    document.title = 'Interns | Loading';
  }

  return (
    <div className="flex h-screen flex-col items-center justify-around bg-white">
      <div>
        <p className="text-[54px] font-bold text-black">
          <span className="text-primaryYellow">I</span>
          nterns
        </p>
      </div>
      <div className="text-center">
        <p className="mt-20 text-teriaryWhite">{data.others.developers}</p>
      </div>
    </div>
  );
}

export default SplashLoading;
