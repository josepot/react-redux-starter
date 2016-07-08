import R from 'ramda';
import { REQUEST } from '../actions';

const INITIAL_STATE = {};

export default (
  state = INITIAL_STATE,
  { type, meta: { path = '', activity } = {} }
) => {
  switch (type) {
  case REQUEST.START:
    return R.assocPath(path.split('.'), activity, state);
  case REQUEST.ERROR:
  case REQUEST.SUCCESS:
    return R.dissocPath(path.split('.'), state);
  default:
    return state;
  }
};
