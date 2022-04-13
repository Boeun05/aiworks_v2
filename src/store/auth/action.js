import { FETCH_PROFILE, FETCH_SNS_PROFILE, SET_PROFILE, ERROR_PROFILE_FETCH, FETCH_TOKEN, SET_TOKEN, ERROR_FETCH_TOKEN } from './reducer';

export const fetchProfileAsync = (body) => {
  return { type: FETCH_PROFILE, body };
};

export const fetchSnsProfileAsync = (snsType, body) => {
  return { type: FETCH_SNS_PROFILE, snsType, body };
};

export const setProfile = (payload) => ({ type: SET_PROFILE, payload: payload });
export const errProfile = (error) => ({ type: ERROR_PROFILE_FETCH, payload: error });

export const fetchTokenAsync = (method = '', url = '') => {
  return { type: FETCH_TOKEN, method, url };
};
export const issueToken = ({ onSuccess, onFailure }) => trigger(FETCH_TOKEN, { onSuccess, onFailure });
export const trigger = (type, payload = {}, meta = {}) => ({ type, payload, meta });
export const setToken = (payload) => ({ type: SET_TOKEN, payload: payload });
export const errToken = (error) => ({ type: ERROR_FETCH_TOKEN, payload: error });
