import React, { useState } from 'react';
import Link from 'next/link';
import nookies from 'nookies';
import LoginView from '@/component/login/LoginView';
import withHead from '@/component/hoc/WithHead';
import { apiHelper } from '@/utils/api';
import { auth } from '@/utils/auth';
import { useRouter } from 'next/router';

function LoginIndex({ referer }) {
  const router = useRouter();

  const { fetchProfile } = auth;
  const [userProfile, setUserProfile] = useState({
    id: '',
    password: '',
  });

  if (typeof window !== 'undefined') {
    const prevPath = referer && new URL(referer).pathname;
    window.localStorage.setItem('prevPath', prevPath || '/');
  }

  const snsLogin = async (sns) => {
    try {
      const response = await apiHelper.get(`/oauth2/${sns}`);
      console.log(response.data);
      router.push(response.data.login_url);
    } catch (e) {
      console.log(e.message);
      alert('sns login error');
    }
  };

  const signInClick = () => {
    fetchProfile(userProfile);
  };

  const onUserProfileHandler = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <LoginView signInClick={signInClick} onUserProfileHandler={onUserProfileHandler} userProfile={userProfile} snsLogin={snsLogin} />
      <Link href="/signup">
        <a>회원가입</a>
      </Link>
    </>
  );
}

export async function getServerSideProps(context) {
  const { referer } = context.req.headers;
  const cookies = nookies.get(context);
  const userInfo = cookies.user_info || null;

  const redirection =
    userInfo && userInfo !== 'null'
      ? {
          redirect: {
            permanent: false,
            destination: '/',
          },
        }
      : null;

  return {
    ...redirection,
    props: { referer: referer || null },
  };
}

export default withHead(LoginIndex, '로그인', 'aiworks v2 front login');
