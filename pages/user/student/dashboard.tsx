// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// LOADER COMPONENT
import SplashLoading from '@component//interface/loading/SplashLoading';

// COMPONENTS
import SchoolDashboardContainer from '@component/blocks/navigation/school/schoolDashboardContainer';
import SchoolHeader from 'lib/components/blocks/navigation/school/SchoolHeader';

// STATE MANAGEMENT
import { DynamicContext } from '@redux//context';

// FIREBASE
// import { emailPassAuth } from '@/src/firebase/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';

// NEXT
import { useRouter } from 'next/router';
import { supabase } from 'lib/supabase/supabaseClient';
import { ToastContainer } from 'react-toastify';
import StudentHeader from '@component/blocks/navigation/student/SchoolHeader';
// import { errorNotify } from '@/src/components/common/toast';

function StudentDashboard() {
  const router = useRouter();
  const context = useContext(DynamicContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Interns | School Dashboard';
  }, []);

  if (isLoading) {
    return <SplashLoading />;
  }

  return (
    <div className="min-h-screen bg-mainBgWhite">
      <StudentHeader />
    </div>
  );
}

export default StudentDashboard;

StudentDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
