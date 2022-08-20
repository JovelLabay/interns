// NEXT
import Link from 'next/link';

// REACT
import React, { useState } from 'react';

// ICONS
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { motion } from 'framer-motion';

// COMPONENTS
import MainLogo from '../../logo/MainLogo';
import { ButtonLinks, MenuLinks } from './StaticLinks';

function StaticHeader({ isYellowBg }: { isYellowBg?: boolean }) {
  const [isShowMobileNav, setIsShowMobileNav] = useState(false);

  const mobileNavhandler = () => {
    setIsShowMobileNav(!isShowMobileNav);
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <section className="wrapper relative">
        <div className="sub-container md:h-24 lg:h-28 h-20 flex flex-row justify-between items-center lg:px-0">
          <Link href="/">
            <div className="logo hover:cursor-pointer">
              <p className="lg:text-[48px] md:text-[38px] text-[28px] font-bold">
                <span
                  className={isYellowBg ? 'text-white' : 'text-primaryYellow'}
                >
                  I
                </span>
                nterns
              </p>
            </div>
          </Link>
          <div className="hidden links lg:flex gap-10">
            <MenuLinks isYellowBg={isYellowBg} />
          </div>
          <div className="flex gap-10 flex-row">
            <div className="gap-5 hidden md:flex">
              <ButtonLinks isYellowBg={isYellowBg} />
            </div>
            <button className="lg:hidden" onClick={mobileNavhandler}>
              <GiHamburgerMenu size={25} />
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isShowMobileNav && (
          <motion.div
            className="px-3 lg:hidden bg-white shadow-md absolute top-0 right-0 w-full z-50"
            initial={{ y: -400 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-row justify-between items-center mt-6">
              <div className="logo hover:cursor-pointer">
                <p className="lg:text-[48px] md:text-[38px] text-[28px] font-bold">
                  <span
                    className={isYellowBg ? 'text-white' : 'text-primaryYellow'}
                  >
                    I
                  </span>
                  nterns
                </p>
              </div>
              <button onClick={mobileNavhandler}>
                <GrClose size={25} />
              </button>
            </div>
            <div className="my-5 flex flex-col gap-6">
              <MenuLinks mobileNavhandler={mobileNavhandler} />
            </div>
            <div className="gap-5 flex mt-10 mb-7">
              <ButtonLinks />
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default StaticHeader;
