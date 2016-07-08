import R from 'ramda';
import { fork } from 'redux-saga/effects';

import * as session from './session';

const forkAllSagas = R.pipe(R.map(R.values), R.flatten, R.map(fork));

export default function* root() {
  yield forkAllSagas([
    session,
  ]);
}
