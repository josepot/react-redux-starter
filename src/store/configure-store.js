import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import logger from './logger';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState, history) {
  const store = compose(
    _getMiddleware(history),
    ..._getEnhancers()
  )(createStore)(rootReducer, initialState);

  _enableHotLoader(store);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}

function _getMiddleware(history) {
  let middleware = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  if (__DEV__) {
    middleware = [...middleware, logger];
  }

  return applyMiddleware(...middleware);
}

function _getEnhancers() {
  return __DEV__ && window.devToolsExtension ?
    [window.devToolsExtension()] :
    [];
}

function _enableHotLoader(store) {
  if (__DEV__ && window.devToolsExtension) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

export default configureStore;
