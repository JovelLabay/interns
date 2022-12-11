// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// LOADING
import SplashLoading from '@/src/components/common/SplashLoading';

// NEXT
import { useRouter } from 'next/router';
import Image from 'next/image';

// REDUX
import { DynamicContext } from '@/src/contexts/context';

// FIREBASE
import { database, emailPassAuth, store } from '@/src/firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// IMAGE
import internsLogo from 'public/logo/interns_logo.png';

// COMPONENT
import StudentHeader from '@/src/components/Header/StudentHeader';
import StudentDashboardMain from '@/src/components/dashboards/studentDashboard';
import { onValue, ref } from 'firebase/database';
import { collection, getDocs, query, where } from 'firebase/firestore';

function StudentDashboard() {
  const router = useRouter();
  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const db = database;

    const authMe = onAuthStateChanged(emailPassAuth, (user) => {
      if (user === null) {
        router.push('/views/user/student/auth');
      }

      if (
        user?.displayName?.length !== 20 &&
        user?.providerData[0].providerId === 'password'
      ) {
        router.push('/views/user/student/setup');
      }

      if (
        user?.displayName?.length === 20 &&
        user?.providerData[0].providerId === 'password'
      ) {
        setIsLoading(false);

        const postCatRef = ref(db, `students/${user.displayName}`);
        onValue(postCatRef, (snapshot) => {
          const {
            studentDetails: {
              firstName,
              lastName,
              middleName,
              collegeName,
              emailAddress,
            },
          } = snapshot.val();

          const theCollegeName = collegeName.toLowerCase().replace(/\s/g, '_');

          (async () => {
            const q = query(
              collection(store, theCollegeName),
              where('studentStatus', '==', true),
              where('defaultEmail', '==', emailAddress)
            );

            const querySnapshot = await getDocs(q);
            const studentData = querySnapshot.docs.map((lala) => lala.data());

            if (studentData.length === 0 || studentData.length >= 2) {
              setIsActive(true);
              document.body.style.overflow = 'hidden';
            } else {
              context?.setUser({
                userName: `${firstName} ${middleName} ${lastName}`,
                userPhotoUrl: snapshot.val().companyLogo,
                userEmail: snapshot.val().studentDetails.firstName,
                userId: user.displayName || 'Unknown',
              });
            }
          })();
        });
      }
    });

    return () => {
      authMe();
    };
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div
      className={
        context?.isDarkMode
          ? 'bg-mainBgBlack min-h-screen duration-300'
          : 'bg-mainBgWhite min-h-screen duration-300'
      }
    >
      <StudentHeader signoutStudent={signoutStudent} />
      <StudentDashboardMain />

      {/* DISABLED DEPENDING ON THE STUDENT STATUS */}
      {isActive && (
        <div
          className={
            context?.isDarkMode
              ? 'bg-mainBgBlack min-h-screen duration-300 fixed top-0 left-0 w-full h-full z-50 flex flex-col gap-10 justify-center items-center'
              : 'bg-mainBgWhite min-h-screen duration-300 fixed top-0 left-0 w-full h-full z-50 flex flex-col gap-10 justify-center items-center'
          }
        >
          <Image
            src={internsLogo}
            alt="Interns Logo"
            width={100}
            height={100}
            style={{ borderRadius: '100%' }}
          />

          <p className="text-center">
            Your account has been disabled. Contact your practicum coordinator
          </p>
        </div>
      )}
    </div>
  );

  function signoutStudent() {
    signOut(emailPassAuth)
      .then(() => {
        localStorage.removeItem('studentDetials');
        null;
      })
      .catch(() => null);
  }
}

export default StudentDashboard;

StudentDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
