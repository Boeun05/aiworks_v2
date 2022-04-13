import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const cookieHelper = {
  setCookie: (name, value) => {
    setCookie(null, name, value, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  },
  getCookie: () => {
    const cookie = parseCookies();
    return cookie;
  },
  delCookie: (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
  decodeCookie: (name) => {
    return destroyCookie(null, name);
  },
};

const b64DecodeUnicode = (str) =>
  decodeURIComponent(Array.prototype.map.call(atob(str), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

export const parseJwt = (token) => JSON.parse(b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')));
