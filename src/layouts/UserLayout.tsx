// REACT
import React, { ReactNode, useEffect, useState } from 'react';

// REDUX CONTAINER
import { DynamicContext } from '../contexts/context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentObjectValidator } from '../validator/studentObjectValidator';

function UserLayout({ children }: { children: ReactNode }) {
  // DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<{
    userName: string;
    userEmail: string;
    userPhotoUrl: string;
    userId: string;
    collegeId?: string;
  }>({
    userName: '',
    userEmail: '',
    userPhotoUrl: '',
    userId: '',
    collegeId: '',
  });

  // STUDENT OBJECT DETAILS
  const { watch, setValue } = useForm<StudentObject>({
    mode: 'onBlur',
    resolver: yupResolver(StudentObjectValidator),
  });

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
        user,
        setUser,
        watch,
        setValue,
      }}
    >
      {children}
    </DynamicContext.Provider>
  );
}

export default UserLayout;
