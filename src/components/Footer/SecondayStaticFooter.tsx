import { data } from 'Data';
import React from 'react';
import { getYear } from './StaticFooter';

function SecondayFooter() {
  return (
    <div className="bg-black min-h-[20vh]">
      <div className="flex flex-col justify-center items-center gap-5 py-3">
        <div>
          <p className="lg:text-[48px] md:text-[38px] text-[28px] font-bold text-white">
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
