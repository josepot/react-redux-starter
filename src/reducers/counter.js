import R from 'ramda';
import { COUNTER, SESSION } from '../actions';

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, { type }) => R.propOr(R.identity, type, {
  [COUNTER.INCREASED]: R.inc,
  [COUNTER.DECREASED]: R.dec,
  [SESSION.LOGOUT]: R.always(INITIAL_STATE),
})(state);
