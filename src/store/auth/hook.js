import { fetchProfileAsync, fetchSnsProfileAsync, fetchTokenAsync } from './action';
import { useDispatch } from 'react-redux';

export const authHook = () => {
  const dispatch = useDispatch();

  const fetchProfile = (body) => {
    dispatch(fetchProfileAsync(body));
  };

  const fetchSnsProfile = (snsType, body) => {
    dispatch(fetchSnsProfileAsync(snsType, body));
  };

  const fetchToken = (method, url) => {
    dispatch(fetchTokenAsync(method, url));
  };

  return { fetchProfile, fetchSnsProfile, fetchToken };
};
