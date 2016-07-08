import R from 'ramda';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  counterProps: createStructuredSelector({
    counter: R.prop('counter'),
  }),
});
