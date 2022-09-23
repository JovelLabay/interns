import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function StudentDashboard() {
  const router = useRouter();

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
}

export default StudentDashboard;

StudentDashboard.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
