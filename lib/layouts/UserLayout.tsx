// REACT
import React, { ReactNode, useEffect, useState } from 'react';

// REDUX CONTAINER
import { DynamicContext } from 'lib/context/context';

function UserLayout({ children }: { children: ReactNode }) {
  // DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [userData, setUserData] = useState({
    image: '',
    name: '',
    levelOfUser: '',
    email: '',
  });

  const [studentData, setStudentData] = useState('');

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
        userData,
        setUserData,

        // STUDENT
        studentData,
        setStudentData,
      }}
    >
      {children}
    </DynamicContext.Provider>
  );
}

export default UserLayout;
