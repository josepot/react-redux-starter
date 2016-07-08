import reducer from './on-going-requests';
import { REQUEST, SESSION } from '../actions';

const initialState = reducer(undefined, {});

describe('OnGoingRequests Reducer', () => {
  describe('inital state', () => {
    it('should be an empty Object', () => {
      expect(initialState).to.eql({});
    });
  });

  describe('on REQUEST.START', () => {
    it('should set the starting request for the given path', () => {
      const state = reducer(initialState, {
        type: REQUEST.START,
        meta: { path: 'session', activity: SESSION.LOGIN },
      });

      expect(state.session).to.equal(SESSION.LOGIN, 'it should set the activity of the request');
    });
  });

  describe('on REQUEST.ERROR and REQUEST.SUCCESS', () => {
    const testClear = type => {
      it(`should clear the entry for the request on ${type}`, () => {
        const state = reducer({ 'session': { activity: SESSION.LOGIN } },  {
          type,
          meta: { path: 'session', activity: SESSION.LOGIN },
        });

        expect(state.session, 'it should clear the entry').to.be.undefined;
      });
    };
    [REQUEST.ERROR, REQUEST.SUCCESS].forEach(testClear);
  });
});
