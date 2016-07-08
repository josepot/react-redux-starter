import R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

const getToken = R.path(['session', 'token']);

const loginModalProps = createStructuredSelector({
  isVisible: createSelector(getToken, R.isNil),
  loginFormProps: createStructuredSelector({
    hasError: R.pathSatisfies(x => !!x, ['erroredRequests', 'session']),
    isPending: R.pathSatisfies(x => !!x, ['onGoingRequests', 'session']),
  }),
});

const appProps = createStructuredSelector({
  firstName: R.pathOr('', ['session', 'user', 'first']),
  isLoggedIn: createSelector(getToken, R.complement(R.isNil)),
  lastName: R.pathOr('', ['session', 'user', 'last']),
  loginModalProps,
});

const formProps = createStructuredSelector({
  username: R.pathOr('', ['form', 'login', 'username', 'value']),
  password: R.pathOr('', ['form', 'login', 'password', 'value']),
});

export default createStructuredSelector({ appProps, formProps });
