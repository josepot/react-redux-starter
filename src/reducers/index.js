import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import counter from './counter';
import erroredRequests from './errored-requests.js';
import onGoingRequests from './on-going-requests';
import session from './session';

const rootReducer = combineReducers({
  counter,
  erroredRequests,
  form: formReducer,
  onGoingRequests,
  session,
  routing: routerReducer,
});

export default rootReducer;
