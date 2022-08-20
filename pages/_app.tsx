// REACT
import React, { ReactElement, ReactNode } from 'react';

// STYLES
import '../styles/globals.css';

// NEXT
import type { AppProps } from 'next/app';

// LAYOUTS
import WelcomeLayout from '../src/layouts/WelcomeLayout';

import type { NextPage } from 'next';

import { NextUIProvider } from '@nextui-org/react';
import UserLayout from '@/src/layouts/UserLayout';
import { nextUiTheme } from 'nextUiTheme';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // DISPLAY LAYOUT ON SELECTED PAGES ONLY
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
