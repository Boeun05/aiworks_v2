import Router from 'next/router';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { apiHelper } from '@/utils/api';
import { tokenChecking } from '@/utils/auth';
import { cookieHelper, parseJwt } from '@/utils/cookie';
import { FETCH_PROFILE, FETCH_SNS_PROFILE, SET_PROFILE, FETCH_TOKEN, SET_TOKEN } from './reducer';

function setLoggedInUserCookie(token) {
  const userProfile = parseJwt(token);
  cookieHelper.setCookie('token', token);
  const memberId = userProfile.data.member.id || null;
  cookieHelper.setCookie('user_info', memberId);
}

export function* fetchProfileSaga(action) {
  try {
    const response = yield call(apiHelper.post, '/members/login', action.body);
    const token = response.data.token;
    setLoggedInUserCookie(token);
    const tokenObj = {
      token: token,
      userProfile,
    };
    yield put({ type: SET_TOKEN, payload: tokenObj });
    yield put({ type: SET_PROFILE, payload: userProfile });
  } catch (error) {
    console.log(error.message, 'login error');
  } finally {
    if (typeof window !== undefined) {
      const prevPath = window.localStorage.getItem('prevPath');
      yield call(Router.push, prevPath);
    }
  }
}

export function* fetchSnsProfileSaga(action) {
  const { snsType, body } = action;
  if (!(snsType === 'naver' || snsType === 'kakao')) {
    return;
  }
  try {
    const response = yield call(apiHelper.post, `/oauth2/${snsType}/callback`, body);
    const token = response.data.token;
    setLoggedInUserCookie(token);

    const tokenObj = {
      token: token,
      userProfile,
    };
    yield put({ type: SET_TOKEN, payload: tokenObj });
    yield put({ type: SET_PROFILE, payload: userProfile });
  } catch (error) {
    console.log(error.message, 'sns login error');
  } finally {
    if (typeof window !== undefined) {
      const prevPath = window.localStorage.getItem('prevPath');
      yield call(Router.push, prevPath);
    }
  }
}

export function* fetchTokenSaga() {
  try {
    const response = yield call(tokenChecking);
    const { refreshedtoken, decoded_token } = response;
    yield put({ type: SET_TOKEN, payload: refreshedtoken });
    yield put({ type: SET_PROFILE, payload: decoded_token });
    return;
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchAuthRequest() {
  yield all([takeLatest(FETCH_PROFILE, fetchProfileSaga), takeLatest(FETCH_SNS_PROFILE, fetchSnsProfileSaga), takeLatest(FETCH_TOKEN, fetchTokenSaga)]);
}
