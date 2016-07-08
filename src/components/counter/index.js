import React from 'react';
import Button from '../button';

function Counter({ counter, increment, decrement, testid }) {
  return (
    <div className="flex" data-testid={ testid }>
      <Button data-ref="decrementButton" className="bg-black col-2"
        onClick={ decrement }>
        -
      </Button>

      <div data-ref="result" className="flex-auto center h1">
        { counter }
      </div>

      <Button data-ref="incrementButton" className="col-2"
        onClick={ increment }>
        +
      </Button>
    </div>
  );
}

export const handlers = {
  increment: React.PropTypes.func,
  decrement: React.PropTypes.func,
};

export const props = {
  counter: React.PropTypes.number,
};

Counter.propTypes = {
  ...handlers,
  ...props,
  testid: React.PropTypes.string,
};

export default Counter;
