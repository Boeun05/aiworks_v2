import axios from 'axios';
import { cookieHelper } from './Cookie';

export const apiHelper = {
  
  get: async function (route) {
    const { token } = cookieHelper.getCookie();
    const res = await axios.get(route, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  },

  post: async function (route, body) {
    const { token } = cookieHelper.getCookie();
    const res = await axios.post(route, body, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  },
  tokenGet: function (route) {
    return axios.get(route).then((res) => res);
  },
};

