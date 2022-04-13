export const FETCH_PROFILE = 'auth/profile/FETCH_PROFILE';
export const FETCH_SNS_PROFILE = 'auth/profile/FETCH_SNS_PROFILE';
export const SET_PROFILE = 'auth/profile/SET_PROFILE';
export const ERROR_PROFILE_FETCH = 'auth/profile/ERROR_PROFILE_FETCH';
export const FETCH_TOKEN = 'auth/token/FETCH_TOKEN';
export const SET_TOKEN = 'auth/token/SET_TOKEN';
export const ERROR_FETCH_TOKEN = 'auth/token/ERROR_FETCH_TOKEN';

const initialState = {
  profile: '',
  token: '',
};

export const fetchProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export const fetchTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
