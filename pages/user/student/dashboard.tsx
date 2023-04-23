// REACT
import React, { ReactElement, useContext, useEffect, useState } from 'react';

// LOADER COMPONENT
import SplashLoading from '@component//interface/loading/SplashLoading';

// COMPONENTS

// STATE MANAGEMENT
import { DynamicContext } from '@redux//context';

// NEXT
import { useRouter } from 'next/router';
import StudentHeader from '@component/blocks/navigation/student/SchoolHeader';

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
