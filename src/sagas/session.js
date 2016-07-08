import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { REQUEST, SESSION } from '../actions';
import { reset } from 'redux-form';

import requestSequence from './helpers/request-sequence';
import { login } from '../api/auth/';

/** **************************** WATCHERS *************************************/
export function* watchLogin() {
  yield* takeLatest(SESSION.LOGIN, sessionLogin);
}

/** ************************** SUBROUTINES ************************************/
const path = 'session';

function* sessionLogin({ payload: { username, password } }) {
  const activity = SESSION.LOGIN;
  const { type } = yield call(
    requestSequence, [login, username, password], { path, activity }
  );

  if (type === REQUEST.SUCCESS) {
    yield put(reset('login'));
  }
}
