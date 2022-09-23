// REACT
import React, { ReactElement } from 'react';

// NEXT
import Head from 'next/head';

// COMPONENTS OR LAYOUTS
import SecondayStaticFooter from '@/src/components/Footer/SecondayStaticFooter';

function Auth() {
  return (
    <div>
      <Head>
        <title>ddfgdfgdfg</title>
        <meta name="description" content="dfgdfgdfgdfg" />
        <meta name="theme-color" content="#FFE500" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-primaryYellow">
        <h1>This is Student</h1>
      </main>
    </div>
  );
}

export default Auth;

Auth.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <SecondayStaticFooter />
    </>
  );
};
