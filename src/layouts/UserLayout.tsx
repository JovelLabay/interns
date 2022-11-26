import React, { ReactNode, useEffect, useState } from 'react';
import { DynamicContext } from '../contexts/context';

function UserLayout({ children }: { children: ReactNode }) {
  // DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userPhotoUrl: '',
    userId: '',
  });

  useEffect(() => {
    const darkMode = localStorage.getItem('darkModeCompany');
    if (darkMode === 'true') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <DynamicContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        user,
        setUser,
      }}
    >
      {children}
    </DynamicContext.Provider>
  );
}

export default UserLayout;
