import { data } from 'Data';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useMemo } from 'react';
import SplashLoading from '../components/common/SplashLoading';
import StaticFooter from '../components/Footer/StaticFooter';
import StaticHeader from '../components/Header/StaticHeader';
import { StaticContext } from '../contexts/context';

function LayoutStatic({ children }: { children: ReactNode }) {
  const router = useRouter();

  const endpoint = typeof window !== 'undefined' && window.location.pathname;

  const isYellowBg = useMemo(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname.includes('/about') ||
        window.location.pathname.includes('/service')
      ) {
        return true;
      } else {
        return false;
      }
    }
  }, [endpoint]);

  // COOKIE BANNER STATE
  const [isShowCookie, setIsShowCookie] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const cookie = localStorage.getItem('cookieInterns');
    if (cookie === null) {
      // IMAGINARY LOADING
      setTimeout(() => {
        setIsLoading(true);
      }, 3000);

      setTimeout(() => {
        setIsShowCookie(true);
      }, 5000);
    }

    if (cookie === 'student') {
      // IMAGINARY LOADING
      setTimeout(() => {
        router.push('/views/user/student/auth');
      }, 3000);
    }
    if (cookie === 'company') {
      // IMAGINARY LOADING
      setTimeout(() => {
        router.push('/views/user/company/auth');
      }, 3000);
    }
  }, []);

  const handleCookieBanner = (index: number) => {
    if (index === 0) {
      localStorage.setItem('cookieInterns', 'company');
    } else {
      localStorage.setItem('cookieInterns', 'student');
    }

    setIsShowCookie(false);
  };

  if (isLoading) {
    return (
      <StaticContext.Provider value={{ starterWelcome: true }}>
        <div>
          <StaticHeader isYellowBg={isYellowBg} />
          {children}
          <StaticFooter />
        </div>

        {/* COOKIE BANNER */}
        {isShowCookie && (
          <motion.div
            className="min-h-[200px] bg-white shadow-boxShadowAbout fixed bottom-0 right-0 w-full z-50"
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-[600px] mx-auto p-3">
              <div className="my-3">
                <p className="text-[18px] text-primaryYellow font-medium">
                  {data.cookieBanner.title}
                </p>
                <p className="text-[16px] text-secondaryWhite font-light mt-3">
                  {data.cookieBanner.description}
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                {data.cookieBanner.options.map((option, index) => {
                  return (
                    <button
                      onClick={() => handleCookieBanner(index)}
                      key={index}
                      className={
                        index === 0
                          ? 'bg-primaryYellow py-2 w-[150px] rounded hover:bg-primaryYellowHover'
                          : 'border-2 border-primaryYellow py-2 w-[150px] rounded hover:border-primaryYellowHover'
                      }
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </StaticContext.Provider>
    );
  }

  return <SplashLoading />;
}

export default LayoutStatic;
