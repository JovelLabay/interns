// STATIC
import { getYear } from '@utils/commonFunction';
import { data } from 'Data';

// REACT
import React from 'react';

// GET YEAR

function SecondayFooter() {
  return (
    <div className="min-h-[20vh] bg-black">
      <div className="flex flex-col items-center justify-center gap-5 py-3">
        <div>
          <p className="text-[28px] font-bold text-white md:text-[38px] lg:text-[48px]">
            <span className="text-primaryYellow">I</span>
            nterns
          </p>
        </div>
        <p className="font-light text-white">
          <span>
            {'©'} {getYear()} {data.meta.landingPage}
            {'.'} {''}
          </span>
          {data.footerSocials.reserves}
        </p>
      </div>
    </div>
  );
}

export default SecondayFooter;
