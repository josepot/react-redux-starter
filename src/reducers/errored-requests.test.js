import R from 'ramda';
import reducer from './errored-requests';
import { REQUEST, SESSION } from '../actions';

const initialState = reducer(undefined, {});

describe('ErroredRequests Reducer', () => {
  describe('inital state', () => {
    it('should be an empty object', () => {
      expect(initialState).to.eql({});
    });
  });

  describe('on REQUEST.ERROR', () => {
    it('should set the error for the given path', () => {
      const state = reducer(initialState, {
        type: REQUEST.ERROR,
        meta: { path: 'session', activity: SESSION.LOGIN },
        error: 'test',
      });

      expect(R.path(['session', 'error'], state), 'it should set the error').to.equal('test');
      expect(R.path(['session', 'activity'], state), 'it should set the activity of the error').to.equal(SESSION.LOGIN);
    });
  });

  describe('on REQUEST.SUCCESS', () => {
    it('should clear the error if exists', () => {
      const state = reducer({ 'session': { activity: SESSION.LOGIN, error: 'test' } }, {
        type: REQUEST.SUCCESS,
        meta: { path: 'session', activity: SESSION.LOGIN },
      });

      expect(state.session, 'it should clear the entry').to.be.undefined;
    });
  });
});
