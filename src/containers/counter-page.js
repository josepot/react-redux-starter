import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Counter from '../components/counter';
import Container from '../components/container';

import storeConnector from '../queries/counter-page';
import { counter } from '../actions';
import bindActionCreatorsRecursively
  from '../utils/bind-action-creators-recursively';

function CounterPage({ counterProps, counterHandlers }) {
  return (
    <Container testid="counter" size={2} center>
      <h2 data-testid="counter-heading" className="center caps" id="qa-counter-heading">Counter</h2>

      <Counter { ...counterProps } { ...counterHandlers } />
    </Container>
  );
}

CounterPage.propTypes = {
  counterHandlers: PropTypes.shape(Counter.handlers),
  counterProps: PropTypes.shape(Counter.props),
};

const actionCreatorsToProps = {
  counterHandlers: {
    increment: counter.onIncrease,
    decrement: counter.onDecrease,
  },
};

export default connect(
  storeConnector,
  bindActionCreatorsRecursively(actionCreatorsToProps)
)(CounterPage);
