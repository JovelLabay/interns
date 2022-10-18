// REACT
import React, { ReactElement, ReactNode } from 'react';

// STYLES
import '../styles/globals.css';
import '../styles/home.css';

// TOASTIFY
import 'react-toastify/dist/ReactToastify.css';

// NEXT
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

// LAYOUTS
import WelcomeLayout from '../src/layouts/WelcomeLayout';
import UserLayout from '@/src/layouts/UserLayout';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(
      <UserLayout>
        <Component {...pageProps} />
      </UserLayout>
    );
  }

  return (
    <WelcomeLayout>
      <Component {...pageProps} />
    </WelcomeLayout>
  );
}

export default MyApp;

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
