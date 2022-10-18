import React, { ReactElement } from 'react';

function StudentDashboard() {
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
