import { SESSION, REQUEST } from '../actions';

const INITIAL_STATE = {
  token: null,
  user: {},
};

export default (
  state = INITIAL_STATE, { type, payload: user, meta: { activity } = {} }
) => {
  switch (type) {
  case REQUEST.SUCCESS:
    return activity === SESSION.LOGIN ? user : state;
  case SESSION.LOGOUT:
    return INITIAL_STATE;
  default:
    return state;
  }
};
