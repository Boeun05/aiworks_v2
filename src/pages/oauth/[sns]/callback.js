import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/utils/auth';

function Oauth({ code, state }) {
  const { fetchSnsProfile } = auth;
  const router = useRouter();
  const { sns } = router.query;

  useEffect(() => {
    fetchSnsProfile(sns, { code, state });
  }, []);

  return <></>;
}

Oauth.getInitialProps = async ({ query }) => {
  const { code, state } = query;
  return { code, state };
};

export default Oauth;
