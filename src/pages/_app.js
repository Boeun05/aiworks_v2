import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth } from '@/utils/auth';
import { wrapper } from '@/store/configureStore';
import DefaultLayout from '@/component/layout/DefaultLayout';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

function App({ Component, pageProps, ...appProps }) {
  const router = useRouter();
  const { fetchToken } = auth;
  useEffect(() => {
    fetchToken();
  }, [router.pathname]);

  const isLayoutNeeded = !['/login', '/signup'].includes(appProps.router.pathname);
  const LayoutComponent = isLayoutNeeded ? DefaultLayout : React.Fragment;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
        <title>Aiworks V2 front</title>
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </>
  );
}

export default wrapper.withRedux(App);
