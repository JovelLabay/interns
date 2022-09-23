// REACT
import React from 'react';

// NEXT
import Link from 'next/link';

// STATIC DATA
import { data } from '../../../Data';

function StaticFooter() {
  return (
    <div>
      <section className="wrapper bg-black text-white ">
        <div className="sub-container py-10 ">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-8">
            <div className="logo">
              <p className="lg:text-[44px] md:text-[34px] text-[24px] font-bold">
                <span className="text-primaryYellow">I</span>
                nterns
              </p>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              {data.footerLinks.map((item, index) => {
                return (
                  <div key={index}>
                    <h4 className="text-[18px] text-primaryYellow font-medium">
                      {item.footerTitle}
                    </h4>
                    <div className="flex flex-col mt-7 gap-4">
                      {item.footerLinks.map((link, index) => {
                        return (
                          <Link href="" key={index}>
                            <a className="text-secondaryWhite">{link}</a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-b border-secondaryWhite my-14" />
          <div className="flex flex-col md:flex-row justify-between md:items-centermd:gap-0 gap-5">
            <p className="font-light">
              <span>
                {'©'} {getYear()} {data.meta.landingPage} {''}
              </span>
              {data.footerSocials.reserves}
            </p>
            <p className="font-light">{data.footerSocials.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StaticFooter;

// FULLYEAR
export const getYear = () => {
  return new Date().getFullYear();
};
