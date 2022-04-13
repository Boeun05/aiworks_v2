import router from 'next/router';
import { cookieHelper, parseJwt } from './cookie';
import { apiHelper } from './api';

export const auth = {
  setLoggedInUserCookie: (token) => {
    const userProfile = parseJwt(token);
    cookieHelper.setCookie('token', token);
    const memberId = userProfile.data.member.id || null;
    cookieHelper.setCookie('user_info', memberId);
  },

  fetchProfile: async (body) => {
    try {
      const response = await apiHelper.post('/members/login', body);
      const token = response.data.token;
      token && auth.setLoggedInUserCookie(token);
    } catch (error) {
      console.log(error.message, 'login error');
    } finally {
      if (typeof window !== undefined) {
        const prevPath = window.localStorage.getItem('prevPath');
        router.push(prevPath);
      }
    }
  },

  fetchSnsProfile: async (snsType, body) => {
    if (!(snsType === 'naver' || snsType === 'kakao')) {
      return;
    }
    try {
      const response = await apiHelper.post(`/oauth2/${snsType}/callback`, body);
      const token = response.data.token;
      token && auth.setLoggedInUserCookie(token);
    } catch (error) {
      console.log(error.message, 'sns login error');
    } finally {
      if (typeof window !== undefined) {
        const prevPath = window.localStorage.getItem('prevPath');
        router.push(prevPath);
      }
    }
  },
  fetchToken: async () => {
    try {
      await apiHelper.get('auth/jwt/check-token');
      const { data } = await apiHelper.get('auth/jwt/refresh-token');
      cookieHelper.setCookie('token', data.refreshedtoken);
      cookieHelper.setCookie('csrf', data.decoded_token.csrf);
      cookieHelper.setCookie('user_info', data.decoded_token.data.member.id || null);
      return data;
    } catch (err) {
      // 토큰 발급
      apiHelper
        .tokenGet('auth/jwt/token')
        .then((res) => {
          cookieHelper.setCookie('token', res.data.token);
          cookieHelper.setCookie('csrf', res.data.decoded_token.csrf);
          cookieHelper.setCookie('user_info', data.decoded_token.data.member.id || null);
          return res.data;
        })
        .catch((err) => {
          console.log(err, 'get auth jwt token error');
        });
    }
  },

  isUserLoggedIn: () => {
    try {
      const userInfo = cookieHelper.getCookie()?.user_info;
      console.log('userInfo', userInfo);
      if (!userInfo || userInfo === 'null') {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
