import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';
import React, { ReactElement } from 'react';

function Setup() {
  return <div>account-setup</div>;
}

export default Setup;

Setup.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayStaticFooter />
    </>
  );
};
