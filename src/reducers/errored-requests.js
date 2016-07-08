import R from 'ramda';
import { REQUEST } from '../actions';

const INITIAL_STATE = {};

export default (
  state = INITIAL_STATE,
  { type, meta: { path = '', activity } = {}, payload: error }
) => R.propOr(R.identity, type, {
  [REQUEST.ERROR]: R.assocPath(path.split('.'), { activity, error }),
  [REQUEST.SUCCESS]: R.dissocPath(path.split('.')),
})(state);
