import { all } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { watchAuthRequest } from './auth/saga';
import { fetchProfileReducer, fetchTokenReducer } from './auth/reducer';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        fetchProfileReducer,
        fetchTokenReducer,
      });
      return combineReducer(state, action);
    }
  }
};

function* rootSaga() {
  yield all([watchAuthRequest()]);
}

export { rootReducer, rootSaga };
