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
import SecondayFooter from '@/src/components/Footer/SecondayStaticFooter';
import { data } from 'Data';

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
        const postCatRef = ref(db, `students/${user.displayName}`);
        onValue(postCatRef, (snapshot) => {
          const {
            studentDetails: {
              collegeName,
              emailAddress,
              firstName,
              lastName,
              middleName,
              gender,
            },
            address: { city_municipality, province_state },
            birthDate: { day, month, year },
            studentDocuments: {
              applicationLetter,
              birthCertificate,
              curreculumVitae,
              schoolId,
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

            // convert array to object
            const studentDataObject = Object.assign({}, ...studentData);

            if (studentData.length === 0 || studentData.length >= 2) {
              setIsActive(true);
              document.body.style.overflow = 'hidden';
            } else {
              context?.setUser({
                userName: `${firstName} ${middleName} ${lastName}`,
                userPhotoUrl:
                  snapshot.val().studentImageProfile === 'NOT SET'
                    ? internsLogo
                    : snapshot.val().studentImageProfile,
                userEmail: snapshot.val().studentDetails.emailAddress,
                userId: user.displayName || 'Unknown',
                collegeId: studentDataObject.collegeId,
              });

              // SETTING STUDENT OBJECT
              context?.setValue('studentDetails', {
                firstName,
                lastName,
                middleName,
                gender,
                emailAddress,
                collegeName,
              });

              context?.setValue('address', {
                city_municipality,
                province_state,
              });

              context?.setValue('birthDate', {
                day,
                month,
                year,
              });

              context?.setValue(
                'studentImageCover',
                snapshot.val().studentImageCover
              );
              context?.setValue(
                'studentImageProfile',
                snapshot.val().studentImageProfile
              );
              context?.setValue(
                'selfDescription',
                snapshot.val().selfDescription
              );

              context?.setValue('studentDocuments', {
                applicationLetter: applicationLetter,
                birthCerficate: birthCertificate,
                curriculumVitae: curreculumVitae,
                schoolId: schoolId,
              });
            }

            setIsLoading(false);
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
    <>
      {/* DISABLED DEPENDING ON THE STUDENT STATUS */}
      {isActive ? (
        <>
          <div className="flex h-[80vh] w-screen flex-col items-center justify-center gap-20 bg-mainBgWhite">
            <Image
              src={internsLogo}
              alt="Interns Logo"
              width={80}
              height={80}
              style={{ borderRadius: '100%' }}
            />

            <p className="mx-10 text-center">
              Your account has been{' '}
              <span className="font-semibold text-primaryYellow">disabled</span>
              .
              <br />
              Contact your practicum coordinator.
            </p>
            <p className="mt-20 text-center text-teriaryWhite">
              {data.others.developers}
            </p>
          </div>
          <SecondayFooter />
        </>
      ) : (
        <div
          className={
            context?.isDarkMode
              ? 'min-h-screen bg-mainBgBlack duration-300'
              : 'min-h-screen bg-mainBgWhite duration-300'
          }
        >
          <StudentHeader signoutStudent={signoutStudent} />
          <StudentDashboardMain />
        </div>
      )}
    </>
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
