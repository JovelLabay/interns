// NEXT
import Link from 'next/link';

// REACT
import React, { useState } from 'react';

// ICONS
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { motion } from 'framer-motion';

// COMPONENTS
import { ButtonLinks, MenuLinks } from './StaticLinks';

function StaticHeader({ isYellowBg }: { isYellowBg?: boolean }) {
  const [isShowMobileNav, setIsShowMobileNav] = useState(false);

  const mobileNavhandler = () => {
    setIsShowMobileNav(!isShowMobileNav);
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <section className="wrapper relative">
        <div className="sub-container flex h-20 flex-row items-center justify-between md:h-24 lg:h-28 lg:px-0">
          <Link href="/">
            <p className="text-[28px] font-bold duration-300 hover:cursor-pointer hover:drop-shadow-2xl md:text-[38px] lg:text-[48px]">
              <span
                className={isYellowBg ? 'text-white' : 'text-primaryYellow'}
              >
                I
              </span>
              nterns
            </p>
          </Link>
          <div className="links hidden gap-10 lg:flex">
            <MenuLinks isYellowBg={isYellowBg} />
          </div>
          <div className="flex flex-row gap-10">
            <div className="hidden gap-5 md:flex">
              <ButtonLinks isYellowBg={isYellowBg} />
            </div>
            <button
              className="lg:hidden"
              onClick={mobileNavhandler}
              title="openMenu"
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
                  {!isShowMobileNav && (
                    <span
                      className={
                        isYellowBg ? 'text-white' : 'text-primaryYellow'
                      }
                    >
                      I
                    </span>
                  )}
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
            <div className="my-5 flex flex-col gap-6">
              <MenuLinks mobileNavhandler={mobileNavhandler} />
            </div>
            <div className="mt-10 mb-7 flex gap-5">
              <ButtonLinks />
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default StaticHeader;
