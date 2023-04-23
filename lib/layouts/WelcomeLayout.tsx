// REACT
import { ReactNode, useEffect, useMemo, useState } from 'react';

// NEXT
import { useRouter } from 'next/router';

// COMPONENTS
import { StaticContext } from 'lib/context/context';
import StaticHeader from 'lib/components/blocks/staticPage/StaticHeader';
import StaticFooter from 'lib/components/blocks/staticPage/StaticFooter';

// LOADING
import SplashLoading from '../components/interface/loading/SplashLoading';

// STATIC DATA
import generalData from '@data/general.data.json';

function LayoutStatic({ children }: { children: ReactNode }) {
  const router = useRouter();
  const endpoint = typeof window !== 'undefined' && window.location.pathname;

  const [isShowCookie, setIsShowCookie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const cookie = localStorage.getItem('cookieInterns');

    if (cookie === null) {
      setIsShowCookie(true);
      setIsLoading(false);
      document.body.style.overflow = 'hidden';
    } else {
      if (cookie === 'student') {
        router.push('user/student/dashboard');
      } else if (cookie === 'schoolAdmin') {
        router.push('user/school/dashboard');
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <StaticContext.Provider value={{ starterWelcome: true }}>
      <div>
        <StaticHeader isYellowBg={isYellowBg} />
        {children}
        <StaticFooter />
      </div>

      {/* COOKIE BANNER */}
      {isShowCookie && (
        <div
          className="fixed top-0 right-0 z-50 flex h-full w-full items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="w-[300px] rounded bg-white p-5 md:w-[400px] lg:w-[470px]">
            <div className="my-3">
              <p className="text-center text-[18px] font-medium text-primaryYellow">
                {generalData.cookieBanner.title}
              </p>
              <p className="my-5 text-[16px] font-light text-secondaryWhite">
                {generalData.cookieBanner.description}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              {generalData.cookieBanner.options.map((option, index) => {
                return (
                  <button
                    onClick={() => handleCookieBanner(index)}
                    key={index}
                    className={
                      index === 0
                        ? 'w-[150px] rounded bg-primaryYellow py-2 text-[14px] hover:bg-primaryYellowHover'
                        : 'w-[150px] rounded border-2 border-primaryYellow py-2 text-[14px] hover:border-primaryYellowHover'
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </StaticContext.Provider>
  );

  function handleCookieBanner(index: number) {
    if (index === 0) {
      localStorage.setItem('cookieInterns', 'student');
    } else {
      localStorage.setItem('cookieInterns', 'noStudent');
    }

    setIsShowCookie(false);
    document.body.style.overflow = 'auto';
  }
}

export default LayoutStatic;
