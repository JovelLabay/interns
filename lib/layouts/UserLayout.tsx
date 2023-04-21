// REACT
import React, { ReactNode, useEffect, useState } from 'react';

// REDUX CONTAINER
import { DynamicContext } from '@redux//context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function UserLayout({ children }: { children: ReactNode }) {
  // DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    window.addEventListener('online', (data) => {
      console.log(data);
    });
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
      }}
    >
      {children}
    </DynamicContext.Provider>
  );
}

export default UserLayout;
