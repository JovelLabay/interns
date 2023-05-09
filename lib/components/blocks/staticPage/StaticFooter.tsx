// REACT
import React from 'react';

// NEXT
import Link from 'next/link';

// STATIC DATA
import footer from '@data/footer.data.json';

// UTILS
import { getYear } from '@utils/commonFunction';

function StaticFooter() {
  return (
    <div>
      <section className="wrapper bg-black text-white ">
        <div className="sub-container py-10 ">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
            <Link href="/">
              <p className="text-[24px] font-bold hover:cursor-pointer md:text-[34px] lg:text-[44px]">
                <span className="text-primaryYellow">I</span>
                nterns
              </p>
            </Link>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {footer.footerLinks.map((item, index) => {
                return (
                  <div key={index}>
                    <h4 className="text-[18px] font-medium text-primaryYellow">
                      {item.footerTitle}
                    </h4>
                    <div className="mt-7 flex flex-col gap-4">
                      {item.footerLinks.map((link, index) => {
                        return (
                          <Link href={link.route} key={index}>
                            <a className="text-secondaryWhite duration-300 hover:text-white">
                              {link.name}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-14 border-b border-secondaryWhite" />
          <div className="md:items-centermd:gap-0 flex flex-col justify-between gap-5 md:flex-row">
            <p className="font-light">
              <span>
                {'©'} {getYear()} Interns {''}
              </span>
              {footer.footerContents.one.reserves}
            </p>
            <p className="font-light">{footer.footerContents.one.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StaticFooter;
