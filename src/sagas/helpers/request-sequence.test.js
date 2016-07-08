import { put, call } from 'redux-saga/effects';
import { REQUEST } from '../../actions';

import requestSequence from './request-sequence';

const payload = { foo: 'bar' };
const error = new Error('test');
const callFn = [() => payload];
const meta = { path: 'test', activity: 'TEST_ACTION' };

describe('Sagas: requestSequence', () => {
  let generator = null;
  let next = null;
  beforeEach(() => {
    delete process.env.CLIENT;
    generator = requestSequence(callFn, meta);
    next = generator.next();

    expect(next.value).to.eql(put({ type: REQUEST.START, meta }),
      'it should dispatch a REQUEST.START action with the metadata');

    next = generator.next({ type: REQUEST.START, meta });
    expect(next.value).to.eql(call(...callFn),
      'it should call the provided function');
  });

  it('when the function finishes without errors', () => {
    next = generator.next(payload);
    expect(next.value).to.eql(put({ type: REQUEST.SUCCESS, meta, payload }),
      'should dispatch a REQUEST.SUCCESS action with the rest of the info');
  });

  it('when the function errors', () => {
    next = generator.throw(error);
    expect(next.value).to.eql(put({ type: REQUEST.ERROR, meta, error }),
      'should dispatch a REQUEST.ERROR action with the error and the metadata');
  });

  afterEach(() => {
    next = generator.next();
    expect(next.value).to.eql(
      { '@@redux-saga/IO': true, CANCELLED: {} },
      'it should check if the saga was cancelled'
    );
    next = generator.next();
    expect(next.value).to.be.undefined;
    expect(next.done).to.eql(true, 'the generator should have finished');
  });
});
