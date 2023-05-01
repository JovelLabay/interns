// REACT
import React, { ReactElement, useEffect, useState } from 'react';

// LOADER COMPONENT
import SplashLoading from '@component//interface/loading/SplashLoading';

// COMPONENTS

// STATE MANAGEMENT
import { DynamicContext } from 'lib/context/context';

// NEXT
import { useRouter } from 'next/router';
import StudentHeader from '@component/blocks/navigation/student/SchoolHeader';
import axios from 'axios';
import { errorNotify } from '@component/interface/toast/toast';
import StudentDashboardContainer from '@component/blocks/navigation/student/studentDashboardContainer';

function StudentDashboard() {
  const router = useRouter();
  const context = React.useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Interns | School Dashboard';

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 8 * 60 * 60 * 1000);

    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('authStudentCookie='));
    const valueCookie = cookie?.split('=')[1];

    if (valueCookie) {
      axios
        .get(`/api/data/authStudent?checkAuth=${valueCookie}`)
        .then((res) => {
          if (res.data.message === 'CORRECT_CREDENTIALS') {
            const cookieString = `authStudentCookie=${
              res.data.responsePayload
            }; expires=${expirationTime.toUTCString()}; path=/`;
            document.cookie = cookieString;

            const studentData = res.data.otherData;

            context?.setUserData({
              name: `${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`,
              email: studentData.email,
              levelOfUser: '',
              image: studentData.student_profile_image,
            });

            if (context?.setStudentData) {
              context?.setStudentData(JSON.stringify(studentData));
            }

            setIsLoading(false);
          }
        })
        .catch(() => {
          errorNotify('Something went wrong');
          document.cookie =
            'authStudentCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

          router.push('/user/student/auth');
        });
    } else {
      router.push('/user/student/auth');
    }
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-mainBgWhite">
      <StudentHeader />
      <StudentDashboardContainer />
    </div>
  );
}

export default StudentDashboard;

StudentDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
